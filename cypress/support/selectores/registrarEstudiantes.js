export const registrarEstudiante = {
    primerNombre: '#Persona_per_primer_nombre',
    segundoNombre: '#Persona_per_segundo_nombre',
    primerApellido: '#Persona_per_primer_apellido',
    segundoApellido: '#Persona_per_segundo_apellido',
    tipoIdentificacion: '.btn.dropdown-toggle.selectpicker[data-id="Persona_tipdoc_codigoP"]',
    tipoIdentificacionMenu: '.dropdown-menu.open[aria-expanded="true"]',
    numeroIdentificacion: '#Persona_per_numero_identificacion',
    sexo: '.btn.dropdown-toggle.selectpicker[data-id="Persona_per_genero"]',
    correo: '#Persona_per_email',
    telefono: '#Persona_per_telefono',
    celular: '#Persona_per_celular',
    fechaNacimiento: '#Persona_per_fecha_nacimiento',
    lugarNacimiento: '.selectize-control input[placeholder="Seleccione municipio"]',
    lugarNacimientoWrapper: '.selectize-input',
    direccion: '#Persona_per_direccion',
    lugarResidencia: '.selectize-input input[placeholder="Seleccione municipio"]',
    lugarResidenciaWrapper: '.selectize-input:eq(1)',
    periodo: 'button[data-id="InfoSuperior_per_per_consecutivo"]',
    sedeJornada: 'button[data-id="InfoSuperior_sedjor_consecutivoP"]',
    programa: 'button[data-id="InfoSuperior_sedjorprogra_consecutivoP"]',
    botonAceptar: 'input#submit-btn.btn.btn-primary.q10button',
    botonCancelar: 'button.btn.btn-default.btn-cancel[data-dismiss="modal"]',
};
  
export const editarEstudiante = {
    buscarEstudiante: 'input#texto.form-control',
    botonBuscar: 'button.btn.btn-primary.q10button[type="submit"]',
    tablaEstudiantes: 'table.table',
    filaEstudiante: 'tbody tr',
    botonEditar: 'td.actions a i.fa.fa-eye',
    editarSNIES: 'a.btn-link.btn-sm.modal-form[href^="/Estudiante/"][href*="/EducacionSuperior/Editar"]'
};

export const editarSNIES = {
    pestanaGeneral: 'a[href="#general"][data-toggle="tab"]',
    pestanaSNIES1: 'a[href="#SNIES"][data-toggle="tab"]',
    pestanaSNIES2: 'a[href="#SNIES2"][data-toggle="tab"]',
    expedicionDocumento: 'input[placeholder="Seleccione municipio"]',
    fechaExpedicion: 'input#EducacionSuperior_per_fecha_expedicion_documento',
    estadoCivil: '[data-id="EducacionSuperior_per_estado_civil"] .filter-option',
    grupoEtnico: 'button[data-id="EducacionSuperior_per_snies_grupo_etnico"] .filter-option',
    comunidadNegra: 'button[data-id="EducacionSuperior_per_snies_comunidad_negra"]',
    discapacidad: 'button[data-id="EducacionSuperior_per_discapacidad"] .filter-option',
    botonAceptar: 'input.btn.btn-primary[value="Aceptar"]',
    alertExitosa: '.alert.alert-success',
};

export const eliminarEstudiante = {
    informacionAcademica: 'li.infoAcademic > a:contains("Información académica")',
    eliminarInscripcion: 'a.btn.btn-default.btn-sm.modal-form[href*="/Inscripciones/"][href*="/Eliminar"]',
    bannerEliminar: '.modal-body p:contains("¿Está seguro que desea Eliminar el registro?")',
    botonAceptarEliminar: 'button#submit-btn.btn.btn-primary',
    alertExitosaEliminar: '.alert.alert-success',
    mensajeEliminar: 'td:contains("¿Está seguro que desea Eliminar el registro?")',
    botonMas: 'a.dropdown-toggle:contains("Más...")',
    eliminarEstudiante: 'a.modal-form[href*="/Persona/"][href*="/Eliminar"]:contains("Eliminar estudiante")',
    confirmarEliminar: '.modal-body p:contains("¿Está seguro que desea eliminar el registro")',
    modalEliminar: '.modal-dialog form[data-ajax="true"][action*="/Persona/"][action*="/Eliminar"]',
    botonAceptar: 'button#submit-btn.btn.btn-primary.q10button',
    alertEliminar: '.alert.alert-success'
}
