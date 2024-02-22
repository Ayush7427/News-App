

const inputField = document.querySelector(".input")
const btn = document.querySelector(".search-btn")
const newsImg = document.querySelector("#news-img")
const title = document.querySelector("#Title")
const newsSource = document.querySelector("#news-source")
const newsDescription = document.querySelector(".description")
const cardsContainer = document.querySelector("#cards-container")

let li = document.querySelectorAll(".hover-link")
li.forEach(function(elements){
    elements.addEventListener("click" , function(event){
        const target =  event.target.id
        apiCall(target)
    })
})


btn.addEventListener("click" , function(event){
    const input = inputField.value
    // console.log(input);
    validation(input)
},false)

function validation(item){
   if (!item) {
    return alert("Input must required...")
   } else {
    inputField.value = ""
    apiCall(item)
   }
}

async function apiCall(value){

    try {
        // console.log(value);
        cardsContainer.innerHTML = `<h2 class="fetchingData">Fetching data...</h2>`
        const apiKey = "975f9e7a74cf42729624397a83b1d793"
        const url = "https://newsapi.org/v2/everything?q="
        const data = await fetch(`${url}${value}&apiKey=${apiKey}`)
        const dataToJson = await data.json()
        dataFxn(dataToJson)        
    } catch (error) {
        console.log(error);
        cardsContainer.innerHTML = `
       <h2 class="errorh2">Something went wrong. Try again in a few minutes</h2>
        `
    }
}

function dataFxn(value) {
    
    cardsContainer.innerHTML = " "
    value.articles.forEach(function(elements , index , array){
        // console.log(elements);
        if (elements.urlToImage !== null){
            
        // Main div
        const div = document.createElement("div")

        // Sub div
        const headerDiv = document.createElement("div")
        const contentDiv = document.createElement("div")
        const seeMoreDiv = document.createElement("div")

        div.classList.add("card")
        headerDiv.classList.add("card-header")
        contentDiv.classList.add("card-content")
        seeMoreDiv.classList.add("seeMore")

        const date = new Date(elements.publishedAt).toLocaleString("en-US" , {
            timeZone: "Asia/Jakarta"
        });

        headerDiv.innerHTML = `
        <img src="${elements.urlToImage}" alt="img" id="news-img">
        `
        contentDiv.innerHTML = `
        <h2 id="Title">Title : ${elements.title}</h2>
        <h3 class="news-source">${date}</h3>
        <p class="description">${elements.description}</p>
        `
        seeMoreDiv.innerHTML = `
        <a href="${elements.url}" target="_blank">see more</a>
        `

        // div.appendChild()
        div.append(headerDiv , contentDiv , seeMoreDiv)
        cardsContainer.appendChild(div)
        }

    });
}
