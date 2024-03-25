const displayResults = (season) => {
    document.querySelector("#results-text").textContent = "Results";
    document.querySelector("#club-logo").src = season.club_crest;
    document.querySelector("#season-placeholder").textContent = season.year;
    document.querySelector("#winners").textContent = season.winning_club;
    document.querySelector("#runners-up").textContent = season.runner_up;
    document.querySelector("#top-scorer").textContent = season.top_scorer;
    document.querySelector("#top-goalkeeper").textContent = season.golden_glove;

    //document.querySelector(".teamUL").remove();
    //document.querySelector("#search-bar").value = "";

}


const clearSeasonResults = () => {
    document.querySelector("#results-text").textContent = "";
    document.querySelector("#season-placeholder").textContent = "";
    document.querySelector("#winners").textContent = "";
    document.querySelector("#runners-up").textContent = "";
    document.querySelector("#top-scorer").textContent = "";
    document.querySelector("#top-goalkeeper").textContent = "";
}

const clearTeamResults = () => {
    document.querySelector(".teamUL").textContent = "";
    document.querySelector("#search-bar").value = "";
}


//Function to call for changing prem logo
const changePremLogo = (logo) => {
    document.querySelector("#current-logo").src = logo.image;
  };

//Fetch for prem logos, includes code that works with changePremLogo() to cycle through the three 
fetch("http://localhost:3000/logos")
.then((response) => response.json())
.then((logos) => {
    let currentLogoIndex = 2; 
  
    const logoImg = document.querySelector("#current-logo");
    logoImg.src = logos[currentLogoIndex].image;

    logoImg.addEventListener("click", () => {
        currentLogoIndex = (currentLogoIndex + 1) % logos.length;
        changePremLogo(logos[currentLogoIndex]);
        });
});


//fetch for season data, uses forEach to populate the options for the search by year dropdown menu
//Utilizes the diplayResults function to modify results placeholders in the HTML
fetch("http://localhost:3000/seasons")
  .then(response => response.json())
  .then(seasons => {
    seasons.forEach(season => {
      const dropdownOption = document.createElement("option");
      dropdownOption.textContent = season.year;
      document.querySelector("#dropdown-menu").append(dropdownOption);

      document.querySelector("#season-search").addEventListener("submit", e => {
        e.preventDefault();
        const selectedYear = document.querySelector("#dropdown-menu").value;
        const selectedSeason = seasons.find(season => season.year === selectedYear);
        displayResults(selectedSeason);
        clearTeamResults();
      });

      const teamUL = document.querySelector(".teamUL");
      document.querySelector("#team-search").addEventListener("keydown", e => {
        if (e.key === "Enter"){
        const searchText = document.querySelector("#search-bar").value;
  
        teamUL.innerHTML = '';
        
        seasons.forEach(season => {
          if (season.winning_club.includes(searchText)) {
            const winningSeasons = document.createElement("li");
            winningSeasons.textContent = season.year;
            teamUL.append(winningSeasons);
            clearSeasonResults();

            document.querySelector("#club-logo").src = season.club_crest;

            document.querySelector("#delete-button").addEventListener("click", e => {
                winningSeasons.remove();
                document.querySelector("#club-logo").src = "https://png2.cleanpng.com/sh/2ffdebf31805d55828fb4d655d3eec54/L0KzQYm3VsE0N5J6jJH0aYP2gLBuTgBzbZ5ufeQ2bHXkd8bsTgVmbpIye9pqbYDsf7B6TfxmaZh6fZ92YX7meLb6lPVzNZRuReJ7ZX3sdcO0jPVib6ZqReZ7b4DriX68gsIxbGE4SagENXO4RHA5V8YxOWYASqMAMki7R4i4UMU1O2I7RuJ3Zx==/kisspng-premier-league-uefa-champions-league-manchester-ci-premier-league-trophy-5b20d031695c54.2760159215288771054316.png";
                document.querySelector("#search-bar").value = "";
                document.querySelector("#dropdown-menu").value = "Season..."
                clearSeasonResults();
                clearTeamResults();
            })

          }
        })
        }
      });

      document.querySelector("#team-search").addEventListener("submit", e => {
        e.preventDefault();
      })
    });
  });
















/*
function submitSearch() {
    document.querySelector("#team-search").addEventListener("submit", e => {
    e.preventDefault();
    seasons.forEach(season => {
        if (season.winning_club.includes(searchText)) {
            const winningSeasons = document.createElement("li");
            winningSeasons.textContent = season.year;
            teamUL.append(winningSeasons);
        }
    })
})
}
*/



/*
fetch("http://localhost:3000/seasons")
.then(response => response.json())
.then(seasons => {
    let searchText = document.querySelector("#search-bar").value;
    const teamUL = document.querySelector("#teamUL")
    document.querySelector("#team-search").addEventListener("keydown", e =>{
        if (e.key === "Enter") {
        e.preventDefault();
        seasons.forEach(season => {
            if (season.winning_club.includes(searchText)) {
                    const winningSeasons = document.createElement("li");
                    winningSeasons.textContent = season.year;
                    teamUL.append(winningSeasons);
                }
            })  
        }
    })
})
*/

/*
<input type="text" id="search-bar">
<button onclick="getSearchText()">Submit</button>


let searchText = document.querySelector("#search-bar").value;

if (season.winning_club.includes(searchText)) {
    let winningSeasons = document.createElement("li");
    let winningSeasons.textContent = season.year;
    document.querySelector("#teamUL").append(winningSeasons);
}
*/

