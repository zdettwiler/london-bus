import L from 'leaflet';
import imgRedDot from './red-dot.png'
import imgBus from './bus.png'

const iconRedDot = L.icon({
  iconUrl: imgRedDot,
  iconRetinaUrl: imgRedDot,
  popupAnchor: [10, 10],
  iconSize: [20, 20],
  className: 'icon-red-dot'
});

const iconBus = L.icon({
  iconUrl: imgBus,
  iconRetinaUrl: imgBus,
  popupAnchor: [0, -15],
  iconSize: [30, 30],
  className: 'icon-bus'
});

export {
  iconRedDot,
  iconBus
};
