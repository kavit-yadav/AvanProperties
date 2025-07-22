import { MapContainer, TileLayer } from 'react-leaflet'
import './map.scss'
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin"
function Map({items}){
  return (
    <MapContainer
      center={
        items.length === 1
          ? [items[0].latitude, items[0].longitude] //if this is single item show the coordinates of that otherwise
          : [28, 77] //these coordinates must be the center of north india where i listed my properties
          //like delhi gurugram faridabad so that able to see all posts pin in the list page 
      }
      zoom={7}
      scrollWheelZoom={false}
      className="map"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {items.map((item) => (
        <Pin item={item} key={item.id} />
      ))}
    </MapContainer>
  );
}

export default Map;