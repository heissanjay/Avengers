const baseUrl = "https://gateway.marvel.com:443/v1/public";
const publicApiKey = "2dba7204495cdd9616afc5f8aeecfb28";
const privateApiKey = "ada0e14596007e87668be70a76493fe02f8be6d8";

const hash = generateHash(publicApiKey, privateApiKey);
console.log(hash);

//Script for Characters fetch & list
getAllCharacters();

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
});

function getAllCharacters() {
    axios.get(`${baseUrl}/comics/32477/characters?ts=1&apikey=${publicApiKey}&hash=${hash}&limit=100`)
        .then(response => {
            // Handle the response data
            console.log(response.data);
            var res = response.data.data.results;
            console.log(response.data.data.results);
            var index = 0;
            res.forEach(element => {
                var name = res[index].name;
                var description = (res[index].description).substring(0, 100);
                if (description === "") {
                    description = `${name} is a member of the Avengers and a prominent superhero in the Marvel universe. They are known for their exceptional skills, powers, and heroic qualities. ${name} plays a crucial role in fighting against villains and defending the innocent. With a strong sense of justice and unwavering determination, ${name} stands as a symbol of hope and bravery.`.substring(0, 100);
                }
                document.getElementById("characters-container").innerHTML += `<div class="card d-flex flex-column align-items-center" style="width: 18rem;">
                <img class="card-img-top" src="${res[index].thumbnail.path}.${res[index].thumbnail.extension}" alt="Card image cap">
                <div class="card-body">
                  <h5 class="card-title">${name}</h5>
                  <p class="card-text">${description}...(See More)</p>
                  <a href="#" class="btn d-flex justify-content-center" onclick="getAvengerDetails(${res[index].id},event)">Details</a>
                </div>
            </div>`;
                index++;
            });

        })
        .catch(error => {
            // Handle any errors
            console.error(error);
        });
}

if (window.location.href.includes("avengerDetails.html")) {
    document.addEventListener("DOMContentLoaded", function () {
        console.log("retrived from local storage");
        var characterId = localStorage.getItem("characterId");
        console.log(localStorage.getItem("characterId"));
        axios.get(`${baseUrl}/characters/${characterId}?ts=1&apikey=${publicApiKey}&hash=${hash}&limit=100`)
            .then(response => {
                var res = response.data.data.results[0];
                console.log(response.data.data.results[0]);
                document.getElementById("characterName").innerText = res.name;
                document.getElementById("comicCount").innerText = res.comics.available;
                document.getElementById("seriesCount").innerText = res.series.available;
                document.getElementById("storyCount").innerText = res.stories.available;
                document.getElementById("characterImg").src = res.thumbnail.path + "." + res.thumbnail.extension;
                var description = res.description;
                var name = res.name;
                if (description === "") {
                    description = `${name} is a member of the Avengers and a prominent superhero in the Marvel universe. They are known for their exceptional skills, powers, and heroic qualities. ${name} plays a crucial role in fighting against villains and defending the innocent. With a strong sense of justice and unwavering determination, ${name} stands as a symbol of hope and bravery.`;
                }
                document.getElementById("characterDesc").innerText = description;

            })

            .catch(error => {
                // Handle any errors
                console.error(error);
            });
    });
}

function getAvengerDetails(characterId, event) {
    localStorage.setItem("characterId", characterId)
    console.log("entered ");
    console.log("characterId" + characterId);
    window.location.href = "avengerDetails.html";
}

function generateHash(publicKey, privateKey) {
    // timestamp = 1
    const input = "1" + privateKey + publicKey;
    const hash = CryptoJS.MD5(input).toString();
    return hash;
}
//display infinity stone data
// console.log(infinityJSONData.stones[0].name); 
function displayStoneData(){
    infinityJSONData.stones.forEach(element => {
        document.getElementById("carousel-inner").innerHTML+=
    `<div class="carousel-item">
          <div class="container">
            <div class="card">
              <div class="row g-0">
                <div class="col-md-5 d-flex justify-content-center align-content-center flex-wrap">
                  <img src="${element.image}" class="card-img-top" alt="Image 1" style="margin: 30px;">
                </div>
                <div class="col-md-7 ">
                  <div class="card-body">
                    <h4 class="card-title" style="margin:20px 0px">${element.name}</h4>
                    <p class="card-text">${element.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
    });
}
