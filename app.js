const express = require('express');
require('./config/dbmongo');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});