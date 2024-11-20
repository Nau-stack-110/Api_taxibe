const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const port = process.env.PORT || 4000;
const { createAdmin } = require('./controllers/auth.controller');
createAdmin();

server.listen(port, '0.0.0.0', () =>{
    console.log(`server running at http://0.0.0.0:${port}`);
})
