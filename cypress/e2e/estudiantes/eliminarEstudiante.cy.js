import { editarEstudiante } from '../../support/selectores/registrarEstudiantes'
import { eliminarEstudiante } from '../../support/selectores/registrarEstudiantes'
import LoginPage from '../../pages/LoginPage'
import { ESTUDIANTE_CONSTANTES } from '../../support/utils/estudiantes-constants'

describe('Eliminar Estudiantes', () => {
    const loginPage = new LoginPage()
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.log('Error no capturado:', err.message)
        return false
    })
    
    beforeEach(() => {
        loginPage.visit()
        loginPage.handleVueError()
        loginPage.login(Cypress.env('usuario'), Cypress.env('contrasena'))
        cy.get(loginPage.elements.iconoNotificaciones).should('be.visible')
    
        // Navegación al módulo de estudiantes
        cy.contains('Institucional').click()
        cy.wait(1000)
        cy.contains('Estudiantes').should('be.visible').first().click()
        cy.contains('Información básica').first().click({force: true})
    })

    it('Eliminar inscripción del estudiante', () => {
        cy.task('getLastStudentId').then((numeroIdentificacion) => {
            cy.log('Usando número de identificación: ' + numeroIdentificacion)
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
            cy.get(editarEstudiante.filaEstudiante).should('be.visible').should('exist').first()
              .find('td.actions a i.fa.fa-eye').parent().click()
            cy.get(eliminarEstudiante.informacionAcademica).should('be.visible').should('exist').click({force: true})
            cy.get(eliminarEstudiante.eliminarInscripcion).should('be.visible').should('exist').click()
            cy.get(eliminarEstudiante.bannerEliminar).should('be.visible').should('exist')
            cy.get(eliminarEstudiante.botonAceptarEliminar).should('be.visible').should('exist').click()
            cy.get(eliminarEstudiante.alertExitosaEliminar).should('be.visible').should('exist')
              .and('contain.text', 'El registro fue eliminado exitosamente')
              .then(($alerta) => {
                const textoAlerta = $alerta.text()
                cy.log('Texto del alerta: ' + textoAlerta)
                console.log('Texto del alerta exitosa:', textoAlerta)
              })
            cy.get(eliminarEstudiante.botonMas).should('be.visible').should('exist').click()
            cy.get(eliminarEstudiante.eliminarEstudiante).should('be.visible').should('exist').click()
            cy.get(eliminarEstudiante.confirmarEliminar).should('be.visible').should('exist').click()
            cy.get(eliminarEstudiante.modalEliminar).should('be.visible').should('exist')
            cy.get(eliminarEstudiante.botonAceptar).should('be.visible').should('exist').click()
            cy.get(eliminarEstudiante.alertEliminar).should('be.visible').should('exist')
              .and('contain.text', 'El registro fue eliminado exitosamente')
            cy.wait(10000)
            cy.contains('Información básica').first().click({force: true})
            cy.get(editarEstudiante.buscarEstudiante).clear().type(numeroIdentificacion)
            cy.get(editarEstudiante.botonBuscar).click()
  
            cy.get('body').then(($body) => {
              if ($body.find(editarEstudiante.tablaEstudiantes).length > 0) {
                // Si la tabla existe, verificar que no contiene el estudiante
                cy.get(editarEstudiante.tablaEstudiantes).then(($tabla) => {
                  const contieneDatos = $tabla.find('tbody tr').length > 0
                  
                  if (contieneDatos) {
                    cy.get(editarEstudiante.tablaEstudiantes)
                      .find('tbody tr')
                      .should('not.contain', numeroIdentificacion)
                      .then(() => {
                        cy.log('Verificado: El estudiante fue eliminado correctamente')
                      })
                  } else {
                    cy.log('Verificado: No hay registros en la tabla, el estudiante fue eliminado correctamente')
                  }
                })
              } else {
                // Si no hay tabla, es porque no se encontraron registros
                cy.log('Verificado: No hay registros, el estudiante fue eliminado correctamente')
              }
            })
        })
    })
})
