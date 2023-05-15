const fs = require('fs');
const https = require('https');
const jsonServer = require('json-server');
const path = require('path');

const server = jsonServer.create();
const router = jsonServer.router(path.resolve(__dirname, 'db.json'));

const options = {
  key: fs.readFile(path.resolve(__dirname, 'key.pem')),
  cert: fs.readFile(path.resolve(__dirname, 'cert.pem')),
}

// custom delay 1000ms
server.use(async (req, res, next) => {
  await new Promise((res) => {
    setTimeout(res, 1000);
  });
  next();
});

server.use(jsonServer.defaults({}));
server.use(jsonServer.bodyParser);

// Add custom routes before JSON Server router
server.get('/echo', (req, res) => {
  res.jsonp(req.query);
});

server.post('/echo', (req, res) => {
  res.jsonp(req.body);
});

// endpoint for Login
// eslint-disable-next-line
server.post('/login', (req, res) => {

  try {
    const { username, password } = req.body;

    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'));
    const { users } = db;

    const userFromBd = users.find(
      (user) => user.username === username && user.password === password,
    );

    if (userFromBd) {
      return res.jsonp(userFromBd);
    }

    return res.status(403).jsonp({ message: 'user is not found' });
  } catch (e) {
    return res.status(500).jsonp({ message: e.message });
  }
});

// check auth user
// eslint-disable-next-line
server.use((req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ message: 'AUTH ERROR' });
  }

  next();
});

server.use(router);

const httpsServer = https.createServer(options, server);

// server is running
httpsServer.listen(443, () => {
  console.log('server is running on 443 port');
});
