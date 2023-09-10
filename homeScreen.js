const characterElements = document.getElementsByClassName("character_element");
const mapElements = document.getElementsByClassName("map_element");
const selectedCharacter = document.getElementById("selected_character");
const selectedMap = document.getElementById("selected_map");
const startGameButton = document.getElementById("start_game_button");
let mapUrl = "map1";
let characterUrl = "character1";
let init = () => {
  console.log(characterElements);
  console.log(mapElements);

  Array.from(characterElements).forEach((character) => {
    character.addEventListener("click", (event) => {
      let nameProp = event.currentTarget.getAttribute("data-name");
      let idProp = event.currentTarget.getAttribute("data-id");
      selectedCharacter.value = nameProp;
      characterUrl = idProp;
    });
  });

  Array.from(mapElements).forEach((map) => {
    map.addEventListener("click", (event) => {
      let nameProp = event.currentTarget.getAttribute("data-name");
      let idProp = event.currentTarget.getAttribute("data-id");
      selectedMap.value = nameProp;

      mapUrl = idProp;
    });
  });

  startGameButton.addEventListener("click", () => {
    console.log(`?character=${characterUrl}&map=${mapUrl}`);
    window.location.href = `game.html?character=${characterUrl}&map=${mapUrl}`;
  });
};

document.addEventListener("DOMContentLoaded", () => {
  init();
});
