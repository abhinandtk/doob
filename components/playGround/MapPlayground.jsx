import React from "react";
import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text }) => <div style={markerStyle}><i class="bi-geo-alt-fill"></i></div>;

const array=['1','1','1','1']

const markerStyle = {
  position: "absolute",
  transform: "translate(-50%, -50%)",
  background: "white",
  border: "1px solid #ccc",
  padding: "5px",
};

export default function SimpleMap({data}) {
    console.log('functionmap',data)
  const defaultProps = {
    center: {
      lat: 11.162233,
      lng: 75.81366,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyCLmiBp6YcI-Flc2FwiX2Iw_6VnwqMk6BU" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        {data && data.map((item,index)=>(
        <AnyReactComponent key={index} lat={item.latitude} lng={item.longitude} text="My Marker" />))}
      </GoogleMapReact>
    </div>
  );
}
