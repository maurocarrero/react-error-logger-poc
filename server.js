const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post('/error-logger', (req, res) => {
  console.log(req.body);
});

app.listen(4000, () => console.log('Waiting for errors at port 4000.'));
