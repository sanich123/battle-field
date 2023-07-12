import { ShipPosition } from '../types/types.js';
import { MAX_NUMBER_IN_TABLE, MIN_NUMBER_IN_TABLE, TYPES_SHIP } from './const.js';

export function addFullPositions(ships: ShipPosition[]) {
  const { medium, large, huge } = TYPES_SHIP;

  return ships.map((ship) => {
    ship.allPositions = [];
    const {
      position: { x, y },
      direction,
      type,
      length,
    } = ship;

    if (type === medium || type === large || type === huge) {
      let innerX = x;
      let innerY = y;
      for (let i = 0; i < length; i++) {
        if (direction) {
          ship.allPositions.push({ x, y: innerY++, isShoted: false, placed: 'vertical' });
        } else {
          ship.allPositions.push({ x: innerX++, y, isShoted: false, placed: 'horizontal' });
        }
      }
    } else {
      ship.allPositions.push({ x, y, isShoted: false, placed: 'none' });
    }
    return ship;
  });
}

export function killAroundPositions(killedPositions: ShipPosition['allPositions']) {
  const isHorizontal = killedPositions.some(({ placed }) => placed === 'horizontal');
  const result = [];
  if (isHorizontal) {
    const minX = Math.min(...killedPositions.map(({ x }) => x));
    const maxX = Math.max(...killedPositions.map(({ x }) => x));
    const y = Math.min(...killedPositions.map(({ y }) => y));
    const realMinX = minX > MIN_NUMBER_IN_TABLE ? minX - 1 : minX;
    const realMaxX = maxX < MAX_NUMBER_IN_TABLE ? maxX + 1 : maxX;

    for (let i = realMinX; i <= realMaxX; i++) {
      result.push({ x: i, y: y - 1 });
      result.push({ x: i, y });
      result.push({ x: i, y: y + 1 });
    }
  } else {
    const minY = Math.min(...killedPositions.map(({ y }) => y));
    const maxY = Math.max(...killedPositions.map(({ y }) => y));
    const x = Math.min(...killedPositions.map(({ x }) => x));
    const realMinY = minY > MIN_NUMBER_IN_TABLE ? minY - 1 : minY;
    const realMaxY = maxY < MAX_NUMBER_IN_TABLE ? maxY + 1 : maxY;
    for (let i = realMinY; i <= realMaxY; i++) {
      result.push({ x: x - 1, y: i });
      result.push({ x, y: i });
      result.push({ x: x + 1, y: i });
    }
  }
  return result;
}
