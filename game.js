import Character from "./models/movingObjects/character.js";
import { ObjectTypes, MovementTypes, Directions } from "./helpers/enums.js";
import ColorObject from "./models/contracts/colorObj.js";
import Platform from "./models/staticObjects/platform.js";
import SampleEnemy from "./models/movingObjects/sampleEnemy.js";
import MovingPlatform from "./models/movingObjects/movingPlatform.js";
import Heart from "./models/staticObjects/heart.js";
import Flag from "./models/staticObjects/flag.js";

const gravity = 1;
const monsterRefreshTimeMs = 3000;

const addRandomEnemy = (enemies, mapX, mapY) => {
  let randomX = Math.random() * mapX;
  let randomY = mapY;
  let newEnemy = new SampleEnemy(
    randomX,
    randomY,
    "Sample Enemy" + (enemies.length + 1),
    ObjectTypes.Enemy,
    10,
    10,
    gravity,
    new ColorObject(250, 20, 15),
    60,
    90,
    0
  );
  enemies.push(newEnemy);
};
const p5Map = (p) => {
  //TODO:tv  move this to a create map logic
  let gameCharacters = [];
  let gameObjects = [];
  let lives = 0;
  let mapY = window.innerHeight - 26;
  let mapX = window.innerWidth - 26;
  let score = 0;
  p.setup = function () {
    p.createCanvas(mapX, mapY);
    p.groundY = p.height * 0.9;
    let character = new Character(
      0,
      0,
      0,
      ObjectTypes.Character,
      10,
      20,
      gravity,
      new ColorObject(178, 234, 124),
      50,
      50,
      1
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
    let blockingPlatform = new Platform(
      180,
      480,
      "Blocking Platform",
      ObjectTypes.BackgroundObject,
      new ColorObject(255, 255, 255, 0),
      2,
      160
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
    let trophy = new Flag(200, 480, 80, 80);
    gameCharacters.push(character);
    gameCharacters.push(enemy);
    gameCharacters.push(enemy2);
    gameObjects.push(platform1);
    gameObjects.push(platform3);
    gameObjects.push(platform2);
    gameObjects.push(movingPlatform);
    gameObjects.push(trophy);
    gameObjects.push(blockingPlatform);
    setInterval(() => {
      addRandomEnemy(gameCharacters, mapX, mapY);
    }, monsterRefreshTimeMs);
  };

  p.draw = function () {
    p.allObjects = [...gameCharacters, ...gameObjects];

    let gamer = gameCharacters.find(
      (char) => char.type === ObjectTypes.Character
    );
    if (!!!gamer) {
      p.background(255, 0, 0);
      p.fill(255, 255, 255);
      p.textSize(32);
      p.textAlign(p.CENTER, p.CENTER);
      p.text("You Lost", mapX / 2, mapY / 2);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(`Score: ${score}`, mapX / 2, mapY / 2 + 40);
      return;
    }
    if (!!gamer.isVictorious) {
      p.background(0, 255, 0);
      p.fill(255, 255, 255);
      p.textSize(32);
      p.textAlign(p.CENTER, p.CENTER);
      p.text("You Are Victorious", mapX / 2, mapY / 2);
      p.textAlign(p.CENTER, p.CENTER);
      p.text(`Score: ${score}`, mapX / 2, mapY / 2 + 40);
      return;
    }
    p.background(135, 206, 250);
    drawBackground(p);
    score += gameCharacters.filter(
      (char) => !!char.isDead && char.type === ObjectTypes.Enemy
    ).length;
    gameCharacters = gameCharacters.filter((c) => !!!c.isDead);
    p.allObjects = p.allObjects.filter((c) => !!!c.isDead);
    gameCharacters.forEach((char) => {
      char.draw(p);
      //   char.move(p);
    });
    gameObjects.forEach((obj) => obj.draw(p));
    p.fill(0);
    p.textSize(16);
    p.text(`Score: ${score}`, 2, 45);
    lives = gamer.lives;
    for (let i = 0; i < lives; i++) {
      let heart = new Heart(i + i * 10, 10, 20, 20, new ColorObject(255, 0, 0));
      heart.draw(p);
    }
  };

  p.keyPressed = (e) => {
    console.log(p.keyIsPressed);
    let gamer = gameCharacters.find(
      (char) => char.type === ObjectTypes.Character
    );
    if (e.key === "ArrowLeft" || e.key === "A" || e.key === "a") {
      gamer.move(MovementTypes.Run, Directions.LEFT);
    }
    if (e.key === "ArrowRight" || e.key === "D" || e.key === "d") {
      gamer.move(MovementTypes.Run, Directions.RIGHT);
    }
    if (e.key === "ArrowUp" || e.key === "W" || e.key === "w") {
      gamer.move(MovementTypes.Jump);
    }
  };
  p.keyReleased = (e) => {
    let gamer = gameCharacters.find(
      (char) => char.type === ObjectTypes.Character
    );
    if (
      e.key === "ArrowLeft" ||
      e.key === "ArrowRight" ||
      e.key === "A" ||
      e.key === "a" ||
      e.key === "D" ||
      e.key === "d"
    ) {
      gamer.stop();
    }
  };
};
function drawBackground(p) {
  p.fill(50, 205, 50);
  p.rect(0, p.groundY, p.width, p.height - p.groundY);
}

new p5(p5Map);
