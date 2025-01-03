const UNITS = {
  celsius: "ºC",
  fahrenheit: "ºF",
};

function convertTemperatureTo(temperature, unitTo) {
  if (unitTo === UNITS.celsius) {
    return (temperature - 32) / 1.8;
  } else if (unitTo === UNITS.fahrenheit) {
    return temperature * 1.8 + 32;
  } else {
    throw new Error("Invalid unit");
  }
}

function getOppositeUnit(unit) {
  return unit === UNITS.celsius ? UNITS.fahrenheit : UNITS.celsius;
}

function isIceTemperature(temperature, unit) {
  if (unit === UNITS.celsius) {
    return temperature <= 0;
  } else if (unit === UNITS.fahrenheit) {
    return temperature <= 32;
  } else {
    throw new Error("Invalid unit");
  }
}

export { UNITS, convertTemperatureTo, getOppositeUnit, isIceTemperature };
