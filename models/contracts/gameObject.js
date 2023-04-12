import { Directions } from "../../helpers/enums.js";
import ColorObject from "./colorObj.js";
export default class GameOjbect {
  constructor(
    x,
    y,
    width,
    height,
    colorObject = new ColorObject(),
    stepX = 5,
    stepY = 10
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
    // console.log("collides with : ", otherObject, "this is : ", this);
    // console.log("collides with : ", otherObject.x, "this is : ", this.x);
    // console.log("collides with : ", otherObject.y, "this is : ", this.y);
    // console.log(
    //   "collides with : ",
    //   otherObject.width,
    //   "this is : ",
    //   this.width
    // );
    // console.log(
    //   "collides with : ",
    //   otherObject.height,
    //   "this is : ",
    //   this.height
    // );
    //TODO:tv maybe remove these for memory allocation and just do straight the comparisons
    let leftPointBeforeRightPoint = this.x < otherObject.x + otherObject.width;
    let rightPointAfterLeftPoint = this.x + this.width > otherObject.x;
    let verticalCollision =
      leftPointBeforeRightPoint && rightPointAfterLeftPoint;

    let lowestPointIsBelowHighest = this.y < otherObject.y + otherObject.height;
    let highestPointIsAboveLowest = this.y + this.height > otherObject.y;
    // console.log(
    //   "the comparisson : ",
    //   lowestPointIsBelowHighest,
    //   highestPointIsAboveLowest
    // );
    let horizontalCollision =
      lowestPointIsBelowHighest && highestPointIsAboveLowest;
    if (verticalCollision) {
      //prioritize vertical from horizontal collitions
      // console.log("the verticalCollision : ", verticalCollision);
      // console.log("vertical collided first");
      let over =
        this.y <= otherObject.y + otherObject.height + this.stepY &&
        this.y >= otherObject.y + otherObject.height - this.stepY;
      let under =
        this.y + this.height <= otherObject.y + this.stepY &&
        this.y + this.height >= otherObject.y - this.stepY;
      // console.log("is it done? : ", over || under);
      if (over) return Directions.UP;
      if (under) return Directions.DOWN;
    }
    if (horizontalCollision) {
      let left =
        this.x <= otherObject.x + otherObject.width + this.stepX &&
        this.x >= otherObject.x + otherObject.width - this.stepX;
      // if (left)
      //   console.log(
      //     "left collision : ",
      //     this.x,
      //     otherObject.x,
      //     otherObject.width
      //   );
      let right =
        this.x + this.width <= otherObject.x + this.stepX &&
        this.x + this.width >= otherObject.x - this.stepX;
      // console.log("right non collision : ", this.x, this.width, otherObject.x);
      if (right)
        console.log(
          "right collision : ",
          this.x,
          otherObject.x,
          otherObject.width
        );
      if (left) return Directions.LEFT;
      if (right) return Directions.RIGHT;
    }
    return null;
  }

  draw(p5Map) {
    p5Map.fill(this.color.red, this.color.green, this.color.blue);
    p5Map.rect(
      this.x,
      p5Map.groundY - this.y - this.height,
      this.width,
      this.height
    );
  }
}
