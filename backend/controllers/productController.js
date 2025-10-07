const Product = require('../models/Product');

// @desc    Récupérer tous les produits
// @route   GET /api/products
// @access  Public
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ _id: 1 });
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des produits' });
  }
};

// @desc    Récupérer un produit par son ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération du produit' });
  }
};

// @desc    Créer un nouveau produit
// @route   POST /api/products
// @access  Private/Admin
exports.createProduct = async (req, res) => {
  try {
    const { name, type, price, rating, warranty_years, available } = req.body;
    
    // Trouver le plus grand ID existant et incrémenter de 1
    const lastProduct = await Product.findOne().sort({ _id: -1 });
    const newId = lastProduct ? lastProduct._id + 1 : 1;
    
    const product = new Product({
      _id: newId,
      name,
      type,
      price,
      rating: rating || 0,
      warranty_years,
      available: available !== undefined ? available : true
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la création du produit',
      error: error.message 
    });
  }
};

// @desc    Mettre à jour un produit
// @route   PUT /api/products/:id
// @access  Private/Admin
exports.updateProduct = async (req, res) => {
  try {
    const { name, type, price, rating, warranty_years, available } = req.body;
    
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    
    product.name = name || product.name;
    product.type = type || product.type;
    product.price = price !== undefined ? price : product.price;
    product.rating = rating !== undefined ? rating : product.rating;
    product.warranty_years = warranty_years || product.warranty_years;
    product.available = available !== undefined ? available : product.available;
    
    const updatedProduct = await product.save();
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la mise à jour du produit',
      error: error.message 
    });
  }
};

// @desc    Supprimer un produit
// @route   DELETE /api/products/:id
// @access  Private/Admin
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Produit non trouvé' });
    }
    
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Produit supprimé avec succès' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la suppression du produit',
      error: error.message 
    });
  }
};
