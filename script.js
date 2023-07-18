// Obtención de referencias a los elementos del formulario y la tabla de resultados
const formulario = document.getElementById('formulario');
const tablaResultados = document.getElementById('tablaResultados');
const estado = document.getElementById('resultado');

// agregar evento submit para la búsqueda de países
formulario.addEventListener('submit', async (evento) => {
// Evitar el envío del formulario por defecto y evita que se recargue cuando se haga una busqueda.
    evento.preventDefault(); 
    const tipoBusqueda = formulario.tipoBusqueda.value;
    const valorBusqueda = formulario.valorBusqueda.value;
  
    if (valorBusqueda === '') {
      alert("Debe ingresar un valor de búsqueda");
      return;
    }
});