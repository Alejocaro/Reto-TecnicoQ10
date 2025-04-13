# Cypress Automations - Q10

Proyecto de automatización de pruebas E2E para la plataforma Q10 CRUD, utilizando Cypress.

## Descripción

Este proyecto contiene pruebas automatizadas para validar diferentes funcionalidades del módulo de estudiantes en la plataforma Q10, incluyendo:

- Autenticación (login)
- Registro de estudiantes
- Edición de información de estudiantes
- Eliminación de estudiantes

## Estructura del Proyecto

```
cypress-automations-q10/
├── cypress/
│   ├── e2e/                    # Pruebas end-to-end
│   │   ├── auth/               # Pruebas de autenticación
│   │   └── estudiantes/        # Pruebas del módulo de estudiantes
│   ├── fixtures/               # Datos de prueba
│   ├── pages/                  # Page Objects
│   ├── support/                # Comandos personalizados
│   │   ├── selectores/         # Selectores organizados por módulos
│   │   └── utils/              # Utilidades y constantes
│   ├── screenshots/            # Capturas de pantalla de pruebas fallidas
│   └── downloads/              # Archivos descargados durante las pruebas
├── node_modules/
├── .env                        # Variables de entorno
├── package.json                # Dependencias y scripts
├── package-lock.json
└── cypress.config.js           # Configuración de Cypress
```

## Requisitos Previos

- Node.js (versión 14 o superior)
- NPM (versión 6 o superior)

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd cypress-automations-q10
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   - Copiar el archivo `.env.example` a `.env` (si existe)
   - Configurar las credenciales de usuario en el archivo `.env`:
     ```
     usuario=tu_usuario
     contrasena=tu_contraseña
     ```

## Ejecución de Pruebas

### Abrir Cypress en modo interactivo:

```bash
npm run cypress:open
```

### Ejecutar todas las pruebas en modo headless:

```bash
npx cypress run
```

### Ejecutar una prueba específica:

```bash
npx cypress run --spec "cypress/e2e/estudiantes/registrarEstudiantes.cy.js"
```

## Flujo de pruebas

Las pruebas están diseñadas para ejecutarse en un orden específico:

1. Login - Validación de autenticación
2. Registro de estudiantes - Creación de nuevo estudiante
3. Edición de estudiante - Modificación de información existente
4. Eliminación de estudiante - Remoción del registro

## Compartir datos entre pruebas

El proyecto utiliza tasks de Cypress para mantener el ID del estudiante registrado y utilizarlo en pruebas subsecuentes:

- `setLastStudentId`: Almacena el ID del estudiante creado
- `getLastStudentId`: Recupera el ID para usarlo en otras pruebas

## Autor

Alejandro Caro 