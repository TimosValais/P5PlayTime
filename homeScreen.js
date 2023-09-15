const characterElements = document.getElementsByClassName("character_element");
const mapElements = document.getElementsByClassName("map_element");
const selectedCharacter = document.getElementById("selected_character");
const selectedMap = document.getElementById("selected_map");
const startGameButton = document.getElementById("start_game_button");
let mapUrl = "map1";
let characterUrl = "character1";
let init = () => {
  Array.from(characterElements).forEach((character) => {
    character.addEventListener("click", (event) => {
      // Remove 'selected-img' class from all images in the same container
      Array.from(characterElements).forEach((el) => {
        const img = el.querySelector("img");
        img.classList.remove("selected-img");
      });

      // Add 'selected-img' class to the clicked image
      const clickedImg = event.currentTarget.querySelector("img");
      clickedImg.classList.add("selected-img");

      let nameProp = event.currentTarget.getAttribute("data-name");
      let idProp = event.currentTarget.getAttribute("data-id");
      selectedCharacter.value = nameProp;
      characterUrl = idProp;
    });
  });

  Array.from(mapElements).forEach((map) => {
    map.addEventListener("click", (event) => {
      // Remove 'selected-img' class from all images in the same container
      Array.from(mapElements).forEach((el) => {
        const img = el.querySelector("img");
        img.classList.remove("selected-img");
      });

      // Add 'selected-img' class to the clicked image
      const clickedImg = event.currentTarget.querySelector("img");
      clickedImg.classList.add("selected-img");

      let nameProp = event.currentTarget.getAttribute("data-name");
      let idProp = event.currentTarget.getAttribute("data-id");
      selectedMap.value = nameProp;
      mapUrl = idProp;
    });
  });

  startGameButton.addEventListener("click", () => {
    window.location.href = `game.html?character=${characterUrl}&map=${mapUrl}`;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
