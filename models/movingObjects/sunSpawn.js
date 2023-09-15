import ColorObject from "../contracts/colorObj.js";
import { ObjectTypes, MovementTypes, Directions } from "../../helpers/enums.js";
import Character from "./character.js";
import { refreshStrokesAndFills } from "../../helpers/p5HelperFunctions.js";
import SampleEnemy from "./sampleEnemy.js";
export default class SunSpawn extends SampleEnemy {
  constructor(
    x,
    y,
    name = "Sun Spawn",
    type = ObjectTypes.Enemy,
    horizontalSpeedCapacity = 3,
    verticalSpeedCapacity = 0,
    gravity = 1,
    colorObject = new ColorObject(253, 184, 19),
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
  }

  drawMovingLeft(map) {
    //rays
    this.#drawRays(map, Directions.LEFT);

    // //body
    this.#drawBody(map, Directions.LEFT);

    refreshStrokesAndFills(map);
  }
  drawJumpingLeft(map) {
    //rays
    this.#drawRays(map, Directions.LEFT, Directions.UP);

    // //body
    this.#drawBody(map, Directions.LEFT, Directions.UP);

    refreshStrokesAndFills(map);
  }
  drawJumpingRight(map) {
    //rays
    this.#drawRays(map, Directions.RIGHT, Directions.UP);
    // //body
    this.#drawBody(map, Directions.RIGHT, Directions.UP);

    refreshStrokesAndFills(map);
  }
  drawMovingRight(map) {
    //rays
    this.#drawRays(map, Directions.RIGHT);
    // //body
    this.#drawBody(map, Directions.RIGHT);

    refreshStrokesAndFills(map);
  }
  drawStanding(map) {
    //rays
    this.#drawRays(map, Directions.UP, Directions.DOWN);
    // //body
    this.#drawBody(map, Directions.UP, Directions.DOWN);

    refreshStrokesAndFills(map);
  }
  drawJumping(map) {
    //rays
    this.#drawRays(map, Directions.UP);
    // //body
    this.#drawBody(map, Directions.UP);

    refreshStrokesAndFills(map);
  }

