import { EnemyTypes, ObjectTypes } from "../../helpers/enums.js";
import addRandomEnemyToEnemyList from "../../helpers/generators.js";
import ColorObject from "../contracts/colorObj.js";
import MovingPlatform from "../movingObjects/movingPlatform.js";
import SampleEnemy from "../movingObjects/sampleEnemy.js";
import SunSpawn from "../movingObjects/sunSpawn.js";
import Cloud from "../staticObjects/cloud.js";
import GiftBox from "../staticObjects/giftBox.js";
import Ground from "../staticObjects/ground.js";
import Moon from "../staticObjects/moon.js";
import Mountain from "../staticObjects/mountains.js";
import Platform from "../staticObjects/platform.js";
import SpikeCanyon from "../staticObjects/spikeCanyon.js";
import Star from "../staticObjects/star.js";
import Sun from "../staticObjects/sun.js";
import Tree from "../staticObjects/tree.js";
import AbstractMap from "./abstractMap.js";

export default class DayMap extends AbstractMap {
  constructor(mapX, mapY) {
    super(mapX, mapY);
    this.gameObjects = [];
    this.backgroundObjects = [];
    this.groundBreakingObjects = [];
  }
  generatePlatforms = () => {
    //a lot of these platform have weird x/y/size values because I first created them in a fixed canvas and then took the ratios
    let platformList = [];
    //#region Create Platfororms

    let platform1 = new Platform(
      2.10700758 * this.mapX,
      0.2991453 * this.mapY,
      "Low Outside Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(153, 234, 123),
      0.1657197 * this.mapX,
      0.01709402 * this.mapY
    );

    let platform2 = new Platform(
      0.09469697 * this.mapX,
      0.51282051 * this.mapY,
      "High Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(153, 234, 123),
      0.23674242 * this.mapX,
      0.01709402 * this.mapY
    );

    let platform3 = new Platform(
      0.42613636 * this.mapX,
      0.25641026 * this.mapY,
      "Midle Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(153, 234, 123),
      0.23674242 * this.mapX,
      0.01709402 * this.mapY
    );

    let platform4 = new Platform(
      2.29640152 * this.mapX,
      0.38461538 * this.mapY,
      "Midle Outside Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(153, 234, 123),
      0.11837121 * this.mapX,
      0.01709402 * this.mapY
    );

    let platform5 = new Platform(
      1.98390152 * this.mapX,
      0.64102564 * this.mapY,
      "High Outside Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(153, 234, 123),
      0.18939394 * this.mapX,
      0.01709402 * this.mapY
    );

    let platform6 = new Platform(
      2.09280303 * this.mapX,
      0.51282051 * this.mapY,
      "Medium High OutsidePlatform",
      ObjectTypes.InteractiveObject,
      new ColorObject(153, 234, 123),
      0.11837121 * this.mapX,
      0.01709402 * this.mapY
    );

    let movingPlatform = new MovingPlatform(
      0.3219697 * this.mapX,
      0.38461538 * this.mapY,
      "Moving Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(132, 214, 93),
      0.11363636 * this.mapX,
      0.02564103 * this.mapY,
      3,
      1,
      20,
      600
    );

    let movingPlatform2 = new MovingPlatform(
      0.80018939 * this.mapX,
      0.2991453 * this.mapY,
      "Moving Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(132, 214, 93),
      0.11363636 * this.mapX,
      0.02564103 * this.mapY,
      5,
      3,
      40,
      250
    );

    let movingPlatform3 = new MovingPlatform(
      1.4157197 * this.mapX,
      0.38461538 * this.mapY,
      "Moving Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(132, 214, 93),
      0.11363636 * this.mapX,
      0.02564103 * this.mapY,
      2,
      2,
      10,
      900
    );

    let movingPlatform4 = new MovingPlatform(
      1.94128788 * this.mapX,
      0.42735043 * this.mapY,
      "Moving Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(132, 214, 93),
      0.11363636 * this.mapX,
      0.02564103 * this.mapY,
      1,
      1,
      15,
      250
    );
    //to block cheating getting the flag after death
    let blockingPlatform = new Platform(
      0.08522727 * this.mapX,
      0.51282051 * this.mapY,
      "Blocking Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(255, 255, 255),
      0.00094697 * this.mapX,
      0.48728205 * this.mapY
    );

    let invisiblePlatform = new Platform(
      2.82 * this.mapX,
      0.5 * this.mapY,
      "Invisible Platform",
      ObjectTypes.InteractiveObject,
      new ColorObject(255, 255, 255, 0),
      0.8 * this.mapX,
      0.02 * this.mapY
    );
    platformList.push(
      platform1,
      platform2,
      platform3,
      platform4,
      platform5,
      platform6,
      movingPlatform,
      movingPlatform2,
      movingPlatform3,
      movingPlatform4,
      blockingPlatform,
      invisiblePlatform
    );
    //#endregion

    return platformList;
  };
  getBackgroundColor = () => {
    return new ColorObject(135, 206, 250);
  };

