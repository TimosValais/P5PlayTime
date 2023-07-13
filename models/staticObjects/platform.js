import GameOjbect from "../contracts/gameObject.js";
import ColorObject from "../contracts/colorObj.js";
import { ObjectTypes } from "../../helpers/enums.js";

export default class Platform extends GameOjbect {
  constructor(
    x,
    y,
    name = "Generic Platform",
    type = ObjectTypes.InteractiveObject,
    colorObject = new ColorObject(),
    sizeX = 50,
    sizeY = 50
  ) {
    super(x, y, sizeX, sizeY, colorObject);
    this.name = name;
    this.type = type;
  }
}
