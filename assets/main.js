const cardscontainer = document.querySelector(".cards");
const loadMoreBtn = document.querySelector("#loadMoreBtn");
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
        const premieredDate = element.premiered ? new Date(element.premiered).toDateString() : "N/A";
        const endedDate = element.ended ? new Date(element.ended).toDateString() : "Ongoing";

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




