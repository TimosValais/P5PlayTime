import Character from "./character.js";
import { MovementTypes, Directions, ObjectTypes } from "../../helpers/enums.js";
import ColorObject from "../contracts/colorObj.js";

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
    this.lives = 1;
    this.isDead = false;
    this.armor = 0;
  }

  checkScreenBoundaries(p5Map) {
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
    // this.handleCollisions(p5Map.allObjects);
  }
  takeDamage(damageTaken) {
    if (damageTaken >= this.armor) {
      this.isDead = true;
    }
  }
  handleCollisions(collisionObjects) {
    let backgroundObjects = [];
    let enemies = [];
    let otherCharacters = [];
    collisionObjects.forEach((collisionObject) => {
      switch (collisionObject.type) {
        case ObjectTypes.BackgroundObject:
          backgroundObjects.push(collisionObject);
          break;
        case ObjectTypes.Enemy:
          enemies.push(collisionObject);
          break;
        case ObjectTypes.Character:
          otherCharacters.push(collisionObject);
          break;
        default:
          break;
      }
    });
    this.#handleBackgroundObjectCollision(backgroundObjects);
    this.#hanldeCharacterCollisions(otherCharacters);
  }
  #hanldeCharacterCollisions = (characterObjects) => {
    let collision = null;
    characterObjects.find((obj) => {
      collision = this.collidesWith(obj);
      return collision != null;
    });
    switch (collision) {
      case Directions.LEFT:
        this.#direction = Directions.RIGHT;
        break;
      case Directions.RIGHT:
        this.#direction = Directions.LEFT;
        break;
    }
  };
  #handleBackgroundObjectCollision = (collisionObjects) => {
    let collision = null;
    let collisionObject = collisionObjects.find((obj) => {
      collision = this.collidesWith(obj);
      return collision != null;
    });
    switch (collision) {
      case Directions.UP:
        console.log(collisionObject);
        if (!!collisionObject.isSticky) {
          //TODO:tv need to create object with direction + position of collision for this to work properly
          this.horizontalSpeed = collisionObject.horizontalSpeed;
        }
        this.stop(true, collisionObject.y + collisionObject.height);
        break;
      case Directions.DOWN:
        this.stop(true);
        break;
      case Directions.LEFT:
        this.#direction = Directions.RIGHT;
        break;
      case Directions.RIGHT:
        this.#direction = Directions.RIGHT;
        break;
      default:
        this.start();
        break;
    }
  };
}
