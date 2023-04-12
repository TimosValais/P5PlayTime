import Character from "./models/movingObjects/character.js";
import { ObjectTypes, MovementTypes, Directions } from "./helpers/enums.js";
import ColorObject from "./models/contracts/colorObj.js";
import Platform from "./models/staticObjects/platform.js";

const gravity = 1;
const p5Map = (p) => {
  //   let groundY;
  let gameCharacters = [];
  let mapY = window.innerHeight;
  let mapX = window.innerWidth;
  p.allObjects = gameCharacters;
  p.setup = function () {
    p.createCanvas(mapX, mapY);
    p.groundY = p.height * 0.9;
    let character = new Character(
      0,
      0,
      0,
      ObjectTypes.Character,
      10,
      25,
      gravity,
      new ColorObject(178, 234, 124),
      50,
      50,
      2
    );
    let platform1 = new Platform(
      120,
      80,
      "Generic Platform",
      ObjectTypes.BackgroundObject,
      new ColorObject(153, 234, 123),
      500,
      20
    );
    let platform2 = new Platform(
      200,
      480,
      "High Platform",
      ObjectTypes.BackgroundObject,
      new ColorObject(153, 234, 123),
      500,
      20
    );
    let platform3 = new Platform(
      300,
      250,
      "Low Platform",
      ObjectTypes.BackgroundObject,
      new ColorObject(153, 234, 123),
      500,
      20
    );
    gameCharacters.push(character);
    gameCharacters.push(platform1);
    gameCharacters.push(platform2);
    gameCharacters.push(platform3);
  };

  p.draw = function () {
    p.background(135, 206, 250);
    drawBackground(p);

    gameCharacters.forEach((char) => {
      char.draw(p);
      //   char.move(p);
    });
    // console.log("all the gameCharacters are : ", gameCharacters);
    let gamer = gameCharacters.find(
      (char) => char.type === ObjectTypes.Character
    );

    let platform = gameCharacters.find(
      (char) => char.type === ObjectTypes.BackgroundObject
    );
    let collition = gamer.collidesWith(platform);

    switch (collition) {
      case Directions.UP:
        gamer.stop(true, platform.y + platform.height);
        break;
      case Directions.DOWN:
        gamer.stop(true);
        break;
      case Directions.LEFT:
      case Directions.RIGHT:
        gamer.stop();
      default:
        gamer.start();
        break;
    }
  };

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
function drawBackground(p) {
  p.fill(50, 205, 50);
  p.rect(0, p.groundY, p.width, p.height - p.groundY);
}
new p5(p5Map);
