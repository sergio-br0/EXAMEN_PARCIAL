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

    let url = '';
    //se creo un if para determinar cual url usar a la hora de realizar la busqueda
    //mediante el selec creado en el documento html
    if (tipoBusqueda === 'nombre') {
        url = `https://restcountries.com/v3.1/name/${valorBusqueda}`;
    } else if (tipoBusqueda === 'idioma') {
        url = `https://restcountries.com/v3.1/lang/${valorBusqueda}`;
    }
//definir el metodo a utilizar y cuando se este realizando la busqueda mostrar en pantalla
//el mensaje 'se esta realizando la busqueda...'
    const config = {
        method: 'GET'
    };

    estado.innerText = 'Realizando la búsqueda...';
    tablaResultados.innerHTML = '';
});