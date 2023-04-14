import { Directions, ObjectTypes } from "../../helpers/enums.js";
import ColorObject from "./colorObj.js";
export default class GameOjbect {
  constructor(
    x,
    y,
    width,
    height,
    colorObject = new ColorObject(),
    stepX = 10,
    stepY = 15
    //shape = null
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = colorObject;
    this.stepX = stepX;
    this.stepY = stepY;
  }
  collidesWith(otherObject) {
    //TODO:tv maybe remove these for memory allocation and just do straight the comparisons
    let leftPointBeforeRightPoint = this.x < otherObject.x + otherObject.width;
    let rightPointAfterLeftPoint = this.x + this.width > otherObject.x;
    let verticalCollision =
      leftPointBeforeRightPoint && rightPointAfterLeftPoint;
    let lowestPointIsBelowHighest = this.y < otherObject.y + otherObject.height;
    let highestPointIsAboveLowest = this.y + this.height > otherObject.y;

    let horizontalCollision =
      lowestPointIsBelowHighest && highestPointIsAboveLowest;

    //prioritize vertical from horizontal collitions
    if (verticalCollision) {
      let over =
        this.y <= otherObject.y + otherObject.height + this.stepY &&
        this.y >= otherObject.y + otherObject.height - this.stepY;
      let under =
        this.y + this.height <= otherObject.y + this.stepY &&
        this.y + this.height >= otherObject.y - this.stepY;
      if (over) return Directions.UP;
      if (under) return Directions.DOWN;
    }
    if (horizontalCollision) {
      let left =
        this.x <= otherObject.x + otherObject.width + this.stepX &&
        this.x >= otherObject.x + otherObject.width - this.stepX;
      let right =
        this.x + this.width <= otherObject.x + this.stepX &&
        this.x + this.width >= otherObject.x - this.stepX;
      if (left) return Directions.LEFT;
      if (right) return Directions.RIGHT;
    }
    return null;
  }

  draw(p5Map) {
    p5Map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    p5Map.rect(
      this.x,
      p5Map.groundY - this.y - this.height,
      this.width,
      this.height
    );
  }
  handleCollisions(collisionObjects) {
    collisionObjects.forEach((collisionObject) =>
      console.log("Oh no, I collided with ", collisionObject, "object")
    );
  }
}
