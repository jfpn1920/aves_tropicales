//-----------------------------------//
//--|funcionalidad_aves_tropicales|--//
//-----------------------------------//
const aves = document.querySelectorAll(".ave");
const botonRestablecer = document.getElementById("boton_restablecer");
const mensajeGeneral = document.getElementById("mensaje_general");
const datosIniciales = {
    1: {
        nombre: "Tucán",
        region: "América Central y América del Sur",
        descripcion:
            "Ave tropical reconocida por su gran pico y sus colores llamativos."
    },
    2: {
        nombre: "Guacamaya",
        region: "Selvas de América",
        descripcion:
            "Ave de colores intensos que habita principalmente en zonas tropicales."
    },
    3: {
        nombre: "Colibrí",
        region: "América",
        descripcion:
            "Pequeña ave capaz de mantenerse suspendida en el aire mientras busca néctar."
    },
    4: {
        nombre: "Flamenco",
        region: "Regiones tropicales y subtropicales",
        descripcion:
            "Ave conocida por su plumaje rosado y sus largas patas."
    }
};
//-----------------------------------------------------//
//--|obtener_los_datos_guardados_usando_localstorage|--//
//-----------------------------------------------------//
function obtenerDatos(id) {
    const datosGuardados = localStorage.getItem(`ave_tropical_${id}`);
    if (datosGuardados) {
        return JSON.parse(datosGuardados);
    }
    return datosIniciales[id];
}
//-------------------------------------//
//--|mostrar_los_datos_en_la_tarjeta|--//
//-------------------------------------//
function mostrarDatos(ave) {
    const id = ave.dataset.id;
    const datos = obtenerDatos(id);
    ave.querySelector(".campo_nombre").value = datos.nombre;
    ave.querySelector(".campo_region").value = datos.region;
    ave.querySelector(".campo_descripcion").value = datos.descripcion;
    ave.querySelector(".nombre_ave").textContent = datos.nombre;
}
//-----------------------------------------------------------//
//--|guardar_y_restaurar_datos_de_una_ave_con_localstorage|--//
//-----------------------------------------------------------//
function guardarDatos(ave) {
    const id = ave.dataset.id;
    const nombre = ave.querySelector(".campo_nombre").value;
    const region = ave.querySelector(".campo_region").value;
    const descripcion = ave.querySelector(".campo_descripcion").value;
    const datos = {
        nombre: nombre,
        region: region,
        descripcion: descripcion
    };
    localStorage.setItem(`ave_tropical_${id}`, JSON.stringify(datos));
    ave.querySelector(".nombre_ave").textContent = nombre;
    mostrarMensaje(ave, "Información guardada correctamente.");
}
function restaurarDatos(ave) {
    const id = ave.dataset.id;
    localStorage.removeItem(`ave_tropical_${id}`);
    mostrarDatos(ave);
    mostrarMensaje(ave, "Información restaurada.");
}
//------------------------------------//
//--|mostrar_los_mensaje_individual|--//
//------------------------------------//
function mostrarMensaje(ave, texto) {
    const mensaje = ave.querySelector(".mensaje_ave");
    mensaje.textContent = texto;
    setTimeout(() => {
        mensaje.textContent = "";
    }, 2000);
}
//--------------------------------//
//--|restablecer_todas_las_aves|--//
//--------------------------------//
function restablecerTodas() {
    const confirmacion = confirm("¿Deseas restablecer todas las aves?");
    if (!confirmacion) {
        return;
    }
    aves.forEach((ave) => {
        const id = ave.dataset.id;
        localStorage.removeItem(`ave_tropical_${id}`);
        mostrarDatos(ave);
    });
    mensajeGeneral.textContent = "Todas las aves fueron restablecidas.";
    setTimeout(() => {
        mensajeGeneral.textContent = "";
    }, 2000);
}
//-------------------------//
//--|eventos_de_las_aves|--//
//-------------------------//
aves.forEach((ave) => {
    const botonGuardar = ave.querySelector(".boton_guardar");
    const botonRestaurar = ave.querySelector(".boton_restaurar");
    botonGuardar.addEventListener("click", () => {
        guardarDatos(ave);
    });
    botonRestaurar.addEventListener("click", () => {
        restaurarDatos(ave);
    });
});
botonRestablecer.addEventListener("click", restablecerTodas);
//---------------------------------//
//--|cargar_los_datos_al_iniciar|--//
//---------------------------------//
function cargarDatos() {
    aves.forEach((ave) => {
        mostrarDatos(ave);
    });
}
cargarDatos();