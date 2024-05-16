'use strict';
var express = require('express');
var router = express.Router();
const { MongoClient } = require('mongodb');


const uri = "mongodb+srv://dannybats23:Seth23Chan@cluster0.du5jeyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


router.get('/register', function (req, res) {
    res.render('register', { title: 'Register' });
});


router.post('/register', async function (req, res) {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        const database = client.db("RideHub");
        const collection = database.collection("People");
        
        const existingUser = await collection.findOne({ email: req.body.email });
        if (existingUser) {
            res.render('register', { title: 'Register', error: 'Email already exists' });
        } else {
            
            await collection.insertOne(req.body);
            res.redirect('/main'); 
        }
    } catch (error) {
        console.error("Error occurred during registration:", error);
        res.render('register', { title: 'Register', error: 'Registration failed' });
    } finally {
        await client.close();
    }
});

module.exports = router;