const comparaciones = [
  "como una semilla de amapola",
  "como un arándano",
  "como una uva",
  "como una ciruela",
  "como un limón",
  "como una manzana",
  "como una banana",
  "como un melón",
  "como una sandía"
];

function calcularEmbarazo() {
  const fecha = new Date(document.getElementById("fecha").value);
  const hoy = new Date();
  const dias = Math.floor((hoy - fecha) / (1000 * 60 * 60 * 24));
  const semanas = Math.floor(dias / 7);

  const fechaParto = new Date(fecha);
  fechaParto.setDate(fechaParto.getDate() + 280);

  const fechaConcepcion = new Date(fecha);
  fechaConcepcion.setDate(fechaConcepcion.getDate() + 14);

  document.getElementById("semana").textContent = semanas + " semanas";
  document.getElementById("trimestre").textContent = semanas < 13 ? "1º" : semanas < 28 ? "2º" : "3º";
  document.getElementById("parto").textContent = fechaParto.toLocaleDateString();
  document.getElementById("concepcion").textContent = fechaConcepcion.toLocaleDateString();
  document.getElementById("tamanio").textContent = comparaciones[Math.min(semanas, comparaciones.length - 1)];

  document.getElementById("resultado").classList.remove("oculto");
  localStorage.setItem("ultimaFecha", document.getElementById("fecha").value);
}

function compartir() {
  const url = window.location.href;
  const texto = "Calcula tu embarazo con esta herramienta gratuita";
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(texto)}`, '_blank');
}

function descargarPDF() {
  const contenido = document.getElementById("resultado").innerText;
  const blob = new Blob([contenido], { type: "text/plain" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = "resultado-embarazo.txt";
  enlace.click();
}

// Modo oscuro
const btnModo = document.getElementById("modoBtn");
btnModo.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Autocargar fecha si existe
window.onload = () => {
  const guardada = localStorage.getItem("ultimaFecha");
  if (guardada) document.getElementById("fecha").value = guardada;
};