const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');

const path = require("path");
const multer = require("multer");
const { v4 } = require("uuid");
const cors = require("cors");

require('./db.js');

const server = express();

server.name = "API";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "public/uploads"),
  filename: (req, file, cb) => {
    cb(null, v4() + path.extname(file.originalname));
  },
});

const uploadImage = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if (mimetype && extname) {
      return cb(null, true);
    }
    cb("Error: El Archivo no es de tipo imagen");
  },
}).single("image");
server.use(uploadImage);

server.use(cors());
server.use(express.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));

//server.use((req, res, next) => {
  //res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
 // res.header('Access-Control-Allow-Credentials', 'true');
 // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
 // res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
 // next();
//});

server.use('/', routes);

//static Files
server.use(express.static(path.join(__dirname, "public")));

// Error catching endware.
server.use((err, req, res, next) => { 
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
