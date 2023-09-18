import GameOjbect from "../contracts/gameObject.js";
import ColorObject from "../contracts/colorObj.js";
import { ObjectTypes } from "../../helpers/enums.js";

export default class Canyon extends GameOjbect {
  constructor(
    x,
    y,
    name = "Generic Canyon",
    type = ObjectTypes.GroundBreaking,
    width = 50,
    height = 50,
    colorObject = new ColorObject(90, 70, 30), //default canyon outer layer color
    canyonOuterStrokeColor = new ColorObject(0, 135, 20),
    canyonInnerColor = new ColorObject(60, 40, 0),
    canyonInnerStrokeColor = new ColorObject(80, 60, 20),
    canyonRiverColor = new ColorObject(10, 60, 150),
    canyonRiverStrokeColor = new ColorObject(50, 30, 0),
    curveMagnitude = 30
  ) {
    super(x, y, width, height, colorObject);
    this.name = name;
    this.type = type;
    this.canyonOuterStrokeColor = canyonOuterStrokeColor;
    this.canyonInnerColor = canyonInnerColor;
    this.canyonInnerStrokeColor = canyonInnerStrokeColor;
    this.canyonRiverColor = canyonRiverColor;
    this.canyonRiverStrokeColor = canyonRiverStrokeColor;
    this.curveMagnitude = curveMagnitude;
  }

  draw(p5Map) {
    //outerlayer
    p5Map.stroke(
      this.canyonOuterStrokeColor.red,
      this.canyonOuterStrokeColor.green,
      this.canyonOuterStrokeColor.blue,
      this.canyonOuterStrokeColor.transparency
    );
    p5Map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    p5Map.beginShape();
    p5Map.curveVertex(this.x, p5Map.height - this.y - this.height);
    p5Map.curveVertex(this.x, p5Map.height - this.y - this.height);
    p5Map.curveVertex(
      this.x + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude
    );
    p5Map.curveVertex(
      this.x,
      p5Map.height - this.y - this.height + this.curveMagnitude * 2
    );
    p5Map.curveVertex(
      this.x + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude * 3
    );
    p5Map.curveVertex(
      this.x,
      p5Map.height - this.y - this.height + this.curveMagnitude * 4
    );
    p5Map.curveVertex(
      this.x + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude * 5
    );
    p5Map.curveVertex(
      this.x + this.width + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude * 5
    );
    p5Map.curveVertex(
      this.x + this.width,
      p5Map.height - this.y - this.height + this.curveMagnitude * 4
    );
    p5Map.curveVertex(
      this.x + this.width + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude * 3
    );
    p5Map.curveVertex(
      this.x + this.width,
      p5Map.height - this.y - this.height + this.curveMagnitude * 2
    );
    p5Map.curveVertex(
      this.x + this.width + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude
    );
    p5Map.curveVertex(this.x + this.width, p5Map.height - this.y - this.height);
    p5Map.curveVertex(this.x + this.width, p5Map.height - this.y - this.height);

    p5Map.endShape();

    //inner layer
    p5Map.stroke(
      this.canyonInnerStrokeColor.red,
      this.canyonInnerStrokeColor.green,
      this.canyonInnerStrokeColor.blue,
      this.canyonInnerStrokeColor.transparency
    );
    p5Map.fill(
      this.canyonInnerColor.red,
      this.canyonInnerColor.green,
      this.canyonInnerColor.blue,
      this.canyonInnerColor.transparency
    );
    p5Map.beginShape();
    p5Map.curveVertex(
      this.x + this.width / 8,
      p5Map.height - this.y - this.height
    );
    p5Map.curveVertex(
      this.x + this.width / 8,
      p5Map.height - this.y - this.height
    );
    p5Map.curveVertex(
      this.x + this.width / 8 + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude
    );
    p5Map.curveVertex(
      this.x + this.width / 8,
      p5Map.height - this.y - this.height + this.curveMagnitude * 2
    );
    p5Map.curveVertex(
      this.x + this.width / 8 + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude * 3
    );
    p5Map.curveVertex(
      this.x + this.width / 8,
      p5Map.height - this.y - this.height + this.curveMagnitude * 4
    );
    p5Map.curveVertex(
      this.x + this.width / 8 + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude * 5
    );
    p5Map.curveVertex(
      this.x + this.width - this.width / 8 + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude * 5
    );
    p5Map.curveVertex(
      this.x + this.width - this.width / 8,
      p5Map.height - this.y - this.height + this.curveMagnitude * 4
    );
    p5Map.curveVertex(
      this.x + this.width - this.width / 8 + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude * 3
    );
    p5Map.curveVertex(
      this.x + this.width - this.width / 8,
      p5Map.height - this.y - this.height + this.curveMagnitude * 2
    );
    p5Map.curveVertex(
      this.x + this.width - this.width / 8 + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude
    );
    p5Map.curveVertex(
      this.x + this.width - this.width / 8,
      p5Map.height - this.y - this.height
    );
    p5Map.curveVertex(
      this.x + this.width - this.width / 8,
      p5Map.height - this.y - this.height
    );
    p5Map.endShape();

    //river
    p5Map.stroke(
      this.canyonRiverStrokeColor.red,
      this.canyonRiverStrokeColor.green,
      this.canyonRiverStrokeColor.blue,
      this.canyonRiverStrokeColor.transparency
    );
    p5Map.fill(
      this.canyonRiverColor.red,
      this.canyonRiverColor.green,
      this.canyonRiverColor.blue,
      this.canyonRiverColor.transparency
    );
    p5Map.beginShape();
    p5Map.curveVertex(
      this.x + (7 * this.width) / 16,
      p5Map.height - this.y - this.height
    );
    p5Map.curveVertex(
      this.x + (7 * this.width) / 16,
      p5Map.height - this.y - this.height
    );
    p5Map.curveVertex(
      this.x + (7 * this.width) / 16 + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude
    );
    p5Map.curveVertex(
      this.x + (7 * this.width) / 16,
      p5Map.height - this.y - this.height + this.curveMagnitude * 2
    );
    p5Map.curveVertex(
      this.x + (7 * this.width) / 16 + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude * 3
    );
    p5Map.curveVertex(
      this.x + (7 * this.width) / 16,
      p5Map.height - this.y - this.height + this.curveMagnitude * 4
    );
    p5Map.curveVertex(
      this.x + (7 * this.width) / 16 + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude * 5
    );
    p5Map.curveVertex(
      this.x + this.width - (7 * this.width) / 16 + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude * 5
    );
    p5Map.curveVertex(
      this.x + this.width - (7 * this.width) / 16,
      p5Map.height - this.y - this.height + this.curveMagnitude * 4
    );
    p5Map.curveVertex(
      this.x + this.width - (7 * this.width) / 16 + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude * 3
    );
    p5Map.curveVertex(
      this.x + this.width - (7 * this.width) / 16,
      p5Map.height - this.y - this.height + this.curveMagnitude * 2
    );
    p5Map.curveVertex(
      this.x + this.width - (7 * this.width) / 16 + this.width / 3,
      p5Map.height - this.y - this.height + this.curveMagnitude
    );
    p5Map.curveVertex(
      this.x + this.width - (7 * this.width) / 16,
      p5Map.height - this.y - this.height
    );
    p5Map.curveVertex(
      this.x + this.width - (7 * this.width) / 16,
      p5Map.height - this.y - this.height
    );
    p5Map.endShape();

    p5Map.noStroke();
  }
}
