const express = require('express')
const { registerUser, loginUser, logoutUser, middleware } = require('../../controllers/auth/auth-controller')
const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/check-auth', middleware, (req, res) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    message: 'middleware authenticated',
    user
  })
})


module.exports = router;