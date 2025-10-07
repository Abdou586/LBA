import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  Box,
  CircularProgress,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon,
  CheckCircle as AvailableIcon,
  Cancel as UnavailableIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, deleteProduct } from '../redux/slices/productSlice';
import { showSuccessNotification, showErrorNotification } from '../redux/slices/notificationSlice';
import DeleteConfirmationDialog from '../components/common/DeleteConfirmationDialog';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return;
    
    try {
      await dispatch(deleteProduct(productToDelete._id)).unwrap();
      dispatch(showSuccessNotification('Produit supprimé avec succès'));
    } catch (err) {
      dispatch(showErrorNotification('Erreur lors de la suppression du produit'));
    } finally {
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={3}>
        <Typography color="error">Erreur lors du chargement des produits: {error}</Typography>
      </Box>
    );
  }

  const renderProductGrid = () => {
    if (products.length === 0) {
      return (
        <Grid item xs={12}>
          <Typography variant="body1">Aucun produit disponible</Typography>
        </Grid>
      );
    }

    return products.map((product) => (
      <Grid item key={product._id} xs={12} sm={6} md={4}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardContent sx={{ flexGrow: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
              <Typography variant="h6" component="h2">
                {product.name}
              </Typography>
              <Chip
                label={product.available ? 'Disponible' : 'Indisponible'}
                color={product.available ? 'success' : 'default'}
                size="small"
                icon={product.available ? <AvailableIcon /> : <UnavailableIcon />}
              />
            </Box>
            
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Type: {product.type}
            </Typography>
            <Typography variant="h6" color="primary" gutterBottom>
              {product.price.toFixed(2)} €
            </Typography>
            <Box display="flex" alignItems="center" mb={1}>
              <Typography variant="body2" color="text.secondary">
                Note: {product.rating}/5
              </Typography>
              <Box ml={1}>
                {[...Array(5)].map((_, i) => (
                  <span key={i} style={{ color: i < Math.floor(product.rating) ? '#ffc107' : '#e0e0e0' }}>★</span>
                ))}
              </Box>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Garantie: {product.warranty_years} an{product.warranty_years > 1 ? 's' : ''}
            </Typography>
          </CardContent>
          <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
            <Tooltip title="Modifier">
              <IconButton 
                color="primary"
                onClick={() => navigate(`/products/${product._id}/edit`)}
              >
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Supprimer">
              <IconButton 
                color="error" 
                onClick={() => handleDeleteClick(product)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </Grid>
    ));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {productToDelete && (
        <DeleteConfirmationDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleDeleteConfirm}
          title="Confirmer la suppression du produit"
          message={`Êtes-vous sûr de vouloir supprimer le produit "${productToDelete.name}" ?`}
        />
      )}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4" component="h1">
          Liste des Produits
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate('/products/new')}
        >
          Ajouter un produit
        </Button>
      </Box>

      <Grid container spacing={3}>
        {renderProductGrid()}
      </Grid>
    </Container>
  );
};

export default ProductListPage;
