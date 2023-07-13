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
import SpikeCanyon from "./models/staticObjects/spikeCanyon.js";
import Tree from "./models/staticObjects/tree.js";

const gravity = 1;
const monsterRefreshTimeMs = 3000;

const addRandomEnemy = (enemies, mapX, mapY) => {
  console.log("max x is : ", mapX);
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
  let groundBreakingObjects = [];
  let cameraPosX = 0;
  let cameraPosY = 0;
  let lives = 0;

  let mapY = window.innerHeight - window.innerHeight * 0.02;
  let mapX = window.innerWidth - window.innerWidth * 0.01;

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
      ObjectTypes.InteractiveObject,
      new ColorObject(153, 234, 123),
      500,
      20
    );
    let platform2 = new Platform(
      200,
      600,
      "High Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(153, 234, 123),
      500,
      20
    );
    let platform3 = new Platform(
      900,
      300,
      "Midle Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(153, 234, 123),
      500,
      20
    );
    let blockingPlatform = new Platform(
      180,
      platform2.y,
      "Blocking Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(255, 255, 255, 0),
      2,
      mapY - platform2.y
    );
    let movingPlatform = new MovingPlatform(
      680,
      450,
      "Moving Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(132, 214, 93),
      240,
      30,
      3,
      1,
      20,
      600
    );
    let giftBox1 = new GiftBox(200, 400, 100);
    let giftBox2 = new GiftBox(550, 750, 100);
    let giftBox3 = new GiftBox(800, 800, 50);
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
    gameObjects.push(platform1);
    gameObjects.push(platform3);
    gameObjects.push(platform2);
    gameObjects.push(movingPlatform);
    gameObjects.push(trophy);
    gameObjects.push(blockingPlatform);
    gameObjects.push(giftBox1);
    gameObjects.push(giftBox2);
    gameObjects.push(giftBox3);

    p.enemiesIntervalId = setInterval(() => {
      addRandomEnemy(gameCharacters, mapX - cameraPosX, mapY);
    }, monsterRefreshTimeMs);
    addBackgroundObjects();
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
      gameCharacters = [];
      gameObjects = [];
      //stop spamming enemies
      clearInterval(p.enemiesIntervalId);
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
      //leave just the gamer so it won't go to the other loop
      gameCharacters = gameCharacters.filter(
        (char) => char.type === ObjectTypes.Character
      );
      gameObjects = [];
      //stop spamming enemies
      clearInterval(p.enemiesIntervalId);
      return;
    }

    console.log("camera posX before : ", cameraPosX);
    console.log(p.width);
    console.log(gamer.x);

    cameraPosX = -gamer.x + p.width / 2;
    //if the player goes too far up, change the screen like old school games that raised the level
    cameraPosY = gamer.y > p.height ? gamer.y / 2 : 0;
    console.log(cameraPosY);

    p.background(135, 206, 250);

    //get one point for each enemy that has died (whether you killed them or not, maybe need to add points logic
    //here as well)
    score += gameCharacters.filter(
      (char) => !!char.isDead && char.type === ObjectTypes.Enemy
    ).length;

    //#region This Complex logics neets to be seperated and cleand up
    //check for claimed objects that give points, add points and remove them
    gameObjects = gameObjects.filter((obj) => {
      if (!!obj.isDestroyed) {
        if (!!obj.scorePoints) {
          score += obj.scorePoints;
        }
        return false;
      }
      return true;
    });
    gameCharacters = gameCharacters.filter((c) => !!!c.isDead);
    //#endregion

    //#region Moving the camera

    p.push();
    p.translate(cameraPosX, cameraPosY);

    gameObjects.forEach((obj) => obj.draw(p));
    groundBreakingObjects.forEach((obj) => obj.draw(p));

    gameCharacters.forEach((char) => char.draw(p));
    p.pop();

    //#endregion

    //TODO:tv need to move this to an object
    p.fill(0);
    p.textSize(16);
    p.text(`Score: ${score}`, window.innerWidth - mapX + 12, 45);
    lives = gamer.lives;
    for (let i = 0; i < lives; i++) {
      let heart = new Heart(i + i * 16, 10, 20, 20, new ColorObject(255, 0, 0));
      heart.draw(p);
    }
  };

  p.keyPressed = (e) => {
    //using e as the event I find it more usefull that using the key and keyCode p5 constants(it is clearer what is what)
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
    let groundWidth = 4000;

    //if we don't have any ground breaking objects, fill the whole map with ground
    if (!!!groundBreakingObjects || !groundBreakingObjects.length) {
      let ground = new Ground(
        0,
        0,
        "Ground Platform",
        ObjectTypes.InteractiveObject,
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
    let lastEndPoint = 0;
    for (let i = 0; i < pointsToAvoid.length; i++) {
      //we want to draw around these points
      let xStartDrawing;
      let xEndDrawing;
      //if it's the first part we need to draw ground until that part
      if (i == 0) {
        console.log("setting first ground : ");
        let firstGround = new Ground(
          groundX,
          groundY,
          "Ground part  " + i,
          ObjectTypes.InteractiveObject,
          groundColor,
          pointsToAvoid[i].startX,
          groundHeight
        );
        gameObjects.push(firstGround);
      }
      //if it is the last, we need to get what's left of the ground width
      //else we get the width from the next points start minus the end of this point
      if (i == groundBreakingObjects.length - 1)
        xEndDrawing = groundWidth - groundX - lastEndPoint;
      else {
        xEndDrawing = pointsToAvoid[i + 1].startX - pointsToAvoid[i].endX;
        lastEndPoint = pointsToAvoid[i].endX;
      }

      //draw until the point

      //draw after the point until the start of the next

      let ground = new Ground(
        pointsToAvoid[i].endX,
        groundY,
        "Ground part " + (i + 1),
        ObjectTypes.InteractiveObject,
        groundColor,
        xEndDrawing,
        groundHeight
      );
      gameObjects.push(ground);
    }

    console.log(gameObjects);
    console.log(groundBreakingObjects);
  };

  const addBackgroundObjects = () => {
    let canyon1 = new SpikeCanyon(
      300,
      0,
      "Spike Canyon 1",
      ObjectTypes.GroundBreaking,
      200,
      p.height * 0.1
    );
    let canyon2 = new SpikeCanyon(
      650,
      0,
      "Spike Canyon 2",
      ObjectTypes.GroundBreaking,
      200,
      p.height * 0.1
    );
    groundBreakingObjects.push(canyon1);
    groundBreakingObjects.push(canyon2);
    drawGround();
    let tree1 = new Tree(
      250,
      p.height * 0.1,
      "Tree 1",
      ObjectTypes.BackgroundObject
    );
    let tree2 = new Tree(
      900,
      p.height * 0.1,
      "Tree 2",
      ObjectTypes.BackgroundObject
    );
    let tree3 = new Tree(
      1300,
      p.height * 0.1,
      "Tree 2",
      ObjectTypes.BackgroundObject
    );
    let tree4 = new Tree(
      2200,
      p.height * 0.1,
      "Tree 2",
      ObjectTypes.BackgroundObject
    );
    let tree5 = new Tree(
      2800,
      p.height * 0.1,
      "Tree 2",
      ObjectTypes.BackgroundObject
    );
    gameObjects.push(tree1, tree2, tree3, tree4, tree5);
  };
};

new p5(p5Map);
