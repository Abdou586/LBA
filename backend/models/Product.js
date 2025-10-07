const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  warranty_years: {
    type: Number,
    required: true,
    min: 0
  },
  available: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Créer un index sur le champ name pour des recherches plus rapides
productSchema.index({ name: 'text' });

// Middleware pour générer automatiquement un ID si non fourni
productSchema.pre('save', async function(next) {
  if (this.isNew && !this._id) {
    try {
      // Trouver le plus grand ID existant et incrémenter de 1
      const maxIdDoc = await this.constructor.findOne().sort({ _id: -1 }).select('_id').lean();
      this._id = maxIdDoc ? maxIdDoc._id + 1 : 1;
    } catch (error) {
      return next(error);
    }
  }
  next();
});

module.exports = mongoose.model('Product', productSchema);
