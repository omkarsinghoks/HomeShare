const router=require('express').Router(); 
const { listHomeHandler, getHomeListingHandler ,searchHomeHandler} = require('../controllers/homeListingController');
const upload = require('../middleware/uploadMiddleware');

router.post('/', upload.single('image'), listHomeHandler);
router.get('/', getHomeListingHandler);
router.get('/search', searchHomeHandler);

module.exports=router