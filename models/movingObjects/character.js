import ColorObject from "../contracts/colorObj.js";
import { ObjectTypes, MovementTypes, Directions } from "../../helpers/enums.js";
export default class Character {
  #verticalSpeed = 0;
  #horizontalSpeed = 0;
  #jumps = 0;
  constructor(
    mapY,
    x,
    y,
    name = "Generic Character",
    type = ObjectTypes.Character,
    horizontalSpeedCapacity = 3,
    verticalSpeedCapacity = 30,
    gravity = 1,
    colorObject = new ColorObject(),
    sizeX = 50,
    sizeY = 50,
    maxJumps = 1
  ) {
    this.mapY = mapY;
    this.x = x;
    this.y = y;
    this.name = name;
    this.type = type;
    this.horizontalSpeedCapacity = horizontalSpeedCapacity;
    this.verticalSpeedCapacity = verticalSpeedCapacity;
    this.gravity = gravity;
    this.color = colorObject;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.maxJumps = maxJumps;
  }

  draw(p5Map) {
    // console.log(
    //   this.x,
    //   this.mapY - this.y - this.sizeY,
    //   this.sizeX,
    //   this.sizeY
    // );
    // console.log("the test property is : ", p5Map.allObjects);
    this.x += this.#horizontalSpeed;
    // Apply gravity
    this.#verticalSpeed -= this.gravity;

    // Update the y position with the vertical speed
    this.y += this.#verticalSpeed;
    // If the character touches the ground (y = 0), stop the vertical movement
    if (this.y <= 0 && this.#verticalSpeed <= 0) {
      this.y = 0;
      this.#verticalSpeed = 0;
      this.#jumps = 0;
    }
    p5Map.fill(this.color.red, this.color.green, this.color.blue);
    p5Map.rect(this.x, this.mapY - this.y - this.sizeY, this.sizeX, this.sizeY);
  }

  move(action, direction = null) {
    console.log("moving with ", action, direction);
    if (action === MovementTypes.Jump) {
      if (this.#jumps >= this.maxJumps) {
        return;
      }
      this.#verticalSpeed = this.verticalSpeedCapacity;
      this.#jumps++;
    }
    if (action === MovementTypes.Run) {
      this.#horizontalSpeed =
        direction === Directions.LEFT
          ? -this.horizontalSpeedCapacity
          : this.horizontalSpeedCapacity;
    }
  }

  stop() {
    this.#horizontalSpeed = 0;
  }
}
