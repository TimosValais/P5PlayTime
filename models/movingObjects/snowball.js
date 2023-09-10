import ColorObject from "../contracts/colorObj.js";
import { Directions, ObjectTypes } from "../../helpers/enums.js";
import GenericAmmo from "./genericAmmo.js";
export default class Snowball extends GenericAmmo {
  #initPosition;
  #xLimit = 1000;
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
    super(x, y, sizeX, sizeY, horizontalSpeed, colorObject);
    this.name = name;
    this.type = type;
    this.horizontalSpeed = horizontalSpeed;
    this.verticalSpeed = verticalSpeed;
    this.isSticky = true;
    this.damage = 1;
    this.#initPosition = this.x;
  }

  draw(p5Map) {
    if (Math.abs(this.#initPosition - this.x) > this.#xLimit)
      this.isDestroyed = true;
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
