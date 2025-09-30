const API_URL = "./travel_recommendation_api.json";

// Evento do botão Search
document.getElementById("btnSearch").addEventListener("click", () => {
  let input = document.getElementById("conditionInput").value.toLowerCase().trim();
  fetchData(input);
});

// Evento do botão Reset
document.getElementById("btnReset").addEventListener("click", clearResults);

async function fetchData(input) {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    console.log("API Data:", data); // ✅ Verifique se está trazendo os dados

    let resultsContainer = document.getElementById("results");
    resultsContainer.innerHTML = "";

    let found = false;

    if (input === "beach" || input === "beaches") {
      found = true;
      data.beaches.slice(0, 2).forEach(beach => {
        addCard(resultsContainer, beach.name, beach.description, "imagemTest.jpg");
      });
    }

    else if (input === "temple" || input === "temples") {
      found = true;
      data.temples.slice(0, 2).forEach(temple => {
        addCard(resultsContainer, temple.name, temple.description, "imagemTest.jpg");
      });
    }

    else if (input === "country" || input === "countries") {
      found = true;
      data.countries.slice(0, 2).forEach(country => {
        if (country.cities.length > 0) {
          addCard(resultsContainer, country.cities[0].name, country.cities[0].description, "imagemTest.jpg");
        }
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
