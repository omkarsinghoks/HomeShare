const Home=require('../models/homeModel')
async function listHomeHandler(req, res) {
  try {
    const { location, availableFrom, availableTo, description, requirements, pricePerNight, imageUrl } = req.body;

    const newHome = new Home({
      owner: req.user.userId,
      location,
      availableFrom,
      availableTo,
      description,
      requirements,
      pricePerNight,
      imageUrl, //   Comes from Cloudinary
    });

    await newHome.save();
    res.status(201).json({ message: 'Home listed successfully', homeListed: newHome });
  } catch (error) {
    res.status(500).json({ message: 'Error listing home', error: error.message });
  }
}

async function getHomeListingHandler(req, res) {
  try {
    const homeListings = await Home.find();
    res.status(200).json(homeListings);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}

async function searchHomeHandler(req, res) {
  try {
    const { location, availableFrom, availableTo, minPrice, maxPrice } = req.query;
    const filter = {};

    if (location) filter.location = location;
    if (availableFrom) filter.availableFrom = { $lte: new Date(availableFrom) };
    if (availableTo) filter.availableTo = { $gte: new Date(availableTo) };
    if (minPrice || maxPrice) {
      filter.pricePerNight = {};
      if (minPrice) filter.pricePerNight.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerNight.$lte = Number(maxPrice);
    }

    const homes = await Home.find(filter);
    res.status(200).json(homes);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}
module.exports = {
  listHomeHandler,  
  getHomeListingHandler,
  searchHomeHandler
};