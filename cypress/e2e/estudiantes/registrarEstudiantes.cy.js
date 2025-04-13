import { registrarEstudiante } from '../../support/selectores/registrarEstudiantes'
import LoginPage from '../../pages/LoginPage'
import { ESTUDIANTE_CONSTANTES } from '../../support/utils/estudiantes-constants'

describe('Registrar Estudiantes', () => {
    const loginPage = new LoginPage()
    let datosEstudiante = {};
    
    beforeEach(() => {
        // Guardar los datos aleatorios para validaciones posteriores
        datosEstudiante = {
            primerNombre: ESTUDIANTE_CONSTANTES.PRIMER_NOMBRE,
            numeroIdentificacion: ESTUDIANTE_CONSTANTES.NUMERO_IDENTIFICACION,
            correo: ESTUDIANTE_CONSTANTES.CORREO
        };
        
        loginPage.visit()
        loginPage.handleVueError()
        loginPage.login(Cypress.env('usuario'), Cypress.env('contrasena'), true)
    

        cy.get(loginPage.elements.iconoNotificaciones).should('be.visible')
        cy.contains('Institucional').click();
        cy.wait(1000)
        cy.contains('Estudiantes').should('be.visible').first().click()
        cy.wait(1000);
        cy.contains('Registrar estudiante').first().click({ force: true })
        
        // Esperar a que el formulario esté visible
        cy.wait(2000)
    })

    it('Registrar un estudiante', () => {
    
        cy.get(registrarEstudiante.primerNombre).should('be.visible').should('exist').type(datosEstudiante.primerNombre)
        cy.get(registrarEstudiante.segundoNombre).should('be.visible').should('exist').type('Pablo')
        cy.get(registrarEstudiante.primerApellido).should('be.visible').should('exist').type('Gomez')
        cy.get(registrarEstudiante.segundoApellido).should('be.visible').should('exist').type('Perez')
        cy.get(registrarEstudiante.tipoIdentificacion).should('be.visible').should('exist').click()
        cy.wait(500)
        cy.get('.dropdown-menu.open li').contains('Cédula de Ciudadanía').first().click()
        cy.get(registrarEstudiante.numeroIdentificacion).should('be.visible').should('exist').type(datosEstudiante.numeroIdentificacion)
        cy.get(registrarEstudiante.sexo).should('be.visible').should('exist').click()
        cy.wait(500)
        cy.get('.dropdown-menu.open li').contains('Masculino').first().click()
        cy.get(registrarEstudiante.correo).should('be.visible').should('exist').clear().type(datosEstudiante.correo)
        cy.get(registrarEstudiante.telefono).should('be.visible').should('exist').clear().type('3123456789')
        cy.get(registrarEstudiante.celular).should('be.visible').should('exist').clear().type('3123456789')
        cy.get(registrarEstudiante.fechaNacimiento).should('be.visible').should('exist').clear().type('04/04/1999')
        cy.get(registrarEstudiante.lugarNacimientoWrapper).should('be.visible').should('exist').first().click()
        cy.get(registrarEstudiante.lugarNacimientoWrapper).should('be.visible').should('exist').first().then($el => {
            if ($el.find('.item_selected').length > 0) {
                cy.get(registrarEstudiante.lugarNacimientoWrapper).first().find('.item_selected').type('{backspace}')
            }
        })
        cy.get(registrarEstudiante.lugarNacimientoWrapper).should('be.visible').should('exist').first().type('Medellín{enter}')
        cy.wait(1000)
        cy.contains('Medellín (Antioquia)').click()
        cy.get(registrarEstudiante.direccion).should('be.visible').should('exist').clear().type('Calle 45 #12-34')
        cy.get(registrarEstudiante.lugarResidenciaWrapper).should('be.visible').should('exist').click()
        cy.get(registrarEstudiante.lugarResidenciaWrapper).should('be.visible').should('exist').then($el => {
            if ($el.find('.item_selected').length > 0) {
                cy.get(registrarEstudiante.lugarResidenciaWrapper).find('.item_selected').type('{backspace}')
            }
        })
        cy.get(registrarEstudiante.lugarResidenciaWrapper).should('be.visible').should('exist').type('Medellín{enter}')
        cy.wait(1000)

        cy.get(registrarEstudiante.periodo).should('be.visible').should('exist').click()
        cy.wait(500)
        cy.get('.dropdown-menu.open li').contains('2025-I (Ejemplo)').click({ force: true })

        cy.get(registrarEstudiante.sedeJornada).should('be.visible').should('exist').click()
        cy.wait(500)
        cy.get('.dropdown-menu.open li').contains('Principal - Noche').click({ force: true }) 

        cy.get(registrarEstudiante.programa).should('be.visible').should('exist').click({ force: true })
        cy.wait(500)
        cy.get('.dropdown-menu.open li').contains('Ingeniería de Sistemas (Ejemplo)').click({ force: true })

        cy.get(registrarEstudiante.botonAceptar).should('be.visible').should('exist').first().click()
    
        cy.log(`Estudiante registrado con nombre: ${datosEstudiante.primerNombre}`)
        cy.log(`Número de identificación: ${datosEstudiante.numeroIdentificacion}`)
        cy.log(`Correo electrónico: ${datosEstudiante.correo}`)
        
        cy.task('setLastStudentId', datosEstudiante.numeroIdentificacion)
        cy.log('Número de identificación guardado para pruebas posteriores: ' + datosEstudiante.numeroIdentificacion)
        cy.wrap(datosEstudiante.numeroIdentificacion).as('numeroIdentificacionEstudiante')
        
        cy.get('.card.clearfix').then(($card) => {
            const nombreCompleto = $card.find('h2').text().trim()
            const documentoInfo = $card.find('h4').eq(1).text().trim()
            cy.log('Nombre mostrado: ' + nombreCompleto)
            cy.log('Documento mostrado: ' + documentoInfo)
            expect(nombreCompleto).to.include(datosEstudiante.primerNombre)
            expect(documentoInfo).to.include(datosEstudiante.numeroIdentificacion)
            cy.wrap(nombreCompleto).as('El registro del estudiante es correcto')
            cy.wrap(documentoInfo).as('El documento del estudiante es correctonto del estudiante es correcto')
        })
    })
})

