import LoginPage from '../../pages/LoginPage'

describe('Login', () => {
    const loginPage = new LoginPage()

    it('Debería iniciar sesión exitosamente', () => {
        // Datos de prueba
        const usuario = Cypress.env('usuario')
        const contrasena = Cypress.env('contrasena')
        loginPage.login(usuario, contrasena)
        cy.url().should('not.include', '/User/Login')

        // Verificar que el ícono de notificaciones sea visible
        cy.get(loginPage.elements.iconoNotificaciones, { timeout: 10000 })
            .should('be.visible')
    })

    it('Debería mostrar error con credenciales inválidas', () => {
        const usuario = Cypress.env('usuario')
        const contrasena = 'contrasena_invalida'
        loginPage.login(usuario, contrasena)

        cy.get('.alert-danger')
            .should('be.visible')
            .and('contain', 'El usuario o contraseña son inválidos')
    })
})
