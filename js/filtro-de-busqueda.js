  document.addEventListener("DOMContentLoaded", () => { // esperar a que el DOM esté cargado

            const input = document.querySelector(".search-input"); // campo de entrada
            const boton = document.querySelector(".search-btn"); //busca el boton con la clase search-btn

            const box = document.getElementById("resultadosBusqueda"); // caja de resultados
            const lista = document.getElementById("listaResultados"); // lista de resultados

            // buscador
            boton.addEventListener("click", () => { //cuando se hace click en el boton de buscar

                let q = input.value.toLowerCase().trim(); // obtener el valor del campo de entrada y convertirlo a minúsculas

                if (q.length == 0) { //si el campo de búsqueda está vacío
                    box.style.display = "none"; //oculta la caja de resultados
                    return; // salir de la función
                }

                // direcciones de páginas a buscar
                const paginas = [
                    { nombre: "albañileria", url: "./subcategorias/albañileria.html" },
                    { nombre: "plomeria", url: "./subcategorias/plomeros-fontaneros.html" },
                    { nombre: "electricista", url: "./subcategorias/electricistas.html" },
                    { nombre: "clases", url: "./subcategorias/nivel-primario.html" },
                    { nombre: "piscinas", url: "./subcategorias/limpieza-piscinas.html" },
                    { nombre: "perros", url: "./categorias/mascotas.html" },
                    { nombre: "animador", url: "./subcategorias/animacion-entretenimiento.html" },
                    { nombre: "gasista", url: "./subcategorias/gasistas.html" },
                    { nombre: "heladeras", url: "./subcategorias/heladeras.html" },
                    { nombre: "albañil", url: "./subcategorias/albañileria.html" },
                    { nombre: "plomero", url: "./subcategorias/plomeros-fontaneros.html" },
                    { nombre: "profesor (nivel secundario)", url: "./subcategorias/nivel-secundario" },
                    { nombre: "profesor (nivel primario)", url: "./subcategorias/nivel-primario" },
                    { nombre: "peluquero", url: "./subcategorias/peluqueria.html" },
                    { nombre: "lavarropas", url: "./subcategorias/lavarropas.html" },
                    { nombre: "paseador", url: "./subcategorias/paseo-ejercicio.html" },
                    { nombre: "adiestrador", url: "./subcategorias/adiestramiento.html" },
                    { nombre: "catering", url: "./subcategorias/alimentacion-bebidas.html" },
                     { nombre: "peluquero", url: "./subcategorias/peluqueria.html" },
                      { nombre: "barbero", url: "./subcategorias/barberia.html" },
                       { nombre: "piletas", url: "./subcategorias/limpieza-pisicinas.html" },




                ];

                // buscar coincidencias
                let encontrados = paginas.filter(p => p.nombre.includes(q)); //filtra las páginas que contienen la consulta de búsqueda

                lista.innerHTML = ""; //limpia la lista de resultados

                if (encontrados.length == 0) {
                    lista.innerHTML = "<p>No se encontraron resultados.</p>"; //si no hay resultados, muestra este mensaje
                } else {
                    encontrados.forEach(p => {
                        lista.innerHTML += `<p><a href="${p.url}">${p.nombre}</a></p>`; //agrega cada resultado a la lista como un enlace
                    })
                }

                box.style.display = "block"; //muestra la caja de resultados
            });

        });