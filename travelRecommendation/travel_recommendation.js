const API_URL = "./travel_recommendation_api.json";

document.getElementById("btnSearch").addEventListener("click", () => {
  let input = document.getElementById("conditionInput").value.toLowerCase().trim();
  fetchData(input);
});

document.getElementById("btnReset").addEventListener("click", clearResults);

async function fetchData(input) {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    let resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    let found = false;

    if (input === "beach" || input === "beaches") {
      found = true;
      data.beaches.slice(0, 2).forEach(beach => {
        addCard(resultsContainer, beach.name, beach.description, beach.imageUrl);
      });
    } else {
      data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(input)) {
          found = true;
          addCard(resultsContainer, beach.name, beach.description, beach.imageUrl);
        }
      });
    }

    if (input === "temple" || input === "temples") {
      found = true;
      data.temples.slice(0, 2).forEach(temple => {
        addCard(resultsContainer, temple.name, temple.description, temple.imageUrl);
      });
    } else {
      data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(input)) {
          found = true;
          addCard(resultsContainer, temple.name, temple.description, temple.imageUrl);
        }
      });
    }

    if (input === "country" || input === "countries") {
      found = true;
      data.countries.slice(0, 2).forEach(country => {
        if (country.cities.length > 0) {
          country.cities.forEach(city => {
            addCard(resultsContainer, city.name, city.description, city.imageUrl);
          });
        }
      });
    } else {
      data.countries.forEach(country => {
        if (country.name.toLowerCase().includes(input)) {
          found = true;
          country.cities.forEach(city => {
            addCard(resultsContainer, city.name, city.description, city.imageUrl);
          });
        }
        country.cities.forEach(city => {
          if (city.name.toLowerCase().includes(input)) {
            found = true;
            addCard(resultsContainer, city.name, city.description, city.imageUrl);
          }
        });
      });
    }

    if (!found) {
      resultsContainer.innerHTML = `<p style="color:white">No results found for "${input}"</p>`;
    }

  } catch (error) {
    console.error("Erro ao carregar API:", error);
  }
}

function addCard(container, title, description, image) {
  const card = document.createElement("div");
  card.classList.add("card");
  card.innerHTML = `
    <img src="${image}" alt="${title}">
    <h3>${title}</h3>
    <p>${description}</p>
  `;
  container.appendChild(card);
}

function clearResults() {
  document.getElementById("results").innerHTML = "";
  document.getElementById("conditionInput").value = "";
}
