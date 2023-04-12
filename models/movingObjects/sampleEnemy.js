import Character from "./character.js";
import { MovementTypes, Directions } from "../../helpers/enums.js";

export default class SampleEnemy extends Character {
  #direction = Directions.RIGHT;
  constructor(
    x,
    y,
    name = "Sample Enemy",
    type = ObjectTypes.Enemy,
    horizontalSpeedCapacity = 3,
    verticalSpeedCapacity = 0,
    gravity = 1,
    colorObject = new ColorObject(),
    sizeX = 50,
    sizeY = 50,
    maxJumps = 0
  ) {
    super(
      x,
      y,
      name,
      type,
      horizontalSpeedCapacity,
      verticalSpeedCapacity,
      gravity,
      colorObject,
      sizeX,
      sizeY,
      maxJumps
    );
  }

  checkScreenBoundaries(p5Map) {
    console.log("checking boundaries :", p5Map);
    if (this.x <= 0) {
      this.#direction = Directions.RIGHT;
    } else if (this.x + this.sizeX >= p5Map.width) {
      this.#direction = Directions.LEFT;
    }
    this.move(MovementTypes.Run, this.#direction);
  }

  draw(p5Map) {
    this.checkScreenBoundaries(p5Map);
    super.draw(p5Map);
  }
}
