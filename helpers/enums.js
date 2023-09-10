//object freeze works like an enum from other languages
export const ObjectTypes = Object.freeze({
  Character: 0,
  Enemy: 1,
  BackgroundObject: 2,
  Trophy: 3,
  GroundBreaking: 4, //sorry for the pun I had to
  InteractiveObject: 5,
  Ammo: 6,
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
export const KeyboardKeys = Object.freeze({
  SPACE_KEY: "32",
  A_KEY: "65",
  D_KEY: "68",
  K_KEY: "75",
  S_KEY: "83",
  T_KEY: "84",
  V_KEY: "86",
  W_KEY: "87",
  LEFT_ARROW_KEY: "37",
  RIGHT_ARROW_KEY: "39",
});

export const LevelNames = Object.freeze({
  GENERIC_LEVEL: "genericLevlel",
});
