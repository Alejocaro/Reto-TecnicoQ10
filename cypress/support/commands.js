import loginPage from '../pages/LoginPage'

Cypress.Commands.add('loginAdmin', () => {
    const usuario = Cypress.env('usuario')
    const contrasena = Cypress.env('contrasena')
    
    loginPage.login(usuario, contrasena)
})

