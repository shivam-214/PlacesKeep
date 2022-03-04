import React, { useEffect, useRef } from "react";

import "./Map.css";

//<--------------MapBox map api--------------------------------------->>
window.mapboxgl.accessToken = process.env.REACT_APP_ACCESS_TOKEN;

const Map = (props) => {
  const mapRef = useRef();
  const { center, zoom, coordinates, getCoordinates, createplace, title } =
    props;

  useEffect(() => {
    let coords = {
      lng: center.lng,
      lat: center.lat,
    };

    const map = new window.mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/shivam-214/cl050aizd000k14o59evhkjjt",
      center: [coords.lng, coords.lat],
      zoom: zoom ? zoom : 8.5,
      pitch: 50,
    });

    //<------------For Adding Events----------------->
    if (createplace) {
      map.on("dblclick", (e) => {
        e.preventDefault();

        const { lng, lat } = e.lngLat;
        coords = {
          lng: lng,
          lat: lat,
        };
        getCoordinates(coords);
      });
    }

    const markerContent = document.createElement("div");
    markerContent.className = "marker";

    if ((createplace && coordinates) || !createplace) {
      new window.mapboxgl.Marker(markerContent)
        .setLngLat([coords.lng, coords.lat])
        .setPopup(
          new window.mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(`<h3>${title}</h3>`)
        )
        .addTo(map);
    }
    //<------------Current Location---------------------->
    const currentLocation = new window.mapboxgl.GeolocateControl({
      positionOption: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    map.addControl(currentLocation);

    //<------------Zoom in, Zoom out and Compass---------------------->
    map.addControl(new window.mapboxgl.NavigationControl());

    // currentLocation.on("result", (event) => {
    //   console.log(event);
    // });

    //<-----------Search Location------------------------>
    // map.addControl(
    //   new window.MapboxGeocoder({
    //     accessToken: window.mapboxgl.accessToken,
    //     placeholder: "Search for places",
    //     mapboxgl: window.mapboxgl,
    //   }),
    //   "top-left"
    // );

    //<------------For directions---------------------->
    // const directions = new window.MapboxDirections({
    //   accessToken: process.env.REACT_APP_ACCESS_TOKEN,
    // });
    // map.addControl(directions, "top-left");
  }, [center, zoom, getCoordinates, coordinates, createplace, title]);

  // map.flyTo({
  //   zoom: 8.5,
  //   speed: 1,
  //   curve: 1,
  //   easing(t) {
  //   return t;
  //   }
  //   });

  // map.on("zoomend", (e) => {
  //   console.log(e);
  // });

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};
export default Map;
