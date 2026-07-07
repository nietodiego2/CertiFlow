const productos = [
    {
        id: 1,
        nombre: "Firma Electrónica",
        precio: 49
    },
    {
        id: 2,
        nombre: "Validación de Identidad",
        precio: 35
    },
    {
        id: 3,
        nombre: "Almacenamiento Seguro",
        precio: 25
    }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const guardarCarrito = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
};

const actualizarCarrito = () => {
    const listaCarrito = document.getElementById("lista-carrito");
    const totalCarrito = document.getElementById("total-carrito");

    if (!listaCarrito || !totalCarrito) {
        return;
    }

    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = "<li>No hay servicios agregados.</li>";
        totalCarrito.textContent = "S/ 0";
        return;
    }

    let total = 0;

    carrito.forEach((item, index) => {
        total += item.precio;

        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nombre} - S/ ${item.precio}
            <button class="btn-eliminar" data-index="${index}">Quitar</button>
        `;

        listaCarrito.appendChild(li);
    });

    totalCarrito.textContent = `S/ ${total}`;

    document.querySelectorAll(".btn-eliminar").forEach((boton) => {
        boton.addEventListener("click", () => {
            const index = Number(boton.dataset.index);
            carrito.splice(index, 1);
            guardarCarrito();
            actualizarCarrito();
        });
    });
};

const agregarServicio = (id) => {
    const producto = productos.find((item) => item.id === id);

    if (producto) {
        carrito.push(producto);
        guardarCarrito();
        actualizarCarrito();
    }
};

document.querySelectorAll(".btn-agregar").forEach((boton) => {
    boton.addEventListener("click", () => {
        const id = Number(boton.dataset.id);
        agregarServicio(id);
    });
});

const buscador = document.getElementById("buscador");

if (buscador) {
    buscador.addEventListener("input", () => {
        const texto = buscador.value.toLowerCase();
        const tarjetas = document.querySelectorAll(".card-servicio");

        tarjetas.forEach((tarjeta) => {
            const nombre = tarjeta.dataset.nombre.toLowerCase();

            if (nombre.includes(texto)) {
                tarjeta.style.display = "block";
            } else {
                tarjeta.style.display = "none";
            }
        });
    });
}

const formulario = document.getElementById("formulario-soporte");

if (formulario) {
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();
        const respuesta = document.getElementById("respuesta-formulario");

        if (nombre === "" || correo === "" || telefono === "" || mensaje === "") {
            respuesta.textContent = "Completa todos los campos antes de enviar.";
            respuesta.className = "mensaje error";
            return;
        }

        respuesta.textContent = "Consulta enviada correctamente. Te contactaremos pronto.";
        respuesta.className = "mensaje correcto";
        formulario.reset();
    });
}

const botonTema = document.getElementById("cambiar-tema");

if (botonTema) {
    botonTema.addEventListener("click", () => {
        document.body.classList.toggle("modo-oscuro");
    });
}

actualizarCarrito();