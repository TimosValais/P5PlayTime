import GameOjbect from "../contracts/gameObject.js";
import { Directions, ObjectTypes } from "../../helpers/enums.js";
import ColorObject from "../contracts/colorObj.js";

export default class GiftBox extends GameOjbect {
  constructor(
    x,
    y,
    scorePoints = 10,
    name = "Generic GiftBox",
    type = ObjectTypes.InteractiveObject,
    colorObject = new ColorObject(200, 30, 100),
    colorWrapingPaper = new ColorObject(0, 120, 60),
    size = 50 //it's a square only needs one size
  ) {
    super(x, y, size, size, colorObject);
    this.name = name;
    this.type = type;
    this.scorePoints = scorePoints;
    this.colorWrapingPaper = colorWrapingPaper;
  }
  draw(p5Map) {
    this.handleCollisions(p5Map.allObjects);
    //5. a collectable token - eg. a jewel, fruit, coins
    //... add your code here
    //box
    p5Map.noStroke();
    p5Map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    p5Map.rect(
      this.x,
      p5Map.height - this.y - this.height,
      this.width,
      this.height
    );

    //questionmark
    p5Map.stroke(200, 180, 20);
    p5Map.fill(
      this.colorWrapingPaper.red,
      this.colorWrapingPaper.green,
      this.colorWrapingPaper.blue,
      this.colorWrapingPaper.transparency
    );
    p5Map.textAlign(p5Map.CENTER);
    p5Map.textSize(this.width);
    p5Map.text(
      "?",
      this.x + this.width / 2,
      p5Map.height - this.y - this.height + this.width - this.width / 10
    );
    p5Map.noStroke();
  }
  handleCollisions(collisionObjects) {
    let character = collisionObjects.find(
      (obj) => obj.type === ObjectTypes.Character
    );
    let collision = super.collidesWith(character);
    if (!!collision && collision === Directions.UP) {
      this.isDestroyed = true;
    }
  }
}
