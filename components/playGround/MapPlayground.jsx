import React from "react";
import GoogleMapReact from "google-map-react";
import { useRouter } from "next/router";
import moment from "moment";


const AnyReactComponent = ({ text,onclick }) => (
  <div style={markerStyle} onClick={onclick}>
    <i className="bi-geo-alt-fill"></i>
  </div>
);

const array = ["1", "1", "1", "1"];

const markerStyle = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  background: "white",
  border: "1px solid #ccc",
  padding: "5px",
  cursor:'pointer'
};

export default function MapPlayGround({ data }) {
  console.log("rrrrrrrr", data);
  const defaultProps = {
    center: {
      lat: 29.3117,
      lng: 47.4818,
    },
    zoom: 11,
  };

  const router=useRouter()
 
  const handleMarkerClick = (slug) => {
    // Get the desired route path or URL you want to navigate to
    router.push({
      pathname: `/play-ground/${slug}`,
      query: {
        date: moment().format("YYYY-MM-DD"),
      },
    })
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBF2R1k7XoL0LwW-z6w66-CDYYBXMjUfFA" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {data &&
          data.map((item, index) => (
            <AnyReactComponent
              key={index}
              lat={item.latitude}
              lng={item.longitude}
              text="My Marker"
              onclick={()=>handleMarkerClick(item.slug_field)}
            />
          ))}
      </GoogleMapReact>
    </div>
  );
}
