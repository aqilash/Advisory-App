function toRadians(value) {
  return (value * Math.PI) / 180;
}

export default function calculateCrow(
  lat1,
  long1,
  lat2 = 3.1211377317438433,
  long2 = 101.6793525179278
) {
  const R = 6371; // km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(long2 - long1);
  lat1 = toRadians(lat1);
  lat2 = toRadians(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}
