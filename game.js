import Character from "./models/movingObjects/character.js";
import { ObjectTypes, MovementTypes, Directions } from "./helpers/enums.js";
import ColorObject from "./models/contracts/colorObj.js";
import Platform from "./models/staticObjects/platform.js";
import SampleEnemy from "./models/movingObjects/sampleEnemy.js";
import MovingPlatform from "./models/movingObjects/movingPlatform.js";
import Heart from "./models/staticObjects/heart.js";
import Flag from "./models/staticObjects/flag.js";
import Ground from "./models/staticObjects/ground.js";
import GiftBox from "./models/staticObjects/giftBox.js";

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
  //TODO:tv remove hardcoded pixel values and get them relative to what they 're supposed to
  let gameCharacters = [];
  let gameObjects = [];
  let lives = 0;
  console.log(window.innerHeight);
  console.log(window.innerWidth);
  console.log(26 / window.innerHeight);
  console.log(26 / window.innerWidth);
  let mapY = window.innerHeight - window.innerHeight * 0.025;
  let mapX = window.innerWidth - window.innerWidth * 0.014;
  let score = 0;
  p.setup = function () {
    p.createCanvas(mapX, mapY);
    p.groundY = p.height;
    let character = new Character(
      0,
      p.height * 0.1,
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
      200,
      "Generic Platform",
      ObjectTypes.BackgroundObject,
      new ColorObject(153, 234, 123),
      500,
      20
    );
    let platform2 = new Platform(
      200,
      600,
      "High Platform",
      ObjectTypes.BackgroundObject,
      new ColorObject(153, 234, 123),
      500,
      20
    );
    let platform3 = new Platform(
      900,
      300,
      "Midle Platform",
      ObjectTypes.BackgroundObject,
      new ColorObject(153, 234, 123),
      500,
      20
    );
    let blockingPlatform = new Platform(
      180,
      platform2.y,
      "Blocking Platform",
      ObjectTypes.BackgroundObject,
      new ColorObject(255, 255, 255, 0),
      2,
      mapY - platform2.y
    );
    let movingPlatform = new MovingPlatform(
      680,
      450,
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
    let giftBox = new GiftBox(200, 400, 100);
    let canyon = new Platform(
      300,
      0,
      "canyon",
      ObjectTypes.GroundBreaking,
      new ColorObject(200, 123, 93),
      150,
      p.height * 0.1
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
    let trophy = new Flag(platform2.x, platform2.y, 80, 80);
    gameCharacters.push(character);
    gameCharacters.push(enemy);
    gameCharacters.push(enemy2);
    gameObjects.push(canyon);
    gameObjects.push(platform1);
    gameObjects.push(platform3);
    gameObjects.push(platform2);
    gameObjects.push(movingPlatform);
    gameObjects.push(trophy);
    gameObjects.push(blockingPlatform);
    gameObjects.push(giftBox);

    setInterval(() => {
      addRandomEnemy(gameCharacters, mapX, mapY);
    }, monsterRefreshTimeMs);
    drawGround();
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
    score += gameCharacters.filter(
      (char) => !!char.isDead && char.type === ObjectTypes.Enemy
    ).length;

    //check for claimed objects that give points, add points and remove them

    console.log(p.allObjects.find((obj) => obj.isDestroyed));
    gameCharacters.forEach((char) => char.draw(p));
    gameObjects.forEach((obj) => obj.draw(p));
    gameObjects = gameObjects.filter((obj) => {
      if (!!obj.isDestroyed) {
        if (!!obj.scorePoints) {
          console.log(obj.scorePoints);
          score += obj.scorePoints;
        }
        return false;
      }
      return true;
    });
    gameCharacters = gameCharacters.filter((c) => !!!c.isDead);
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
    //using e as the event I find it more usefull that using the key and keyCode p5 constants(it is clearer what is what)
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
  const drawGround = () => {
    let groundX = 0;
    let groundY = 0;
    let groundColor = new ColorObject(50, 205, 50);
    let groundHeight = p.height * 0.1;
    let groundWidth = p.width;

    let groundBreakingObjects = gameObjects.filter(
      (obj) => obj.type === ObjectTypes.GroundBreaking
    );
    //if we don't have any ground breaking objects, fill the whole map with ground
    if (!!!groundBreakingObjects || !groundBreakingObjects.length) {
      let ground = new Ground(
        0,
        0,
        "Ground Platform",
        ObjectTypes.BackgroundObject,
        new ColorObject(50, 205, 50),
        p.width,
        p.height * 0.1
      );
      p.gameObjects.push(ground);
      return;
    }
    //draw ground before and after groundbreaking objects
    const pointsToAvoid = groundBreakingObjects.map((obj) => {
      return { startX: obj.x, endX: obj.x + obj.width };
    });
    for (let i = 0; i < pointsToAvoid.length; i++) {
      //we want to draw around these points
      let xStartDrawing;
      let xEndDrawing;
      if (i == 0) xStartDrawing = groundX;
      else xStartDrawing = pointsToAvoid[i - 1].endX;
      if (i == groundBreakingObjects.length - 1) xEndDrawing = groundWidth;
      else xEndDrawing = pointsToAvoid[i + 1].startX;
      //draw until the point

      let groundBefore = new Ground(
        xStartDrawing,
        groundY,
        "Ground part " + i,
        ObjectTypes.BackgroundObject,
        groundColor,
        pointsToAvoid[i].startX,
        groundHeight
      );
      let groundAfter = new Ground(
        pointsToAvoid[i].endX,
        groundY,
        "Ground part " + i,
        ObjectTypes.BackgroundObject,
        groundColor,
        xEndDrawing,
        groundHeight
      );
      gameObjects.push(groundBefore);
      gameObjects.push(groundAfter);
      // p.fill(50, 205, 50);
      // p.rect(0, p.groundY, p.width, p.height - p.groundY);
    }
  };
};

new p5(p5Map);
