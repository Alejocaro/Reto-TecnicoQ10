const { defineConfig } = require("cypress");
require('dotenv').config();
let lastStudentId = null;

module.exports = defineConfig({
  viewportWidth: 1366,
  viewportHeight: 768,
  e2e: {
    baseUrl: 'https://site2.q10.com',
    setupNodeEvents(on, config) {
      config.env = {
        usuario: process.env.usuario,
        contrasena: process.env.contrasena,
      }
      on('task', {
        setLastStudentId: (id) => {
          lastStudentId = id;
          return null;
        },
        getLastStudentId: () => {
          return lastStudentId;
        }
      });
      
      return config;
    },
    specPattern: [
      "cypress/e2e/auth/login.cy.js",
      "cypress/e2e/estudiantes/registrarEstudiantes.cy.js", 
      "cypress/e2e/estudiantes/editarEstudiante.cy.js",
      "cypress/e2e/estudiantes/eliminarEstudiante.cy.js"
    ],
    testIsolation: true,
  },
});
