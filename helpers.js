export function convertFeetToInch(feet, inch) {
  // Raw tank length data is given in x'y" form. Converter to z"
  return feet * 12 + inch;
}

export function convertCubicInchToGallons(inch) {
  return Math.round(inch * 0.0043290043290035);
}

export function calculateLiquidVolume(hight, length, depthOfLiquid) {
// Crem de la crem of the app: calculating volume occupied by liquid in a cylindric HORISONTAL tank
// from hight of tank, length and hight of liquid using trigonometry, unicorn power and magic.
// Result returned in cubic units of whatever hight, length and depth are provided in 
// (meters, inches, feet, bananas etc.)
  radius = hight / 2;
  SectorArea = radius * radius * Math.acos(1 - depthOfLiquid / radius) ;
  SegmentArea = (radius - depthOfLiquid) * Math.sqrt(depthOfLiquid * (hight - depthOfLiquid)) ;
  totalArea = SectorArea - SegmentArea;
  volume = length * totalArea; 
  return volume;
}
export function totalCapacity(hight, length) {
  return Math.round(calculateLiquidVolume(hight, length, hight));
}

export function calculateFluidLevel (height, feetLength, inchLength, depthOfLiquid) {
  fluidLevel = convertCubicInchToGallons(
      calculateLiquidVolume(height, 
        convertFeetToInch(feetLength, inchLength), depthOfLiquid))
return Number.isNaN(fluidLevel) ? '-' : fluidLevel;
// if (Number.isNaN(fluidLevel)) { return '-'; }
// else return fluidLevel
}