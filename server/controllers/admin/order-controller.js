const Order = require('../../models/Order')

const getAllUsersOrders = async(req,res) => {
  try {

    const orders = await Order.find({})

    if (!orders.length) {
      return res.status(400).json({
        success: false,
        message: 'No orders found'
      })
    }

    res.status(200).json({
      success: true,
      data: orders
    })
  } catch(err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occured!"
    })
  }
}


const getOrdersDetailsForAdmin = async(req,res) => {
  try {
    const {id} = req.params;

    const orders = await Order.findById(id)

    if (!orders) {
      return res.status(404).json({
        success: false,
        message: 'Order not found',

      })
    }

    res.status(200).json({
      success: true,
      data: orders
    })
  } catch(err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error occured!"
    })
  }
}

const updateOrderStatus = async(req, res) => {
  try {
    const {id} = req.params;
    const {orderStatus} = req.body;

    const order = await Order.findById(id);

    if(!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found"
      })
    }

    await Order.findByIdAndUpdate(id, {orderStatus})

    res.status(200).json({
      success: true,
      message: 'Order status updated.'
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Order not found"
    })
  }
}

module.exports = { getAllUsersOrders, getOrdersDetailsForAdmin, updateOrderStatus }