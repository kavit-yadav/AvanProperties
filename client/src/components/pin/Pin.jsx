import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";

function Pin({item}) {
  return (
    <Marker position={[item.latitude,item.longitude]} img="markonmap.png">
      <Popup>
        <div className="popupcontainer">
            {/* <img src={item.img} alt="" /> */}
            <img src={item.images[0]} alt="" />
            <div className="textcontainer">
                <Link to={`/${item.id}`}>{item.title}</Link>
                <span className='bed'>{item.bedroom} Bedroom</span>
                <b>{item.price} cr</b>
            </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;