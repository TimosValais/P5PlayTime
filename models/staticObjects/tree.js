import GameOjbect from "../contracts/gameObject.js";
import ColorObject from "../contracts/colorObj.js";
import { ObjectTypes } from "../../helpers/enums.js";

export default class Tree extends GameOjbect {
  constructor(
    x,
    y,
    name = "Generic Tree",
    type = ObjectTypes.BackgroundObject,
    width = 16,
    height = 50,
    colorObject = new ColorObject(10, 240, 40), //default leaves color
    trunkColor = new ColorObject(200, 80, 10),
    fruitColor = new ColorObject(230, 5, 40)
  ) {
    super(x, y, width, height, colorObject);
    this.name = name;
    this.type = type;
    this.trunkColor = trunkColor;
    this.fruitColor = fruitColor;
  }

  draw(p5Map) {
    //trunk
    p5Map.noStroke();

    p5Map.fill(
      this.trunkColor.red,
      this.trunkColor.green,
      this.trunkColor.blue,
      this.trunkColor.transparency
    );

    p5Map.rect(
      this.x,
      p5Map.height - this.y - this.height,
      this.width,
      this.height
    );

    //leaves

    p5Map.fill(
      this.color.red,
      this.color.green,
      this.color.blue,
      this.color.transparency
    );
    p5Map.ellipse(
      this.x + 8,
      p5Map.height - this.y - this.height,
      this.width * 4,
      this.height
    );
    //apples
    p5Map.fill(
      this.fruitColor.red,
      this.fruitColor.green,
      this.fruitColor.blue,
      this.fruitColor.transparency
    );
    p5Map.ellipse(
      this.x + this.width,
      p5Map.height - this.y - 1.1 * this.height,
      7,
      7
    );
    p5Map.ellipse(
      this.x - this.width / 2,
      p5Map.height - this.y - this.height,
      7,
      7
    );
    p5Map.ellipse(this.x, p5Map.height - this.y - 1.2 * this.height, 7, 7);
    p5Map.ellipse(
      this.x - this.width / 2,
      p5Map.height - this.y - this.height + this.height / 4,
      7,
      7
    );
    p5Map.ellipse(
      this.x - this.width / 2,
      p5Map.height - this.y - this.height + this.height / 4,
      7,
      7
    );
    p5Map.ellipse(
      this.x + this.width / 2,
      p5Map.height - this.y - this.height + this.height / 3,
      7,
      7
    );
    p5Map.ellipse(
      this.x + this.width,
      p5Map.height - this.y - this.height + this.height / 8,
      7,
      7
    );
    p5Map.noStroke();
  }
}
