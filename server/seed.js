const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product'); // Ensure path matches your model

dotenv.config();

const products = [
  {
    title: "Classic Sourdough Loaf",
    description: "Artisan sourdough with a crackly crust and an airy, tangy crumb.",
    category: "breads",
    dietary: ["vegan"],
    unit: "per loaf",
    price: 8.50,
    salePrice: 0,
    totalStock: 15,
  },
  {
    title: "Multigrain Seeded Bread",
    description: "Nutritious loaf packed with sunflower, flax, and pumpkin seeds.",
    category: "breads",
    dietary: ["vegan", "lowsugar"],
    unit: "per loaf",
    price: 9.00,
    salePrice: 7.50,
    totalStock: 10,
  },
  {
    title: "French Baguette",
    description: "Traditional crusty exterior with a soft, honeycomb interior.",
    category: "breads",
    dietary: ["vegan"],
    unit: "per piece",
    price: 4.50,
    salePrice: 0,
    totalStock: 30,
  },

  {
    title: "Almond Croissant",
    description: "Double-baked croissant filled with creamy almond frangipane.",
    category: "pastries",
    dietary: ["none"],
    unit: "per piece",
    price: 6.00,
    salePrice: 5.00,
    totalStock: 25,
    isBestSeller: true,
  },
  {
    title: "Pain au Chocolat",
    description: "Buttery, flaky pastry with two bars of dark Belgian chocolate.",
    category: "pastries",
    dietary: ["none"],
    unit: "per piece",
    price: 5.50,
    salePrice: 0,
    totalStock: 20,
  },

  {
    title: "Triple Chocolate Cake Slice",
    description: "Decadent layers of dark chocolate sponge and silky ganache.",
    category: "desserts",
    dietary: ["none"],
    unit: "per slice",
    price: 7.50,
    salePrice: 0,
    totalStock: 12,
    isBestSeller: true,
  },
  {
    title: "New York Cheesecake",
    description: "Classic creamy cheesecake on a buttery graham cracker crust.",
    category: "desserts",
    dietary: ["lowsugar"],
    unit: "per slice",
    price: 8.00,
    salePrice: 6.50,
    totalStock: 8,
  },

  {
    title: "Gourmet Choco-Chip Cookie",
    description: "Soft-baked with brown butter and oversized dark chocolate chunks.",
    category: "cookies",
    dietary: ["none"],
    unit: "per piece",
    price: 3.50,
    salePrice: 0,
    totalStock: 40,
    isBestSeller: true,
  },
  {
    title: "Vegan Oatmeal Raisin",
    description: "Chewy oats and sweet raisins with a hint of cinnamon.",
    category: "cookies",
    dietary: ["vegan", "allergen-friendly"],
    unit: "per piece",
    price: 3.00,
    salePrice: 2.50,
    totalStock: 30,
  },

  {
    title: "Spinach & Feta Turnover",
    description: "Flaky puff pastry stuffed with savory spinach and Greek feta.",
    category: "savory",
    dietary: ["none"],
    unit: "per piece",
    price: 5.75,
    salePrice: 0,
    totalStock: 15,
  },
  {
    title: "Cheddar Jalapeño Scone",
    description: "Sharp cheddar cheese balanced with a mild jalapeño kick.",
    category: "savory",
    dietary: ["nut-free"],
    unit: "per piece",
    price: 4.25,
    salePrice: 0,
    totalStock: 20,
  },

  {
    title: "Artisan Iced Latte",
    description: "Smooth espresso over ice with your choice of milk.",
    category: "drinks",
    dietary: ["vegan", "gluten-free"],
    unit: "16oz cup",
    price: 5.50,
    salePrice: 4.50,
    totalStock: 100,
  },
  {
    title: "Cold Brew Coffee",
    description: "Steeped for 24 hours for a bold, low-acid caffeine boost.",
    category: "drinks",
    dietary: ["vegan", "gluten-free", "lowsugar"],
    unit: "12oz cup",
    price: 4.75,
    salePrice: 0,
    totalStock: 50,
  },
  {
    title: "Matcha Green Tea Latte",
    description: "Ceremonial grade matcha whisked into creamy steamed milk.",
    category: "drinks",
    dietary: ["vegan", "gluten-free"],
    unit: "12oz cup",
    price: 6.00,
    salePrice: 0,
    totalStock: 40,
  },
  {
    title: "Herbal Mint Tea",
    description: "Refreshing fresh peppermint leaves steeped in hot water.",
    category: "drinks",
    dietary: ["vegan", "gluten-free", "lowsugar"],
    unit: "per cup",
    price: 3.50,
    salePrice: 2.50,
    totalStock: 100,
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB for seeding...");

    // Optional: Clear existing products to avoid duplicates
    await Product.deleteMany({});
    console.log("Old products cleared.");

    await Product.insertMany(products);
    console.log("Seeding successful! Added", products.length, "products.");

    process.exit();
  } catch (error) {
    console.error("Seeding error:", error);
    process.exit(1);
  }
};

seedDatabase();