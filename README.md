# Gestion des Transferts

Ce projet est une application de gestion des transferts et des audits de transferts. Il utilise React pour le frontend et une API REST pour le backend.

## Prérequis

Avant de pouvoir exécuter ce projet, assurez-vous d'avoir installé les éléments suivants :

- [Node.js](https://nodejs.org/) (version 18 ou supérieure)
- [npm](https://www.npmjs.com/) (version 6 ou supérieure)
- [Git](https://git-scm.com/)

## Installation

1. Clonez le dépôt sur votre machine locale :

   ```bash
   git clone https://github.com/Antsivaniaina/triggers_adminbd.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd triggers_adminbd
   ```

3. Installez les dépendances du projet :

   ```bash
   npm install
   ```

## Configuration

1. Créez un fichier `src/config.js` à la racine du projet et ajoutez la configuration de l'URL de l'API :

   ```javascript
   const config = {
       API_URL: 'http://localhost:8002/triggers.adminbd/api'
   };

   export default config;
   ```

## Exécution

1. Démarrez le serveur de développement :

   ```bash
   npm run dev
   ```

2. Ouvrez votre navigateur et accédez à l'adresse suivante :

   ```
   http://localhost:3000
   ```

## Structure du Projet

- `src/components/`: Contient les composants React utilisés dans l'application.
  - `Transfers.jsx`: Composant pour la gestion des transferts.
  - `AuditTransfers.jsx`: Composant pour la gestion des audits de transferts.
  - `ErrorBoundary.jsx`: Composant pour la gestion des erreurs.
- `src/App.jsx`: Composant principal de l'application avec la configuration des routes.
- `src/config.js`: Fichier de configuration pour l'URL de l'API.

## Fonctionnalités

- Affichage des transferts et des audits de transferts.
- Création, mise à jour et suppression des transferts.
- Navigation entre les pages de transferts et d'audits de transferts.

## Contribution

Les contributions sont les bienvenues ! Si vous souhaitez contribuer à ce projet, veuillez suivre les étapes suivantes :

1. Fork le dépôt.
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalité`).
3. Commitez vos modifications (`git commit -m 'Ajouter ma fonctionnalité'`).
4. Poussez votre branche (`git push origin feature/ma-fonctionnalité`).
5. Ouvrez une Pull Request.

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.