/**
 * script.js
 * Ejercicios de JavaScript con detección de entorno (navegador / Node.js)
 * 
 * El programa pregunta el nombre al usuario, lo saluda y luego ejecuta
 * una demostración de todos los ejercicios (comparador, arreglos, calculadora, objetos).
 */

// ==================== DETECCIÓN DE ENTORNO ====================
const isBrowser = typeof window !== 'undefined' && typeof window.prompt === 'function';
const isNode = typeof process !== 'undefined' && process.stdin && process.stdout;

// ==================== FUNCIÓN PARA PEDIR NOMBRE Y SALUDAR ====================
function pedirNombreYSaludar() {
  let nombre = '';

  if (isBrowser) {
    // Modo navegador: usa prompt y alert
    nombre = prompt('Por favor, ingresa tu nombre:');
    if (nombre && nombre.trim() !== '') {
      alert(`¡Hola ${nombre.trim()}! Bienvenido en mi usuario. A continuación empezarán los ejercicios de JavaScript.`);
    } else {
      alert('¡Ingreso por favor el nombre en usuario, gracias!');
    }
  } else if (isNode) {
    // Modo Node.js: usa readline (pregunta síncrona con callback)
    const readline = require('readline');
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    // Usamos una promesa para esperar la respuesta
    return new Promise((resolve) => {
      rl.question('Por favor, ingresa tu nombre: ', (respuesta) => {
        nombre = respuesta.trim();
        if (nombre !== '') {
          console.log(`¡Hola ${nombre}! Bienvenido en mi usuario. A continuación empezarán los ejercicios de JavaScript.`);
        } else {
          console.log('¡Ingreso por favor el nombre en usuario, gracias!');
        }
        rl.close();
        resolve(nombre);
      });
    });
  } else {
    console.log('Entorno no soportado. Este script requiere navegador o Node.js.');
    return null;
  }

  // Para navegador, devolvemos el nombre directamente (no hay async)
  return nombre;
}

// ==================== EJERCICIOS (LÓGICA) ====================

// ---- Ejercicio 2: comparador de números ----
function compararNumeros(a, b) {
  if (a > b) return `El primer número (${a}) es mayor que el segundo (${b}).`;
  if (a < b) return `El segundo número (${b}) es mayor que el primer número (${a}).`;
  if (a === b) return "Ambos números son iguales.";
  return "Por favor, asegúrate de haber ingresado números válidos.";
}

// ---- Ejercicio 3: arreglos y bucles ----
const numeros = [12, 5, 8, 130, 44, 7, 21, 14];

function recorrerConFor(arreglo) {
  const resultado = [];
  for (let i = 0; i < arreglo.length; i++) {
    resultado.push(`Posición ${i}: ${arreglo[i]}`);
  }
  return resultado;
}

function recorrerConWhile(arreglo) {
  const resultado = [];
  let index = 0;
  while (index < arreglo.length) {
    resultado.push(`Posición ${index}: ${arreglo[index]}`);
    index++;
  }
  return resultado;
}

function filtrarMayoresDeDiez(arregloOriginal) {
  const resultadoFiltrado = [];
  for (let i = 0; i < arregloOriginal.length; i++) {
    if (arregloOriginal[i] > 10) {
      resultadoFiltrado.push(arregloOriginal[i]);
    }
  }
  return resultadoFiltrado;
}

// ---- Ejercicio 4: funciones y modularización (calculadora) ----
function sumar(a, b) { return a + b; }
function restar(a, b) { return a - b; }
function multiplicar(a, b) { return a * b; }
function dividir(a, b) {
  if (b === 0) return "Error: No se puede dividir por cero";
  return a / b;
}

function calcular(a, b, operacion) {
  switch (operacion.toLowerCase()) {
    case "sumar": return sumar(a, b);
    case "restar": return restar(a, b);
    case "multiplicar": return multiplicar(a, b);
    case "dividir": return dividir(a, b);
    default: return "Operación no válida";
  }
}

// ---- Ejercicio 5: objetos y colecciones ----
const libroFavorito = {
  titulo: "El Quijote",
  autor: "Miguel de Cervantes",
  paginas: 863,
  leido: true,
};

const usuario = {
  nombre: "Alexander",
  saludar: function () {
    return `Hola, mi nombre es ${this.nombre}.`;
  },
};

const biblioteca = [
  { titulo: "La historia fue otra", autor: "Carmen Hertz", año: 2017 },
  { titulo: "How to Avoid a Climate Disaster", autor: "Bill Gates", año: 2021 },
  { titulo: "Into the Wild", autor: "Jon Krakauer", año: 1996 },
];

function listarBiblioteca(lista) {
  return lista.map((libro) => `"${libro.titulo}" — ${libro.autor} (${libro.año})`);
}

function titulosEnMayuscula(lista) {
  return lista.map((libro) => libro.titulo.toUpperCase());
}

// ==================== DEMOSTRACIÓN DE EJERCICIOS ====================
function demoEjercicios() {
  console.log('\n=== DEMOSTRACIÓN DE EJERCICIOS ===\n');

  // Ejercicio 2
  console.log('--- Ejercicio 2: Comparador ---');
  console.log(compararNumeros(10, 5));
  console.log(compararNumeros(3, 7));
  console.log(compararNumeros(4, 4));

  // Ejercicio 3
  console.log('\n--- Ejercicio 3: Arreglos y bucles ---');
  console.log('Arreglo original:', numeros);
  console.log('Recorrido con for:', recorrerConFor(numeros));
  console.log('Recorrido con while:', recorrerConWhile(numeros));
  console.log('Filtrados > 10:', filtrarMayoresDeDiez(numeros));

  // Ejercicio 4
  console.log('\n--- Ejercicio 4: Calculadora ---');
  console.log('Suma 8+4 =', calcular(8, 4, 'sumar'));
  console.log('Resta 8-4 =', calcular(8, 4, 'restar'));
  console.log('Multiplicación 8*4 =', calcular(8, 4, 'multiplicar'));
  console.log('División 8/4 =', calcular(8, 4, 'dividir'));
  console.log('División entre cero:', calcular(8, 0, 'dividir'));
  console.log('Operación inválida:', calcular(8, 4, 'potencia'));

  // Ejercicio 5
  console.log('\n--- Ejercicio 5: Objetos y colecciones ---');
  console.log(`Libro favorito: "${libroFavorito.titulo}" de ${libroFavorito.autor} (${libroFavorito.paginas} páginas, ${libroFavorito.leido ? 'leído' : 'pendiente'})`);
  console.log('Saludo del usuario:', usuario.saludar());
  console.log('Biblioteca:');
  listarBiblioteca(biblioteca).forEach(item => console.log('  -', item));
  console.log('Títulos en mayúscula:', titulosEnMayuscula(biblioteca).join(', '));
}

// ==================== EJECUCIÓN PRINCIPAL ====================
(async function main() {
  if (isBrowser) {
    // Navegador: pedir nombre (síncrono) y luego demo
    const nombre = pedirNombreYSaludar(); // prompt/alert
    demoEjercicios();
  } else if (isNode) {
    // Node.js: pedir nombre con async/await
    await pedirNombreYSaludar();
    demoEjercicios();
  } else {
    console.log('Entorno no soportado. Este script requiere navegador o Node.js.');
  }
})();