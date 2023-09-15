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
import Snowperson from "./models/movingObjects/snowperson.js";
import Bunny from "./models/movingObjects/bunny.js";
import DayMap from "./models/maps/dayMap.js";
import NightMap from "./models/maps/nightMap.js";
import { isRGBLight } from "./helpers/physics.js";
//#region html constants and functions
const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const gameMap = params.get("map")?.toLowerCase().replace(/\s+/g, "");
const character = params.get("character")?.toLowerCase().replace(/\s+/g, "");
const buttonDiv = document.getElementById("button-container");
const buttonPlayAgain = document.getElementById("pay_again_button");
const buttonHome = document.getElementById("home_button");
const toggleButtonDiv = (shouldHide, refreshMessage) => {
  if (shouldHide) {
    buttonDiv.style.display = "none";
    return;
  }
  buttonPlayAgain.textContent = refreshMessage;
  buttonDiv.style.display = "block";
};
//#endregion
//#region other constants
const gravity = 1;
const monsterRefreshTimeMs = 4000;
const mapY = window.innerHeight - window.innerHeight * 0.02;
const mapX = window.innerWidth - window.innerWidth * 0.01;
console.log(mapY, mapX);
//#endregion
let backgroundColor = new ColorObject(135, 206, 250);

//#region p5Map object
const p5Map = (p) => {
  let gameCharacters = [];
  let cameraPositionX = 0;
  let cameraPositionY = 0;
  let lives = 0;
  let map;
  console.log(mapY, mapX);

  if (gameMap == LevelNames.NIGHT_LEVEL) {
    console.log(mapY, mapX);

    map = new NightMap(mapX, mapY);
  } else {
    console.log(mapY, mapX);

    map = new DayMap(mapX, mapY);
  }
  backgroundColor = map.getBackgroundColor();
  let score = 0;
  p.setup = function () {
    p.createCanvas(mapX, mapY);

    p.groundY = p.height;

    //#region Create Player Character
    let gameCharacter = getGameCharacter(p, character);

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
    map.addBackgroundObjects();

    //Create interval to throw enemies at player, get the id to stop it after
    p.enemiesIntervalId = setInterval(() => {
      map.addRandomEnemy(
        gameCharacters,
        EnemyTypes.SunSpawn,
        mapX - cameraPositionX,
        mapY / 2
      );
    }, monsterRefreshTimeMs);

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
      score = 0;
      handleEndOfGame(p, map, false, score);
      return;
    }
    if (!!gamer.isVictorious) {
      handleEndOfGame(p, map, true, score);
      return;
    }

    cameraPositionX = -gamer.x + p.width / 2;
    //if the player goes too far up, change the screen like old school games that raised the level
    cameraPositionY = gamer.y > p.height ? gamer.y / 2 : 0;

    //pass it to the object so all can see
    p.cameraPositionX = cameraPositionX;

    p.background(
      backgroundColor.red,
      backgroundColor.green,
      backgroundColor.blue,
      backgroundColor.transparency
    );

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

    map.backgroundObjects?.forEach((obj) => obj.draw(p));
    map.groundBreakingObjects?.forEach((obj) => obj.draw(p));
    map.gameObjects?.forEach((obj) => obj.draw(p));

    gameCharacters?.forEach((char) => char.draw(p));
    map.specialObjects?.forEach((obj) => obj.draw(p));
    p.pop();

    //#endregion

    //TODO:tv need to move this to an object
    let scoreColor = 255; //white
    if (!!isRGBLight(backgroundColor)) {
      scoreColor = 0;
    }
    p.fill(scoreColor);
    p.textSize(16);
    p.text(`Score: ${score}`, 0, 45);
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
};
const setListeners = () => {
  buttonHome.addEventListener("click", () => {
    window.location.href = `index.html`;
  });
  buttonPlayAgain.addEventListener("click", () => {
    window.location.href = `game.html?character=${character}&map=${gameMap}`;
  });
};
//#endregion
document.addEventListener("DOMContentLoaded", () => {
  if (!!!character && !!!gameMap) {
    alert("Character or map not found");
  }
  setListeners();
  new p5(p5Map);
});

//#region game handling functions
const handleEndOfGame = (p5Obj, gameMap, isVictorious, score) => {
  if (!isVictorious) {
    p5Obj.background(255, 0, 0);
    p5Obj.fill(255, 255, 255);
    p5Obj.textSize(32);
    p5Obj.textAlign(p5Obj.CENTER, p5Obj.CENTER);
    p5Obj.text("You Lost", mapX / 2, mapY / 2);
    p5Obj.textAlign(p5Obj.CENTER, p5Obj.CENTER);
    p5Obj.text(`Score: ${score}`, mapX / 2, mapY / 2 + 40);
    toggleButtonDiv(false, "Retry");

    gameMap.gameCharacters = [];
  } else {
    p5Obj.background(0, 255, 0);
    p5Obj.fill(255, 255, 255);
    p5Obj.textSize(32);
    p5Obj.textAlign(p5Obj.CENTER, p5Obj.CENTER);
    p5Obj.text("You Are Victorious", mapX / 2, mapY / 2);
    p5Obj.textAlign(p5Obj.CENTER, p5Obj.CENTER);
    p5Obj.text(`Score: ${score}`, mapX / 2, mapY / 2 + 40);
    toggleButtonDiv(false, "Play Again");
    //leave just the gamer so it won't go to the other loop
    gameMap.gameCharacters = gameCharacters.filter(
      (char) => char.type === ObjectTypes.Character
    );
  }
  gameMap.gameObjects = [];
  //stop spamming enemies
  clearInterval(p5Obj.enemiesIntervalId);
};

const getGameCharacter = (p5Obj, character) => {
  let resultCharacter;
  if (character == CharacterNames.BUNNY) {
    resultCharacter = new Bunny(
      0,
      p5Obj.height * 0.1,
      new ColorObject(200, 200, 200),
      50,
      100
    );
  } else if (character == CharacterNames.SNOWPERSON) {
    resultCharacter = new Snowperson(
      0,
      p5Obj.height * 0.1,
      new ColorObject(255, 255, 255),
      50,
      100
    );
  } else {
    resultCharacter = new Character(
      0,
      p5Obj.height * 0.1,
      "Base Character",
      ObjectTypes.Character,
      8,
      22,
      1,
      new ColorObject(132, 43, 99),
      50,
      75,
      1
    );
  }
  return resultCharacter;
};
//#endregion
