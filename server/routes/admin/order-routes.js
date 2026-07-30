const express = require('express')

const {getAllUsersOrders, getOrdersDetailsForAdmin, updateOrderStatus} = require('../../controllers/admin/order-controller');

const router = express.Router();
const { middleware, isAdmin } = require('../../controllers/auth/auth-controller')


router.get('/get', middleware, isAdmin, getAllUsersOrders)
router.get('/details/:id', middleware, isAdmin, getOrdersDetailsForAdmin)
router.put('/update/:id', middleware, isAdmin, updateOrderStatus)


module.exports = router;