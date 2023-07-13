import { ObjectTypes } from "../../helpers/enums.js";
import ColorObject from "../contracts/colorObj.js";
import GameOjbect from "../contracts/gameObject.js";

export default class Flag extends GameOjbect {
  constructor(
    x,
    y,
    sizeX,
    sizeY,
    colorObj = new ColorObject(255, 255, 0, 255)
  ) {
    super(x, y, sizeX, sizeY, colorObj);
    this.type = ObjectTypes.Trophy;
  }
  draw(p5Map) {
    p5Map.fill(this.color.red, this.color.green, this.color.blue);
    p5Map.stroke(0);
    p5Map.line(
      this.x,
      p5Map.height - this.y,
      this.x,
      p5Map.height - this.y - this.height
    );
    p5Map.noStroke();
    p5Map.triangle(
      this.x,
      p5Map.height - this.y - this.height,
      this.x,
      p5Map.height - this.y - this.height - this.height,
      this.x + this.width,
      p5Map.height - this.y - this.height - this.height / 2
    );
  }
}
