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
        console.log('Error: Debe ingresar un valor de búsqueda');
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

    //creacion del try y el catch para manejar de manera controlada los posibles errores que se tengan
    try {
        const respuesta = await fetch(url, config);
        if (respuesta.ok) {
            const data = await respuesta.json();
            const paises = data;

            if (paises.length === 0) {
                estado.innerText = 'No se encontraron países';
                alert('No se encontraron países con los criterios de búsqueda proporcionados.');

            } else {
                estado.innerText = `Mostrando ${paises.length} país(es)`;

                // Mostrar los datos de cada país en la consola y en la tabla de resultados
                paises.forEach((pais) => {
                    console.log('Nombre del país:', pais.name.common);
                    console.log('Población:', pais.population);
                    console.log('Capital:', pais.capital?.[0]);
                    console.log('Idiomas:', pais.languages ? Object.values(pais.languages).join(', ') : 'N/A');
                    console.log('Bandera:', pais.flags.png);

                    // Crear elementos HTML para mostrar los datos del país
                    const row = document.createElement('tr');
                    const nombre = document.createElement('td');
                    nombre.textContent = pais.name.common;
                    const poblacion = document.createElement('td');
                    poblacion.textContent = pais.population;
                    const capital = document.createElement('td');
                    capital.textContent = pais.capital?.[0];
                    const idiomas = document.createElement('td');
                    idiomas.textContent = pais.languages ? Object.values(pais.languages).join(', ') : 'N/A';
                    const bandera = document.createElement('td');
                    const imagen = document.createElement('img');
                    imagen.src = pais.flags.png;
                    imagen.alt = pais.name.common;
                    imagen.style.width = '50px';
                    bandera.appendChild(imagen);

                    // Agregar los elementos al DOM para mostrar los datos del país en la tabla de resultados
                    row.appendChild(nombre);
                    row.appendChild(poblacion);
                    row.appendChild(capital);
                    row.appendChild(idiomas);
                    row.appendChild(bandera);

                    tablaResultados.appendChild(row);
                });
            }
            //si no se cumple con lo antes requerido se mostraran mensajes de alertas..
        } else {
            estado.innerText = 'Error en la consulta';
            alert('Ocurrió un error en la consulta. Por favor, inténtalo nuevamente.');
        }
    } catch (error) {
        estado.innerText = 'Error en la consulta';
        console.log('Error: Ocurrió un error en la consulta. Por favor, inténtalo nuevamente.');
        alert('Ocurrió un error en la consulta. Por favor, inténtalo nuevamente.');
    }
});


// creacion de la función para consultar todos los países
const consultarTodosLosPaises = async () => {
    estado.innerText = 'Cargando todos los países...';
    tablaResultados.innerHTML = '';

    try {
        const respuesta = await fetch('https://restcountries.com/v3.1/all');
        if (respuesta.ok) {
            const data = await respuesta.json();
            const paises = Object.values(data);

            if (paises.length === 0) {
                estado.innerText = 'No se encontraron países';
                alert('No se encontraron países.');
            } else {
                estado.innerText = `Mostrando ${paises.length} país(es)`;

                // Mostrar los datos de cada país en la consola y en la tabla de resultados
                paises.forEach((pais) => {
                    console.log('Nombre del país:', pais.name.common);
                    console.log('Población:', pais.population);
                    console.log('Capital:', pais.capital?.[0]);
                    console.log('Idiomas:', pais.languages ? Object.values(pais.languages).join(', ') : 'N/A');
                    console.log('Bandera:', pais.flags.png);
                    console.log('-----------------------');

                    // Crear elementos HTML para mostrar los datos de los países
                    const row = document.createElement('tr');
                    const nombre = document.createElement('td');
                    nombre.textContent = pais.name.common;
                    const poblacion = document.createElement('td');
                    poblacion.textContent = pais.population;
                    const capital = document.createElement('td');
                    capital.textContent = pais.capital?.[0];
                    const idiomas = document.createElement('td');
                    idiomas.textContent = pais.languages ? Object.values(pais.languages).join(', ') : 'N/A';
                    const bandera = document.createElement('td');
                    const imagen = document.createElement('img');
                    imagen.src = pais.flags.png;
                    imagen.alt = pais.name.common;
                    imagen.style.width = '50px';
                    bandera.appendChild(imagen);

                    // Agregar los elementos al DOM para mostrar los datos del país en la tabla de resultados
                    row.appendChild(nombre);
                    row.appendChild(poblacion);
                    row.appendChild(capital);
                    row.appendChild(idiomas);
                    row.appendChild(bandera);

                    tablaResultados.appendChild(row);
                });
            }

            // si no se cumple con la busqueda de informacion se musetra un alerta.
        } else {
            estado.innerText = 'Error en la consulta';
            alert('Ocurrió un error en la consulta. Por favor, inténtalo nuevamente.');
        }
    } catch (error) {
        estado.innerText = 'Error en la consulta';
        console.log(error);
        alert('Ocurrió un error en la consulta. Por favor, inténtalo nuevamente.');
    }
};

// agregar evento al boton  para consultar todos los países
const botonConsultarTodos = document.getElementById('botonConsultarTodos');
botonConsultarTodos.addEventListener('click', consultarTodosLosPaises);


