fetch("https://api.tvmaze.com/shows?&select=key1,key2,key3")
    .then(res => res.json())
    .then(data => {
        const cardscontainer = document.querySelector(".cards")
        data.forEach(element => {
            const premieredDate = element.premiered ? new Date(element.premiered).toDateString() : '';
            const endedDate = element.ended ? new Date(element.ended).toDateString() : '';
            cardscontainer.innerHTML += `
     <div class="card" style="width: 18rem;">
            <a><img src="${element.image.medium}" class="card-img-top" alt="Film intro image"></a>
            <div class="card-body">
                <h5 class="card-title">${element.name}</h5>
                <p class="premiered" >${premieredDate} </p>
                <p class="ended" >${endedDate} </p>
                
            </div>
        </div>
    `
        });
    });
