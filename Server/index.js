const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const admin = require("firebase-admin");

const app = express();
const port = process.env.PORT || 8000;

// 🔒Token verificaiton middleware
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("No token provided, Unauthorized access");
  }

  const idToken = authHeader.split("Bearer ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification failed:", error);
    return res
      .status(403)
      .send({ message: "Invalid or expired token. Forbidden." });
  }
};

// 🔒Token verificaiton middleware

// 🔥Firebase setup emni tei gorome matha noshto tar upor firebase!

try {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)
    : require("./serviceAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
  console.log("Firebase Admin SDK initialized successfully.");
} catch (error) {
  console.log("Firebase Admin SDK initialization error:", error.message);
}

// 🔥Firebase setup emni tei gorome matha noshto tar upor firebase!

// Middlewares
app.use(cors());
app.use(express.json());

// ! MongoDB Setup
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // await client.connect();

    const usersCollection = client.db("Ridezy").collection("users");
    const carsCollection = client.db("Ridezy").collection("cars");
    const bookingsCollection = client.db("Ridezy").collection("bookings");

    // !BOOKINGS API ENDPOINTS
    app.post("/bookings", verifyToken, async (req, res) => {
      const bookingDetails = req.body;
      const userEmail = req.user.email;
      console.log(
        `LOG: Received booking request for car: ${bookingDetails.carId} from ${userEmail}`
      );

      if (!ObjectId.isValid(bookingDetails.carId)) {
        console.log("LOG: Booking failed - Invalid Car ID format.");
        return res.status(400).send({ message: "Invalid Car ID format." });
      }

      const carIdToBook = new ObjectId(bookingDetails.carId);

      try {
        // Step 1: Atomically find a car that matches the ID AND is available, and update it.
        const carUpdateResult = await carsCollection.findOneAndUpdate(
          { _id: carIdToBook, isAvailable: true }, // The crucial filter
          { $set: { isAvailable: false }, $inc: { bookingCount: 1 } } // The update to apply
        );

        // Step 2: Check if the update worked.
        if (!carUpdateResult) {
          // If carUpdateResult is null, it means the filter found no matching document.
          // This is the correct way to handle a car that's already booked or doesn't exist.
          console.log(
            `LOG: Booking failed - Car ${carIdToBook} is not available or does not exist.`
          );
          return res
            .status(409)
            .send({ message: "Sorry, this car is no longer available." });
        }

        console.log(
          `LOG: Successfully updated car ${carIdToBook} to unavailable. Now creating booking record.`
        );

        // Step 3: If the car was successfully updated, create the booking record.
        const newBooking = {
          carId: bookingDetails.carId,
          carModel: bookingDetails.carModel,
          imageUrl: bookingDetails.imageUrl,
          totalPrice: bookingDetails.totalPrice,
          userEmail: userEmail,
          bookingDate: new Date().toISOString(),
          status: "confirmed",
        };
        const bookingResult = await bookingsCollection.insertOne(newBooking);

        console.log(
          `LOG: Booking record ${bookingResult.insertedId} created successfully.`
        );
        res.status(201).send({
          message: "Booking created successfully!",
          bookingId: bookingResult.insertedId,
        });
      } catch (error) {
        console.error("LOG: CRITICAL ERROR in booking process:", error);
        res.status(500).send({ message: "Internal server error." });
      }
    });

    app.get("/my-bookings", verifyToken, async (req, res) => {
      const userEmail = req.user.email;
      if (!userEmail) {
        res.status(401).send("Authentication is required");
        return;
      }
      try {
        const query = { userEmail: userEmail };

        const options = {
          sort: { bookingDate: -1 },
        };

        const bookings = await bookingsCollection
          .find(query, options)
          .toArray();
        res.status(200).send(bookings);
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
        res.status(500).send({ message: "Internal server error." });
      }
    });

    app.patch("/bookings/cancel/:id", verifyToken, async (req, res) => {
      const bookingId = req.params.id;
      const userEmail = req.user.email;
      if (!userEmail) {
        return res.status(401).send("Authentication is required");
      }

      try {
        const filter = {
          _id: new ObjectId(bookingId),
          userEmail: userEmail,
        };

        const bookingToCancel = await bookingsCollection.findOne(filter);

        if (!bookingToCancel) {
          return res.status(404).send({
            message:
              "Booking not found or you are not authorized to cancel it.",
          });
        }

        await bookingsCollection.updateOne(
          { _id: new ObjectId(bookingId) },
          { $set: { status: "cancelled" } }
        );

        await carsCollection.updateOne(
          { _id: new ObjectId(bookingToCancel.carId) },
          {
            $set: { isAvailable: true },
            $inc: { bookingCount: -1 },
          }
        );

        res.status(200).send({
          message: "Booking successfully cancelled and car is now available.",
        });
      } catch (error) {
        console.error("Failed to cancel booking:", error);
        res
          .status(500)
          .send({ message: "Internal server error during cancellation." });
      }
    });

    app.patch("/bookings/modify/:id", verifyToken, async (req, res) => {
      const bookingId = req.params.id;
      const userEmail = req.user.email;
      const { newBookingDate } = req.body;

      if (!userEmail) {
        return res.status(401).send({ message: "Authentication required." });
      }
      if (!newBookingDate) {
        return res
          .status(400)
          .send({ message: "A new booking date is required." });
      }

      try {
        const filter = {
          _id: new ObjectId(bookingId),
          userEmail: userEmail,
        };

        const updateDoc = {
          $set: {
            bookingDate: new Date(newBookingDate),
          },
        };

        const result = await bookingsCollection.updateOne(filter, updateDoc);

        if (result.matchedCount === 0) {
          return res.status(404).send({
            message:
              "Booking not found or you are not authorized to modify it.",
          });
        }

        res.status(200).send({
          message: "Booking modified successfully",
          bookingId: bookingId,
        });
      } catch (error) {
        console.error("Failed to modify booking:", error);
        res.status(500).send({ message: "Internal Server Error" });
      }
    });

    // !CARS API ENDPOINTS
    app.get("/cars", async (req, res) => {
      const { sortBy, order, search } = req.query;

      // Search fucntion
      let query = {};
      if (search) {
        query = {
          $or: [
            { carModel: { $regex: search, $options: "i" } },
            { location: { $regex: search, $options: "i" } },
          ],
        };
      }
      // Search fucntion

      const sortField = sortBy || "dateAdded";
      const sortOrder = order === "asc" ? 1 : -1;

      const cars = await carsCollection
        .find(query)
        .sort({ [sortField]: sortOrder })
        .toArray();
      res.send(cars);
    });

    app.get("/cars/:id", async (req, res) => {
      const id = req.params.id;
      const car = await carsCollection.findOne({ _id: new ObjectId(id) });
      res.send(car);
    });

    app.get("/my-cars", verifyToken, async (req, res) => {
      const userEmail = req.user.email;
      if (!userEmail) {
        res.status(400).send("Email is required");
        return;
      }
      const cars = await carsCollection
        .find({ userEmail: userEmail })
        .toArray();
      res.send(cars);
    });

    app.post("/cars", verifyToken, async (req, res) => {
      const newCar = req.body;
      if (newCar.bookingCount === undefined) {
        newCar.bookingCount = 0;
      }
      if (newCar.dateAdded === undefined) {
        newCar.dateAdded = new Date().toISOString();
      }

      const result = await carsCollection.insertOne(newCar);
      res.send(result);
    });

    app.put("/cars/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const carData = req.body;
      const userEmail = req.user.email;

      if (!userEmail) {
        res.status(401).send("Email is required");
        return;
      }

      const filter = {
        _id: new ObjectId(id),
        userEmail: userEmail,
      };

      const updateDoc = {
        $set: {
          carModel: carData.carModel,
          dailyRentalPrice: carData.dailyRentalPrice,
          vehicleRegistrationNumber: carData.vehicleRegistrationNumber,
          features: carData.features,
          description: carData.description,
          location: carData.location,
          imageUrl: carData.imageUrl,
          isAvailable: carData.isAvailable,
        },
      };

      const options = { upsert: false };

      const result = await carsCollection.updateOne(filter, updateDoc, options);
      res.send(result);

      if (result.matchedCount === 0) {
        return res.status(404).send({
          message: "Car not found or you are not authorized to update it.",
        });
      }
    });

    app.delete("/cars/:id", verifyToken, async (req, res) => {
      const id = req.params.id;
      const loggedInUser = req.user.email;
      const query = { _id: new ObjectId(id), userEmail: loggedInUser };
      const result = await carsCollection.deleteOne(query);
      if (result.deletedCount === 0) {
        return res.status(404).send({
          message: "Car not found or you are not authorized to delete it.",
        });
      }
      res.send(result);
    });

    // !USER API ENDPOINTS
    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await usersCollection.insertOne(user);
      res.send(result);
    });

    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    // await client.db("admin").command({ ping: 1 });

    app.get("/", (req, res) => {
      res.send("Server is running!");
    });

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
  }
}

run().catch(console.dir);
