import GameOjbect from "../contracts/gameObject.js";
import { ObjectTypes } from "../../helpers/enums.js";
import ColorObject from "../contracts/colorObj.js";

export default class GiftBox extends GameOjbect {
  constructor(
    x,
    y,
    name = "Generic GiftBox",
    type = ObjectTypes.BackgroundObject,
    colorObject = new ColorObject(),
    sizeX = 50,
    sizeY = 50
  ) {
    super(x, y, sizeX, sizeY, colorObject);
    this.name = name;
    this.type = type;
  }
  handleCollisions(collisionObjects) {
    let character = collisionObjects.find(
      (obj) => obj.type === ObjectTypes.Character
    );
  }
}
