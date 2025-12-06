const params = new URLSearchParams(window.location.search);
const id = params.get("id");  

axios.get(`https://api.tvmaze.com/shows/${id}`).then(response => {
    const detailss = document.querySelector(".details");

    detailss.innerHTML += `
    <div class="card">
            <img src="${response.data.image.medium}" alt="Image movie ">
            <div class="card-body">
                <h1>${response.data.name}</h1>
                <p>${response.data.summary}</p>
            </div>
            <div class="card-footer">
                <p><strong>Premiered:</strong> ${response.data.premiered}</p>
                <p><strong>Runtime:</strong> ${response.data.runtime} min</p>
                <p><strong>Genres:</strong> ${response.data.genres}</p>
            </div>
        </div>
    `
})