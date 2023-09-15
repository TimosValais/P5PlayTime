import ColorObject from "../contracts/colorObj.js";
import { ObjectTypes, MovementTypes, Directions } from "../../helpers/enums.js";
import Character from "./character.js";
export default class Bunny extends Character {
  constructor(
    x,
    y,
    colorObject = new ColorObject(255, 255, 255),
    sizeX = 50,
    sizeY = 50
  ) {
    let speedX = sizeY > 99 ? 10 : 7;
    let speedY = sizeY > 99 ? 20 : 18;
    super(
      x,
      y,
      "Bunny",
      ObjectTypes.Character,
      speedX,
      speedY,
      1,
      colorObject,
      sizeX,
      sizeY,
      2,
      0
    );
  }

  drawMovingLeft(map) {
    //head
    this.#drawHead(map, Directions.LEFT);

    // //body
    this.#drawBody(map, Directions.LEFT);

    //legs
    this.#drawLegs(map, Directions.LEFT);
    //skateboard
    this.#drawSkateboard(map, Directions.LEFT);

    this.clearStrokesAndFills(map);
  }
  drawJumpingLeft(map) {
    //head
    this.#drawHead(map, Directions.LEFT, Directions.UP);

    // //body
    this.#drawBody(map, Directions.LEFT, Directions.UP);

    //legs
    this.#drawLegs(map, Directions.LEFT, Directions.UP);
    //skateboard
    this.#drawSkateboard(map, Directions.LEFT, Directions.UP);

    this.clearStrokesAndFills(map);
  }
  drawJumpingRight(map) {
    //head
    this.#drawHead(map, Directions.RIGHT, Directions.UP);
    // //body
    this.#drawBody(map, Directions.RIGHT, Directions.UP);

    //legs
    this.#drawLegs(map, Directions.RIGHT, Directions.UP);
    //skateboard
    this.#drawSkateboard(map, Directions.RIGHT, Directions.UP);

    this.clearStrokesAndFills(map);
  }
  drawMovingRight(map) {
    //head
    this.#drawHead(map, Directions.RIGHT);
    // //body
    this.#drawBody(map, Directions.RIGHT);

    //legs
    this.#drawLegs(map, Directions.RIGHT);
    //skateboard
    this.#drawSkateboard(map, Directions.RIGHT);

    this.clearStrokesAndFills(map);
  }
  drawStanding(map) {
    //head
    this.#drawHead(map, Directions.UP, Directions.DOWN);
    // //body
    this.#drawBody(map, Directions.UP, Directions.DOWN);

    //legs
    this.#drawLegs(map, Directions.UP, Directions.DOWN);
    //skateboard
    this.#drawSkateboard(map, Directions.UP, Directions.DOWN);
    this.clearStrokesAndFills(map);
  }
  drawJumping(map) {
    //head
    this.#drawHead(map, Directions.UP);
    // //body
    this.#drawBody(map, Directions.UP);

    //legs
    this.#drawLegs(map, Directions.UP);
    //skateboard
    this.#drawSkateboard(map, Directions.UP);
    this.clearStrokesAndFills(map);
  }

