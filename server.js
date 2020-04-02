const http = require('http');
const debug = require('debug')("node-angular");
const app  = require('./backend/app');
//"start:server": "nodemon server.js",
const port = process.env.PORT || 3000;
app.set('port',port);
const server = http.createServer(app);

server.listen(port);



// //Install express server
// const express = require('express');
// const path = require('path');

// const app = express();

// // Serve only the static files form the dist directory
// app.use(express.static('./dist/{{your-app-name}}'));

// app.get('/*', function(req,res) {

// res.sendFile(path.join(__dirname,'/dist/{{your-app-name}}/index.html'));
// });

// // Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);
