const Booking = require('../models/bookingModel');

async function createBookingHandler(req, res) {
  try {
    const { home, startDate, endDate } = req.body;

    // Check for overlapping bookings
    const overlappingBooking = await Booking.findOne({
      home,
      $or: [
        { startDate: { $lte: endDate }, endDate: { $gte: startDate } }
      ]
    });

    if (overlappingBooking) {
      return res.status(400).json({ message: 'Home is not available for the selected dates.' });
    }

    // If available, create booking
    const newBooking = new Booking({
      home,
      user: req.user.userId,
      startDate,
      endDate
    });

    await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: newBooking });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

module.exports = { createBookingHandler };