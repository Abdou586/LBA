import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

// Configuration de base d'axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Intercepteur pour ajouter le token JWT s'il existe
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Gestion des erreurs
const handleError = (error) => {
  let errorMessage = 'Une erreur est survenue';
  
  if (error.response) {
    // La requête a été faite et le serveur a répondu avec un statut d'erreur
    errorMessage = error.response.data.message || errorMessage;
  } else if (error.request) {
    // La requête a été faite mais aucune réponse n'a été reçue
    errorMessage = 'Pas de réponse du serveur';
  }
  
  console.error('API Error:', error);
  throw new Error(errorMessage);
};

// Méthodes pour les produits
export const productService = {
  // Récupérer tous les produits
  getAll: async () => {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCTS);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Récupérer un produit par son ID
  getById: async (id) => {
    try {
      const response = await api.get(API_ENDPOINTS.PRODUCT_BY_ID(id));
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Créer un nouveau produit
  create: async (productData) => {
    try {
      const response = await api.post(API_ENDPOINTS.PRODUCTS, productData);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Mettre à jour un produit
  update: async (id, productData) => {
    try {
      const response = await api.put(API_ENDPOINTS.PRODUCT_BY_ID(id), productData);
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
  
  // Supprimer un produit
  delete: async (id) => {
    try {
      const response = await api.delete(API_ENDPOINTS.PRODUCT_BY_ID(id));
      return response.data;
    } catch (error) {
      return handleError(error);
    }
  },
};

export default api;
