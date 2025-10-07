const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');

// Charger les variables d'environnement
require('dotenv').config();

// Initialiser l'application Express
const app = express();
const server = http.createServer(app);

// Configurer Socket.io
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à la base de données
connectDB();

// Routes
app.use('/api/products', productRoutes);

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Quelque chose a mal tourné!', error: err.message });
});

// Gestion des connexions WebSocket
io.on('connection', (socket) => {
  console.log('Nouveau client connecté');
  
  socket.on('disconnect', () => {
    console.log('Client déconnecté');
  });
  
  // Écouter les mises à jour de produits
  socket.on('productUpdate', (data) => {
    io.emit('productUpdated', data);
  });
});

// Exporter l'instance io pour l'utiliser dans d'autres fichiers
app.set('io', io);

// Démarrer le serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
