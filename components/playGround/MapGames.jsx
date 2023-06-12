import React from "react";
import GoogleMapReact from "google-map-react";

// const AnyReactComponent = ({ text }) => <div style={markerStyle}><i class="bi-geo-alt-fill"></i></div>;

// const markerStyle = {
//   position: "absolute",
//   transform: "translate(-50%, -50%)",
//   background: "white",
//   border: "1px solid #ccc",
//   padding: "5px",
// };
const AnyReactComponent = ({ text, gameTitle }) => {
  let markerStyle = {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    background: "white",
    border: "1px solid #ccc",
    padding: "5px",
  };

  if (gameTitle === "Football") {
    // Custom marker style for Football games
    markerStyle = {
      ...markerStyle,
      // Add specific styles for Football markers
      // Example: background color, icon, etc.
      background: "green",
      color: "white",
    };
  } else if (gameTitle === "Basketball") {
    // Custom marker style for Basketball games
    markerStyle = {
      ...markerStyle,
      // Add specific styles for Basketball markers
      // Example: background color, icon, etc.
      background: "orange",
      color: "black",
    };
  }

  // Add more conditions for different game titles

  return (
    <div style={markerStyle}>
      <i className="bi-geo-alt-fill"></i>
    </div>
  );
};

export default function MapGame({ data }) {
  console.log("functionmap", data);
  const defaultProps = {
    center: {
      lat: 29.3117,
      lng: 47.4818,
    },
    zoom: 11,
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
          data.map((item, index) =>
            item.my_games.map((map) => (
              <AnyReactComponent
                key={index}
                lat={map.latitude}
                lng={map.longitude}
                text="My Marker"
                gameTitle={item.title}
              />
            ))
          )}
      </GoogleMapReact>
    </div>
  );
}
