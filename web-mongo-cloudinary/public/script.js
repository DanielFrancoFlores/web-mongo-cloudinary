async function cargarImagenes() {
    const contenedor = document.getElementById("galeria");

    try {
        const res = await fetch("/api/images");
        const imagenes = await res.json();

        imagenes.forEach(img => {
            const elemento = document.createElement("div");
            elemento.innerHTML = `
                <h3>${img.nombre}</h3>
                <img src="${img.url}" width="300">
            `;
            contenedor.appendChild(elemento);
        });

    } catch (err) {
        contenedor.innerHTML = "<p>Error cargando imágenes</p>";
    }
}

cargarImagenes();
