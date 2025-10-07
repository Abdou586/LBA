import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Box,
  Typography
} from '@mui/material';
import { Delete as DeleteIcon } from '@mui/icons-material';

const DeleteConfirmationDialog = ({ 
  open, 
  onClose, 
  onConfirm, 
  title = "Confirmer la suppression",
  message = "Êtes-vous sûr de vouloir supprimer cet élément ?"
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title" sx={{ color: 'error.main' }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <DialogContentText id="alert-dialog-description">
          <Typography variant="body1">{message}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Button onClick={onClose} color="inherit">
          Annuler
        </Button>
        <Button 
          onClick={() => {
            onConfirm();
            onClose();
          }} 
          color="error"
          variant="contained"
          startIcon={<DeleteIcon />}
          autoFocus
        >
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationDialog;
