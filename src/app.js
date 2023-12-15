const express = require('express');
const app = express();
const port = 3000;

const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger-config.js');

mongoose.connect('mongodb://0.0.0.0:27017/secretSanta');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.urlencoded());
app.use(express.json());

const userRoute = require(`./routes/userRoute`);
const groupRoute = require(`./routes/groupRoute`);
const inviteRoute = require(`./routes/inviteRoute`);
const giftRoute = require(`./routes/giftRoute`);

app.use('/', userRoute);
app.use('/', groupRoute);
app.use('/', inviteRoute);
app.use('/', giftRoute);

app.listen(port, () => {
  console.log(`Exemple app listening on port ${port}`)
});