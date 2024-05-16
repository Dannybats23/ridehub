 'use strict';
var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');


const uri = "mongodb+srv://dannybats23:Seth23Chan@cluster0.du5jeyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


router.get('/', function (req, res) {
    res.render('index', { title: 'Home', error: '', loginLink: '<a href="/login">Login</a>' });
});

router.get('/profile', function (req, res) {
    res.render('profile', { title: 'Profile' });
});

router.get('/ridehistory', (req, res) => {
    res.render('ridehistory', { title: 'Ride History' });
});


router.post('/register', async function (req, res) {
    try {
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const database = client.db("RideHub");
        const collection = database.collection("People");
        
        const existingUser = await collection.findOne({ email: req.body.email });
        if (existingUser) {
            res.render('index', { title: 'Home', error: 'Email already exists', loginLink: '<a href="/login">Login</a>' });
        } else {
            
            await collection.insertOne(req.body);
            
            res.redirect('/main');
        }
    } catch (error) {
        console.error("Error occurred during registration:", error);
        res.render('index', { title: 'Home', error: 'Registration failed', loginLink: '<a href="/login">Login</a>' });
    }
});

module.exports = router;
