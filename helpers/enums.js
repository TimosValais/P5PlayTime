//object freeze works like an enum from other languages
export const ObjectTypes = Object.freeze({
  Character: 0,
  Enemy: 1,
  BackgroundObject: 2,
  Trophy: 3,
  GroundBreaking: 4, //sorry for the pun I had to
  InteractiveObject: 5,
});

export const MovementTypes = Object.freeze({
  Jump: 1,
  Run: 2,
});

export const Directions = Object.freeze({
  UP: 1,
  DOWN: 2,
  LEFT: 3,
  RIGHT: 4,
});
