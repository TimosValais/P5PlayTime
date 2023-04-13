import GameOjbect from "../contracts/gameObject.js";
import ColorObject from "../contracts/colorObj.js";

export default class MovingPlatform extends GameOjbect {
  #xMovement = 0;
  #yMovement = 0;
  constructor(
    x,
    y,
    name = "Generic Character",
    type = ObjectTypes.Character,
    colorObject = new ColorObject(),
    sizeX = 50,
    sizeY = 50,
    horizontalSpeed = 5,
    verticalSpeed = 0,
    verticalDistance = 200,
    horizontalDistance = 200
  ) {
    console.log("color obj : ", colorObject);
    super(x, y, sizeX, sizeY, colorObject);
    this.name = name;
    this.type = type;
    this.horizontalSpeed = horizontalSpeed;
    this.verticalSpeed = verticalSpeed;
    this.horizontalDistance = horizontalDistance;
    this.verticalDistance = verticalDistance;
  }

  draw(p5Map) {
    console.log("this x : ", this.x, "this y : ", this.y);
    this.x += this.horizontalSpeed;
    this.y += this.verticalSpeed;
    this.#xMovement += this.horizontalSpeed;
    this.#yMovement += this.verticalSpeed;
    if (
      this.#xMovement >= this.horizontalDistance ||
      this.#xMovement <= -this.horizontalDistance
    ) {
      console.log("changing horizontal speed to :");
      this.horizontalSpeed *= -1;
      console.log(this.horizontalSpeed);
    }
    if (
      this.#yMovement >= this.verticalDistance ||
      this.#yMovement <= -this.verticalDistance
    ) {
      console.log("changing vertical speed to :");
      this.verticalSpeed *= -1;
      console.log(this.verticalSpeed);
    }

    super.draw(p5Map);
  }
}
