import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  FormControlLabel, 
  Switch,
  CircularProgress,
  FormHelperText
} from '@mui/material';
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
  createProduct, 
  updateProduct, 
  getProductById, 
  resetStatus 
} from '../redux/slices/productSlice';
import { showSuccessNotification, showErrorNotification } from '../redux/slices/notificationSlice';

const validationSchema = Yup.object({
  name: Yup.string().required('Le nom est requis'),
  type: Yup.string().required('Le type est requis'),
  price: Yup.number()
    .required('Le prix est requis')
    .positive('Le prix doit être positif')
    .typeError('Veuillez entrer un nombre valide'),
  rating: Yup.number()
    .min(0, 'La note minimale est 0')
    .max(5, 'La note maximale est 5')
    .typeError('Veuillez entrer un nombre entre 0 et 5'),
  warranty_years: Yup.number()
    .required('La durée de garantie est requise')
    .integer('La garantie doit être un nombre entier')
    .min(0, 'La garantie ne peut pas être négative'),
  available: Yup.boolean()
});

const ProductFormPage = () => {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error } = useSelector((state) => state.products);
  const [initialValues, setInitialValues] = useState({
    name: '',
    type: 'phone',
    price: '',
    rating: 0,
    warranty_years: 1,
    available: true
  });

  useEffect(() => {
    if (isEditMode) {
      const fetchProduct = async () => {
        try {
          const product = await dispatch(getProductById(id)).unwrap();
          setInitialValues({
            name: product.name,
            type: product.type,
            price: product.price,
            rating: product.rating,
            warranty_years: product.warranty_years,
            available: product.available
          });
        } catch (err) {
          console.error('Failed to fetch product:', err);
          dispatch(showErrorNotification('Erreur lors du chargement du produit'));
          navigate('/products');
        }
      };
      
      fetchProduct();
    }
  }, [id, isEditMode, dispatch, navigate]);

  useEffect(() => {
    if (success) {
      const message = isEditMode 
        ? 'Produit mis à jour avec succès' 
        : 'Produit créé avec succès';
      
      dispatch(showSuccessNotification(message));
      dispatch(resetStatus());
      navigate('/products');
    }
  }, [success, isEditMode, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      dispatch(showErrorNotification(error));
      dispatch(resetStatus());
    }
  }, [error, dispatch]);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      if (isEditMode) {
        await dispatch(updateProduct({ id, productData: values })).unwrap();
      } else {
        await dispatch(createProduct(values)).unwrap();
      }
    } catch (err) {
      console.error('Failed to save product:', err);
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    navigate('/products');
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" alignItems="center" mb={4}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={handleBack}
          sx={{ mr: 2 }}
        >
          Retour
        </Button>
        <Typography variant="h4" component="h1">
          {isEditMode ? 'Modifier le produit' : 'Nouveau produit'}
        </Typography>
      </Box>

      <Paper sx={{ p: 3 }}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ errors, touched, values, handleChange, handleBlur, isSubmitting }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    id="name"
                    name="name"
                    label="Nom du produit"
                    variant="outlined"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="type-label">Type</InputLabel>
                    <Field
                      as={Select}
                      labelId="type-label"
                      id="type"
                      name="type"
                      label="Type"
                      value={values.type}
                      onChange={handleChange}
                      error={touched.type && Boolean(errors.type)}
                    >
                      <MenuItem value="phone">Téléphone</MenuItem>
                      <MenuItem value="tablet">Tablette</MenuItem>
                      <MenuItem value="laptop">Ordinateur portable</MenuItem>
                      <MenuItem value="accessory">Accessoire</MenuItem>
                    </Field>
                    {touched.type && errors.type && (
                      <FormHelperText error>{errors.type}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    id="price"
                    name="price"
                    label="Prix (€)"
                    type="number"
                    variant="outlined"
                    value={values.price}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.price && Boolean(errors.price)}
                    helperText={touched.price && errors.price}
                    InputProps={{
                      inputProps: { 
                        min: 0,
                        step: '0.01'
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    id="rating"
                    name="rating"
                    label="Note (0-5)"
                    type="number"
                    variant="outlined"
                    value={values.rating}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.rating && Boolean(errors.rating)}
                    helperText={touched.rating && errors.rating}
                    InputProps={{
                      inputProps: { 
                        min: 0,
                        max: 5,
                        step: '0.1'
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <Field
                    as={TextField}
                    fullWidth
                    id="warranty_years"
                    name="warranty_years"
                    label="Garantie (années)"
                    type="number"
                    variant="outlined"
                    value={values.warranty_years}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.warranty_years && Boolean(errors.warranty_years)}
                    helperText={touched.warranty_years && errors.warranty_years}
                    InputProps={{
                      inputProps: { 
                        min: 0
                      }
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Field
                        as={Switch}
                        id="available"
                        name="available"
                        checked={values.available}
                        onChange={handleChange}
                        color="primary"
                      />
                    }
                    label={values.available ? 'Disponible' : 'Indisponible'}
                  />
                </Grid>

                <Grid item xs={12}>
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={loading || isSubmitting}
                      startIcon={
                        loading ? (
                          <CircularProgress size={20} color="inherit" />
                        ) : (
                          <SaveIcon />
                        )
                      }
                    >
                      {isEditMode ? 'Mettre à jour' : 'Créer'}
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default ProductFormPage;
