import React from "react";
import GoogleMapReact from "google-map-react";
import { useRouter } from "next/router";

// const AnyReactComponent = ({ text }) => <div style={markerStyle}><i class="bi-geo-alt-fill"></i></div>;

// const markerStyle = {
//   position: "absolute",
//   transform: "translate(-50%, -50%)",
//   background: "white",
//   border: "1px solid #ccc",
//   padding: "5px",
// };
const AnyReactComponent = ({ text, gameTitle, onclick }) => {
  let markerStyle = {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    background: "white",
    border: "1px solid #ccc",
    padding: "5px",
    cursor:'pointer'
  };

  if (gameTitle === "Football") {
    // Custom marker style for Football games
    markerStyle = {
      ...markerStyle,

      background: "green",
      color: "white",
    };
  } else if (gameTitle === "Basketball") {
    markerStyle = {
      ...markerStyle,

      background: "orange",
      color: "black",
    };
  }

  return (
    <div style={markerStyle} onClick={onclick}>
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

  const router = useRouter();

  const handleMarkerClick = (slug) => {
    router.push(`/games/${slug}`);
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
                lat={map.stadium.latitude}
                lng={map.stadium.longitude}
                text="My Marker"
                gameTitle={item.title}
                onclick={() => handleMarkerClick(map.game_slug)}
              />
            ))
          )}
      </GoogleMapReact>
    </div>
  );
}
