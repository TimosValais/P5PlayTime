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
import Mountain from "./models/staticObjects/mountains.js";
import Cloud from "./models/staticObjects/cloud.js";

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
  let backgroundObjects = [];
  let groundBreakingObjects = [];
  let cameraPositionX = 0;
  let cameraPositionY = 0;
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
      4450,
      200,
      "Low Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(153, 234, 123),
      350,
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
    let platform4 = new Platform(
      4850,
      300,
      "Midle Outside Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(153, 234, 123),
      250,
      20
    );
    let platform5 = new Platform(
      4190,
      600,
      "High Outside Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(153, 234, 123),
      400,
      20
    );
    let platform6 = new Platform(
      4420,
      450,
      "Medium High OutsidePlatform",
      ObjectTypes.InteractiveObject,
      new ColorObject(153, 234, 123),
      250,
      20
    );
    //to block cheating getting the flag after death
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
    let movingPlatform2 = new MovingPlatform(
      1690,
      350,
      "Moving Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(132, 214, 93),
      240,
      30,
      5,
      3,
      40,
      400
    );
    let movingPlatform3 = new MovingPlatform(
      2990,
      450,
      "Moving Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(132, 214, 93),
      240,
      30,
      2,
      4,
      10,
      900
    );
    let movingPlatform4 = new MovingPlatform(
      4100,
      500,
      "Moving Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(132, 214, 93),
      240,
      30,
      1,
      1,
      15,
      250
    );
    let giftBox1 = new GiftBox(200, 400, 100);
    let giftBox2 = new GiftBox(
      550,
      750,
      50,
      "Yellow Box",
      ObjectTypes.InteractiveObject,
      new ColorObject(129, 231, 29),
      new ColorObject(215, 24, 129)
    );
    let giftBox3 = new GiftBox(800, 800, 100);
    let giftBox4 = new GiftBox(
      4410,
      520,
      150,
      "Yellow Box",
      ObjectTypes.InteractiveObject,
      new ColorObject(129, 231, 29),
      new ColorObject(215, 24, 129)
    );
    let giftBox5 = new GiftBox(
      3560,
      150,
      150,
      "Yellow Box",
      ObjectTypes.InteractiveObject,
      new ColorObject(129, 231, 29),
      new ColorObject(215, 24, 129)
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
    gameObjects.push(platform1);
    gameObjects.push(platform3);
    gameObjects.push(platform2);
    gameObjects.push(platform4);
    gameObjects.push(platform5);
    gameObjects.push(platform6);
    gameObjects.push(movingPlatform);
    gameObjects.push(movingPlatform2);
    gameObjects.push(movingPlatform3);
    gameObjects.push(movingPlatform4);
    gameObjects.push(trophy);
    gameObjects.push(blockingPlatform);
    gameObjects.push(giftBox1);
    gameObjects.push(giftBox2);
    gameObjects.push(giftBox3);
    gameObjects.push(giftBox4);
    gameObjects.push(giftBox5);

    // p.enemiesIntervalId = setInterval(() => {
    //   addRandomEnemy(gameCharacters, mapX - cameraPositionX, mapY);
    // }, monsterRefreshTimeMs);
    addBackgroundObjects();
  };

  p.draw = function () {
    p.allObjects = [...gameCharacters, ...gameObjects];

    let gamer = gameCharacters.find(
      (char) => char.type === ObjectTypes.Character
    );
    console.log(gamer.x);
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

    cameraPositionX = -gamer.x + p.width / 2;
    //if the player goes too far up, change the screen like old school games that raised the level
    cameraPositionY = gamer.y > p.height ? gamer.y / 2 : 0;

    //pass it to the object so all can see
    p.cameraPositionX = cameraPositionX;

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
    p.translate(cameraPositionX, cameraPositionY);

    backgroundObjects.forEach((obj) => obj.draw(p));
    groundBreakingObjects.forEach((obj) => obj.draw(p));
    gameObjects.forEach((obj) => obj.draw(p));

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
    let canyon3 = new SpikeCanyon(
      1120,
      0,
      "Spike Canyon 3",
      ObjectTypes.GroundBreaking,
      200,
      p.height * 0.1
    );
    let canyon4 = new SpikeCanyon(
      1960,
      0,
      "Spike Canyon 4",
      ObjectTypes.GroundBreaking,
      200,
      p.height * 0.1
    );
    let canyon5 = new SpikeCanyon(
      3380,
      0,
      "Spike Canyon 5",
      ObjectTypes.GroundBreaking,
      200,
      p.height * 0.1
    );
    let canyon6 = new SpikeCanyon(
      3600,
      0,
      "Spike Canyon 6",
      ObjectTypes.GroundBreaking,
      200,
      p.height * 0.1
    );
    let canyon7 = new SpikeCanyon(
      4120,
      0,
      "Spike Canyon 7",
      ObjectTypes.GroundBreaking,
      200,
      p.height * 0.1
    );
    groundBreakingObjects.push(canyon1);
    groundBreakingObjects.push(canyon2);
    groundBreakingObjects.push(canyon3);
    groundBreakingObjects.push(canyon4);
    groundBreakingObjects.push(canyon5);
    groundBreakingObjects.push(canyon6);
    groundBreakingObjects.push(canyon7);
    drawGround();

    //#region Clouds

    let cloud1 = new Cloud(
      20,
      (3 * p.height) / 4,
      "Cloud 1",
      ObjectTypes.BackgroundObject,
      50
    );
    let cloud2 = new Cloud(
      400,
      (5 * p.height) / 6,
      "Cloud 2",
      ObjectTypes.BackgroundObject,
      70
    );
    let cloud3 = new Cloud(
      860,
      (4 * p.height) / 7,
      "Cloud 3",
      ObjectTypes.BackgroundObject,
      60
    );
    let cloud4 = new Cloud(
      1200,
      (6 * p.height) / 8,
      "Cloud 4",
      ObjectTypes.BackgroundObject,
      90
    );
    let cloud5 = new Cloud(
      1450,
      (2 * p.height) / 3,
      "Cloud 5",
      ObjectTypes.BackgroundObject,
      40
    );
    let cloud6 = new Cloud(
      1700,
      (8 * p.height) / 9,
      "Cloud 6",
      ObjectTypes.BackgroundObject,
      70
    );
    let cloud7 = new Cloud(
      1900,
      (6 * p.height) / 8,
      "Cloud 7",
      ObjectTypes.BackgroundObject,
      30
    );
    let cloud8 = new Cloud(
      2150,
      (4 * p.height) / 5,
      "Cloud 8",
      ObjectTypes.BackgroundObject,
      80
    );
    let cloud9 = new Cloud(
      2220,
      (5 * p.height) / 6,
      "Cloud 9",
      ObjectTypes.BackgroundObject,
      40
    );
    let cloud10 = new Cloud(
      2280,
      (3 * p.height) / 5,
      "Cloud 10",
      ObjectTypes.BackgroundObject,
      60
    );

    backgroundObjects.push(
      cloud1,
      cloud2,
      cloud3,
      cloud4,
      cloud5,
      cloud6,
      cloud7,
      cloud8,
      cloud9,
      cloud10
    );

    //#endregion

    //#region Mountains

    let mountain1 = new Mountain(
      500,
      0,
      "Mountain 1",
      ObjectTypes.BackgroundObject,
      350
    );
    let mountain2 = new Mountain(
      1000,
      0,
      "Mountain 2",
      ObjectTypes.BackgroundObject,
      500
    );
    let mountain3 = new Mountain(
      1350,
      0,
      "Mountain 3",
      ObjectTypes.BackgroundObject,
      680
    );
    let mountain4 = new Mountain(
      1475,
      0,
      "Mountain 4",
      ObjectTypes.BackgroundObject,
      700
    );
    let mountain5 = new Mountain(
      2100,
      0,
      "Mountain 5",
      ObjectTypes.BackgroundObject,
      350
    );
    let mountain6 = new Mountain(
      3000,
      0,
      "Mountain 6",
      ObjectTypes.BackgroundObject,
      425
    );
    backgroundObjects.push(
      mountain1,
      mountain2,
      mountain3,
      mountain4,
      mountain5,
      mountain6
    );
    //#endregion

    //#region Trees
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
      1340,
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
    backgroundObjects.push(tree1, tree2, tree3, tree4, tree5);
    //#endregion
  };
};

new p5(p5Map);
