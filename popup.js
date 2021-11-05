/*
// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.sync.get("color", function ({ color }) {
        changeColor.style.backgroundColor = color;
    }
);

// When the button is clicked, inject setPageBackgroundColor into current page
changeColor.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: setPageBackgroundColor,
    });
  }
);
  
// The body of this function will be executed as a content script inside the current page
function setPageBackgroundColor() {
    chrome.storage.sync.get("color", ({ color }) => {
      document.body.style.backgroundColor = color;
    });
}
*/

let randomizer = document.getElementById("randomizer");

randomizer.addEventListener("click", async () => {
    console.log("here");

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: chooseRandomEpisode,
    });

  });

function chooseRandomEpisode(){
  
  if(typeof(document.getElementById("chosenEpisode"))!="undefined" && document.getElementById("chosenEpisode")!=null){
    document.getElementById("chosenEpisode").style.border = "none";
    document.getElementById("chosenEpisode").id = "previous";
    document.getElementById("previous").style.border = "none";
  }


  var serie = document.getElementsByClassName("duration")[0].textContent.indexOf("h");
  var serie2 = document.getElementsByClassName("duration")[0].textContent.indexOf("m");
  if (serie==-1 && serie2==-1){
    

    var episodeSelector = document.getElementsByClassName("episodeSelector-dropdown")[0];
    var expandButton = document.getElementsByClassName("section-expandButton")[0];

    if(episodeSelector.childElementCount!=0){
    
      document.querySelector(".episodeSelector-dropdown button").click();

      var seasons = document.querySelector(".episodeSelector-dropdown ul").children;
      
      seasons[seasons.length-1].click();
      

    }else if(typeof(expandButton)!="undefined" && expandButton!=null){
      console.log(expandButton);
      expandButton.click();
    }

    setTimeout(function(){
      
      var episodesArray = document.querySelectorAll(".episode-item");

      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Maximum is exclusive and minimum is inclusive
      }

      var episodeChosen = episodesArray[getRandomInt(0,episodesArray.length)];

      episodeChosen.id = "chosenEpisode";
      document.getElementById("chosenEpisode").style.border = "2px solid red";

      document.getElementById("chosenEpisode").scrollIntoView();

    }, 1000);

  }
}