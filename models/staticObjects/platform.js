import GameOjbect from "../contracts/gameObject.js";

export default class Platform extends GameOjbect {
  constructor(
    x,
    y,
    name = "Generic Character",
    type = ObjectTypes.Character,
    colorObject = new ColorObject(),
    sizeX = 50,
    sizeY = 50
  ) {
    super(x, y, sizeX, sizeY, colorObject);
    this.name = name;
    this.type = type;
  }
}
