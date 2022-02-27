import React, { useEffect, useRef } from "react";
import classes from "./Map.module.css";

//<--------------MapBox map api--------------------------------------->>
const ACCESS_TOKEN =
  "pk.eyJ1Ijoic2hpdmFtLTIxNCIsImEiOiJjbDA0eXN1anMwanI4M2Nxd2U4cmthaTdmIn0.dG_tl0WkmBFP3K32TlEr5A";

window.mapboxgl.accessToken = ACCESS_TOKEN;

const Map = (props) => {
  const mapRef = useRef();

  const { center, zoom } = props;

  useEffect(() => {
    const map = new window.mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/shivam-214/cl050aizd000k14o59evhkjjt",
      center: [center.lng, center.lat],
      zoom: zoom,
      pitch: 50,
    });

    new window.mapboxgl.Marker().setLngLat([center.lng, center.lat]).addTo(map);

    //<------------For directions---------------------->
    // const directions = new window.MapboxDirections({
    //   accessToken: ACCESS_TOKEN,
    // });
    // map.addControl(directions, 'top-left');

    //<------------Current Location---------------------->
    map.addControl(
      new window.mapboxgl.GeolocateControl({
        positionOption: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );

    //<------------Zoom in, Zoom out and Compass---------------------->
    map.addControl(new window.mapboxgl.NavigationControl());
  }, [center, zoom]);

  return (
    <div
      ref={mapRef}
      className={`${classes.map} ${props.className}`}
      style={props.style}
    ></div>
  );
};
//<----------USING GOOGLE MAPS JAVASCRIPT API(for developer purpose only)--------->

// const Map = (props) => {
//   const mapRef = useRef();

//   const { center, zoom } = props;

//   useEffect(() => {
//     const map = new window.google.maps.Map(mapRef.current, {
//       center: center,
//       zoom: zoom,
//     });

//     new window.google.maps.Marker({ position: center, map: map });
//   }, [center, zoom]);

//   return (
//     <div
//       ref={mapRef}
//       className={`${classes.map} ${props.className}`}
//       style={props.style}
//     ></div>
//   );
// };

//<----------------Using Here Map JS Api------------------------->
// const API_KEY = "lAQfpfm1BNm0ebJZJfEkGVk04cOmbnHn1LqZYHua3kI";

// const Map = (props) => {
//   const mapRef = useRef();

//   const { center, zoom } = props;

//   var platform = new window.H.service.Platform({
//     apikey: API_KEY,
//   });

//   var defaultLayers = window.platform.createDefaultLayers();

//   // Instantiate (and display) a map object:

//   useEffect(() => {
//     var map = new window.H.Map(
//       document.getElementById("map"),
//       defaultLayers.vector.normal.map,
//       {
//         center: center,
//         zoom: zoom,
//       }
//     );

//     var behavior = new window.H.mapevents.Behavior(new H.mapevents.MapEvents(map));
//     var ui = window.H.ui.UI.createDefault(map, defaultLayers);

//     // Define a variable holding SVG mark-up that defines an icon image:
//     var svgMarkup =
//       '<svg width="24" height="24" ' +
//       'xmlns="http://www.w3.org/2000/svg">' +
//       '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
//       'height="22" /><text x="12" y="18" font-size="12pt" ' +
//       'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
//       'fill="white">P</text></svg>';

//     // Create an icon, an object holding the latitude and longitude, and a marker:
//     var icon = new window.H.map.Icon(svgMarkup);
//     var marker = new window.H.map.Marker(center, { icon: icon });

//     // Add the marker to the map and center the map at the location of the marker:
//     map.addObject(marker);
//     map.setCenter(center);
//   }, [center, zoom]);

//   return (
//     <div
//       ref={mapRef}
//       id="map"
//       className={`${classes.map} ${props.className}`}
//       style={props.style}
//     ></div>
//   );
// };

export default Map;
