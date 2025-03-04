document.addEventListener("DOMContentLoaded", () => {
    const animeForm = document.getElementById("anime-form");
    const animeList = document.getElementById("anime-list");
    const submitButton = animeForm.querySelector("button[type='submit']");
    let animes = JSON.parse(localStorage.getItem("animes")) || [];
    let editIndex = null;

    // Función para renderizar la lista de animes
    function renderList() {
        animeList.innerHTML = "";
        animes.forEach((anime, index) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${anime.name}</td>
                <td>${anime.genre}</td>
                <td>${anime.episodes}</td>
                <td>${anime.status}</td>
                <td>${anime.comments}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editAnime(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteAnime(${index})">Eliminar</button>
                </td>
            `;
            animeList.appendChild(row);
        });
        localStorage.setItem("animes", JSON.stringify(animes));
    }

    // Agregar o actualizar un anime
    animeForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("anime-name").value;
        const genre = document.getElementById("anime-genre").value;
        const episodes = document.getElementById("anime-episodes").value;
        const status = document.getElementById("anime-status").value;
        const comments = document.getElementById("anime-comments").value;

        const newAnime = { name, genre, episodes, status, comments };
        
        if (editIndex !== null) {
            animes[editIndex] = newAnime;
            editIndex = null;
            submitButton.textContent = "Agregar Anime";
            document.getElementById("cancel-edit").remove();
        } else {
            animes.push(newAnime);
        }

        renderList();
        animeForm.reset();
    });

    // Editar un anime
    window.editAnime = (index) => {
        const anime = animes[index];
        document.getElementById("anime-name").value = anime.name;
        document.getElementById("anime-genre").value = anime.genre;
        document.getElementById("anime-episodes").value = anime.episodes;
        document.getElementById("anime-status").value = anime.status;
        document.getElementById("anime-comments").value = anime.comments;
        
        editIndex = index;
        submitButton.textContent = "Actualizar Anime";

        if (!document.getElementById("cancel-edit")) {
            const cancelButton = document.createElement("button");
            cancelButton.textContent = "Cancelar";
            cancelButton.id = "cancel-edit";
            cancelButton.className = "btn btn-secondary mt-2";
            cancelButton.addEventListener("click", () => {
                animeForm.reset();
                editIndex = null;
                submitButton.textContent = "Agregar Anime";
                cancelButton.remove();
            });
            animeForm.appendChild(cancelButton);
        }
    };

    // Eliminar un anime
    window.deleteAnime = (index) => {
        if (confirm("¿Estás seguro de que quieres eliminar este anime?")) {
            animes.splice(index, 1);
            renderList();
        }
    };

    // Renderizar lista al cargar
    renderList();
});
