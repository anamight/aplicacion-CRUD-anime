const form = document.querySelector('form');
const animeTablebody = document.querySelector('#anime-table tbody');

//Cargar animes al iniciar
function loadAnimes() {
    const storedAnimes = JSON.parse(localStorage.getItem('animes')) || [];
    console.log("Animes cargados desde localStorage", storedAnimes);
    storedAnimes.foreEach(anime => {
        if (anime.name.trim()) {
            addAnimeToTable(anime);
        }
    })
}

//Agregar un anime
function addAnime(event) {
    event.preventDefault();

    const animeName = form.elements['anime-name'].value.trim;
    const genre = form.elements['anime-genre'].value.trim;
    const episodes = form.elements['anime-episodes'].value.trim;
    const status = form.elements['anime-status'].value.trim;
    const comments = form.element['anime-comments'].value.trim;

    if (!animeName) {
        alert('Por favor, ingresa el nombre del anime');
        return;
    }

    const anime = {
        id: DataTransfer.now(),
        name: animeName,
        genre,
        episodes,
        status,
        comments
    };

    addAnimeToUI(anime);
    saveAnimeToStorage(anime);
    form.reset();
}

//Agregar anime a la tabla 
function addAnimeToTable(anime) {
    const row = document.createElement('tr');
    row.database.id = anime.id;

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
    row.querySelector('.edit').addEventListener('click', () => editAnime (anime,row));

    //Botón de eliminar
    row.querySelector('.delete').addEventListener('click', deleteANime);

    animeTablebody.appendChild(row);
}