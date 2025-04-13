const { defineConfig } = require("cypress");
require('dotenv').config();

// Variable global para almacenar el ID del estudiante registrado
let lastStudentId = null;

module.exports = defineConfig({
  viewportWidth: 1366,
  viewportHeight: 768,
  e2e: {
    baseUrl: 'https://site2.q10.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      config.env = {
        usuario: process.env.usuario,
        contrasena: process.env.contrasena,
      }
      
      // Definir tareas para compartir datos entre pruebas
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
    // Ordenar pruebas para que se ejecuten en un orden específico
    specPattern: [
      "cypress/e2e/auth/login.cy.js",
      "cypress/e2e/estudiantes/registrarEstudiantes.cy.js", 
      "cypress/e2e/estudiantes/editarEstudiante.cy.js",
      "cypress/e2e/estudiantes/eliminarEstudiante.cy.js"
    ],
    // Permitir que Cypress limpie los datos de la prueba entre archivos
    testIsolation: true,
  },
});
