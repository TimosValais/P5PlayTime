import ColorObject from "../contracts/colorObj.js";
import SampleEnemy from "../movingObjects/sampleEnemy.js";
import GiftBox from "../staticObjects/giftBox.js";
import Platform from "../staticObjects/platform.js";

export default class AbstractMap {
  constructor(mapY, mapX) {
    console.log(
      "must accept a mapY (height) parameter and must implement the following lists as properties:\n1. gameObjects\n2. backgroundObjects\ngroundBreakingObjects"
    );
    this.gameObjects = [];
    this.backgroundObjects = [];
    this.groundBreakingObjects = [];
    this.mapX = mapX;
    this.mapY = mapY;
  }

  generatePlatforms = () => {
    console.log("must return a list of the platform object");
    let platformList = [];
    let platform = new Platform(10, 10);
    platformList.push(platform);
    return platformList;
  };
  getBackgroundColor = () => {
    console.log("must return a new color object for the map background color");
    let colorObj = new ColorObject();
    return colorObj;
  };
  generateGifts = () => {
    console.log("must return a list of giftbox objects");
    let giftList = [];
    let giftBox = new GiftBox(10, 10);
    giftList.push(giftBox);
    return giftList;
  };
  addRandomEnemy = (enemies, type, mapX, mapY) => {
    console.log(
      "must accept a list to add enemie objects. type, mapX, and mapY will be used as well"
    );
    let newEnemy = new SampleEnemy(10, 10);
    enemies.push(newEnemy);
  };
  addBackgroundObjects = () => {
    console.log(
      "must implement the addBackgroundObjects function, that adds any objects that are background to the necessary lists (groundBreakingObjects and backgroundObjects"
    );
  };
}
