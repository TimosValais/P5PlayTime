import GameOjbect from "../contracts/gameObject.js";
import ColorObject from "../contracts/colorObj.js";
import { ObjectTypes } from "../../helpers/enums.js";

export default class Mountain extends GameOjbect {
  constructor(
    x,
    y,
    name = "Generic Mountain",
    type = ObjectTypes.BackgroundObject,
    size = 150, //only one size needed (creating an iso triangle)
    colorObject = new ColorObject(120, 80, 10) //default mountain color
  ) {
    super(x, y, size, size, colorObject);
    this.name = name;
    this.type = type;
  }

  draw(p5Map) {
    //mountain base
    p5Map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    p5Map.triangle(
      this.x + this.width / 2,
      p5Map.height - this.y - 2 * this.height,
      this.x,
      p5Map.height - this.y - 2 * this.height + this.width * 2,
      this.x + this.width,
      p5Map.height - this.y - 2 * this.height + this.width * 2
    );
    //snow background
    p5Map.fill(255, 255, 255, this.color.transparency);
    p5Map.stroke(255, 255, 255);
    p5Map.triangle(
      this.x + this.width / 2,
      p5Map.height - this.y - 2 * this.height,
      this.x + this.width / 2 - (3 * this.width) / 16,
      p5Map.height - this.y - 2 * this.height + (3 * this.width) / 4,
      this.x + this.width / 2 + (3 * this.width) / 16,
      p5Map.height - this.y - 2 * this.height + (3 * this.width) / 4
    );
    p5Map.stroke(255, 255, 255, this.color.transparency);

    //snow tips
    p5Map.beginShape();
    p5Map.vertex(
      this.x + this.width / 2 - (3 * this.width) / 16,
      p5Map.height - this.y - 2 * this.height + (3 * this.width) / 4
    );
    p5Map.vertex(
      this.x + this.width / 2 - (2 * this.width) / 16,
      p5Map.height -
        this.y -
        2 * this.height +
        (3 * this.width) / 4 +
        (3 * this.width) / 32
    );
    p5Map.vertex(
      this.x + this.width / 2 - (1 * this.width) / 16,
      p5Map.height - this.y - 2 * this.height + (3 * this.width) / 4
    );
    p5Map.vertex(
      this.x + this.width / 2,
      p5Map.height -
        this.y -
        2 * this.height +
        (3 * this.width) / 4 +
        (3 * this.width) / 32
    );
    p5Map.vertex(
      this.x + this.width / 2 + (1 * this.width) / 16,
      p5Map.height - this.y - 2 * this.height + (3 * this.width) / 4
    );
    p5Map.vertex(
      this.x + this.width / 2 + (2 * this.width) / 16,
      p5Map.height -
        this.y -
        2 * this.height +
        (3 * this.width) / 4 +
        (3 * this.width) / 32
    );
    p5Map.vertex(
      this.x + this.width / 2 + (3 * this.width) / 16,
      p5Map.height - this.y - 2 * this.height + (3 * this.width) / 4
    );
    p5Map.endShape();
    p5Map.noStroke();
  }
}
