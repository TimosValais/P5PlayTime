import { EnemyTypes, ObjectTypes } from "../../helpers/enums.js";
import ColorObject from "../contracts/colorObj.js";
import MovingPlatform from "../movingObjects/movingPlatform.js";
import SampleEnemy from "../movingObjects/sampleEnemy.js";
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

export default class NightMap {
  constructor(mapY) {
    this.mapY = mapY;
    this.canvasHeight = mapY;
    this.gameObjects = [];
    this.backgroundObjects = [];
    this.groundBreakingObjects = [];
    this.specialObjects = [];
  }
  generatePlatforms = () => {
    let platformList = [];
    //#region Create Platfororms
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
      this.mapY - platform2.y
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
      2,
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
      blockingPlatform
    );
    //#endregion

    return platformList;
  };
  getBackgroundColor = () => {
    return new ColorObject(46, 68, 130);
  };
  generateGifts = () => {
    let giftList = [];

    //#region Create Gifts
    let giftBox1 = new GiftBox(
      200,
      400,
      3000,
      "Unobtainable Gift",
      ObjectTypes.InteractiveObject,
      new ColorObject(255, 215, 0),
      new ColorObject(0, 0, 128)
    );
    let giftBox2 = new GiftBox(
      800,
      750,
      50,
      "Yellow Box",
      ObjectTypes.InteractiveObject,
      new ColorObject(129, 231, 29),
      new ColorObject(215, 24, 129)
    );
    let giftBox3 = new GiftBox(1400, 800, 100);
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
    let giftBox6 = new GiftBox(2300, 200, 50);
    let giftBox7 = new GiftBox(500, 200, 50);
    let giftBox8 = new GiftBox(750, 200, 50);

    //#endregion
    giftList.push(
      giftBox1,
      giftBox2,
      giftBox3,
      giftBox4,
      giftBox5,
      giftBox6,
      giftBox7,
      giftBox8
    );

    return giftList;
  };
  addRandomEnemy = (enemies, type, mapX, mapY) => {
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
  drawGround = () => {
    let groundX = 0;
    let groundY = 0;
    let groundColor = new ColorObject(50, 205, 50);
    let groundWidth = 4000;
    let groundHeight = this.canvasHeight * 0.1;

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
    let canyon1 = new SpikeCanyon(
      300,
      0,
      "Spike Canyon 1",
      ObjectTypes.GroundBreaking,
      200,
      this.canvasHeight * 0.1
    );
    let canyon2 = new SpikeCanyon(
      650,
      0,
      "Spike Canyon 2",
      ObjectTypes.GroundBreaking,
      200,
      this.canvasHeight * 0.1
    );
    let canyon3 = new SpikeCanyon(
      1120,
      0,
      "Spike Canyon 3",
      ObjectTypes.GroundBreaking,
      200,
      this.canvasHeight * 0.1
    );
    let canyon4 = new SpikeCanyon(
      1960,
      0,
      "Spike Canyon 4",
      ObjectTypes.GroundBreaking,
      200,
      this.canvasHeight * 0.1
    );
    let canyon5 = new SpikeCanyon(
      3380,
      0,
      "Spike Canyon 5",
      ObjectTypes.GroundBreaking,
      200,
      this.canvasHeight * 0.1
    );
    let canyon6 = new SpikeCanyon(
      3600,
      0,
      "Spike Canyon 6",
      ObjectTypes.GroundBreaking,
      200,
      this.canvasHeight * 0.1
    );
    let canyon7 = new SpikeCanyon(
      4120,
      0,
      "Spike Canyon 7",
      ObjectTypes.GroundBreaking,
      200,
      this.canvasHeight * 0.1
    );
    this.groundBreakingObjects.push(canyon1);
    this.groundBreakingObjects.push(canyon2);
    this.groundBreakingObjects.push(canyon3);
    this.groundBreakingObjects.push(canyon4);
    this.groundBreakingObjects.push(canyon5);
    this.groundBreakingObjects.push(canyon6);
    this.groundBreakingObjects.push(canyon7);
    this.drawGround();

    //#region Clouds
    let cloud1 = new Cloud(
      20,
      (3 * this.canvasHeight) / 4,
      "Cloud 1",
      ObjectTypes.BackgroundObject,
      50
    );
    let cloud2 = new Cloud(
      400,
      (5 * this.canvasHeight) / 6,
      "Cloud 2",
      ObjectTypes.BackgroundObject,
      70
    );
    let cloud3 = new Cloud(
      860,
      (4 * this.canvasHeight) / 7,
      "Cloud 3",
      ObjectTypes.BackgroundObject,
      60
    );
    let cloud4 = new Cloud(
      1200,
      (6 * this.canvasHeight) / 8,
      "Cloud 4",
      ObjectTypes.BackgroundObject,
      90
    );
    let cloud5 = new Cloud(
      1450,
      (2 * this.canvasHeight) / 3,
      "Cloud 5",
      ObjectTypes.BackgroundObject,
      40
    );
    let cloud6 = new Cloud(
      1700,
      (8 * this.canvasHeight) / 9,
      "Cloud 6",
      ObjectTypes.BackgroundObject,
      70
    );
    let cloud7 = new Cloud(
      1900,
      (6 * this.canvasHeight) / 8,
      "Cloud 7",
      ObjectTypes.BackgroundObject,
      30
    );
    let cloud8 = new Cloud(
      2150,
      (4 * this.canvasHeight) / 5,
      "Cloud 8",
      ObjectTypes.BackgroundObject,
      80
    );
    let cloud9 = new Cloud(
      2220,
      (5 * this.canvasHeight) / 6,
      "Cloud 9",
      ObjectTypes.BackgroundObject,
      40
    );
    let cloud10 = new Cloud(
      2280,
      (3 * this.canvasHeight) / 5,
      "Cloud 10",
      ObjectTypes.BackgroundObject,
      60
    );

    this.backgroundObjects.push(
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

    //#region stars
    //adding the stars with a for loop because there are a lot needed to give the night sky feeling
    for (let i = -100; i < 200; i++) {
      let sizeX = 50;
      let sizeY = 75;
      //adding some fake randomness to choose sides, could be done with random as well but no need
      if (i % 3 == 0) {
        sizeX = 25;
        sizeY = 35;
      } else if (i % 5 == 0) {
        sizeX = 40;
        sizeY = 40;
      } else if (i % 7 == 0) {
        sizeX = 15;
        sizeY = 20;
      }
      this.backgroundObjects.push(
        new Star(i * 40, Math.random() * this.canvasHeight, sizeX, sizeY)
      );
    }

    //#endregion
    //#region moon
    let moon = new Moon(0, (5 * this.canvasHeight) / 7, 200);
    this.backgroundObjects.push(moon);

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
      250,
      this.canvasHeight * 0.1,
      "Tree 1",
      ObjectTypes.BackgroundObject
    );
    let tree2 = new Tree(
      900,
      this.canvasHeight * 0.1,
      "Tree 2",
      ObjectTypes.BackgroundObject
    );
    let tree3 = new Tree(
      1340,
      this.canvasHeight * 0.1,
      "Tree 2",
      ObjectTypes.BackgroundObject
    );
    let tree4 = new Tree(
      2200,
      this.canvasHeight * 0.1,
      "Tree 2",
      ObjectTypes.BackgroundObject
    );
    let tree5 = new Tree(
      2800,
      this.canvasHeight * 0.1,
      "Tree 2",
      ObjectTypes.BackgroundObject
    );
    this.backgroundObjects.push(tree1, tree2, tree3, tree4, tree5);
    //#endregion

    //#region darkness
    let darkness = {
      draw: (map) => {
        map.fill(0, 0, 0, 200);
        map.rect(-2000, -2000, 9000, this.mapY + 9000);
      },
    };
    this.specialObjects.push(darkness);
    //#endregion
  };
}
