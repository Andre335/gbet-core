const swaggerJSDoc = require('swagger-jsdoc');
var router = express.Router();
var app = express();

var options = {  
  swaggerDefinition: {  
    info: {  
      description: 'My cool API',  
      version: '1.0.0',  
      title: 'My Service',  
    },  
    host: 'localhost:3000',  
    basePath: '/',  
    produces: ['application/json'],  
    schemes: [  
      'https',  
    ],  
  },  
  apis: ['./**/*.js', './user/routes/user.js']
};
  
const oasDefinition = swaggerJSDoc(options);  
const swaggerOptions = {  
  customSiteTitle: 'My Service',  
  customCss: '.topbar { display: none }',  
};

app.get('/swagger.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(oasDefinition);
});

// app.use('/docs', swaggerUi.serve, swaggerUi.setup(oasDefinition, swaggerOptions));  

module.exports = app;