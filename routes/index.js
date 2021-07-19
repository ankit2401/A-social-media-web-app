const express = require('express');
const router = express.Router();

//home page
router.get('/', (req, res) => res.render('home_page'));

module.exports = router;

