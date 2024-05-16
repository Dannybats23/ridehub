'use strict';
const express = require('express');
const router = express.Router();


router.get('/', function (req, res) {
        res.render('main', { title: 'Dashboard', user: req.query.name });

});

router.get('/main', async function (req, res) {
    try {
        const user = await User.findById(req.user.id).lean(); 
        res.render('main', { title: 'Dashboard', user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.render('main', { title: 'Dashboard', error: 'Error fetching user' });
    }
});



module.exports = router;