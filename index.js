// function that handles displaying the season results and changing of team logo
const displayResults = (season) => {
    document.querySelector("#results-text").textContent = "Results";
    document.querySelector("#club-logo").src = season.club_crest;
    document.querySelector("#season-placeholder").textContent = season.year;
    document.querySelector("#winners").textContent = season.winning_club;
    document.querySelector("#runners-up").textContent = season.runner_up;
    document.querySelector("#top-scorer").textContent = season.top_scorer;
    document.querySelector("#top-goalkeeper").textContent = season.golden_glove;
}


// function that resets the season results
const clearSeasonResults = () => {
    document.querySelector("#results-text").textContent = "";
    document.querySelector("#season-placeholder").textContent = "";
    document.querySelector("#winners").textContent = "";
    document.querySelector("#runners-up").textContent = "";
    document.querySelector("#top-scorer").textContent = "";
    document.querySelector("#top-goalkeeper").textContent = "";
}

// function that resets team results by season
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
    
  // Below code displays the era for which each logo was used as hover text 
    logoImg.addEventListener("mouseover", () => {
        logoImg.title = logos[currentLogoIndex].era;
        });  
});


//fetch for season data, uses forEach to populate the options for the search by year dropdown menu
//Utilizes the diplayResults function to modify results placeholders in the HTML
fetch("http://localhost:3000/seasons")
  .then(response => response.json())
  .then(seasons => {
    seasons.forEach(season => {
      // search by season functionality, using dropdown menu
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

      // search by team functionality, using search bar
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

            // Delete button functionality, uses click event listener and <button> element
            document.querySelector("#delete-button").addEventListener("click", e => {
                document.querySelector("#club-logo").src = "https://i.imgur.com/2X39ugc.png";
                document.querySelector("#search-bar").value = "";
                document.querySelector("#dropdown-menu").value = "Season..."
                clearSeasonResults();
                clearTeamResults();
            })

          }
        })
        }
      });
      // Submit event listener kept for sole purpose of preventing defaul submit behavior, as we're using keydown for rest of "submit" functionality
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

