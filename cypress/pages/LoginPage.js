class LoginPage {
    // Elementos
    elements = {
        usuario: '#NombreUsuario',
        contrasena: '#Contrasena',
        ingresar: '#submit-btn.btn',
        iconoNotificaciones: 'a[href="#notifications-panel"].dropdown-toggle'
    }

    // Métodos
    visit() {
        cy.visit('/User/Login')
        cy.wait(1000) // Esperar a que la página cargue completamente
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
        
        // Ingresar usuario
        cy.get(this.elements.usuario)
            .should('be.visible')
            .clear()
            .type(usuario)
        
        // Ingresar contraseña
        cy.get(this.elements.contrasena)
            .should('be.visible')
            .clear()
            .type(contrasena)
        
        // Hacer clic en el botón de ingreso
        cy.get(this.elements.ingresar)
            .should('be.visible')
            .should('contain', 'Ingresar')
            .click()

        // Verificar redirección solo si se espera un login exitoso
        if (verificarExito) {
            cy.url({ timeout: 10000 }).should('not.include', '/User/Login')
        }
    }
}

export default LoginPage;   