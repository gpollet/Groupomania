**Installation :**

1. Copier l'ensemble du code en local et importer la base de données MySQL.

2. Remplacer les valeurs par défaut du fichier .env.test fourni, puis le renommer ".env"

3. Dans le terminal :

	4. Dans le dossier "back", saisir "npm install". Une fois l'installation des modules effectée, lancer la commande "nodemon".

	5. Dans le dossier "groupomania", saisir "npm install". Une fois l'installation des modules effectée, lancer la commande "npm run serve".

**Documentation de l'API :**

|   | Point d’accès  | Request body (le cas échéant)  |  Type de réponse attendue |
| ------------ | ------------ | ------------ | ------------ |
| POST  | /api/auth/signup  | { email : string, password : string }  | { message : string }  |
| POST  | /api/auth/login  | { email : string, password : string }  |  { role : number, token : string, userId : number } |
|  GET |  /api/posts |   | Array of users posts  |
| POST  | /api/posts  | { text_content : String, image : File} |  { message : String } |
| PUT  |  /api/posts/ :id |  Posts as JSON or { text_content : String, image : File} | { message : String }  |
|  DELETE |  /api/posts/ :id |   |  { message : String } |
|  POST |  /api/posts/ :id/like | { userId : Number, like : Number }  |   | |
