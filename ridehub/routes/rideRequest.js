const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://dannybats23:Seth23Chan@cluster0.du5jeyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function rideRequest(req, res) {
    const { pickupLocation, destination } = req.body;

    if (!pickupLocation || !destination) {
        return res.status(400).json({ error: 'Pickup location and destination are required.' });
    }

    const driver = assignDriver();
    const estimatedTime = calculateEstimatedTime(pickupLocation, destination);

    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const database = client.db("RideHub");
        const collection = database.collection("Rides");

        const ride = {
            pickupLocation,
            destination,
            driver,
            estimatedTime,
            createdAt: new Date()
        };

        await collection.insertOne(ride);
        await client.close();

        res.redirect(`/confirmation?driver=${encodeURIComponent(driver)}&estimatedTime=${encodeURIComponent(estimatedTime)}`);
    } catch (error) {
        console.error("Error processing ride request:", error);
        res.status(500).json({ error: 'An error occurred while processing the ride request.' });
    }
}

function assignDriver() {
    return 'John Doe';
}

function calculateEstimatedTime(pickupLocation, destination) {
    return '15 minutes';
}

module.exports = rideRequest;
