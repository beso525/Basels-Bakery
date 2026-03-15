const express = require('express')

const {getAllUsersOrders, getOrdersDetailsForAdmin, updateOrderStatus} = require('../../controllers/admin/order-controller');

const router = express.Router();

router.get('/get', getAllUsersOrders)
router.get('/details/:id', getOrdersDetailsForAdmin)
router.put('/update/:id', updateOrderStatus)


module.exports = router;