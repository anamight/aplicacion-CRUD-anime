const form = document.getElementById('anime-form');
const animeTablebody = document.querySelector('#anime-table tbody');

//Cargar animes al iniciar
function loadAnimes() {
    const storedAnimes = JSON.parse(localStorage.getItem('animes')) || [];
    console.log("Animes cargados desde localStorage", storedAnimes);
    storedAnimes.forEach(anime => {
        if (anime.name.trim()) {
            addAnimeToTable(anime);
        }
    })
}

//Agregar un anime
function addAnime(event) {
    event.preventDefault();

// Obtener los valores del formulario
    const animeName = form.querySelector('#anime-name').value.trim();
    const genre = form.querySelector('#anime-genre').value.trim();
    const episodes = form.querySelector('#anime-episodes').value.trim();
    const status = form.querySelector('#anime-status').value.trim();
    const comments = form.querySelector('#anime-comments').value.trim();

    if (!animeName) {
        alert('Por favor, ingresa el nombre del anime');
        return;
    }

    const anime = {
        id: Date.now(),
        name: animeName,
        genre,
        episodes,
        status,
        comments
    };

    addAnimeToTable(anime);
    saveAnimeToStorage(anime);
    form.reset();
}

//Agregar anime a la tabla 
function addAnimeToTable(anime) {
    const row = document.createElement('tr');
    row.dataset.id = anime.id;

    row.innerHTML = `
        <td>${anime.name}</td>
        <td>${anime.genre}</td>
        <td>${anime.episodes}</td>
        <td>${anime.status}</td>
        <td>${anime.comments}</td>
        <td>
            <button class="edit">Editar</button>
            <button class="delete">Eliminar</button>
        </td>
    `;

    //Botón de editar
    row.querySelector('.edit').addEventListener('click', () => editAnime(anime, row));

    //Botón de eliminar
    row.querySelector('.delete').addEventListener('click', deleteAnime);

    animeTablebody.appendChild(row);
}