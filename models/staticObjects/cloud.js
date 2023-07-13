import GameOjbect from "../contracts/gameObject.js";
import ColorObject from "../contracts/colorObj.js";
import { ObjectTypes } from "../../helpers/enums.js";

export default class Cloud extends GameOjbect {
  constructor(
    x,
    y,
    name = "Generic Cloud",
    type = ObjectTypes.BackgroundObject,
    size = 50, //only one size needed
    colorObject = new ColorObject(255, 255, 255) //default cloud color/ allowing for grey clouds as well
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

    //cloud1
    p5Map.ellipse(
      this.x,
      p5Map.height - this.y - this.height,
      this.height * 2,
      this.height
    );
    p5Map.ellipse(
      this.x + this.height * (3 / 4),
      p5Map.height - this.y - this.height + this.height * (2 / 4),
      this.height * 2,
      this.height
    );
    p5Map.ellipse(
      this.x + this.height * (5 / 4),
      p5Map.height - this.y - this.height,
      this.height * 2,
      this.height
    );
    p5Map.ellipse(
      this.x + this.height * (7 / 4),
      p5Map.height - this.y - this.height + this.height * (1 / 4),
      this.height * 2,
      this.height
    );
    p5Map.ellipse(
      this.x + this.height * (3 / 4),
      p5Map.height - this.y - this.height - this.height * (2 / 4),
      this.height * 2,
      this.height
    );
    p5Map.ellipse(
      this.x + this.height * (7 / 4),
      p5Map.height - this.y - this.height - this.height * (1 / 4),
      this.height * 2,
      this.height
    );
    p5Map.noStroke();
  }
}
