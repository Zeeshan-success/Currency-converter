const url =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
// const options = {
//   method: "GET",
//   headers: {
//     "x-rapidapi-key": "468725e74dmshf6e4277c87dcd57p1c8b04jsn17ad6e770994",
//     "x-rapidapi-host": "currency-conversion-and-exchange-rates.p.rapidapi.com",
//   },
// };

let dropdowns = document.querySelectorAll(".dropdown select");
let fromcurrency = document.querySelector(".from select");
let tocurrency = document.querySelector(".to select");

for (select of dropdowns) {
  for (code in countryList) {
    let newOption = document.createElement("option");

    newOption.innerText = code;

    newOption.value = code;

    select.append(newOption);

    if (select.name === "from" && code === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && code === "PKR") {
      newOption.selected = "selected";
    }
  }
  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}
function updateflag(element) {
  let code = element.value;
  let currencycode = countryList[code];
  let newsrc = `https://flagsapi.com/${currencycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  console.log(img);
  img.src = newsrc;
}

let btn = document.querySelector("#btn");

btn.addEventListener("click", async () => {
  let userinput = document.querySelector("input").value;
  let msg = document.querySelector("#msg");
  if (userinput === "" || userinput <= "1") {
    userinput = 1;
    userinput = "1";
  }
  console.log(fromcurrency.value, tocurrency.value);

  let newUrl = `${url}/${fromcurrency.value.toLowerCase()}.json`;

  const response = await fetch(newUrl);
  const result = await response.json();
  let data =
    result[fromcurrency.value.toLowerCase()][tocurrency.value.toLowerCase()];

  let convert = userinput * data;
  msg.innerText = `${userinput} ${fromcurrency.value} = ${convert} ${tocurrency.value}`;
});
