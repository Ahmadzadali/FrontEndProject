const cardscontainer = document.querySelector(".cards");
const loadMoreBtn = document.querySelector("#loadMoreBtn");
const searchInput = document.getElementById("searchInput")
let start = 0;
const end = 15;
let allData = [];

fetch("https://api.tvmaze.com/shows")
    .then(res => res.json())
    .then(data => {
        allData = data;
        start += end;

        allData.slice(start, start + end).forEach(element => {
            const premieredDate = element.premiered ? new Date(element.premiered).toDateString() : "";
            const endedDate = element.ended ? new Date(element.ended).toDateString() : "";


            cardscontainer.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <a href="detail.html?id=${element.id}">
                        <img src="${element.image.medium}" class="card-img-top" alt="${element.name}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="premiered">Premiered: ${premieredDate}</p>
                        <p class="ended">Ended: ${endedDate}</p>
                    </div>
                </div>
            `;
        });
    });

loadMoreBtn.addEventListener("click", () => {

    start += end;

    allData.slice(start, start + end).forEach(element => {
        const premieredDate = element.premiered ? new Date(element.premiered).toDateString() : "";
        const endedDate = element.ended ? new Date(element.ended).toDateString() : "";

        cardscontainer.innerHTML += `
            <div class="card" style="width: 18rem;">
                <a href="detail.html?id=${element.id}">
                    <img src="${element.image.medium}" class="card-img-top" alt="${element.name}">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                    <p class="premiered">Premiered: ${premieredDate}</p>
                    <p class="ended">Ended: ${endedDate}</p>
                </div>
            </div>
        `;
    });

    if (start >= allData.length) {
        loadMoreBtn.style.display = "none";
    }
});



searchInput.addEventListener("input", () => {
    let searchvalue = searchInput.value.toLowerCase();
    if (searchvalue.length === 0) {
        cardscontainer.innerHTML = ""
        allData.slice(start, start + end).forEach(element => {
            const premieredDate = element.premiered ? new Date(element.premiered).toDateString() : "";
            const endedDate = element.ended ? new Date(element.ended).toDateString() : "";

            cardscontainer.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <a href="detail.html?id=${element.id}">
                        <img src="${element.image.medium}" class="card-img-top" alt="${element.name}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="premiered">Premiered: ${premieredDate}</p>
                        <p class="ended">Ended: ${endedDate}</p>
                    </div>
                </div>
            `;
        });




    }




    if (searchvalue.length > 3) {
        let newdatalist = allData.filter(film =>
            film.name.toLowerCase().includes(searchvalue)
        );

        cardscontainer.innerHTML = "";

        newdatalist.forEach(element => {
            const premieredDate = element.premiered ? new Date(element.premiered).toDateString() : "";
            const endedDate = element.ended ? new Date(element.ended).toDateString() : "";

            cardscontainer.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <a href="detail.html?id=${element.id}">
                        <img src="${element.image.medium}" class="card-img-top" alt="${element.name}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                        <p class="premiered">Premiered: ${premieredDate}</p>
                        <p class="ended">Ended: ${endedDate}</p>
                    </div>
                </div>
            `;
        });

        if (newdatalist.length === 0) {
            cardscontainer.innerHTML += `
            <div class="not-found-box">
        <h2>No Results Found </h2>
        <p>Try another search keyword</p>
    </div>
            `
        }
        loadMoreBtn.style.display = "none";
    }

});
