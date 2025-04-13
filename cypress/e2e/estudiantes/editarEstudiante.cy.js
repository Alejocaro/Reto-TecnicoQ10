import { registrarEstudiante } from '../../support/selectores/registrarEstudiantes' 
import { editarEstudiante } from '../../support/selectores/registrarEstudiantes'
import { editarSNIES } from '../../support/selectores/registrarEstudiantes'
import LoginPage from '../../pages/LoginPage'
import { ESTUDIANTE_CONSTANTES } from '../../support/utils/estudiantes-constants'

describe('Editar Estudiantes', () => {
    const loginPage = new LoginPage()
    let datosNuevos = {};
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.log('Error no capturado:', err.message)
        return false  
    })
 
    beforeEach(() => {
        datosNuevos = {
            primerNombre: ESTUDIANTE_CONSTANTES.PRIMER_NOMBRE,
            correo: ESTUDIANTE_CONSTANTES.CORREO,
            telefono: '3198765432',
            direccion: 'Avenida Siempre Viva 123'
        };
        loginPage.visit()
        loginPage.handleVueError()
        loginPage.login(Cypress.env('usuario'), Cypress.env('contrasena'), true)
    
       
        cy.get(loginPage.elements.iconoNotificaciones).should('be.visible').should('exist')
        cy.contains('Institucional').should('be.visible').should('exist').click()
        cy.contains('Estudiantes').should('be.visible').should('exist').first().click()
        cy.contains('Información básica').first().click({force: true})
    })

    it('Editar información personal y basica del estudiante', () => {
        cy.task('getLastStudentId').then((numeroIdentificacion) => {
            cy.log('Usando número de identificación: ' + numeroIdentificacion)
            
            // Buscar el estudiante usando el número de identificación
            cy.get(editarEstudiante.buscarEstudiante).type(numeroIdentificacion)
            cy.get(editarEstudiante.botonBuscar).click()
            cy.get(editarEstudiante.tablaEstudiantes).should('be.visible')
            cy.get(editarEstudiante.tablaEstudiantes)
              .find('tbody tr')
              .first()
              .find('td')
              .contains(numeroIdentificacion)
              .should('exist')
              .then(() => {
                cy.log('Número de identificación verificado correctamente en la tabla')
              })
            cy.get(editarEstudiante.filaEstudiante).should('be.visible').should('exist')    
              .first()
              .find('td.actions a i.fa.fa-eye')
              .parent()
              .click()
            cy.get(editarEstudiante.editarSNIES).should('be.visible').should('exist').click()
            cy.get(editarSNIES.pestanaGeneral).should('be.visible').should('exist').click()
            cy.get(editarSNIES.expedicionDocumento).should('be.visible').should('exist').first().then($el => {
                if ($el.find('.item_selected').length > 0) {
                    cy.get(editarSNIES.expedicionDocumento).first().find('.item_selected').type('{backspace}')
                }
            })
            cy.get(editarSNIES.expedicionDocumento).should('be.visible').should('exist').first().type('Medellín{enter}')
            cy.get(editarSNIES.fechaExpedicion).should('be.visible').should('exist').clear().type('04/04/2016')
            cy.get(editarSNIES.estadoCivil).should('be.visible').should('exist').click()
            cy.get('.dropdown-menu.open li').should('be.visible').should('exist').contains('Soltero').click()
            cy.get(editarSNIES.grupoEtnico).should('be.visible').should('exist').click()
            cy.get('.dropdown-menu.open li').should('be.visible').should('exist').contains('No pertenece').click()
            cy.get(editarSNIES.comunidadNegra).should('be.visible').should('exist').click()
            cy.get('.dropdown-menu.open').find('li').contains('Raizales').click();
            cy.get(editarSNIES.discapacidad).should('be.visible').should('exist').click()
            cy.get('.dropdown-menu.open').find('li').contains('Intelectual').click();
            cy.get(editarSNIES.botonAceptar).should('exist').click()
            cy.get(editarSNIES.alertExitosa).should('be.visible').should('exist')
              .and('contain.text', 'El registro fue modificado exitosamente')
              .then(($alerta) => {
                const textoAlerta = $alerta.text()
                cy.log('Texto del alerta: ' + textoAlerta)
                console.log('Texto del alerta exitosa:', textoAlerta)
              })
        })
    })
})
