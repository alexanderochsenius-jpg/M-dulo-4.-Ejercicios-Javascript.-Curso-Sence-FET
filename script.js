/* © 2026 Julio. Formulario de Ejercicios con JavaScript realizada por Alexander Wolfgang Ochsenius Geis con asistencia de IA DeepSeek, 
IA Gemini e IA Claude. Programa de Formación SENCE Curso Front End Trainee. Alumno del Profesor Francisco Totesaut */

/* =========================================================================
   script.js
   Versión visual de los ejercicios de "Fundamentos de JavaScript".
   -------------------------------------------------------------------------
   PARTE A — LÓGICA (pura, sin DOM) -> funciona en Node y navegador.
   PARTE B — INTERFAZ (DOM) -> solo se ejecuta en navegador.
   ========================================================================= */

// ==================== PARTE A — LÓGICA ====================

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

// ==================== PARTE B — INTERFAZ (DOM) ====================
// Solo se ejecuta si estamos en un navegador (existe document)
if (typeof document !== 'undefined') {
  document.addEventListener("DOMContentLoaded", () => {

    // ---------- Ejercicio 1: saludo ----------
    const inputNombre = document.getElementById("inputNombre");
    const btnSaludar = document.getElementById("btnSaludar");
    const outSaludo = document.getElementById("outSaludo");

    btnSaludar.addEventListener("click", () => {
      const nombre = inputNombre.value.trim();
      if (nombre === "") {
        outSaludo.textContent = "Escribí tu nombre antes de saludar.";
        outSaludo.classList.add("output--error");
        return;
      }
      outSaludo.classList.remove("output--error");
      outSaludo.textContent = `Hola ${nombre}, bienvenido al curso de JavaScript`;
    });

    // ---------- Ejercicio 2: comparador ----------
    const inputA = document.getElementById("inputA");
    const inputB = document.getElementById("inputB");
    const btnComparar = document.getElementById("btnComparar");
    const outComparar = document.getElementById("outComparar");

    btnComparar.addEventListener("click", () => {
      const a = Number(inputA.value);
      const b = Number(inputB.value);
      outComparar.textContent = compararNumeros(a, b);
    });

    // ---------- Ejercicio 3: arreglos y bucles ----------
    const listaNumeros = document.getElementById("listaNumeros");
    const btnFor = document.getElementById("btnFor");
    const btnWhile = document.getElementById("btnWhile");
    const btnFiltrar = document.getElementById("btnFiltrar");
    const outArreglos = document.getElementById("outArreglos");

    // Muestra el arreglo original apenas carga la página.
    listaNumeros.textContent = `[${numeros.join(", ")}]`;

    function mostrarLista(items) {
      outArreglos.innerHTML = ""; // Limpia antes de agregar
      const ul = document.createElement("ul");
      items.forEach((texto) => {
        const li = document.createElement("li");
        li.textContent = texto;
        ul.appendChild(li);
      });
      outArreglos.appendChild(ul);
    }

    btnFor.addEventListener("click", () => mostrarLista(recorrerConFor(numeros)));
    btnWhile.addEventListener("click", () => mostrarLista(recorrerConWhile(numeros)));
    btnFiltrar.addEventListener("click", () => {
      const filtrados = filtrarMayoresDeDiez(numeros);
      outArreglos.innerHTML = `<p>Elementos mayores a 10: <strong>[${filtrados.join(", ")}]</strong></p>`;
    });

    // ---------- Ejercicio 4: calculadora ----------
    const calcA = document.getElementById("calcA");
    const calcB = document.getElementById("calcB");
    const calcOperacion = document.getElementById("calcOperacion");
    const btnCalcular = document.getElementById("btnCalcular");
    const outCalculadora = document.getElementById("outCalculadora");

    btnCalcular.addEventListener("click", () => {
      const a = Number(calcA.value);
      const b = Number(calcB.value);
      const resultado = calcular(a, b, calcOperacion.value);

      const esError = typeof resultado === "string";
      outCalculadora.classList.toggle("output--error", esError);
      outCalculadora.textContent = `Resultado: ${resultado}`;
    });

    // ---------- Ejercicio 5: objetos y colecciones ----------
    const outLibro = document.getElementById("outLibro");
    const outUsuario = document.getElementById("outUsuario");
    const btnSaludarUsuario = document.getElementById("btnSaludarUsuario");
    const outBiblioteca = document.getElementById("outBiblioteca");
    const btnMayuscula = document.getElementById("btnMayuscula");

    outLibro.textContent =
      `"${libroFavorito.titulo}" de ${libroFavorito.autor} — ${libroFavorito.paginas} páginas` +
      (libroFavorito.leido ? " (leído)" : " (pendiente)");

    btnSaludarUsuario.addEventListener("click", () => {
      outUsuario.textContent = usuario.saludar();
    });

    function mostrarBiblioteca(items) {
      outBiblioteca.innerHTML = "";
      const ul = document.createElement("ul");
      items.forEach((texto) => {
        const li = document.createElement("li");
        li.textContent = texto;
        ul.appendChild(li);
      });
      outBiblioteca.appendChild(ul);
    }

    // Muestra la biblioteca apenas carga la página.
    mostrarBiblioteca(listarBiblioteca(biblioteca));

    btnMayuscula.addEventListener("click", () => {
      const titulos = titulosEnMayuscula(biblioteca);
      outBiblioteca.innerHTML = `<p>${titulos.join(" · ")}</p>`;
    });
  });
}