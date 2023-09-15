import ColorObject from "../contracts/colorObj.js";
import { Directions, ObjectTypes } from "../../helpers/enums.js";
import GameOjbect from "../contracts/gameObject.js";
import { isRGBLight } from "../../helpers/physics.js";
import { refreshStrokesAndFills } from "../../helpers/p5HelperFunctions.js";
export default class Carrot extends GameOjbect {
  #initPosition;
  #yLimit = 100;
  constructor(
    x,
    y,
    sizeX = 40,
    sizeY = 40,
    colorObject = new ColorObject(248, 125, 42), //carrot orange
    secondaryColorObject = new ColorObject(98, 194, 20), //carrot green stems
    verticalSpeed = 5,
    name = "Carrot"
  ) {
    super(x, y, sizeX, sizeY, colorObject);
    this.name = name;
    this.type = ObjectTypes.BackgroundObject;
    this.verticalSpeed = verticalSpeed > 2 ? verticalSpeed : 5;
    this.isSticky = false;
    this.#initPosition = this.y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.secondaryColorObject = secondaryColorObject;
  }

  draw(p5Map) {
    if (Math.abs(this.#initPosition - this.y) > this.#yLimit)
      this.isDestroyed = true;

    this.y += this.verticalSpeed;

    this.#drawBody(p5Map);
    this.#drawStems(p5Map);
    this.#drawLines(p5Map);
    // p5Map.stroke(0);
    // p5Map.fill(
    //   this.color.red,
    //   this.color.green,
    //   this.color.blue,
    //   this.color.transparency
    // );
    // p5Map.ellipse(
    //   this.x,
    //   p5Map.height - this.y - this.height,
    //   this.width,
    //   this.height
    // );
    // p5Map.noStroke();
    // p5Map.noFill();
    refreshStrokesAndFills(p5Map);
  }
  #drawBody = (map) => {
    if (isRGBLight(this.color)) {
      map.stroke(0, 0, 0);
    } else {
      map.stroke(255, 255, 255);
    }
    map.strokeWeight(2);
    map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    let points = [];
    points.push({
      x: this.x + this.sizeY * 0.2,
      y: map.height - this.y - this.sizeY * 0.8,
    });
    points.push({
      x: this.x + this.sizeY * 0.4,
      y: map.height - this.y - this.sizeY * 0.8,
    });
    points.push({
      x: this.x + this.sizeY * 0.5,
      y: map.height - this.y - this.sizeY * 0.7,
    });
    points.push({ x: this.x + this.sizeY * 0.3, y: map.height - this.y });
    points.push({
      x: this.x + this.sizeY * 0.1,
      y: map.height - this.y - this.sizeY * 0.7,
    });
    points.push({
      x: this.x + this.sizeY * 0.2,
      y: map.height - this.y - this.sizeY * 0.8,
    });
    map.beginShape();
    points.forEach((point) => {
      map.vertex(point.x, point.y);
    });
    map.endShape();
    refreshStrokesAndFills(map);
  };
  #drawStems = (map) => {
    map.noStroke();
    map.fill(
      this.secondaryColorObject.red,
      this.secondaryColorObject.green,
      this.secondaryColorObject.blue,
      this.secondaryColorObject.transparency
    );
    map.triangle(
      this.x + this.sizeY * 0.25,
      map.height - this.y - this.sizeY * 0.8,
      this.x + this.sizeY * 0.15,
      map.height - this.y - this.sizeY,
      this.x + this.sizeY * 0.2,
      map.height - this.y - this.sizeY
    );
    map.triangle(
      this.x + this.sizeY * 0.3,
      map.height - this.y - this.sizeY * 0.8,
      this.x + this.sizeY * 0.25,
      map.height - this.y - this.sizeY,
      this.x + this.sizeY * 0.35,
      map.height - this.y - this.sizeY
    );
    map.triangle(
      this.x + this.sizeY * 0.35,
      map.height - this.y - this.sizeY * 0.8,
      this.x + this.sizeY * 0.4,
      map.height - this.y - this.sizeY,
      this.x + this.sizeY * 0.45,
      map.height - this.y - this.sizeY
    );
  };
  #drawLines = (map) => {
    if (isRGBLight(this.color)) {
      map.stroke(0, 0, 0);
    } else {
      map.stroke(255, 255, 255);
    }
    map.strokeWeight(1);

    map.line(
      this.x + this.sizeY * 0.25,
      map.height - this.y - this.sizeY * 0.2,
      this.x + this.sizeY * 0.3,
      map.height - this.y - this.sizeY * 0.2
    );
    map.line(
      this.x + this.sizeY * 0.2,
      map.height - this.y - this.sizeY * 0.35,
      this.x + this.sizeY * 0.3,
      map.height - this.y - this.sizeY * 0.35
    );
    map.line(
      this.x + this.sizeY * 0.15,
      map.height - this.y - this.sizeY * 0.55,
      this.x + this.sizeY * 0.3,
      map.height - this.y - this.sizeY * 0.55
    );
    map.line(
      this.x + this.sizeY * 0.1,
      map.height - this.y - this.sizeY * 0.7,
      this.x + this.sizeY * 0.3,
      map.height - this.y - this.sizeY * 0.7
    );

    refreshStrokesAndFills(map);
  };
}
