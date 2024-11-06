const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const port = process.env.PORT || 4000;
const { createAdmin } = require('./controllers/auth.controller');
createAdmin();

server.listen(port, () =>{
    console.log(`server running at http://localhost:${port}`);
})