  #drawBody = (map, firstDirection, secondDirection = null) => {
    let faceShape = "";
    switch (true) {
      case firstDirection == Directions.UP && !!!secondDirection:
      case firstDirection == Directions.LEFT &&
        secondDirection == Directions.UP:
      case firstDirection == Directions.RIGHT &&
        secondDirection == Directions.UP:
        faceShape = "^\t^";
        break;
      case firstDirection == Directions.RIGHT && !!!secondDirection:
      case firstDirection == Directions.LEFT && !!!secondDirection:
      case firstDirection == Directions.UP &&
        secondDirection == Directions.DOWN:
      default:
        faceShape = "O\tO";
        break;
    }
    map.stroke(0, 0, 0);
    map.strokeWeight(1);
    map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    map.ellipse(
      this.x + (this.sizeY * 5.5) / 10,
      map.height - this.y - (this.sizeY * 4.5) / 10,
      (2 * (this.sizeY * 1.5)) / 10
    );
    this.#drawSymbol(
      map,
      this.x + (this.sizeY * 4.5) / 10,
      map.height - this.y - (this.sizeY * 4.9) / 10,
      (this.sizeY * 2) / 20,
      faceShape,
      this.sizeY / 12.5,
      "CENTER"
    );
    refreshStrokesAndFills(map);
  };

  #drawRays = (map, firstDirection, secondDirection = null) => {
    let points = [];
    switch (true) {
      case firstDirection == Directions.RIGHT && !!!secondDirection:
      case firstDirection == Directions.LEFT && !!!secondDirection:
      case firstDirection == Directions.UP &&
        secondDirection == Directions.DOWN:
        points.push(
          [
            {
              x: this.x + (this.sizeY * 4) / 10,
              y: map.height - this.y - (this.sizeY * 5) / 10,
            },
            {
              x: this.x + (this.sizeY * 3) / 10,
              y: map.height - this.y - (this.sizeY * 5.5) / 10,
            },
            {
              x: this.x + (this.sizeY * 3.5) / 10,
              y: map.height - this.y - (this.sizeY * 6.5) / 10,
            },
            {
              x: this.x + (this.sizeY * 2.5) / 10,
              y: map.height - this.y - (this.sizeY * 7.5) / 10,
            },
          ],
          [
            {
              x: this.x + (this.sizeY * 5.5) / 10,
              y: map.height - this.y - (this.sizeY * 6) / 10,
            },
            {
              x: this.x + (this.sizeY * 6) / 10,
              y: map.height - this.y - (this.sizeY * 7) / 10,
            },
            {
              x: this.x + (this.sizeY * 5) / 10,
              y: map.height - this.y - (this.sizeY * 7.5) / 10,
            },
            {
              x: this.x + (this.sizeY * 6) / 10,
              y: map.height - this.y - (this.sizeY * 8) / 10,
            },
            {
              x: this.x + (this.sizeY * 5) / 10,
              y: map.height - this.y - (this.sizeY * 8.5) / 10,
            },
            {
              x: this.x + (this.sizeY * 6) / 10,
              y: map.height - this.y - (this.sizeY * 9) / 10,
            },
            {
              x: this.x + (this.sizeY * 5) / 10,
              y: map.height - this.y - (this.sizeY * 9.5) / 10,
            },
            {
              x: this.x + (this.sizeY * 6) / 10,
              y: map.height - this.y - this.sizeY,
            },
          ],
          [
            {
              x: this.x + (this.sizeY * 7) / 10,
              y: map.height - this.y - (this.sizeY * 5) / 10,
            },
            {
              x: this.x + (this.sizeY * 8) / 10,
              y: map.height - this.y - (this.sizeY * 5.5) / 10,
            },
            {
              x: this.x + (this.sizeY * 7.5) / 10,
              y: map.height - this.y - (this.sizeY * 6.5) / 10,
            },
            {
              x: this.x + (this.sizeY * 8.5) / 10,
              y: map.height - this.y - (this.sizeY * 7.5) / 10,
            },
          ]
        );
        break;
      case firstDirection == Directions.UP && !!!secondDirection:
      case firstDirection == Directions.LEFT &&
        secondDirection == Directions.UP:
      case firstDirection == Directions.RIGHT &&
        secondDirection == Directions.UP:
        points.push(
          [
            {
              x: this.x + (this.sizeY * 4) / 10,
              y: map.height - this.y - (this.sizeY * 5) / 10,
            },
            {
              x: this.x + (this.sizeY * 3) / 10,
              y: map.height - this.y - (this.sizeY * 5.5) / 10,
            },
            {
              x: this.x + (this.sizeY * 2) / 10,
              y: map.height - this.y - (this.sizeY * 5) / 10,
            },
            {
              x: this.x + (this.sizeY * 1) / 10,
              y: map.height - this.y - (this.sizeY * 6) / 10,
            },
          ],
          [
            {
              x: this.x + (this.sizeY * 5.5) / 10,
              y: map.height - this.y - (this.sizeY * 6) / 10,
            },
            {
              x: this.x + (this.sizeY * 6) / 10,
              y: map.height - this.y - (this.sizeY * 7) / 10,
            },
            {
              x: this.x + (this.sizeY * 5) / 10,
              y: map.height - this.y - (this.sizeY * 7.5) / 10,
            },
            {
              x: this.x + (this.sizeY * 6) / 10,
              y: map.height - this.y - (this.sizeY * 8) / 10,
            },
            {
              x: this.x + (this.sizeY * 5) / 10,
              y: map.height - this.y - (this.sizeY * 8.5) / 10,
            },
            {
              x: this.x + (this.sizeY * 6) / 10,
              y: map.height - this.y - (this.sizeY * 9) / 10,
            },
            {
              x: this.x + (this.sizeY * 5) / 10,
              y: map.height - this.y - (this.sizeY * 9.5) / 10,
            },
            {
              x: this.x + (this.sizeY * 6) / 10,
              y: map.height - this.y - this.sizeY,
            },
          ],
          [
            {
              x: this.x + (this.sizeY * 7) / 10,
              y: map.height - this.y - (this.sizeY * 5) / 10,
            },
            {
              x: this.x + (this.sizeY * 8) / 10,
              y: map.height - this.y - (this.sizeY * 5.5) / 10,
            },
            {
              x: this.x + (this.sizeY * 9) / 10,
              y: map.height - this.y - (this.sizeY * 5) / 10,
            },
            {
              x: this.x + this.sizeY,
              y: map.height - this.y - (this.sizeY * 6) / 10,
            },
          ]
        );

        break;

      default:
        break;
    }
    map.stroke(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    map.strokeWeight(3);
    map.noFill();
    for (let i = 0; i < points.length; i++) {
      map.beginShape();

      for (let j = 0; j < points[i].length - 1; j++) {
        map.line(
          points[i][j].x,
          points[i][j].y,
          points[i][j + 1].x,
          points[i][j + 1].y
        );
      }
      map.endShape();
    }
    refreshStrokesAndFills(map);
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
    refreshStrokesAndFills(map);
  };
}
