'use strict';
const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://dannybats23:Seth23Chan@cluster0.du5jeyd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

router.get('/', function (req, res) {
    
    res.render('login', { title: 'Login', error: '' });
});


router.post('/', async function (req, res) {
    try {
        const { name, password } = req.body;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        const database = client.db("RideHub");
        const collection = database.collection("People");
        
        const user = await collection.findOne({ name, password});
        if (user) {
        
            res.redirect('/main');
        } else {
            
            res.render('login', { title: 'Login', error: 'Invalid username or password' });
        }
    } catch (error) {
        console.error("Error occurred during login:", error);
        
        res.render('login', { title: 'Login', error: 'An error occurred during login' });
    } 
});

module.exports = router;