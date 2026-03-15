const { imageUploadUtil } = require("../../helpers/cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString('base64');
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result
    })
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Error"
    })
  }
};

// add new product
const addProduct = async (req, res) => {
  try {
    const {
      image, 
      title, 
      description, 
      category, 
      price, 
      salePrice, 
      totalStock
    } = req.body;
    const newProduct = new Product({
      image, title, description, category, price, salePrice, totalStock
    })

    await newProduct.save();
    res.status(200).json({
      success: true,
      data: newProduct
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error"
    })
  }
}

// fetch product
const fetchProduct = async(req, res) => {
  try {
    const getProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: getProducts
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error"
    })
  }
}

// edit product
const editProduct = async (req, res) => {
  try {
    const {id} = req.params;

    const {
      image, 
      title, 
      description, 
      category, 
      price, 
      salePrice, 
      totalStock
    } = req.body;

    const findProduct = await Product.findById(id);
    if (!findProduct) return res.status(404).json({
      success: false,
      message: "404 Not Found"
    });

    findProduct.image = image || findProduct.image;
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.price = price === '' ? 0 : price || findProduct.price;
    findProduct.salePrice = salePrice === '' ? 0 : salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error"
    })
  }
}

// delete product
const deleteProduct = async (req, res) => {
  try {
    const {id} = req.params;
    const findProduct = await Product.findByIdAndDelete(id);

    if (!findProduct) 
      return res.status(404).json({
      success: false,
      message: "404 Not Found"
    });

    res.status(200).json({
      success: true,
      message: 'Product deleted.'
    })
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error"
    })
  }
}

module.exports = {handleImageUpload, addProduct, fetchProduct, editProduct, deleteProduct};