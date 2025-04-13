import './commands'

// Ignorar errores no controlados relacionados con Tawk
Cypress.on('uncaught:exception', (err, runnable) => {
  // Ignorar específicamente el error de Tawk i18next
  if (err.message.includes('t.$_Tawk.i18next is not a function')) {
    return false; // Evita que Cypress falle la prueba
  }
  // Para otros errores, permitir que Cypress falle la prueba
  return true;
});