const express = require('express');
require('./config/dbmongo');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).send('Welcome to library db')
});
  
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});