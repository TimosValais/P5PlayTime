import Character from "./models/movingObjects/character.js";
import { ObjectTypes, MovementTypes, Directions } from "./helpers/enums.js";
import ColorObject from "./models/contracts/colorObj.js";
import Platform from "./models/staticObjects/platform.js";
import SampleEnemy from "./models/movingObjects/sampleEnemy.js";

const gravity = 1;
const handleCollision = (object1, object2) => {
  object1.handleCollision(object2);
  object2.handleCollision(object1);
};
const p5Map = (p) => {
  //   let groundY;
  let gameCharacters = [];
  let gameObjects = [];
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
      900,
      250,
      "Midle Platform",
      ObjectTypes.BackgroundObject,
      new ColorObject(153, 234, 123),
      500,
      20
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
    gameCharacters.push(character);
    gameCharacters.push(enemy);
    gameObjects.push(platform1);
    gameObjects.push(platform3);
    gameObjects.push(platform2);
  };

  p.draw = function () {
    p.background(135, 206, 250);
    drawBackground(p);

    gameCharacters.forEach((char) => {
      char.draw(p);
      //   char.move(p);
    });
    gameObjects.forEach((obj) => obj.draw(p));
    let gamer = gameCharacters.find(
      (char) => char.type === ObjectTypes.Character
    );
    gamer.handleCollisions(gameObjects);
    // let collisionObject = null;
    // gameObjects.forEach((obj) => {
    //   if (!!gamer.collidesWith(obj)) collisionObject = obj;
    // });
    // console.log(collisionObject);
    // if (!!collisionObject) gamer.handleCollision(collisionObject);
    // gameObjects.find((obj) => !!gamer.collidesWith(obj));
    // console.log(collisionObject);
    // if (!!collisionObject) gamer.handleCollision(collisionObject);
    // gameObjects.forEach((object, index) => {
    //   console.log("calling this first : ", object.name, index);
    //   gamer.handleCollision(object);
    // });
    // let platform = gameCharacters.find(
    //   (char) => char.type === ObjectTypes.BackgroundObject
    // );
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
