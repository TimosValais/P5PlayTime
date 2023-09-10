import GameOjbect from "../contracts/gameObject.js";
import ColorObject from "../contracts/colorObj.js";
import { Directions, ObjectTypes } from "../../helpers/enums.js";
export default class GenericAmmo extends GameOjbect {
  constructor(
    x,
    y,
    sizeX = 50,
    sizeY = 50,
    horizontalSpeed = 5,
    colorObject = new ColorObject(),
    name = "Generic Ammo",
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
    super.draw(p5Map);
  }

  handleCollisions(collisionObjects) {
    this.#hanldeInteractiveObjectsCollitions(
      collisionObjects.filter((o) => o.type === ObjectTypes.InteractiveObject)
    );
    this.#handleEnemyCollision(
      collisionObjects.filter((o) => o.type === ObjectTypes.Enemy)
    );
  }
  #hanldeInteractiveObjectsCollitions = (collisionObjects) => {
    let collisions = [];
    collisionObjects.forEach((obj) => {
      if (!!obj.type && obj.type == ObjectTypes.Ammo) return;
      let collision = this.collidesWith(obj);
      if (!!collision) {
        collisions.push(collision);
      }
    });
    if (!!collisions && !!collisions.length) {
      collisions.forEach((col) => {
        switch (col) {
          case Directions.LEFT:
          case Directions.RIGHT:
          case Directions.UP:
          case Directions.DOWN:
            this.isDestroyed = true;
            break;
          default:
            break;
        }
      });
    }
  };
  #handleEnemyCollision = (collisionEnemies) => {
    let collision = null;
    let collisionEnemy = collisionEnemies.find((obj) => {
      collision = this.collidesWith(obj);
      return collision != null;
    });
    switch (collision) {
      case Directions.UP:
      case Directions.DOWN:
      case Directions.LEFT:
      case Directions.RIGHT:
        collisionEnemy.takeDamage(this.damage);
        break;
    }
  };
}
