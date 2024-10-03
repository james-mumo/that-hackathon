import React, { useState, useEffect } from "react";
import { MapContainer, Marker, Tooltip, TileLayer } from "react-leaflet";
import L from "leaflet";
import placesInNairobi from "../other_pages/placesData";
import "leaflet/dist/leaflet.css";
import iconM from "./placeholder.png";

import iconPlace from "leaflet/dist/images/marker-icon.png";
// import iconPlace from "leaflet/dist/images/marker-icon-2x.png"; // Use a different icon for mapped places

function Map() {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({ latitude, longitude });
          },
          (error) => {
            console.error("Error getting location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  const defaultPosition = {
    latitude: -1.0528200979309745,
    longitude: 37.09465712186337,
  };

  // Define icon for current location marker
  const currentLocationMarkerIcon = new L.Icon({
    iconUrl: iconM,
    iconSize: [40, 40],
    iconAnchor: [17, 46],
    popupAnchor: [0, -46],
  });

  // Define icon for places in Nairobi
  const placeMarkerIcon = new L.Icon({
    iconUrl: iconPlace, // Different icon for mapped places
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
  });

  return (
    <div className="theeApp">
      <MapContainer
        className="map"
        center={[defaultPosition.latitude, defaultPosition.longitude]}
        zoom={currentPosition ? 12 : 12}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        {defaultPosition && (
          <Marker
            position={[defaultPosition.latitude, defaultPosition.longitude]}
            icon={currentLocationMarkerIcon} // Use the custom icon for current location marker
          >
            <Tooltip>You are here</Tooltip>
          </Marker>
        )}
        {/* Render markers for places within Nairobi */}
        {placesInNairobi.map((place, index) => (
          <Marker
            key={index}
            position={[place.latitude, place.longitude]}
            icon={placeMarkerIcon}
          >
            {" "}
            {/* Use the custom icon for mapped places */}
            <Tooltip>{place.name}</Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
