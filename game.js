import Character from "./models/movingObjects/character.js";
import { ObjectTypes, MovementTypes, Directions } from "./helpers/enums.js";
import ColorObject from "./models/contracts/colorObj.js";
import Platform from "./models/staticObjects/platform.js";
import SampleEnemy from "./models/movingObjects/sampleEnemy.js";
import MovingPlatform from "./models/movingObjects/movingPlatform.js";
import Heart from "./models/staticObjects/heart.js";

const gravity = 1;
const handleCollision = (object1, object2) => {
  object1.handleCollision(object2);
  object2.handleCollision(object1);
};
const p5Map = (p) => {
  //TODO:tv  move this to a create map logic
  let gameCharacters = [];
  let gameObjects = [];
  let lives = 0;
  let mapY = window.innerHeight;
  let mapX = window.innerWidth;
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
      900,
      250,
      "Midle Platform",
      ObjectTypes.BackgroundObject,
      new ColorObject(153, 234, 123),
      500,
      20
    );
    let movingPlatform = new MovingPlatform(
      680,
      350,
      "Moving Platform",
      ObjectTypes.BackgroundObject,
      new ColorObject(132, 214, 93),
      240,
      30,
      3,
      1,
      20,
      600
    );
    let enemy = new SampleEnemy(
      1100,
      0,
      "Sample Enemy 1",
      ObjectTypes.Enemy,
      10,
      10,
      gravity,
      new ColorObject(250, 20, 15),
      60,
      90,
      0
    );
    let enemy2 = new SampleEnemy(
      1500,
      450,
      "Sample Enemy 2",
      ObjectTypes.Enemy,
      10,
      10,
      gravity,
      new ColorObject(250, 20, 15),
      60,
      90,
      0
    );
    gameCharacters.push(character);
    gameCharacters.push(enemy);
    gameCharacters.push(enemy2);
    gameObjects.push(platform1);
    gameObjects.push(platform3);
    gameObjects.push(platform2);
    gameObjects.push(movingPlatform);
    p.allObjects = [...gameCharacters, ...gameObjects];
  };

  p.draw = function () {
    let gamer = gameCharacters.find(
      (char) => char.type === ObjectTypes.Character
    );
    if (!!!gamer) {
      p.background(255, 0, 0);
      return;
    }
    p.background(135, 206, 250);
    drawBackground(p);
    gameCharacters = gameCharacters.filter((c) => !!!c.isDead);
    p.allObjects = p.allObjects.filter((c) => !!!c.isDead);
    gameCharacters.forEach((char) => {
      char.draw(p);
      //   char.move(p);
    });
    gameObjects.forEach((obj) => obj.draw(p));

    lives = gamer.lives;
    console.log(gamer.lives);
    for (let i = 0; i < lives; i++) {
      let heart = new Heart(i + i * 10, 10, 20, 20, new ColorObject(255, 0, 0));
      heart.draw(p);
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
