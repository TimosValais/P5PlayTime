import Character from "./models/movingObjects/character.js";
import {
  ObjectTypes,
  MovementTypes,
  Directions,
  KeyboardKeys,
  LevelNames,
  EnemyTypes,
  CharacterNames,
} from "./helpers/enums.js";
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
import Snowman from "./models/movingObjects/snowman.js";
import Bunny from "./models/movingObjects/bunny.js";
import DayMap from "./models/maps/dayMap.js";
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const gameMap = params.get("map")?.toLowerCase().replace(/\s+/g, "");
const character = params.get("character")?.toLowerCase().replace(/\s+/g, "");
const gravity = 1;
const monsterRefreshTimeMs = 8000;
const mapY = window.innerHeight - window.innerHeight * 0.02;
const mapX = window.innerWidth - window.innerWidth * 0.01;

const addRandomEnemy = (enemies, type, mapX, mapY) => {
  let randomX = Math.random() * mapX;
  let randomY = mapY;
  let newEnemy = null;
  if (type == EnemyTypes.Sample) {
    newEnemy = new SampleEnemy(
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
  }
  enemies.push(newEnemy);
};
const p5Map = (p) => {
  //TODO:tv remove hardcoded pixel values and get them relative to what they 're supposed to
  let gameCharacters = [];
  let cameraPositionX = 0;
  let cameraPositionY = 0;
  let lives = 0;
  let map = new DayMap(mapY);

  let score = 0;
  console.log("before : ", p.height);
  p.setup = function () {
    p.createCanvas(mapX, mapY);

    p.groundY = p.height;
    console.log("after : ", p.height);

    //#region Create Player Character
    let gameCharacter;
    if (character == CharacterNames.BUNNY) {
      gameCharacter = new Bunny(
        0,
        p.height * 0.1,
        new ColorObject(200, 200, 200),
        50,
        100
      );
    } else {
      gameCharacter = new Snowman(
        0,
        p.height * 0.1,
        new ColorObject(255, 255, 255),
        50,
        100
      );
    }

    //#endregion
    let platforms = map.generatePlatforms();
    let gifts = map.generateGifts();
    //Create the trophy to win
    let trophy = new Flag(platforms[1].x, platforms[1].y, 80, 80);

    //#region Add everything to the list so they can be drawn
    gameCharacters.push(gameCharacter);

    platforms.forEach((platform) => map.gameObjects.push(platform));
    map.gameObjects.push(trophy);
    gifts.forEach((gift) => map.gameObjects.push(gift));

    //#endregion

    //Create interval to throw enemies at player, get the id to stop it after
    p.enemiesIntervalId = setInterval(() => {
      addRandomEnemy(
        gameCharacters,
        EnemyTypes.Sample,
        mapX - cameraPositionX,
        mapY
      );
    }, monsterRefreshTimeMs);
    map.addBackgroundObjects();

    p.addGameObject = (obj) => {
      map.gameObjects.push(obj);
    };
  };

  p.draw = function () {
    p.allObjects = [...gameCharacters, ...map.gameObjects];

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
      map.gameObjects = [];
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
      map.gameObjects = [];
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
      (char) =>
        !!char.isDead && !!char.wasKilled && char.type === ObjectTypes.Enemy
    ).length;

    //#region This Complex logics neets to be seperated and cleand up/also this is not performant, it's better to add a method that each object can call when removed than iterate through the whole list
    //check for claimed objects that give points, add points and remove them
    map.gameObjects = map.gameObjects.filter((obj) => {
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

    map.backgroundObjects.forEach((obj) => obj.draw(p));
    map.groundBreakingObjects.forEach((obj) => obj.draw(p));
    map.gameObjects.forEach((obj) => obj.draw(p));

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
    if (!!!gamer) return;
    //game cheatcode from my initials
    if (
      p.keyIsDown(KeyboardKeys.T_KEY) &&
      p.keyIsDown(KeyboardKeys.V_KEY) &&
      p.keyIsDown(KeyboardKeys.K_KEY)
    ) {
      score = 9999;
      gamer.isVictorious = true;
      return;
    }

    if (e.key === "ArrowLeft" || e.key === "A" || e.key === "a") {
      gamer.move(MovementTypes.Run, Directions.LEFT);
    } else if (e.key === "ArrowRight" || e.key === "D" || e.key === "d") {
      gamer.move(MovementTypes.Run, Directions.RIGHT);
    } else if (
      e.key === "ArrowUp" ||
      e.key === "W" ||
      e.key === "w" ||
      e.key === " "
    ) {
      gamer.move(MovementTypes.Jump);
    } else if (
      (e.key === "F" || e.key === "f" || e.key === "Control") &&
      !!gamer.hasWeapon()
    ) {
      gamer.fire(p);
    }
  };
  p.keyReleased = () => {
    let gamer = gameCharacters.find(
      (char) => char.type === ObjectTypes.Character
    );
    if (!!!gamer) return;

    let finalDirection = 0;
    if (
      p.keyIsDown(KeyboardKeys.A_KEY) ||
      p.keyIsDown(KeyboardKeys.LEFT_ARROW_KEY)
    ) {
      finalDirection--;
    }
    if (
      p.keyIsDown(KeyboardKeys.D_KEY) ||
      p.keyIsDown(KeyboardKeys.RIGHT_ARROW_KEY)
    ) {
      finalDirection++;
    }
    switch (finalDirection) {
      case 0:
        gamer.stop();
        break;
      case 1:
        gamer.move(MovementTypes.Run, Directions.RIGHT);
        break;
      case -1:
        gamer.move(MovementTypes.Run, Directions.LEFT);
        break;
    }
  };
  // const drawGround = () => {
  //   let groundX = 0;
  //   let groundY = 0;
  //   let groundColor = new ColorObject(50, 205, 50);
  //   let groundHeight = p.height * 0.1;
  //   let groundWidth = 4000;

  //   //if we don't have any ground breaking objects, fill the whole map with ground
  //   if (!!!groundBreakingObjects || !groundBreakingObjects.length) {
  //     let ground = new Ground(
  //       0,
  //       0,
  //       "Ground Platform",
  //       ObjectTypes.InteractiveObject,
  //       new ColorObject(50, 205, 50),
  //       groundWidth,
  //       groundHeight
  //     );
  //     gameObjects.push(ground);
  //     return;
  //   }
  //   //draw ground before and after groundbreaking objects
  //   const pointsToAvoid = groundBreakingObjects.map((obj) => {
  //     return { startX: obj.x, endX: obj.x + obj.width };
  //   });
  //   let lastEndPoint = 0;
  //   for (let i = 0; i < pointsToAvoid.length; i++) {
  //     //we want to draw around these points
  //     let xStartDrawing;
  //     let xEndDrawing;
  //     //if it's the first part we need to draw ground until that part
  //     if (i == 0) {
  //       let firstGround = new Ground(
  //         groundX,
  //         groundY,
  //         "Ground part  " + i,
  //         ObjectTypes.InteractiveObject,
  //         groundColor,
  //         pointsToAvoid[i].startX,
  //         groundHeight
  //       );
  //       gameObjects.push(firstGround);
  //     }
  //     //if it is the last, we need to get what's left of the ground width
  //     //else we get the width from the next points start minus the end of this point
  //     if (i == groundBreakingObjects.length - 1)
  //       xEndDrawing = groundWidth - groundX - lastEndPoint;
  //     else {
  //       xEndDrawing = pointsToAvoid[i + 1].startX - pointsToAvoid[i].endX;
  //       lastEndPoint = pointsToAvoid[i].endX;
  //     }

  //     //draw until the point

  //     //draw after the point until the start of the next

  //     let ground = new Ground(
  //       pointsToAvoid[i].endX,
  //       groundY,
  //       "Ground part " + (i + 1),
  //       ObjectTypes.InteractiveObject,
  //       groundColor,
  //       xEndDrawing,
  //       groundHeight
  //     );
  //     gameObjects.push(ground);
  //   }
  // };

  // const addBackgroundObjects = () => {
  //   let canyon1 = new SpikeCanyon(
  //     300,
  //     0,
  //     "Spike Canyon 1",
  //     ObjectTypes.GroundBreaking,
  //     200,
  //     p.height * 0.1
  //   );
  //   let canyon2 = new SpikeCanyon(
  //     650,
  //     0,
  //     "Spike Canyon 2",
  //     ObjectTypes.GroundBreaking,
  //     200,
  //     p.height * 0.1
  //   );
  //   let canyon3 = new SpikeCanyon(
  //     1120,
  //     0,
  //     "Spike Canyon 3",
  //     ObjectTypes.GroundBreaking,
  //     200,
  //     p.height * 0.1
  //   );
  //   let canyon4 = new SpikeCanyon(
  //     1960,
  //     0,
  //     "Spike Canyon 4",
  //     ObjectTypes.GroundBreaking,
  //     200,
  //     p.height * 0.1
  //   );
  //   let canyon5 = new SpikeCanyon(
  //     3380,
  //     0,
  //     "Spike Canyon 5",
  //     ObjectTypes.GroundBreaking,
  //     200,
  //     p.height * 0.1
  //   );
  //   let canyon6 = new SpikeCanyon(
  //     3600,
  //     0,
  //     "Spike Canyon 6",
  //     ObjectTypes.GroundBreaking,
  //     200,
  //     p.height * 0.1
  //   );
  //   let canyon7 = new SpikeCanyon(
  //     4120,
  //     0,
  //     "Spike Canyon 7",
  //     ObjectTypes.GroundBreaking,
  //     200,
  //     p.height * 0.1
  //   );
  //   groundBreakingObjects.push(canyon1);
  //   groundBreakingObjects.push(canyon2);
  //   groundBreakingObjects.push(canyon3);
  //   groundBreakingObjects.push(canyon4);
  //   groundBreakingObjects.push(canyon5);
  //   groundBreakingObjects.push(canyon6);
  //   groundBreakingObjects.push(canyon7);
  //   drawGround();

  //   //#region Clouds

  //   let cloud1 = new Cloud(
  //     20,
  //     (3 * p.height) / 4,
  //     "Cloud 1",
  //     ObjectTypes.BackgroundObject,
  //     50
  //   );
  //   let cloud2 = new Cloud(
  //     400,
  //     (5 * p.height) / 6,
  //     "Cloud 2",
  //     ObjectTypes.BackgroundObject,
  //     70
  //   );
  //   let cloud3 = new Cloud(
  //     860,
  //     (4 * p.height) / 7,
  //     "Cloud 3",
  //     ObjectTypes.BackgroundObject,
  //     60
  //   );
  //   let cloud4 = new Cloud(
  //     1200,
  //     (6 * p.height) / 8,
  //     "Cloud 4",
  //     ObjectTypes.BackgroundObject,
  //     90
  //   );
  //   let cloud5 = new Cloud(
  //     1450,
  //     (2 * p.height) / 3,
  //     "Cloud 5",
  //     ObjectTypes.BackgroundObject,
  //     40
  //   );
  //   let cloud6 = new Cloud(
  //     1700,
  //     (8 * p.height) / 9,
  //     "Cloud 6",
  //     ObjectTypes.BackgroundObject,
  //     70
  //   );
  //   let cloud7 = new Cloud(
  //     1900,
  //     (6 * p.height) / 8,
  //     "Cloud 7",
  //     ObjectTypes.BackgroundObject,
  //     30
  //   );
  //   let cloud8 = new Cloud(
  //     2150,
  //     (4 * p.height) / 5,
  //     "Cloud 8",
  //     ObjectTypes.BackgroundObject,
  //     80
  //   );
  //   let cloud9 = new Cloud(
  //     2220,
  //     (5 * p.height) / 6,
  //     "Cloud 9",
  //     ObjectTypes.BackgroundObject,
  //     40
  //   );
  //   let cloud10 = new Cloud(
  //     2280,
  //     (3 * p.height) / 5,
  //     "Cloud 10",
  //     ObjectTypes.BackgroundObject,
  //     60
  //   );

  //   backgroundObjects.push(
  //     cloud1,
  //     cloud2,
  //     cloud3,
  //     cloud4,
  //     cloud5,
  //     cloud6,
  //     cloud7,
  //     cloud8,
  //     cloud9,
  //     cloud10
  //   );

  //   //#endregion

  //   //#region Mountains

  //   let mountain1 = new Mountain(
  //     500,
  //     0,
  //     "Mountain 1",
  //     ObjectTypes.BackgroundObject,
  //     350
  //   );
  //   let mountain2 = new Mountain(
  //     1000,
  //     0,
  //     "Mountain 2",
  //     ObjectTypes.BackgroundObject,
  //     500
  //   );
  //   let mountain3 = new Mountain(
  //     1350,
  //     0,
  //     "Mountain 3",
  //     ObjectTypes.BackgroundObject,
  //     680
  //   );
  //   let mountain4 = new Mountain(
  //     1475,
  //     0,
  //     "Mountain 4",
  //     ObjectTypes.BackgroundObject,
  //     700
  //   );
  //   let mountain5 = new Mountain(
  //     2100,
  //     0,
  //     "Mountain 5",
  //     ObjectTypes.BackgroundObject,
  //     350
  //   );
  //   let mountain6 = new Mountain(
  //     3000,
  //     0,
  //     "Mountain 6",
  //     ObjectTypes.BackgroundObject,
  //     425
  //   );
  //   backgroundObjects.push(
  //     mountain1,
  //     mountain2,
  //     mountain3,
  //     mountain4,
  //     mountain5,
  //     mountain6
  //   );
  //   //#endregion

  //   //#region Trees
  //   let tree1 = new Tree(
  //     250,
  //     p.height * 0.1,
  //     "Tree 1",
  //     ObjectTypes.BackgroundObject
  //   );
  //   let tree2 = new Tree(
  //     900,
  //     p.height * 0.1,
  //     "Tree 2",
  //     ObjectTypes.BackgroundObject
  //   );
  //   let tree3 = new Tree(
  //     1340,
  //     p.height * 0.1,
  //     "Tree 2",
  //     ObjectTypes.BackgroundObject
  //   );
  //   let tree4 = new Tree(
  //     2200,
  //     p.height * 0.1,
  //     "Tree 2",
  //     ObjectTypes.BackgroundObject
  //   );
  //   let tree5 = new Tree(
  //     2800,
  //     p.height * 0.1,
  //     "Tree 2",
  //     ObjectTypes.BackgroundObject
  //   );
  //   backgroundObjects.push(tree1, tree2, tree3, tree4, tree5);
  //   //#endregion
  // };
};
document.addEventListener("DOMContentLoaded", () => {
  if (!!!character && !!!gameMap) {
    alert("Character or map not found");
    return;
  }
  new p5(p5Map);
});
