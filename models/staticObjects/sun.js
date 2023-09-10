import { ObjectTypes } from "../../helpers/enums.js";
import ColorObject from "../contracts/colorObj.js";
import GameOjbect from "../contracts/gameObject.js";

export default class Sun extends GameOjbect {
  constructor(
    x,
    y,
    name = "Sun",
    type = ObjectTypes.BackgroundObject,
    size = 50, //only one size needed
    colorObject = new ColorObject(253, 184, 19) //default sun color
  ) {
    super(x, y, size, size, colorObject);
    this.name = name;
    this.type = type;
  }
  draw(p5Map) {
    p5Map.noStroke();
    p5Map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );

    p5Map.ellipse(
      this.x,
      p5Map.height - this.y - this.height,
      this.width,
      this.width
    );
    p5Map.noFill();
  }
}
