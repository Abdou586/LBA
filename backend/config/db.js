const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
    
    // Ajout des données initiales
    await initializeData();
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const initializeData = async () => {
  const Product = require('../models/Product');
  const count = await Product.countDocuments();
  
  if (count === 0) {
    const initialProducts = [
      { _id: 1, name: "AC1 Phone1", type: "phone", price: 200.05, rating: 3.8, warranty_years: 1, available: true },
      { _id: 2, name: "AC2 Phone2", type: "phone", price: 147.21, rating: 1, warranty_years: 3, available: false },
      { _id: 3, name: "AC3 Phone3", type: "phone", price: 150, rating: 2, warranty_years: 1, available: true },
      { _id: 4, name: "AC4 Phone4", type: "phone", price: 50.20, rating: 3, warranty_years: 2, available: true }
    ];
    
    await Product.insertMany(initialProducts);
    console.log('Initial products added to the database');
  }
};

module.exports = connectDB;
