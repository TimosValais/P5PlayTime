import ColorObject from "../contracts/colorObj.js";
import { ObjectTypes, MovementTypes, Directions } from "../../helpers/enums.js";
import GameOjbect from "../contracts/gameObject.js";
export default class Character extends GameOjbect {
  #verticalSpeed = 0;
  #horizontalSpeed = 0;
  #jumps = 0;
  #isGrounded = true;
  #damage = 1;
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
    this.damage = 1;
    this.#damage = this.damage;
    this.armor = 0;
    this.lives = 3;
    this.isDead = false;
    this.isVictorious = false;
    this.gravitationalHorizontalSpeed = 0;
  }

  draw(p5Map) {
    this.x += this.#horizontalSpeed + this.gravitationalHorizontalSpeed;
    // Apply gravity
    if (!!!this.#isGrounded) {
      this.#verticalSpeed -= this.gravity;
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
    if (!this.#isGrounded) {
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
    this.handleCollisions(p5Map.allObjects);
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
  handleCollisions(collisionObjects) {
    let backgroundObjects = [];
    let enemies = [];
    let otherCharacters = [];
    let trophy = null;
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
        case ObjectTypes.Trophy:
          trophy = collisionObject;
          break;
        default:
          break;
      }
    });
    this.#handleBackgroundObjectCollision(backgroundObjects);
    this.#handleEnemyCollision(enemies);
    this.#handleTrophy(trophy);
  }
  takeDamage(damageTaken) {
    this.lives -= damageTaken;
    if (this.lives <= 0) {
      this.isDead = true;
    } else {
      this.#horizontalSpeed = 0;
      this.x = 0;
      this.y = 800;
    }
  }
  #handleBackgroundObjectCollision = (collisionObjects) => {
    let collision = null;
    let collisionObject = collisionObjects.find((obj) => {
      collision = this.collidesWith(obj);
      return collision != null;
    });
    this.gravitationalHorizontalSpeed = 0;
    switch (collision) {
      case Directions.UP:
        if (!!collisionObject.isSticky) {
          //TODO:tv need to create object with direction + position of collision for this to work properly
          this.gravitationalHorizontalSpeed = collisionObject.horizontalSpeed;
        }
        this.stop(true, collisionObject.y + collisionObject.height);
        break;
      case Directions.DOWN:
        this.stop(true);
        break;
      case Directions.LEFT:
      case Directions.RIGHT:
        this.stop();
      default:
        this.start();
        break;
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
        collisionEnemy.takeDamage(this.#damage);
        this.#verticalSpeed = this.verticalSpeedCapacity;
        break;
      case Directions.DOWN:
      case Directions.LEFT:
      case Directions.RIGHT:
        if (collisionEnemy.damage >= this.armor) {
          this.takeDamage(collisionEnemy.damage);
          this.stop();
        } else {
          this.#verticalSpeed = 5;
        }
    }
  };
  #handleTrophy = (trophy) => {
    let collision = this.collidesWith(trophy);
    if (!!collision && collision != Directions.DOWN) this.isVictorious = true;
  };
}
