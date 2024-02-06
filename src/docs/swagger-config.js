const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "secretSanta",
            version: "0.1.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },  
            contact: {
                name: "Max",
                email: "maxrichet78@gmail.com",
            },
        },  
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    
    apis: ["./routes/*.js"],
  };


module.exports = swaggerJsdoc(options);