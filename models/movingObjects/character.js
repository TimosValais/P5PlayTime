import ColorObject from "../contracts/colorObj.js";
import { ObjectTypes, MovementTypes, Directions } from "../../helpers/enums.js";
import GameOjbect from "../contracts/gameObject.js";
export default class Character extends GameOjbect {
  #verticalSpeed = 0;
  #horizontalSpeed = 0;
  #jumps = 0;
  #froze = false;
  #isGrounded = true;
  constructor(
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
    super(x, y, sizeX, sizeY);
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
    this.x += this.#horizontalSpeed;
    // Apply gravity
    if (!!!this.#isGrounded) {
      this.#verticalSpeed -= this.gravity;
    }

    if (this.#froze) {
      console.log("frozen");
      console.log("vertical speed : ", this.#verticalSpeed);
      console.log("gravity", this.gravity);
    }

    // Update the y position with the vertical speed
    this.y += this.#verticalSpeed;
    // If the character touches the ground (y = 0), stop the vertical movement
    if (this.y <= 0 && this.#verticalSpeed <= 0) {
      this.y = 0;
      this.#verticalSpeed = 0;
      this.#jumps = 0;
      this.#isGrounded = true;
    } else if (this.#isGrounded) {
      this.#verticalSpeed = 0;
      this.#jumps = 0;
    }
    if (this.#jumps > 0) {
      let x1 = this.x;
      let y1 = p5Map.groundY - this.y;
      let x2 = this.x + this.sizeX;
      let y2 = p5Map.groundY - this.y;
      let x3 = this.x + this.sizeX / 2;
      let y3 = p5Map.groundY - this.y - this.sizeY;
      p5Map.fill(this.color.red, this.color.green, this.color.blue);
      p5Map.triangle(x1, y1, x2, y2, x3, y3);
    } else {
      p5Map.fill(this.color.red, this.color.green, this.color.blue);
      p5Map.rect(
        this.x,
        p5Map.groundY - this.y - this.sizeY,
        this.sizeX,
        this.sizeY
      );
    }
  }

  move(action, direction = null) {
    if (action === MovementTypes.Jump) {
      if (this.#jumps >= this.maxJumps) {
        return;
      }
      this.#verticalSpeed = this.verticalSpeedCapacity;
      this.#jumps++;
      this.#isGrounded = false;
    }
    if (action === MovementTypes.Run) {
      this.#horizontalSpeed =
        direction === Directions.LEFT
          ? -this.horizontalSpeedCapacity
          : this.horizontalSpeedCapacity;
    }
  }

  stop(vertical = false, yLanded = null) {
    if (vertical) {
      this.#verticalSpeed = 0;
      if (!!yLanded) {
        this.y = yLanded;
        this.#isGrounded = true;
      }
    } else {
      this.#horizontalSpeed = 0;
    }
  }
  start() {
    this.#isGrounded = false;
  }
}
