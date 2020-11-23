const express = require('express');
const bodyParser = require('body-parser');
const colors = require('colors/safe');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const parseLogLine = (value, title) => colors.bold(title) + `: ${value}`;

const parseErrorData = ({
  colno,
  componentStack,
  lineno,
  location,
  message,
  path,
  parsedStack,
  source,
  stack,
  userAgent,
  type,
}) => {
  console.log(
    colors.bold(
      '\nError in application : Invoice Manager ----------------------------'
    )
  );
  if (type) {
    console.log(parseLogLine(type, 'Type').red);
  }
  if (message) {
    console.log(parseLogLine(message, 'Message'));
  }
  if (source) {
    console.log(parseLogLine(source, 'Source'));
  }
  if (lineno) {
    console.log(parseLogLine(lineno, 'Line Number'));
  }
  if (colno) {
    console.log(parseLogLine(colno, 'Col Number'));
  }
  if (path) {
    console.log(parseLogLine(path, 'Path'));
  }
  if (stack) {
    console.log(parseLogLine(stack, 'Stack from error'));
  }
  if (parsedStack) {
    console.log(parseLogLine(parsedStack, 'Stack trace (parsed)'));
  }
  if (componentStack) {
    console.log(parseLogLine(componentStack, 'React component stack'));
  }
  if (location) {
    console.log(parseLogLine(location, 'Location'));
  }
  if (userAgent) {
    console.log(parseLogLine(userAgent, 'User agent'));
  }
  console.log(
    colors.red('--------------------------------------------------------')
  );
};

app.post('/error-logger', (req, res) => {
  parseErrorData(req.body.errorData);
  res.send('Ok');
});

app.listen(4000, () => console.log('Waiting for errors at port 4000.'));
