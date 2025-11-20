async function cargarImagenes() {
  const contenedor = document.getElementById('galeria');

  try {
    const res = await fetch('galeria.json');
    if (!res.ok) throw new Error('No se pudo cargar galeria.json');
    const data = await res.json();

    contenedor.innerHTML = ''; // limpiar texto "Cargando..."
    if (!Array.isArray(data.imagenes) || data.imagenes.length === 0) {
      contenedor.innerHTML = '<p>No hay imágenes en la galería.</p>';
      return;
    }

    data.imagenes.forEach(url => {
      const card = document.createElement('div');
      card.className = 'card';
      const nombre = url.split('/').pop(); // nombre simple desde la URL

      card.innerHTML = `
        <img src="${url}" alt="${nombre}" loading="lazy">
        <h4>${nombre}</h4>
      `;
      contenedor.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    document.getElementById('galeria').innerHTML = '<p>Error cargando imágenes.</p>';
  }
}

cargarImagenes();
