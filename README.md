# 🛍️ Gestion de Produits

Application pour la gestion de produits avec une interface utilisateur moderne et une API performante.

## 🚀 Installation

### 1. Cloner le projet
```bash
git clone "https://github.com/Abdou586/LBA.git"
cd LBA
```

### 2. Technologies utilisées

**Backend (API REST) :**
- Node.js avec Express
- MongoDB (base de données NoSQL)
- Socket.IO pour les mises à jour en temps réel

**Frontend :**
- React.js avec Material-UI
- Redux Toolkit pour la gestion d'état
- Axios pour les appels API
- Socket.io Client pour les mises à jour en temps réel


## 📡 Documentation de l'API

### Base URL
`http://localhost:5000/api`

### Produits

#### 1. Récupérer tous les produits
- **Méthode** : `GET`
- **URL** : `/products`
- **Réponse** : Liste de tous les produits
- **Exemple** :
  ```bash
  curl http://localhost:5000/api/products
  ```

#### 2. Récupérer un produit par ID
- **Méthode** : `GET`
- **URL** : `/products/:id`
- **Paramètres** :
  - `id` : ID du produit (requis)
- **Exemple** :
  ```bash
  curl http://localhost:5000/api/products/1
  ```

#### 3. Créer un nouveau produit
- **Méthode** : `POST`
- **URL** : `/products`
- **Corps de la requête (JSON)** :
  ```json
  {
    "name": "Nouveau Produit",
    "type": "phone",
    "price": 299.99,
    "rating": 4.2,
    "warranty_years": 2,
    "available": true
  }
  ```

#### 4. Mettre à jour un produit
- **Méthode** : `PUT`
- **URL** : `/products/:id`
- **Paramètres** :
  - `id` : ID du produit à mettre à jour (requis)
- **Corps de la requête (JSON)** :
  ```json
  {
    "name": "Produit Mis à Jour",
    "price": 349.99,
    "available": false
  }
  ```
- **Exemple** :
  ```bash
  curl -X PUT http://localhost:5000/api/products/1 \
    -H "Content-Type: application/json" \
    -d '{"name":"Produit Mis à Jour","price":349.99,"available":false}'
  ```

#### 5. Supprimer un produit
- **Méthode** : `DELETE`
- **URL** : `/products/:id`
- **Paramètres** :
  - `id` : ID du produit à supprimer (requis)
- **Exemple** :
  ```bash
  curl -X DELETE http://localhost:5000/api/products/1
  ```

### Codes de statut HTTP
- `200` : Requête réussie
- `201` : Ressource créée avec succès
- `400` : Requête incorrecte (données manquantes ou invalides)
- `404` : Ressource non trouvée
- `500` : Erreur serveur interne

## 📦 Installation des dépendances

### 1. Installer les dépendances du backend :
```bash
cd backend
npm install
```

### 2. Installer les dépendances du frontend :
```bash
cd ../frontend
npm install
```

## 🚀 Lancement de l'application

### 1. Démarrer le serveur MongoDB
Assurez-vous que MongoDB est installé et en cours d'exécution.

### 2. Lancer l'application
Depuis la racine du projet (dossier LBA), exécutez :
```bash
# Démarrer le backend et le frontend en parallèle
npm start
```

Cette commande lancera à la fois le serveur backend et l'application frontend.

L'application sera disponible à l'adresse : [http://localhost:3000](http://localhost:3000)


## 📞 Support

Pour toute question ou problème, veuillez contacter :
- Email : niabalyabdoulatif@gmail.com
