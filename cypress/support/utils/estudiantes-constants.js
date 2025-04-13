class EstudianteUtils {
  static generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

  static generateRandomNumber(length) {
    const numbers = '0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    }
    return result;
  }

  static generateRandomNombre() {
    const nombres = ['Juan', 'Ana', 'Pedro', 'Maria', 'Carlos', 'Laura', 'Diego', 'Sofia', 'Eduardo', 'Valentina'];
    const randomNombre = nombres[Math.floor(Math.random() * nombres.length)];
    return `${randomNombre}${this.generateRandomString(4)}`;
  }

  static generateRandomIdentificacion() {
    return this.generateRandomNumber(10);
  }

  static generateRandomEmail() {
    return `test.${this.generateRandomString(8)}@ejemplo.com`;
  }
}

export const ESTUDIANTE_CONSTANTES = {
  get PRIMER_NOMBRE() { return EstudianteUtils.generateRandomNombre() },
  get NUMERO_IDENTIFICACION() { return EstudianteUtils.generateRandomIdentificacion() },
  get CORREO() { return EstudianteUtils.generateRandomEmail() }
}; 