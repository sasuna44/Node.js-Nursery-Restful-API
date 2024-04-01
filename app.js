const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const teacherRoute = require('./Routes/teacher');
const childRoute = require('./Routes/childRoute');
const classRoute = require('./Routes/classRout');
const login = require('./Routes/authRoute');
const authMw = require('./Middelwares/authMv');
const app = express();
require("dotenv").config();
const uploads = require('./Middelwares/MulterMW');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require("swagger-ui-express");

const port = process.env.PORT || 8080;
// Swagger Options
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Your API Title',
        version: '1.0.0',
        description: 'Description of your API'
      },
      basePath: '/',
    },
    apis: ['./Routes/*.js'], 
  };
  
  const swaggerSpec = swaggerJSDoc(swaggerOptions);
  
  // Serve Swagger UI
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log('connected to db'); 
        
        app.listen(port, () => {
            console.log(`server is on port ${port}`);
        });
    })
    .catch(error => {
        console.log('DB Problem: ', error);
    });
app.use(morgan(':method :url :status'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(uploads.single("image"));

/*   end points      */ 
app.use(login);
app.use(authMw);
app.use(teacherRoute);
app.use(childRoute);
app.use(classRoute);

/* 404 Not Found */
app.use((req, res, next) => {
    res.status(404).json({ data: 'Not found' });
});

/* Error handling middleware */
app.use((err, req, res, next) => {
    res.status(500).json({ data: `Error: ${err.message}` });
});
