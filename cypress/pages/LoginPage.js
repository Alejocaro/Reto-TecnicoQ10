class LoginPage {
    elements = {
        usuario: '#NombreUsuario',
        contrasena: '#Contrasena',
        ingresar: '#submit-btn.btn',
        iconoNotificaciones: 'a[href="#notifications-panel"].dropdown-toggle'
    }

    visit() {
        cy.visit('/User/Login')
        cy.wait(5000)
    }

    handleVueError() {
        cy.on('uncaught:exception', (err) => {
            if (err.message.includes('Cannot read properties of undefined (reading \'element\')')) {
                return false
            }
            return true
        })
    }

    login(usuario, contrasena, verificarExito = false) {
        this.visit()
        this.handleVueError()
        
        cy.get(this.elements.usuario)
            .should('be.visible')
            .clear()
            .type(usuario)
        
        cy.get(this.elements.contrasena)
            .should('be.visible')
            .clear()
            .type(contrasena)
        
        cy.get(this.elements.ingresar)
            .should('be.visible')
            .should('contain', 'Ingresar')
            .click()

        if (verificarExito) {
            cy.url({ timeout: 10000 }).should('not.include', '/User/Login')
        }
    }
}

export default LoginPage;   