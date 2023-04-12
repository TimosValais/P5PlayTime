import Character from "./models/movingObjects/character.js";
import { ObjectTypes, MovementTypes, Directions } from "./helpers/enums.js";
import ColorObject from "./models/contracts/colorObj.js";

const gravity = 1;
const p5Map = (p) => {
  let groundY;
  let gameCharacters = [];
  console.log("window is :: ", window);
  let mapY = window.innerHeight;
  let mapX = window.innerWidth;
  p.allObjects = gameCharacters;
  p.setup = function () {
    p.createCanvas(mapX, mapY);
    groundY = p.height * 0.9;
    let character = new Character(
      groundY,
      0,
      0,
      0,
      ObjectTypes.Character,
      20,
      30,
      gravity,
      new ColorObject(178, 234, 124),
      50,
      50
    );
    gameCharacters.push(character);
    console.log("the ground : ", groundY);
  };

  p.draw = function () {
    p.background(135, 206, 250);
    drawBackground(p);

    gameCharacters.forEach((char) => {
      char.draw(p);
      //   char.move(p);
    });
  };

  function drawBackground(p) {
    p.fill(50, 205, 50);
    p.rect(0, groundY, p.width, p.height - groundY);
  }
  p.keyPressed = (e) => {
    let gamer = gameCharacters.find(
      (char) => char.type === ObjectTypes.Character
    );
    if (e.key === "ArrowLeft") {
      gamer.move(MovementTypes.Run, Directions.LEFT);
    }
    if (e.key === "ArrowRight") {
      gamer.move(MovementTypes.Run, Directions.RIGHT);
    }
    if (e.key === "ArrowUp") {
      gamer.move(MovementTypes.Jump);
    }
  };
  p.keyReleased = (e) => {
    let gamer = gameCharacters.find(
      (char) => char.type === ObjectTypes.Character
    );
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      gamer.stop();
    }
  };
};

new p5(p5Map);
