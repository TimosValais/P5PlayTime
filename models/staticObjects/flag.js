import { ObjectTypes } from "../../helpers/enums.js";
import ColorObject from "../contracts/colorObj.js";
import GameOjbect from "../contracts/gameObject.js";

export default class Flag extends GameOjbect {
  constructor(x, y, sizeX, sizeY, colorObj = new ColorObject(250, 67, 34)) {
    super(x, y, sizeX, sizeY, colorObj);
    this.type = ObjectTypes.Trophy;
  }
  draw(p5Map) {
    p5Map.fill(this.color.red, this.color.green, this.color.blue);
    p5Map.line(
      this.x,
      p5Map.groundY - this.y,
      this.x,
      p5Map.groundY - this.y - this.height
    );
    p5Map.triangle(
      this.x,
      p5Map.groundY - this.y - this.height,
      this.x,
      p5Map.groundY - this.y - this.height - this.height,
      this.x + this.width,
      p5Map.groundY - this.y - this.height - this.height / 2
    );
  }
}