  #drawBody = (map, firstDirection, secondDirection = null) => {
    switch (true) {
      case firstDirection == Directions.UP && !!!secondDirection:
      case firstDirection == Directions.UP &&
        secondDirection == Directions.DOWN:
      case firstDirection == Directions.RIGHT && !!!secondDirection:
      case firstDirection == Directions.LEFT && !!!secondDirection:
      case firstDirection == Directions.LEFT &&
        secondDirection == Directions.UP:
      case firstDirection == Directions.RIGHT &&
        secondDirection == Directions.UP:
        map.stroke(0, 0, 0);
        map.strokeWeight(1);
        map.fill(
          this.color.red,
          this.color.green,
          this.color.blue,
          this.color.transparency
        );
        map.ellipse(
          this.x + (this.sizeY * 3) / 10,
          map.height - this.y - (this.sizeY * 4) / 10,
          (2 * (this.sizeY * 17)) / 100
        );
        this.clearStrokesAndFills(map);
        break;

      default:
        break;
    }
  };
  #drawHead = (map, firstDirection, secondDirection = null) => {
    switch (true) {
      case firstDirection == Directions.LEFT && !!!secondDirection:
      case firstDirection == Directions.LEFT &&
        secondDirection == Directions.UP:
        this.#drawEars(
          map,
          {
            A: {
              x: this.x + (this.sizeY * 4) / 10,
              y: map.height - this.y - this.sizeY,
            },
            B: {
              x: this.x + (this.sizeY * 3) / 10,
              y: map.height - this.y - (this.sizeY * 8.5) / 10,
            },
            C: {
              x: this.x + (this.sizeY * 6) / 10,
              y: map.height - this.y - (this.sizeY * 9) / 10,
            },
          },
          {
            A: {
              x: this.x + (this.sizeY * 5) / 10,
              y: map.height - this.y - (this.sizeY * 8.5) / 10,
            },
            B: {
              x: this.x + (this.sizeY * 3) / 10,
              y: map.height - this.y - (this.sizeY * 8.5) / 10,
            },
            C: {
              x: this.x + (this.sizeY * 6) / 10,
              y: map.height - this.y - (this.sizeY * 7) / 10,
            },
          }
        );
        this.#drawFace(
          map,
          {
            x: this.x + (this.sizeY * 3) / 10,
            y: map.height - this.y - (this.sizeY * 8.5) / 10,
          },
          {
            center: {
              x: this.x + (this.sizeY * 2) / 10,
              y: map.height - this.y - (this.sizeY * 6.5) / 10,
            },
            radius: Math.ceil((this.sizeY * 1) / 10),
          },
          {
            center: {
              x: this.x + (this.sizeY * 4) / 10,
              y: map.height - this.y - (this.sizeY * 6.5) / 10,
            },
            radius: Math.ceil((this.sizeY * 1) / 10),
          }
        );
        this.#drawSymbol(
          map,
          this.x + (this.sizeY * 2) / 10,
          map.height - this.y - (this.sizeY * 7.5) / 10,
          (this.sizeY * 2) / 20,
          "<\t<",
          this.sizeY / 12.5,
          "CENTER"
        );
        this.#drawSymbol(
          map,
          this.x + (this.sizeY * 2) / 10,
          map.height - this.y - (this.sizeY * 6.8) / 10,
          0,
          "\\\n-\n/",
          this.sizeY / 30,
          "LEFT"
        );
        this.#drawSymbol(
          map,
          this.x + (this.sizeY * 4) / 10,
          map.height - this.y - (this.sizeY * 6.8) / 10,
          0,
          "/\n-\n\\",
          this.sizeY / 30,
          "RIGHT"
        );
        break;
      case firstDirection == Directions.RIGHT && !!!secondDirection:
      case firstDirection == Directions.RIGHT &&
        secondDirection == Directions.UP:
        this.#drawEars(
          map,
          {
            A: {
              x: this.x,
              y: map.height - this.y - (this.sizeY * 7) / 10,
            },
            B: {
              x: this.x + (this.sizeY * 1) / 10,
              y: map.height - this.y - (this.sizeY * 8.5) / 10,
            },
            C: {
              x: this.x + (this.sizeY * 3) / 10,
              y: map.height - this.y - (this.sizeY * 8.5) / 10,
            },
          },
          {
            A: {
              x: this.x,
              y: map.height - this.y - (this.sizeY * 9) / 10,
            },
            B: {
              x: this.x + (this.sizeY * 3) / 10,
              y: map.height - this.y - (this.sizeY * 8.5) / 10,
            },
            C: {
              x: this.x + (this.sizeY * 2) / 10,
              y: map.height - this.y - this.sizeY,
            },
          }
        );
        this.#drawFace(
          map,
          {
            x: this.x + (this.sizeY * 3) / 10,
            y: map.height - this.y - (this.sizeY * 8.5) / 10,
          },
          {
            center: {
              x: this.x + (this.sizeY * 2) / 10,
              y: map.height - this.y - (this.sizeY * 6.5) / 10,
            },
            radius: Math.ceil((this.sizeY * 1) / 10),
          },
          {
            center: {
              x: this.x + (this.sizeY * 4) / 10,
              y: map.height - this.y - (this.sizeY * 6.5) / 10,
            },
            radius: Math.ceil((this.sizeY * 1) / 10),
          }
        );
        this.#drawSymbol(
          map,
          this.x + (this.sizeY * 2) / 10,
          map.height - this.y - (this.sizeY * 7.5) / 10,
          (this.sizeY * 2) / 20,
          "<\t<",
          this.sizeY / 12.5,
          "CENTER"
        );
        this.#drawSymbol(
          map,
          this.x + (this.sizeY * 2) / 10,
          map.height - this.y - (this.sizeY * 6.8) / 10,
          0,
          "\\\n-\n/",
          this.sizeY / 30,
          "LEFT"
        );
        this.#drawSymbol(
          map,
          this.x + (this.sizeY * 4) / 10,
          map.height - this.y - (this.sizeY * 6.8) / 10,
          0,
          "/\n-\n\\",
          this.sizeY / 30,
          "RIGHT"
        );
        break;
      case firstDirection == Directions.UP && !!!secondDirection:
      case firstDirection == Directions.UP &&
        secondDirection == Directions.DOWN:
        this.#drawEars(
          map,
          {
            A: {
              x: this.x + (this.sizeY * 2) / 10,
              y: map.height - this.y - this.sizeY,
            },
            B: {
              x: this.x + (this.sizeY * 1) / 10,
              y: map.height - this.y - (this.sizeY * 9) / 10,
            },
            C: {
              x: this.x + (this.sizeY * 3) / 10,
              y: map.height - this.y - (this.sizeY * 8.5) / 10,
            },
          },
          {
            A: {
              x: this.x + (this.sizeY * 4) / 10,
              y: map.height - this.y - this.sizeY,
            },
            B: {
              x: this.x + (this.sizeY * 5) / 10,
              y: map.height - this.y - (this.sizeY * 9) / 10,
            },
            C: {
              x: this.x + (this.sizeY * 3) / 10,
              y: map.height - this.y - (this.sizeY * 8.5) / 10,
            },
          }
        );
        this.#drawFace(
          map,
          {
            x: this.x + (this.sizeY * 3) / 10,
            y: map.height - this.y - (this.sizeY * 8.5) / 10,
          },
          {
            center: {
              x: this.x + (this.sizeY * 2) / 10,
              y: map.height - this.y - (this.sizeY * 6.5) / 10,
            },
            radius: Math.ceil((this.sizeY * 1) / 10),
          },
          {
            center: {
              x: this.x + (this.sizeY * 4) / 10,
              y: map.height - this.y - (this.sizeY * 6.5) / 10,
            },
            radius: Math.ceil((this.sizeY * 1) / 10),
          }
        );
        this.#drawSymbol(
          map,
          this.x + (this.sizeY * 2) / 10,
          map.height - this.y - (this.sizeY * 7.5) / 10,
          (this.sizeY * 2) / 20,
          "o\to",
          this.sizeY / 12.5,
          "CENTER"
        );
        this.#drawSymbol(
          map,
          this.x + (this.sizeY * 2) / 10,
          map.height - this.y - (this.sizeY * 6.8) / 10,
          0,
          "\\\n-\n/",
          this.sizeY / 30,
          "LEFT"
        );
        this.#drawSymbol(
          map,
          this.x + (this.sizeY * 4) / 10,
          map.height - this.y - (this.sizeY * 6.8) / 10,
          0,
          "/\n-\n\\",
          this.sizeY / 30,
          "RIGHT"
        );
        break;
      default:
        break;
    }
  };
  #drawLegs = (map, firstDirection, secondDirection = null) => {
    switch (true) {
      case firstDirection == Directions.UP &&
        secondDirection == Directions.DOWN:
      case firstDirection == Directions.RIGHT && !!!secondDirection:
      case firstDirection == Directions.LEFT && !!!secondDirection:
        map.stroke(0, 0, 0);
        map.strokeWeight(2);
        map.noFill();
        map.line(
          this.x + (this.sizeY * 2) / 10,
          map.height - this.y - (this.sizeY * 2) / 10,
          this.x + (this.sizeY * 2) / 10,
          map.height - this.y - (this.sizeY * 1) / 10
        );
        map.line(
          this.x + (this.sizeY * 4) / 10,
          map.height - this.y - (this.sizeY * 2) / 10,
          this.x + (this.sizeY * 4) / 10,
          map.height - this.y - (this.sizeY * 1) / 10
        );
        this.clearStrokesAndFills(map);
        break;
      case firstDirection == Directions.LEFT &&
        secondDirection == Directions.UP:
        map.stroke(0, 0, 0);
        map.strokeWeight(2);
        map.noFill();
        map.line(
          this.x,
          map.height - this.y - (this.sizeY * 3) / 10,
          this.x + (this.sizeY * 2) / 10,
          map.height - this.y - (this.sizeY * 3) / 10
        );
        map.line(
          this.x + (this.sizeY * 2) / 10,
          map.height - this.y - (this.sizeY * 2) / 10,
          this.x + (this.sizeY * 4) / 10,
          map.height - this.y - (this.sizeY * 3) / 10
        );
        this.clearStrokesAndFills(map);
        break;
      case firstDirection == Directions.RIGHT &&
        secondDirection == Directions.UP:
        map.stroke(0, 0, 0);
        map.strokeWeight(2);
        map.noFill();
        map.line(
          this.x + (this.sizeY * 2) / 10,
          map.height - this.y - (this.sizeY * 3) / 10,
          this.x + (this.sizeY * 4) / 10,
          map.height - this.y - (this.sizeY * 2) / 10
        );
        map.line(
          this.x + (this.sizeY * 4) / 10,
          map.height - this.y - (this.sizeY * 3) / 10,
          this.x + (this.sizeY * 6) / 10,
          map.height - this.y - (this.sizeY * 3) / 10
        );
        this.clearStrokesAndFills(map);
        break;
      case firstDirection == Directions.UP && !!!secondDirection:
        map.stroke(0, 0, 0);
        map.strokeWeight(2);
        map.noFill();
        map.line(
          this.x + (this.sizeY * 2) / 10,
          map.height - this.y - (this.sizeY * 3) / 10,
          this.x + (this.sizeY * 1) / 10,
          map.height - this.y - (this.sizeY * 2) / 10
        );
        map.line(
          this.x + (this.sizeY * 4) / 10,
          map.height - this.y - (this.sizeY * 3) / 10,
          this.x + (this.sizeY * 5) / 10,
          map.height - this.y - (this.sizeY * 2) / 10
        );
        this.clearStrokesAndFills(map);
        break;
      default:
        break;
    }
  };
  #drawSkateboard = (map, firstDirection, secondDirection = null) => {
    switch (true) {
      case firstDirection == Directions.UP &&
        secondDirection == Directions.DOWN:
      case firstDirection == Directions.UP && !!!secondDirection:
      case firstDirection == Directions.RIGHT && !!!secondDirection:
      case firstDirection == Directions.LEFT && !!!secondDirection:
        map.stroke(0, 0, 0);
        map.strokeWeight(2);
        map.noFill();
        map.line(
          this.x,
          map.height - this.y - (this.sizeY * 1) / 10,
          this.x + (this.sizeY * 6) / 10,
          map.height - this.y - (this.sizeY * 1) / 10
        );
        map.ellipse(
          this.x + (this.sizeY * 1) / 10,
          map.height - this.y - (this.sizeY * 5) / 100,
          (2 * (this.sizeY * 5)) / 100,
          (2 * (this.sizeY * 5)) / 100
        );
        map.ellipse(
          this.x + (this.sizeY * 5) / 10,
          map.height - this.y - (this.sizeY * 5) / 100,
          (2 * (this.sizeY * 5)) / 100,
          (2 * (this.sizeY * 5)) / 100
        );
        this.clearStrokesAndFills(map);

        break;
      case firstDirection == Directions.LEFT &&
        secondDirection == Directions.UP:
        map.stroke(0, 0, 0);
        map.strokeWeight(2);
        map.noFill();
        map.line(
          this.x,
          map.height - this.y - (this.sizeY * 3) / 10,
          this.x + (this.sizeY * 4) / 10,
          map.height - this.y - (this.sizeY * 1) / 10
        );
        map.ellipse(
          this.x + (this.sizeY * 1) / 10,
          map.height - this.y - (this.sizeY * 2) / 10,
          (2 * (this.sizeY * 5)) / 100,
          (2 * (this.sizeY * 5)) / 100
        );
        map.ellipse(
          this.x + (this.sizeY * 3) / 10,
          map.height - this.y - (this.sizeY * 1) / 10,
          (2 * (this.sizeY * 5)) / 100,
          (2 * (this.sizeY * 5)) / 100
        );
        this.clearStrokesAndFills(map);
        break;
      case firstDirection == Directions.RIGHT &&
        secondDirection == Directions.UP:
        map.stroke(0, 0, 0);
        map.strokeWeight(2);
        map.noFill();
        map.line(
          this.x + (this.sizeY * 2) / 10,
          map.height - this.y - (this.sizeY * 1) / 10,
          this.x + (this.sizeY * 6) / 10,
          map.height - this.y - (this.sizeY * 3) / 10
        );
        map.ellipse(
          this.x + (this.sizeY * 3) / 10,
          map.height - this.y - (this.sizeY * 1) / 10,
          (2 * (this.sizeY * 5)) / 100,
          (2 * (this.sizeY * 5)) / 100
        );
        map.ellipse(
          this.x + (this.sizeY * 5) / 10,
          map.height - this.y - (this.sizeY * 2) / 10,
          (2 * (this.sizeY * 5)) / 100,
          (2 * (this.sizeY * 5)) / 100
        );
        this.clearStrokesAndFills(map);
        break;
      default:
        break;
    }
  };
  #drawEars = (map, firstTriangle, secondTriangle) => {
    map.stroke(0, 0, 0);
    map.strokeWeight(2);
    map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    map.triangle(
      firstTriangle.A.x,
      firstTriangle.A.y,
      firstTriangle.B.x,
      firstTriangle.B.y,
      firstTriangle.C.x,
      firstTriangle.C.y
    );
    map.triangle(
      secondTriangle.A.x,
      secondTriangle.A.y,
      secondTriangle.B.x,
      secondTriangle.B.y,
      secondTriangle.C.x,
      secondTriangle.C.y
    );
    this.clearStrokesAndFills(map);
  };
  #drawFace = (map, topHeadPosition, leftCheek, rightCheek) => {
    map.noStroke();
    map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    map.triangle(
      topHeadPosition.x,
      topHeadPosition.y,
      leftCheek.center.x,
      leftCheek.center.y,
      rightCheek.center.x,
      rightCheek.center.y
    );
    map.stroke(0, 0, 0);
    map.strokeWeight(1);

    map.ellipse(
      leftCheek.center.x,
      leftCheek.center.y,
      2 * leftCheek.radius,
      2 * leftCheek.radius
    );
    map.ellipse(
      rightCheek.center.x,
      rightCheek.center.y,
      2 * rightCheek.radius,
      2 * rightCheek.radius
    );

    map.line(
      topHeadPosition.x,
      topHeadPosition.y,
      leftCheek.center.x,
      leftCheek.center.y - leftCheek.radius
    );
    map.line(
      topHeadPosition.x,
      topHeadPosition.y,
      rightCheek.center.x,
      rightCheek.center.y - rightCheek.radius
    );
    this.clearStrokesAndFills(map);
  };
  #drawSymbol = (
    map,
    horizontalCenter,
    verticalCenter,
    horizontalDistance,
    text,
    textSize,
    textAlign = "RIGHT"
  ) => {
    map.noFill();
    map.stroke(0, 0, 0);
    map.strokeWeight(1);
    map.textSize(textSize);
    switch (textAlign) {
      case "RIGHT":
        map.textAlign(map.RIGHT);
        break;
      case "CENTER":
        map.textAlign(map.CENTER);
        break;
      case "LEFT":
        map.textAlign(map.LEFT);
        break;
      default:
        break;
    }
    map.text(text, horizontalCenter + horizontalDistance, verticalCenter);
    this.clearStrokesAndFills(map);
  };
}
