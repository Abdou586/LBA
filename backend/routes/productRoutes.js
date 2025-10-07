const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');

// Routes pour les produits
router.route('/')
  .get(getProducts)           // Récupérer tous les produits
  .post(createProduct);        // Créer un nouveau produit

router.route('/:id')
  .get(getProductById)         // Récupérer un produit par ID
  .put(updateProduct)          // Mettre à jour un produit
  .delete(deleteProduct);      // Supprimer un produit

module.exports = router;
