const Product = require('../../models/Product')

const getFilteredProducts = async (req, res) => {
  try {
    const {category = [], sortBy = "price-lowhigh"} = req.query;
    
    let filters = {};

    if (category.length) {
      filters.category = {$in: category.split(',')}
    }

    let sort = {}

    switch (sortBy) {
      case 'price-lowhigh':
        sort.price = 1;
        break;

      case 'price-highlow':
        sort.price = -1;
        break;
      
      case 'title-az':
        sort.price = 1;
        break;
      
      case 'title-za':
        sort.price = -1;
        break;
      
      default: 
        sort.price = 1;
        break;
    }
    
    const products = await Product.find(filters).sort(sort);

    res.status(200).json({
      success: true,
      data: products
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error"
    })
  }
}

const getProductDetails = async(req, res) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product Not Found'
      })
    }

    res.status(200).json({
      success: true,
      data: product
    })

  } catch(err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error"
    })
  }
}

module.exports = { getFilteredProducts, getProductDetails };