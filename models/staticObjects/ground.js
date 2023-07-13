import GameOjbect from "../contracts/gameObject.js";
import ColorObject from "../contracts/colorObj.js";
import { ObjectTypes } from "../../helpers/enums.js";

export default class Ground extends GameOjbect {
  constructor(
    x,
    y,
    name = "Generic Ground",
    type = ObjectTypes.BackgroundObject,
    colorObject = new ColorObject(50, 205, 50), //default ground color green
    width = 50,
    height = 50
  ) {
    super(x, y, width, height, colorObject);
    this.name = name;
    this.type = type;
  }
}
