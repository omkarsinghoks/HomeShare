const router=require('express').Router();
const {authenticate} = require('../middleware/authenticate');

const { registerHandler, loginHandler, getUserHandler,forgetPasswordHandler,
  resetPasswordHandler } = require('../controllers/userController');

router.post('/register', registerHandler)
router.post('/login', loginHandler);
router.post('/forget-password', forgetPasswordHandler);
router.post('/reset-password', resetPasswordHandler);
router.use(authenticate)
router.get('/get-all-user', getUserHandler);



module.exports=router;
