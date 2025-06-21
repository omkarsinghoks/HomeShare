const { createBookingHandler } = require('../controllers/bookingController');

const router = require('express').Router();


router.post('/', createBookingHandler )

module.exports=router