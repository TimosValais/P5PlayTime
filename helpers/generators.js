import ColorObject from "../models/contracts/colorObj.js";
import SampleEnemy from "../models/movingObjects/sampleEnemy.js";
import SunSpawn from "../models/movingObjects/sunSpawn.js";
import { EnemyTypes, ObjectTypes } from "./enums.js";

export default function addRandomEnemyToEnemyList(
  enemies,
  type,
  positionX,
  positionY,
  size
) {
  console.log(size);
  let randomX = Math.random() * positionX;
  let randomY = positionY;
  let newEnemy = null;
  if (type == EnemyTypes.Sample) {
    newEnemy = new SampleEnemy(
      randomX,
      randomY,
      "Sample Enemy" + (enemies.length + 1),
      ObjectTypes.Enemy,
      size / 10,
      size / 10,
      1,
      new ColorObject(250, 20, 15),
      (6 * size) / 10,
      (9 * size) / 10,
      0
    );
  } else if (type == EnemyTypes.SunSpawn) {
    newEnemy = new SunSpawn(
      randomX,
      randomY,
      "Sun Spawn" + (enemies.length + 1),
      ObjectTypes.Enemy,
      size / 10,
      size / 10,
      1,
      new ColorObject(253, 184, 19),
      (6 * size) / 10,
      (9 * size) / 10,
      0
    );
  }
  enemies.push(newEnemy);
}
