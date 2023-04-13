import ColorObject from "../contracts/colorObj.js";

export default class Heart {
  constructor(x, y, sizeX, sizeY, colorObject = new ColorObject(255, 0, 0)) {
    this.x = x;
    this.y = y;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.colorObject = colorObject;
  }

  draw(p5Map) {
    p5Map.push();
    p5Map.fill(
      this.colorObject.red,
      this.colorObject.green,
      this.colorObject.blue
    );
    p5Map.translate(this.x, this.y);
    p5Map.scale(this.sizeX / 150, this.sizeY / 150);

    p5Map.beginShape();
    p5Map.vertex(75, 40);
    p5Map.bezierVertex(75, 37, 70, 25, 50, 25);
    p5Map.bezierVertex(20, 25, 20, 62.5, 20, 62.5);
    p5Map.bezierVertex(20, 80, 40, 102, 75, 120);
    p5Map.bezierVertex(110, 102, 130, 80, 130, 62.5);
    p5Map.bezierVertex(130, 62.5, 130, 25, 100, 25);
    p5Map.bezierVertex(85, 25, 75, 37, 75, 40);
    p5Map.endShape(p5Map.CLOSE);

    p5Map.pop();
  }
}
