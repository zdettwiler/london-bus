import L from 'leaflet';

const iconRedDot = L.icon({
  iconUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/146/large-red-circle_1f534.png',
  iconRetinaUrl: 'https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/google/146/large-red-circle_1f534.png',
  iconAnchor: [0,0],
  popupAnchor: [10,10],
  iconSize: [20, 20],
  className: 'icon-red-dot'
});

export { iconRedDot };
