'use strict';
const express = require('express');
const router = express.Router();
const { MongoClient, ObjectID } = require('mongodb');


const uri = "mongodb+srv://dannybats23:Seth23Chan@cluster0.du5jeyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


router.get('/', async function (req, res) {
    try {
        
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();

        
        const database = client.db("RideHub");
        const collection = database.collection("People");

        
        const userId = req.user._id;

        
        const user = await collection.findOne({ _id: ObjectID(userId) });

       
        await client.close();

        
        res.render('profile', { title: 'Profile', user });
    } catch (error) {
        console.error("Error occurred while fetching user profile:", error);
        res.render('profile', { title: 'Profile', error: 'Error fetching user profile' });
    }
});


router.post('/', async function (req, res) {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const database = client.db("RideHub");
        const collection = database.collection("People");

        
        const userId = req.user._id;

        
        await collection.updateOne(
            { _id: ObjectID(userId) },
            {
                $set: {
                    name: req.body.name,
                    phone: req.body.phone,
                    address: req.body.address
                }
            }
        );

        
        const updatedUser = await collection.findOne({ _id: ObjectID(userId) });

        await client.close();

        
        res.render('profile', { title: 'Profile', user: updatedUser });
    } catch (error) {
        console.error("Error occurred while updating user profile:", error);
        res.render('profile', { title: 'Profile', error: 'Error updating user profile' });
    }
});

module.exports = router;
