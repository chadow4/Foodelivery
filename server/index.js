const express = require("express");
const app = express();
const cors = require("cors");
const path = require('path');
const fileupload = require("express-fileupload");
const bodyParser = require('body-parser')


const userRoutes = require('./routes/user');
const restaurantRoutes = require('./routes/restaurant');
const platRoutes = require('./routes/plat');
const commandeRoutes = require('./routes/commande');
const horaireRoutes = require('./routes/horaire');
const affectationRoutes = require('./routes/affectation');

app.use(fileupload());
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
app.use('/', express.static(path.join(__dirname, '/')));

app.use('/api/user', userRoutes);
app.use('/api/restaurant', restaurantRoutes);
app.use('/api/plat', platRoutes);
app.use('/api/commande', commandeRoutes);
app.use('/api/horaire', horaireRoutes);
app.use('/api/affectation', affectationRoutes);

app.listen(3001, () => {
  console.log("Your server is running on port 3001 !");
});