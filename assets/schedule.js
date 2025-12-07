const cardscontainer = document.querySelector(".schedule");
const loadMoreBtnn = document.querySelector("#loadMoreBtnn");
const searchInput = document.getElementById("searchInput")
let start = 0;
const end = 15;
let allData = [];

fetch("https://api.tvmaze.com/shows")
    .then(res => res.json())
    .then(data => {
        allData = data;

        allData.slice(start, start + end).forEach(element => {


            cardscontainer.innerHTML += `
                <div class="card" style="width: 18rem;">
                    <a href="detail.html?id=${element.id}">
                        <img src="${element.image.medium}" class="card-img-top" alt="${element.name}">
                    </a>
                    <div class="card-body">
                        <h5 class="card-title">${element.name}</h5>
                       <p><strong>Days:</strong> ${element.schedule.days}</p>
                    <p><strong>Time:</strong> ${element.schedule.time}</p>

                    </div>
                </div>
            `;
        });
    });

loadMoreBtnn.addEventListener("click", () => {

    start += end;

    allData.slice(start, start + end).forEach(element => {
        cardscontainer.innerHTML += `
            <div class="card" style="width: 18rem;">
                <a href="detail.html?id=${element.id}">
                    <img src="${element.image.medium}" class="card-img-top" alt="${element.name}">
                </a>
                <div class="card-body">
                    <h5 class="card-title">${element.name}</h5>
                     <p><strong>Days:</strong> ${element.schedule.days}</p>
                    <p><strong>Time:</strong> ${element.schedule.time}</p>
                </div>
            </div>
        `;
    });

    if (start >= allData.length) {
        loadMoreBtnn.style.display = "none";
    }
});




