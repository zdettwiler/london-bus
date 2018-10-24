export function toRadians(angleOrPoint) {
  if (angleOrPoint.length === 2) {
    return [
      angleOrPoint[0] * (Math.PI / 180),
      angleOrPoint[1] * (Math.PI / 180)
    ]
  } else {
    return angleOrPoint * (Math.PI / 180)
  }
}

export function toDegrees(angleOrPoint) {
  if (angleOrPoint.length === 2) {
    return [
      angleOrPoint[0] * (180 / Math.PI),
      angleOrPoint[1] * (180 / Math.PI)
    ]
  } else {
    return angleOrPoint * (180 / Math.PI)
  }
}

export function dist(ptA, ptB) {
  const R = 6371e3; // metres
  ptA = toRadians(ptA)
  ptB = toRadians(ptB)
  const lat1 = ptA[0]
  const lat2 = ptB[0]
  const dLat = ptB[0]-ptA[0]
  const dLon = ptB[1]-ptA[1]

  let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(lat1) * Math.cos(lat2) *
          Math.sin(dLon/2) * Math.sin(dLon/2);
  let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  return R * c;
}

export function bearing(startPt, destPt) {
  startPt = toRadians(startPt)
  destPt = toRadians(destPt)
  let y = Math.sin(destPt[1]-startPt[1]) * Math.cos(destPt[0]);
  let x = Math.cos(startPt[0])*Math.sin(destPt[0]) -
          Math.sin(startPt[0])*Math.cos(destPt[0])*Math.cos(destPt[1]-startPt[1]);

  return (toDegrees(Math.atan2(y, x))+360) % 360
}

export function destPt(startPt, distance, bearing) {
  const R = 6371e3; // metres
  startPt = toRadians(startPt)
  bearing = toRadians(bearing)
  let lat = Math.asin(
    Math.sin(startPt[0])*Math.cos(distance/R) +
    Math.cos(startPt[0])*Math.sin(distance/R)*Math.cos(bearing)
  );
  let lon = startPt[1] + Math.atan2(
    Math.sin(bearing)*Math.sin(distance/R)*Math.cos(startPt[0]),
    Math.cos(distance/R)-Math.sin(startPt[0])*Math.sin(lat)
  );

  return toDegrees([lat, lon])
}
