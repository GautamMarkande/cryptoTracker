const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en";
let listOfItems = [];

let Container = "container";
let cardContainer = "card_container";
let card = "card";
let girdbtn = document.getElementById("grid");
let listbtn = document.getElementById("list");
girdbtn.style.borderBottom = "2px solid  rgb(0, 149, 255)"
listbtn.style.borderBottom = "none"
//fetching data from server
async function cryptoDetails(){
    const response = await fetch(url)
    const result = await response.json();
    listOfItems = [...result];
    renderDataOntoUI(result,Container,cardContainer,card)
    console.log(result);
}

//showing crypto information on user interface
let percentageBtn = document.querySelector(".change")
function renderDataOntoUI(Data,Container, cardContainer,card){
  const containerGrid = document.querySelector("#main_container");
  containerGrid.className = Container;
    Data.forEach(item =>{
        let {image, symbol, name, price_change_percentage_24h,current_price,total_volume,market_cap} = item;
        price_change_percentage_24h = parseFloat(price_change_percentage_24h).toFixed(2)
  
    const card_container = document.createElement("div");
   // card_container.className = ".card_container";
   card_container.className =`${cardContainer}`;
    card_container.innerHTML = `
    <div class="${card}">
                <div class="log_and_name_container">
                  <img
                    src="${image}"
                    alt=""
                  />
                  <div class="name_id_container">
                    <span class="crypto_id">${symbol}</span>
                    <span class="crypto_name">${name}</span>
                  </div>
                </div>
                <div class="change_percentage" style="color:${price_change_percentage_24h<0 ? "red;" :  "rgb(22, 158, 22);"} border:${price_change_percentage_24h<0 ? "3px solid red;" :  "3px solid rgb(22, 158, 22);"}">${price_change_percentage_24h}%</div>
                <div class="curr_price">${current_price}</div>
                <p class="total_vol">Total Volume: ${total_volume}</p>
                <p class="cap">Markat Cap:${market_cap}</p>
              </div>
    `
    containerGrid.appendChild(card_container);
})

}
   listbtn = document.getElementById("list");
   girdbtn = document.getElementById("grid");

//grid view button 
girdbtn.addEventListener("click", (e)=>{
  listbtn.style.borderBottom = "none"
  girdbtn.style.borderBottom = "2px solid  rgb(0, 149, 255)"
  const containerGrid = document.querySelector("#main_container");
  containerGrid.innerHTML = " ";
  Container = "container";
  cardContainer = "card_container"
  card="card";
  renderDataOntoUI(listOfItems,Container,cardContainer,card)
  
})

//list view button
listbtn.addEventListener("click",(e)=>{
  girdbtn.style.borderBottom = "none"
  listbtn.style.borderBottom = "2px solid  rgb(0, 149, 255)"
  const containerGrid = document.querySelector("#main_container");
  containerGrid.innerHTML = " ";
  Container = "list_card_container";
  cardContainer = "list_container"
  card="list_card";
  renderDataOntoUI(listOfItems,Container,cardContainer,card);
})
cryptoDetails();
