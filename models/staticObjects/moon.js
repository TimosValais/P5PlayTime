import { ObjectTypes } from "../../helpers/enums.js";
import { refreshStrokesAndFills } from "../../helpers/p5HelperFunctions.js";
import ColorObject from "../contracts/colorObj.js";
import GameOjbect from "../contracts/gameObject.js";

export default class Moon extends GameOjbect {
  constructor(
    x,
    y,
    size = 50, //only one size needed
    colorObject = new ColorObject(207, 234, 233), //default moon color
    name = "Moon",
    type = ObjectTypes.BackgroundObject
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
    refreshStrokesAndFills(p5Map);
  }
}
