import GameOjbect from "../contracts/gameObject.js";
import ColorObject from "../contracts/colorObj.js";
import { Directions, ObjectTypes } from "../../helpers/enums.js";
export default class Snowball extends GameOjbect {
  constructor(
    x,
    y,
    sizeX = 50,
    sizeY = 50,
    horizontalSpeed = 5,
    colorObject = new ColorObject(255, 255, 255),
    name = "Snowball",
    type = ObjectTypes.Ammo,
    verticalSpeed = 0
  ) {
    super(x, y, sizeX, sizeY, colorObject);
    this.name = name;
    this.type = type;
    this.horizontalSpeed = horizontalSpeed;
    this.verticalSpeed = verticalSpeed;
    this.isSticky = true;
    this.damage = 1;
  }

  draw(p5Map) {
    this.x += this.horizontalSpeed;
    this.y += this.verticalSpeed;
    this.handleCollisions(p5Map.allObjects);
    p5Map.stroke(0);
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
      this.height
    );
    p5Map.noStroke();
    p5Map.noFill();
  }
}
