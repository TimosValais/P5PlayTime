import { ObjectTypes } from "../../helpers/enums.js";
import ColorObject from "../contracts/colorObj.js";
import GameOjbect from "../contracts/gameObject.js";

export default class Star extends GameOjbect {
  constructor(
    x,
    y,
    sizeX = 50,
    sizeY = 50,
    colorObject = new ColorObject(253, 184, 19, 100), //default star color
    type = ObjectTypes.BackgroundObject,
    name = "Star"
  ) {
    super(x, y, sizeX, sizeY, colorObject);
    this.name = name;
    this.type = type;
  }
  draw(p5Map) {
    p5Map.noFill();
    p5Map.stroke(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    p5Map.strokeWeight(4);
    p5Map.line(
      this.x + this.width / 2,
      p5Map.height - this.y - this.height,
      this.x + this.width / 2,
      p5Map.height - this.y
    );
    p5Map.line(
      this.x,
      p5Map.height - this.y - this.height / 2,
      this.x + this.width,
      p5Map.height - this.y - this.height / 2
    );
    p5Map.line(
      this.x + this.width / 4,
      p5Map.height - this.y - (3 * this.height) / 4,
      this.x + (3 * this.width) / 4,
      p5Map.height - this.y - this.height / 4
    );
    p5Map.line(
      this.x + (3 * this.width) / 4,
      p5Map.height - this.y - (3 * this.height) / 4,
      this.x + this.width / 4,
      p5Map.height - this.y - this.height / 4
    );
    p5Map.noStroke();
  }
}
