'use strict';
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');


const uri = "mongodb+srv://dannybats23:Seth23Chan@cluster0.du5jeyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


router.get('/', async function (req, res) {
    try {
        
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        
        const database = client.db("RideHub");
        const collection = database.collection("Rides");

        const ridehistory = await collection.find({}).toArray();

        
        await client.close();

        res.render('ridehistory', { title: 'Ride History', ridehistory });
    } catch (error) {
        console.error("Error occurred while fetching ride history:", error);
        res.render('ridehistory', { title: 'Ride History', error: 'Error fetching ride history' });
    }
});

module.exports = router;