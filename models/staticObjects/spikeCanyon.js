import GameOjbect from "../contracts/gameObject.js";
import ColorObject from "../contracts/colorObj.js";
import { ObjectTypes } from "../../helpers/enums.js";

export default class SpikeCanyon extends GameOjbect {
  constructor(
    x,
    y,
    name = "Generic Canyon",
    type = ObjectTypes.GroundBreaking,
    width = 50,
    height = 50,
    colorObject = new ColorObject(0, 0, 0) //default spikeColor
  ) {
    super(x, y, width, height, colorObject);
    this.name = name;
    this.type = type;
  }

  draw(p5Map) {
    //outerlayer
    p5Map.stroke(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );

    // Calculate the step size for x and y based on width and height
    let xStep = this.width / 8;
    let yStep = this.height / 4;

    // Starting point at bottom left
    let prevX = this.x;
    let prevY = p5Map.height - this.y;

    // Draw 8 lines, 4 spikes
    for (let i = 1; i <= 8; i++) {
      let currentX = this.x + i * xStep;
      let currentY =
        i % 2 === 0 ? p5Map.height - this.y : p5Map.height - this.y - yStep;
      p5Map.line(prevX, prevY, currentX, currentY);
      // Set the current position to previous position for the next loop
      prevX = currentX;
      prevY = currentY;
    }

    p5Map.noStroke();
  }
}
