import ColorObject from "../contracts/colorObj.js";
import { ObjectTypes, MovementTypes, Directions } from "../../helpers/enums.js";
import Character from "./character.js";
export default class Snowman extends Character {
  constructor(
    x,
    y,
    colorObject = new ColorObject(255, 255, 255),
    sizeX = 50,
    sizeY = 50
  ) {
    super(
      x,
      y,
      "Snowman",
      ObjectTypes.Character,
      5,
      25,
      1,
      colorObject,
      sizeX,
      sizeY
    );
  }

  drawMovingLeft(map) {
    //head
    this.#drawHead(map, Directions.LEFT);

    //body
    let bodyPlacement = {
      x: this.x + this.sizeX / 2,
      y: map.height - this.y - (this.sizeY * 6.5) / 10,
      radius: (this.sizeY * 3) / 10,
    };
    this.#drawSnowmanPart(
      map,
      bodyPlacement.x,
      bodyPlacement.y,
      bodyPlacement.radius
    );

    //draw leg body
    let legBodyPlacement = {
      x: this.x + this.sizeX / 2,
      y: map.height - this.y - (this.sizeY * 2.5) / 10,
      radius: (this.sizeY * 5) / 10,
    };

    this.#drawSnowmanPart(
      map,
      legBodyPlacement.x,
      legBodyPlacement.y,
      legBodyPlacement.radius
    );

    //draw hands
    this.#drawSymbols(
      map,
      bodyPlacement.x,
      bodyPlacement.y,
      bodyPlacement.radius,
      Directions.LEFT,
      this.sizeY / 12.5
    );

    this.clearStrokesAndFills(map);
  }
  drawJumpingLeft(map) {
    //head
    this.#drawHead(map, Directions.LEFT, Directions.UP);

    //body
    let bodyPlacement = {
      x: this.x + this.sizeX / 2 - (this.sizeY * 7) / 100,
      y: map.height - this.y - (this.sizeY * 62) / 100,
      radius: (this.sizeY * 25) / 100,
    };
    this.#drawSnowmanPart(
      map,
      bodyPlacement.x,
      bodyPlacement.y,
      bodyPlacement.radius
    );

    //draw leg body
    let legBodyPlacement = {
      x: this.x + this.sizeX / 2,
      y: map.height - this.y - (this.sizeY * 20) / 100,
      radius: (this.sizeY * 4) / 10,
    };

    this.#drawSnowmanPart(
      map,
      legBodyPlacement.x,
      legBodyPlacement.y,
      legBodyPlacement.radius
    );

    //draw hands
    this.#drawSymbols(
      map,
      bodyPlacement.x,
      bodyPlacement.y,
      bodyPlacement.radius,
      Directions.LEFT,
      this.sizeY / 22,
      Directions.UP
    );

    this.clearStrokesAndFills(map);
  }
  drawJumpingRight(map) {
    //head
    this.#drawHead(map, Directions.RIGHT, Directions.UP);

    //body
    let bodyPlacement = {
      x: this.x + this.sizeX / 2 - (this.sizeY * 7) / 100,
      y: map.height - this.y - (this.sizeY * 62) / 100,
      radius: (this.sizeY * 25) / 100,
    };
    this.#drawSnowmanPart(
      map,
      bodyPlacement.x,
      bodyPlacement.y,
      bodyPlacement.radius
    );

    //draw leg body
    let legBodyPlacement = {
      x: this.x + this.sizeX / 2 - (this.sizeY * 14) / 100,
      y: map.height - this.y - (this.sizeY * 20) / 100,
      radius: (this.sizeY * 4) / 10,
    };

    this.#drawSnowmanPart(
      map,
      legBodyPlacement.x,
      legBodyPlacement.y,
      legBodyPlacement.radius
    );

    //draw hands
    this.#drawSymbols(
      map,
      bodyPlacement.x,
      bodyPlacement.y,
      bodyPlacement.radius,
      Directions.RIGHT,
      this.sizeY / 22,
      Directions.UP
    );

    this.clearStrokesAndFills(map);
  }
  drawMovingRight(map) {
    //head
    this.#drawHead(map, Directions.RIGHT);

    //body
    let bodyPlacement = {
      x: this.x + this.sizeX / 2,
      y: map.height - this.y - (this.sizeY * 6.5) / 10,
      radius: (this.sizeY * 3) / 10,
    };
    this.#drawSnowmanPart(
      map,
      bodyPlacement.x,
      bodyPlacement.y,
      bodyPlacement.radius
    );

    //draw leg body
    let legBodyPlacement = {
      x: this.x + this.sizeX / 2,
      y: map.height - this.y - (this.sizeY * 2.5) / 10,
      radius: (this.sizeY * 5) / 10,
    };

    this.#drawSnowmanPart(
      map,
      legBodyPlacement.x,
      legBodyPlacement.y,
      legBodyPlacement.radius
    );

    //draw hands
    this.#drawSymbols(
      map,
      bodyPlacement.x,
      bodyPlacement.y,
      bodyPlacement.radius,
      Directions.RIGHT,
      this.sizeY / 12.5
    );

    this.clearStrokesAndFills(map);
  }
  drawStanding(map) {
    //head
    this.#drawHead(map, Directions.UP, Directions.DOWN);

    //body
    let bodyPlacement = {
      x: this.x + this.sizeX / 2,
      y: map.height - this.y - (this.sizeY * 6.5) / 10,
      radius: (this.sizeY * 3) / 10,
    };
    this.#drawSnowmanPart(
      map,
      bodyPlacement.x,
      bodyPlacement.y,
      bodyPlacement.radius
    );

    //draw leg body
    let legBodyPlacement = {
      x: this.x + this.sizeX / 2,
      y: map.height - this.y - (this.sizeY * 2.5) / 10,
      radius: (this.sizeY * 5) / 10,
    };

    this.#drawSnowmanPart(
      map,
      legBodyPlacement.x,
      legBodyPlacement.y,
      legBodyPlacement.radius
    );

    //draw hands
    this.#drawSymbols(
      map,
      bodyPlacement.x,
      bodyPlacement.y,
      bodyPlacement.radius,
      Directions.UP,
      this.sizeY / 20,
      Directions.DOWN
    );

    this.clearStrokesAndFills(map);
  }
  drawJumping(map) {
    //head
    this.#drawHead(map, Directions.UP);

    //body
    let bodyPlacement = {
      x: this.x + this.sizeX / 2,
      y: map.height - this.y - (this.sizeY * 62) / 100,
      radius: (this.sizeY * 25) / 100,
    };
    this.#drawSnowmanPart(
      map,
      bodyPlacement.x,
      bodyPlacement.y,
      bodyPlacement.radius
    );

    //draw leg body
    let legBodyPlacement = {
      x: this.x + this.sizeX / 2,
      y: map.height - this.y - (this.sizeY * 20) / 100,
      radius: (this.sizeY * 4) / 10,
    };

    this.#drawSnowmanPart(
      map,
      legBodyPlacement.x,
      legBodyPlacement.y,
      legBodyPlacement.radius
    );

    //draw hands
    this.#drawSymbols(
      map,
      bodyPlacement.x,
      bodyPlacement.y,
      bodyPlacement.radius,
      Directions.UP,
      this.sizeY / 22
    );

    this.clearStrokesAndFills(map);
  }
  clearStrokesAndFills(map) {
    map.strokeWeight(1);
    map.noFill();
  }

  #drawHead = (map, firstDirection = null, secondDirection = null) => {
    switch (true) {
      case firstDirection == Directions.LEFT && !!!secondDirection:
        this.#drawSnowmanPart(
          map,
          this.x + this.sizeX / 2,
          map.height - this.y - (this.sizeY * 9) / 10,
          (this.sizeY * 2) / 10
        );
        this.#drawEyes(
          map,
          this.x + this.sizeX / 2,
          map.height - this.y - (this.sizeY * 9) / 10,
          (this.sizeY * 2) / 20,
          "<\t_\t<",
          this.sizeY / 12.5
        );
        break;
      case firstDirection == Directions.LEFT &&
        secondDirection == Directions.UP:
        let upLeftFinalXPosition =
          this.x + this.sizeX / 2 - (this.sizeY * 14) / 100;
        let upLeftRadius = (this.sizeY * 9) / 100;
        let upLeftFinalYPosition =
          map.height - this.y - (this.sizeY * 91) / 100;
        this.#drawSnowmanPart(
          map,
          upLeftFinalXPosition,
          upLeftFinalYPosition,
          upLeftRadius
        );
        this.#drawEyes(
          map,
          upLeftFinalXPosition,
          upLeftFinalYPosition,
          upLeftRadius / 2,
          ".\t_\t.",
          this.sizeY / 25
        );
        break;
      case firstDirection == Directions.RIGHT &&
        secondDirection == Directions.UP:
        let upRightFinalXPosition = this.x + this.sizeX / 2;
        let upRightRadius = (this.sizeY * 9) / 100;
        let upRightFinalYPosition =
          map.height - this.y - (this.sizeY * 91) / 100;
        this.#drawSnowmanPart(
          map,
          upRightFinalXPosition,
          upRightFinalYPosition,
          upRightRadius
        );
        this.#drawEyes(
          map,
          upRightFinalXPosition,
          upRightFinalYPosition,
          upRightRadius / 2,
          ".\t_\t.",
          this.sizeY / 25
        );
        break;
      case firstDirection == Directions.RIGHT && !!!secondDirection:
        this.#drawSnowmanPart(
          map,
          this.x + this.sizeX / 2,
          map.height - this.y - (this.sizeY * 9) / 10,
          (this.sizeY * 2) / 10
        );
        this.#drawEyes(
          map,
          this.x + this.sizeX / 2,
          map.height - this.y - (this.sizeY * 9) / 10,
          (this.sizeY * 2) / 20,
          ">\t_\t>",
          this.sizeY / 12.5
        );
        break;
      case firstDirection == Directions.UP &&
        secondDirection == Directions.DOWN:
        this.#drawSnowmanPart(
          map,
          this.x + this.sizeX / 2,
          map.height - this.y - (this.sizeY * 9) / 10,
          (this.sizeY * 2) / 10
        );
        this.#drawEyes(
          map,
          this.x + this.sizeX / 2,
          map.height - this.y - (this.sizeY * 9) / 10,
          (this.sizeY * 2) / 20,
          "o\t_\to",
          this.sizeY / 15
        );
        break;
      case firstDirection == Directions.UP && !!!secondDirection:
        this.#drawSnowmanPart(
          map,
          this.x + this.sizeX / 2,
          map.height - this.y - (this.sizeY * 9) / 10,
          (this.sizeY * 2) / 10
        );
        this.#drawEyes(
          map,
          this.x + this.sizeX / 2,
          map.height - this.y - (this.sizeY * 9) / 10,
          (this.sizeY * 2) / 25,
          ".\t_\t.",
          this.sizeY / 15
        );
        break;
      default:
        break;
    }
  };
  #drawEyes = (
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
    console.log(text);
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
  };
  //
  #drawSnowmanPart = (map, x, y, radius) => {
    map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    map.strokeWeight(3);
    map.stroke(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    map.ellipse(x, y, radius, radius);
  };
  #drawSymbols = (
    map,
    x,
    y,
    radius,
    firstDirection,
    textSize,
    secondDirection = null
  ) => {
    map.noFill();
    map.stroke(0, 0, 0);
    map.strokeWeight(1);
    map.textSize(textSize);
    let hands = "?";
    let body = "";
    switch (true) {
      case firstDirection == Directions.LEFT && !!!secondDirection:
        hands = "--->\n--->";
        map.textAlign(map.RIGHT);
        map.text(hands, x + radius / 2, y);
        break;
      case firstDirection == Directions.LEFT &&
        secondDirection == Directions.UP:
        hands = "Y\t\t\t\t\t\t\tY";
        body = "O\nO\nO";
        map.textAlign(map.LEFT);
        map.text(hands, x - radius / 2, y);
        map.textAlign(map.CENTER);
        map.text(body, x, y - radius / 5);
        break;
      case firstDirection == Directions.RIGHT &&
        secondDirection == Directions.UP:
        hands = "Y\t\t\t\t\t\t\tY";
        body = "O\nO\nO";
        map.textAlign(map.LEFT);
        map.text(hands, x - radius / 2, y);
        map.textAlign(map.CENTER);
        map.text(body, x, y - radius / 5);
        break;
      case firstDirection == Directions.RIGHT && !!!secondDirection:
        hands = "<---\n<---";
        map.textAlign(map.LEFT);
        map.text(hands, x - radius / 2, y);
        break;
      case firstDirection == Directions.UP &&
        secondDirection == Directions.DOWN:
        hands = "Y\t\t\t\t\t\t\t\tY";
        body = "O\nO\nO";
        map.textAlign(map.LEFT);
        map.text(hands, x - radius / 2, y);
        map.textAlign(map.CENTER);
        map.text(body, x, y - radius / 5);
        break;
      case firstDirection == Directions.UP && !!!secondDirection:
        hands = "/\t\t\t\t\t\t\t\t\\";
        body = "O\nO\nO";
        map.textAlign(map.LEFT);
        map.text(hands, x - radius / 2, y);
        map.textAlign(map.CENTER);
        map.text(body, x, y - radius / 5);
        break;
      default:
        break;
    }
  };
}
