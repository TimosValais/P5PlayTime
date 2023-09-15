import GameOjbect from "../contracts/gameObject.js";
import ColorObject from "../contracts/colorObj.js";
import { Directions, ObjectTypes } from "../../helpers/enums.js";
export default class MovingPlatform extends GameOjbect {
  #xMovement = 0;
  #yMovement = 0;
  constructor(
    x,
    y,
    name = "Generic Moving Platform",
    type = ObjectTypes.InteractiveObject,
    colorObject = new ColorObject(),
    sizeX = 50,
    sizeY = 50,
    horizontalSpeed = 5,
    verticalSpeed = 0,
    verticalDistance = 200,
    horizontalDistance = 200
  ) {
    super(x, y, sizeX, sizeY, colorObject);
    this.name = name;
    this.type = type;
    this.horizontalSpeed = horizontalSpeed;
    this.verticalSpeed = verticalSpeed;
    this.horizontalDistance = horizontalDistance;
    this.verticalDistance = verticalDistance;
    this.isSticky = true;
  }

  draw(p5Map) {
    this.x += this.horizontalSpeed;
    this.y += this.verticalSpeed;
    this.#xMovement += this.horizontalSpeed;
    this.#yMovement += this.verticalSpeed;
    if (
      this.#xMovement >= this.horizontalDistance ||
      this.#xMovement <= -this.horizontalDistance
    ) {
      this.horizontalSpeed *= -1;
    }
    if (
      this.#yMovement >= this.verticalDistance ||
      this.#yMovement <= -this.verticalDistance
    ) {
      this.verticalSpeed *= -1;
    }
    this.handleCollisions(p5Map.allObjects);
    super.draw(p5Map);
  }

  handleCollisions(collisionObjects) {
    this.#hanldeInteractiveObjectsCollitions(
      collisionObjects.filter((o) => o.type === ObjectTypes.InteractiveObject)
    );
  }
  #hanldeInteractiveObjectsCollitions = (collisionObjects) => {
    let collisions = [];
    collisionObjects.forEach((obj) => {
      let collision = this.collidesWith(obj);
      if (!!collision) {
        collisions.push(collision);
      }
    });
    if (!!collisions && !!collisions.length)
      collisions.forEach((col) => {
        switch (col) {
          case Directions.LEFT:
          case Directions.RIGHT:
            this.horizontalSpeed *= -1;
            break;
          case Directions.UP:
          case Directions.DOWN:
            this.verticalSpeed *= -1;
            break;
          default:
            break;
        }
      });
  };
}
