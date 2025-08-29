function spawnPowerup() {
  var powerupChances = {
    spring: 20,
    springBoots: 80,
    flyingHat: 80,
    // "rocket": 120
    rocket: 10,
  };

  // if (Math.round(Math.random() * powerupChances["spring"]) === 0) {
  //     return "spring";
  // } else if (Math.round(Math.random() * powerupChances["springBoots"]) === 0) {
  //     return "springBoots";
  // }
  if (Math.round(Math.random() * powerupChances["spring"]) === 0) {
    return "spring";
  } else if (Math.round(Math.random() * powerupChances["springBoots"]) === 0) {
    return "springBoots";
  } else if (Math.round(Math.random() * powerupChances["rocket"]) === 0) {
    return "rocket";
  }
  return 0;
}
