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
    horizontalSpeedCapacity = 7,
    verticalSpeedCapacity = 30,
    gravity = 1,
    colorObject = new ColorObject(),
    sizeX = 50,
    sizeY = 50,
    maxJumps = 1,
    weaponDamage = 0,
    stepX = 10,
    stepY = 17
  ) {
    super(x, y, sizeX, sizeY, colorObject, stepX, stepY);
    this.x = x;
    this.y = y;
    this.name = name;
    this.type = type;
    this.horizontalSpeedCapacity = horizontalSpeedCapacity;
    this.verticalSpeedCapacity = verticalSpeedCapacity;
    this.gravity = gravity;
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
    this.weaponDamage = weaponDamage;
  }

  draw(p5Map) {
    this.x += this.#horizontalSpeed + this.gravitationalHorizontalSpeed;
    // Apply gravity
    if (!!!this.#isGrounded) {
      this.#verticalSpeed -= this.gravity;
    }

    // Update the y position with the vertical speed
    this.y += this.#verticalSpeed;
    // If the character touches the ground (y = 0), they die (not the ground that is drawn, what is under it,
    //we consider the ground is lava rules of old sidescroll games, don't want to add fall damage logic)
    if (this.y <= 0) {
      this.takeDamage(1);
    } else if (this.y <= 0 && this.#verticalSpeed <= 0) {
      this.y = 0;
      this.#verticalSpeed = 0;
      this.#jumps = 0;
      this.#isGrounded = true;
    } else if (this.#isGrounded) {
      this.#verticalSpeed = 0;
      this.#jumps = 0;
    }
    this.drawCharacter(p5Map);
    this.handleCollisions(p5Map.allObjects);
  }
  drawCharacter(map) {
    //this could be a switch, although I prefer this syntax
    //TODO:tv wrap the conditions with functions that describe
    //the movement (eg grounded + horizontalspeed 0 -> isStanding/isNotMoving)
    if (!this.#isGrounded && this.#horizontalSpeed == 0) {
      this.drawJumping(map);
    } else if (!this.#isGrounded && this.#horizontalSpeed > 0) {
      this.drawJumpingRight(map);
    } else if (!this.#isGrounded && this.#horizontalSpeed < 0) {
      this.drawJumpingLeft(map);
    } else if (this.#isGrounded && this.#horizontalSpeed > 0) {
      this.drawMovingRight(map);
    } else if (this.#isGrounded && this.#horizontalSpeed < 0) {
      this.drawMovingLeft(map);
    } else {
      this.drawStanding(map);
    }
  }
  drawMovingLeft(map) {
    map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    map.rect(
      this.x + this.sizeX / 2 - (this.sizeX * 3) / 50,
      map.height - this.y - (this.sizeY * 11) / 16,
      (this.sizeX * 6) / 50,
      this.sizeY / 2
    );
    //head
    this.#drawHead(map);
    //left hand
    map.line(
      this.x + this.sizeX / 2 - this.sizeX / 10,
      map.height - this.y - (this.sizeY * 11) / 16,
      this.x + this.sizeX / 2 - (this.sizeX * 12) / 50,
      map.height - this.y - this.sizeY / 2
    );
    map.line(
      this.x + this.sizeX / 2 - (this.sizeX * 12) / 50,
      map.height - this.y - this.sizeY / 2,
      this.x + this.sizeX / 2 - this.sizeX / 2,
      map.height - this.y - (this.sizeY * 9) / 16
    );
    //right hand
    map.line(
      this.x + this.sizeX / 2 + this.sizeX / 10,
      map.height - this.y - (this.sizeY * 11) / 16,
      this.x + this.sizeX / 2 + (this.sizeX * 12) / 50,
      map.height - this.y - this.sizeY / 2
    );
    map.line(
      this.x + this.sizeX / 2 + (this.sizeX * 12) / 50,
      map.height - this.y - this.sizeY / 2,
      this.x + this.sizeX / 2,
      map.height - this.y - (this.sizeY * 7) / 16
    );

    //left foot
    map.strokeWeight(4);
    map.line(
      this.x + this.sizeX / 2 - this.sizeX / 25,
      map.height - this.y - (this.sizeY * 3) / 16,
      this.x + this.sizeX / 2 - (this.sizeX * 3) / 10,
      map.height - this.y - this.sizeX / 16
    );
    //right foot
    map.line(
      this.x + this.sizeX / 2 + this.sizeX / 25,
      map.height - this.y - (this.sizeY * 3) / 16,
      this.x + this.sizeX / 2 + this.sizeX / 7,
      map.height - this.y
    );
    this.clearStrokesAndFills(map);
  }
  drawJumpingLeft(map) {
    map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    map.rect(
      this.x + this.sizeX / 2 - (this.sizeX * 3) / 50,
      map.height - this.y - (this.sizeY * 11) / 16,
      (this.sizeX * 3) / 25,
      this.sizeY / 2
    );
    //head
    this.#drawHead(map);

    //left hand
    map.line(
      this.x + this.sizeX / 2 - this.sizeX / 10,
      map.height - this.y - (this.sizeY * 11) / 16,
      this.x + this.sizeX / 2 - this.sizeX / 2,
      map.height - this.y - (this.sizeY * 15) / 16
    );

    //right hand
    map.line(
      this.x + this.sizeX / 2 + this.sizeX / 10,
      map.height - this.y - (this.sizeY * 11) / 16,
      this.x + this.sizeX / 2 - this.sizeX / 5,
      map.height - this.y - this.sizeY / 2
    );
    map.line(
      this.x + this.sizeX / 2 - this.sizeX / 5,
      map.height - this.y - this.sizeY / 2,
      this.x + this.sizeX / 2 - (this.sizeX * 2) / 5,
      map.height - this.y - (this.sizeY * 10) / 16
    );

    //left foot
    map.strokeWeight(4);
    map.line(
      this.x + this.sizeX / 2 - this.sizeX / 25,
      map.height - this.y - (this.sizeY * 3) / 16,
      this.x + this.sizeX / 2 - (this.sizeX * 3) / 10,
      map.height - this.y - this.sizeX / 16
    );
    //right foot
    map.line(
      this.x + this.sizeX / 2 + this.sizeX / 25,
      map.height - this.y - (this.sizeY * 3) / 16,
      this.x + this.sizeX / 2 + this.sizeX / 7,
      map.height - this.y - (this.sizeX * 3) / 80
    );
    map.line(
      this.x + this.sizeX / 2 + this.sizeX / 7,
      map.height - this.y - (this.sizeX * 3) / 80,
      this.x + this.sizeX / 2 + (this.sizeX * 12) / 50,
      map.height - this.y - (this.sizeX * 3) / 40
    );
    this.clearStrokesAndFills(map);
  }
  drawJumpingRight(map) {
    //body
    map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    map.rect(
      this.x + this.sizeX / 2 - (this.sizeX * 3) / 50,
      map.height - this.y - (this.sizeY * 11) / 16,
      (this.sizeX * 3) / 25,
      this.sizeY / 2
    );
    //head
    this.#drawHead(map);

    //left hand
    map.line(
      this.x + this.sizeX / 2 - this.sizeX / 10,
      map.height - this.y - (this.sizeY * 11) / 16,
      this.x + this.sizeX / 2 + this.sizeX / 5,
      map.height - this.y - this.sizeY / 2
    );
    map.line(
      this.x + this.sizeX / 2 + this.sizeX / 5,
      map.height - this.y - this.sizeY / 2,
      this.x + this.sizeX / 2 + (this.sizeX * 2) / 5,
      map.height - this.y - (this.sizeY * 10) / 16
    );

    //right hand
    map.line(
      this.x + this.sizeX / 2 + this.sizeX / 10,
      map.height - this.y - (this.sizeY * 11) / 16,
      this.x + this.sizeX / 2 + this.sizeX / 2,
      map.height - this.y - (this.sizeY * 15) / 16
    );

    //   line(this.x+ this.sizeX/2 - this.sizeX / 10, map.height - this.y - (this.sizeY * 11) / 16, this.x+ this.sizeX/2 -this.sizeX/2, map.height - this.y - (this.sizeY * 15) / 16);

    //left foot
    map.strokeWeight(4);
    map.line(
      this.x + this.sizeX / 2 - this.sizeX / 25,
      map.height - this.y - (this.sizeY * 3) / 16,
      this.x + this.sizeX / 2 - this.sizeX / 7,
      map.height - this.y - (this.sizeY * 3) / 80
    );
    map.line(
      this.x + this.sizeX / 2 - this.sizeX / 7,
      map.height - this.y - (this.sizeY * 3) / 80,
      this.x + this.sizeX / 2 - (this.sizeX * 12) / 50,
      map.height - this.y - (this.sizeY * 3) / 40
    );

    //right foot
    map.line(
      this.x + this.sizeX / 2 + this.sizeX / 25,
      map.height - this.y - (this.sizeY * 3) / 16,
      this.x + this.sizeX / 2 + (this.sizeX * 3) / 10,
      map.height - this.y - this.sizeX / 16
    );
    this.clearStrokesAndFills(map);
  }
  drawMovingRight(map) {
    //body
    map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    map.rect(
      this.x + this.sizeX / 2 - (this.sizeX * 3) / 50,
      map.height - this.y - (this.sizeY * 11) / 16,
      (this.sizeX * 3) / 25,
      this.sizeY / 2
    );
    //head
    this.#drawHead(map);

    //left hand
    map.line(
      this.x + this.sizeX / 2 - this.sizeX / 10,
      map.height - this.y - (this.sizeY * 11) / 16,
      this.x + this.sizeX / 2 - (this.sizeX * 12) / 50,
      map.height - this.y - this.sizeY / 2
    );
    map.line(
      this.x + this.sizeX / 2 - (this.sizeX * 12) / 50,
      map.height - this.y - this.sizeY / 2,
      this.x + this.sizeX / 2,
      map.height - this.y - (this.sizeY * 7) / 16
    );

    //right hand
    map.line(
      this.x + this.sizeX / 2 + this.sizeX / 10,
      map.height - this.y - (this.sizeY * 11) / 16,
      this.x + this.sizeX / 2 + (this.sizeX * 12) / 50,
      map.height - this.y - this.sizeY / 2
    );
    map.line(
      this.x + this.sizeX / 2 + (this.sizeX * 12) / 50,
      map.height - this.y - this.sizeY / 2,
      this.x + this.sizeX / 2 + this.sizeX / 2,
      map.height - this.y - (this.sizeY * 9) / 16
    );

    //left foot
    map.strokeWeight(4);
    //   line(this.x+ this.sizeX/2 - this.sizeX / 25, map.height - this.y - (this.sizeY * 3) / 16, this.x+ this.sizeX/2 - this.sizeX *3 /10, map.height - this.y - this.sizeX / 16);
    map.line(
      this.x + this.sizeX / 2 - this.sizeX / 25,
      map.height - this.y - (this.sizeY * 3) / 16,
      this.x + this.sizeX / 2 - this.sizeX / 7,
      map.height - this.y
    );
    //right foot
    //   line(this.x+ this.sizeX/2 + 2, map.height - this.y - (this.sizeY * 3) / 16, this.x+ this.sizeX/2 + this.sizeX/7, map.height - this.y);
    map.line(
      this.x + this.sizeX / 2 + this.sizeX / 25,
      map.height - this.y - (this.sizeY * 3) / 16,
      this.x + this.sizeX / 2 + (this.sizeX * 3) / 10,
      map.height - this.y - this.sizeX / 16
    );
    this.clearStrokesAndFills(map);
  }
  drawJumping(map) {
    //body
    map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    map.rect(
      this.x + this.sizeX / 2 - this.sizeX / 5,
      map.height - this.y - (this.sizeY * 11) / 16,
      (this.sizeX * 2) / 5,
      this.sizeY / 2
    );
    //head
    this.#drawHead(map);

    //left hand
    map.line(
      this.x + this.sizeX / 2 - this.sizeX / 5,
      map.height - this.y - (this.sizeY * 11) / 16,
      this.x + this.sizeX / 2 - this.sizeX / 2,
      map.height - this.y - (this.sizeY * 15) / 16
    );
    //right hand
    map.line(
      this.x + this.sizeX / 2 + this.sizeX / 5,
      map.height - this.y - (this.sizeY * 11) / 16,
      this.x + this.sizeX / 2 + this.sizeX / 2,
      map.height - this.y - (this.sizeY * 15) / 16
    );

    //left foot
    map.strokeWeight(4);
    map.line(
      this.x + this.sizeX / 2 - this.sizeX / 7,
      map.height - this.y - (this.sizeY * 3) / 16,
      this.x + this.sizeX / 2 - this.sizeX / 2,
      map.height - this.y - this.sizeY / 8
    );
    //right foot
    map.line(
      this.x + this.sizeX / 2 + this.sizeX / 7,
      map.height - this.y - (this.sizeY * 3) / 16,
      this.x + this.sizeX / 2 + this.sizeX / 2,
      map.height - this.y - this.sizeY / 8
    );
    this.clearStrokesAndFills(map);
  }
  drawStanding(map) {
    //body
    map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    map.rect(
      this.x + this.sizeX / 2 - this.sizeX / 5,
      map.height - this.y - (this.sizeY * 11) / 16,
      (this.sizeX * 2) / 5,
      this.sizeY / 2
    );
    //head
    this.#drawHead(map);

    //left hand
    map.line(
      this.x + this.sizeX / 2 - this.sizeX / 5,
      map.height - this.y - (this.sizeY * 11) / 16,
      this.x + this.sizeX / 2 - this.sizeX / 2,
      map.height - this.y - (this.sizeY * 7) / 16
    );
    //right hand
    map.line(
      this.x + this.sizeX / 2 + this.sizeX / 5,
      map.height - this.y - (this.sizeY * 11) / 16,
      this.x + this.sizeX / 2 + this.sizeX / 2,
      map.height - this.y - (this.sizeY * 7) / 16
    );

    //left foot
    map.strokeWeight(4);
    map.line(
      this.x + this.sizeX / 2 - this.sizeX / 7,
      map.height - this.y - (this.sizeY * 3) / 16,
      this.x + this.sizeX / 2 - this.sizeX / 7,
      map.height - this.y
    );
    //right foot
    map.line(
      this.x + this.sizeX / 2 + this.sizeX / 7,
      map.height - this.y - (this.sizeY * 3) / 16,
      this.x + this.sizeX / 2 + this.sizeX / 7,
      map.height - this.y
    );

    this.clearStrokesAndFills(map);
  }
  clearStrokesAndFills(map) {
    map.strokeWeight(1);
    map.noFill();
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
    //TODO:tv maybe we don't need to reinitialize backgroundObjects every time
    //create an update logic for when something is added, this could also be an
    //event logic, in general, research performance issues here.
    let interactiveObject = [];
    let enemies = [];
    let otherCharacters = [];
    let trophy = null;
    collisionObjects.forEach((collisionObject) => {
      switch (collisionObject.type) {
        case ObjectTypes.InteractiveObject:
          interactiveObject.push(collisionObject);
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
    this.#handleInteractiveObjectCollision(interactiveObject);
    this.#handleEnemyCollision(enemies);
    this.#handleTrophy(trophy);
  }
  takeDamage(damageTaken) {
    //kill character if they are out of lives, or else place at beginning of the map(falling down)
    this.lives -= damageTaken;
    if (this.lives <= 0) {
      this.isDead = true;
    } else {
      this.#horizontalSpeed = 0;
      this.#verticalSpeed = 10; //give a more smooth going down transition after death
      this.x = 0;
      this.y = 300;
    }
  }
  getCurrentSpeed() {
    return this.#horizontalSpeed;
  }
  hasWeapon() {
    return this.weaponDamage > 0;
  }
  #handleInteractiveObjectCollision = (collisionObjects) => {
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
        this.#verticalSpeed = -this.gravity;
        //this.stop(true);
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
        collisionEnemy.takeDamage(this.#damage, false);
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
  #drawHead = (map) => {
    map.noFill();
    map.strokeWeight(3);
    map.stroke(0, 0, 0);
    map.ellipse(
      this.x + this.sizeX / 2,
      map.height - this.y - (this.sizeY * 13) / 16,
      this.sizeX / 5,
      this.sizeY / 4
    );
  };
}