  generateGifts = () => {
    let giftList = [];

    //#region Create Gifts
    let giftBox1 = new GiftBox(
      -0.11837121 * this.mapX,
      0.34188034 * this.mapY,
      3000,
      "Unobtainable Gift",
      ObjectTypes.InteractiveObject,
      new ColorObject(255, 215, 0),
      new ColorObject(0, 0, 128)
    );

    let giftBox2 = new GiftBox(
      0.37878788 * this.mapX,
      0.64102564 * this.mapY,
      50,
      "Yellow Box",
      ObjectTypes.InteractiveObject,
      new ColorObject(129, 231, 29),
      new ColorObject(215, 24, 129)
    );

    let giftBox3 = new GiftBox(
      0.66287879 * this.mapX,
      0.68376068 * this.mapY,
      100,
      "Generic GiftBox",
      ObjectTypes.InteractiveObject,
      new ColorObject(200, 30, 100),
      new ColorObject(0, 120, 60)
    );

    let giftBox4 = new GiftBox(
      1.84659091 * this.mapX,
      0.94017094 * this.mapY,
      150,
      "Yellow Box",
      ObjectTypes.InteractiveObject,
      new ColorObject(129, 231, 29),
      new ColorObject(215, 24, 129)
    );

    let giftBox5 = new GiftBox(
      1.68560606 * this.mapX,
      0.68376068 * this.mapY,
      150,
      "Yellow Box",
      ObjectTypes.InteractiveObject,
      new ColorObject(129, 231, 29),
      new ColorObject(215, 24, 129)
    );

    let giftBox6 = new GiftBox(
      1.08901515 * this.mapX,
      0.2991453 * this.mapY,
      50
    );

    let giftBox7 = new GiftBox(
      0.23674242 * this.mapX,
      0.2991453 * this.mapY,
      50
    );

    let giftBox8 = new GiftBox(
      0.35511364 * this.mapX,
      0.2991453 * this.mapY,
      50
    );
    let secretGiftBox = new GiftBox(
      3.605 * this.mapX,
      0.7 * this.mapY,
      9999,
      "Secret Gift",
      ObjectTypes.InteractiveObject,
      new ColorObject(255, 255, 255, 0),
      new ColorObject(255, 255, 255, 0)
    );
    giftList.push(
      giftBox1,
      giftBox2,
      giftBox3,
      giftBox4,
      giftBox5,
      giftBox6,
      giftBox7,
      giftBox8,
      secretGiftBox
    );
    //#endregion

    return giftList;
  };
  addRandomEnemy = (enemies, type, positionX, positionY, size) => {
    addRandomEnemyToEnemyList(
      enemies,
      type,
      positionX / 2,
      positionY / 2,
      size
    );
  };
  drawGround = () => {
    let groundX = 0;
    let groundY = 0;
    let groundColor = new ColorObject(50, 205, 50);
    let groundWidth = this.mapX * 1.894;
    // let groundWidth = 4000;
    let groundHeight = this.mapY * 0.1;

    //if we don't have any ground breaking objects, fill the whole map with ground
    if (!!!this.groundBreakingObjects || !this.groundBreakingObjects.length) {
      let ground = new Ground(
        0,
        0,
        "Ground Platform",
        ObjectTypes.InteractiveObject,
        new ColorObject(50, 205, 50),
        groundWidth,
        groundHeight
      );
      this.gameObjects.push(ground);
      return;
    }
    //draw ground before and after groundbreaking objects
    const pointsToAvoid = this.groundBreakingObjects.map((obj) => {
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
          "Ground part " + i,
          ObjectTypes.InteractiveObject,
          groundColor,
          pointsToAvoid[i].startX,
          groundHeight
        );
        this.gameObjects.push(firstGround);
      }
      //if it is the last, we need to get what's left of the ground width
      //else we get the width from the next points start minus the end of this point
      if (i == this.groundBreakingObjects.length - 1)
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
      this.gameObjects.push(ground);
    }
  };
  addBackgroundObjects = () => {
    //#region canyons
    let canyon1 = new SpikeCanyon(
      0.14204545 * this.mapX,
      0 * this.mapY,
      "Spike Canyon 1",
      ObjectTypes.GroundBreaking,
      this.mapY * 0.1,
      0.09469697 * this.mapY
    );

    let canyon2 = new SpikeCanyon(
      0.30776515 * this.mapX,
      0 * this.mapY,
      "Spike Canyon 2",
      ObjectTypes.GroundBreaking,
      this.mapY * 0.1,
      0.09469697 * this.mapY
    );

    let canyon3 = new SpikeCanyon(
      0.53030303 * this.mapX,
      0 * this.mapY,
      "Spike Canyon 3",
      ObjectTypes.GroundBreaking,
      this.mapY * 0.1,
      0.09469697 * this.mapY
    );

    let canyon4 = new SpikeCanyon(
      0.9280303 * this.mapX,
      0 * this.mapY,
      "Spike Canyon 4",
      ObjectTypes.GroundBreaking,
      this.mapY * 0.1,
      0.09469697 * this.mapY
    );

    let canyon5 = new SpikeCanyon(
      1.60037879 * this.mapX,
      0 * this.mapY,
      "Spike Canyon 5",
      ObjectTypes.GroundBreaking,
      this.mapY * 0.1,
      0.09469697 * this.mapY
    );

    let canyon6 = new SpikeCanyon(
      1.70454545 * this.mapX,
      0 * this.mapY,
      "Spike Canyon 6",
      ObjectTypes.GroundBreaking,
      this.mapY * 0.1,
      0.09469697 * this.mapY
    );

    let canyon7 = new SpikeCanyon(
      1.95075758 * this.mapX,
      0 * this.mapY,
      "Spike Canyon 7",
      ObjectTypes.GroundBreaking,
      this.mapY * 0.1,
      0.09469697 * this.mapY
    );
    this.groundBreakingObjects.push(canyon1);
    this.groundBreakingObjects.push(canyon2);
    this.groundBreakingObjects.push(canyon3);
    this.groundBreakingObjects.push(canyon4);
    this.groundBreakingObjects.push(canyon5);
    this.groundBreakingObjects.push(canyon6);
    this.groundBreakingObjects.push(canyon7);

    this.drawGround();
    //#endregion
    //#region Sun
    let sun = new Sun(
      0,
      (3 * this.mapY) / 5,
      "Sun",
      ObjectTypes.BackgroundObject,
      this.mapY * 0.256
    );
    this.backgroundObjects.push(sun);
    //#endregion
    //#region Clouds
    //generate custom clouds

    for (let i = 0; i < 60; i++) {
      let factor = -1;

      if (i > 15 && i < 30) {
        factor = 0;
      } else if (i > 30 && i < 45) factor = 1;
      else if (i > 45) factor = 2;
      //choose a number between 0.5 and 1
      let yValue = 0.5 + Math.random() * 0.5;
      // depending on the factor we get xall over the map
      let xValue = Math.random() + factor;
      //size should be between 0.01 0.07
      let size = 0.01 + Math.random() * 0.06;
      this.backgroundObjects.push(
        new Cloud(
          this.mapX * xValue,
          this.mapY * yValue,
          `Cloud ${i + 1}`,
          ObjectTypes.BackgroundObject,
          this.mapX * size
        )
      );
    }

    //#endregion

    //#region Mountains

    let mountain1 = new Mountain(
      0.23674242 * this.mapX,
      0,
      "Mountain 1",
      ObjectTypes.BackgroundObject,
      0.1657197 * this.mapX
    );

    let mountain2 = new Mountain(
      0.47348485 * this.mapX,
      0,
      "Mountain 2",
      ObjectTypes.BackgroundObject,
      0.23674242 * this.mapX
    );

    let mountain3 = new Mountain(
      0.63920455 * this.mapX,
      0,
      "Mountain 3",
      ObjectTypes.BackgroundObject,
      0.3219697 * this.mapX
    );

    let mountain4 = new Mountain(
      0.69839015 * this.mapX,
      0,
      "Mountain 4",
      ObjectTypes.BackgroundObject,
      0.33143939 * this.mapX
    );

    let mountain5 = new Mountain(
      0.99431818 * this.mapX,
      0,
      "Mountain 5",
      ObjectTypes.BackgroundObject,
      0.1657197 * this.mapX
    );

    let mountain6 = new Mountain(
      1.42045455 * this.mapX,
      0,
      "Mountain 6",
      ObjectTypes.BackgroundObject,
      0.20123106 * this.mapX
    );
    this.backgroundObjects.push(
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
      0.11837121 * this.mapX,
      this.mapY * 0.1,
      "Tree 1",
      ObjectTypes.BackgroundObject
    );

    let tree2 = new Tree(
      0.42613636 * this.mapX,
      this.mapY * 0.1,
      "Tree 2",
      ObjectTypes.BackgroundObject
    );

    let tree3 = new Tree(
      0.6344697 * this.mapX,
      this.mapY * 0.1,
      "Tree 2",
      ObjectTypes.BackgroundObject
    );

    let tree4 = new Tree(
      1.04166667 * this.mapX,
      this.mapY * 0.1,
      "Tree 2",
      ObjectTypes.BackgroundObject
    );

    let tree5 = new Tree(
      1.32575758 * this.mapX,
      this.mapY * 0.1,
      "Tree 2",
      ObjectTypes.BackgroundObject
    );
    this.backgroundObjects.push(tree1, tree2, tree3, tree4, tree5);

    //#endregion
  };
}
