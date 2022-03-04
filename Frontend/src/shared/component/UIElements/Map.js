import React, { useEffect, useRef } from "react";

import "./Map.css";

//<--------------MapBox map api--------------------------------------->>
const ACCESS_TOKEN =
  "pk.eyJ1Ijoic2hpdmFtLTIxNCIsImEiOiJjbDA0eXN1anMwanI4M2Nxd2U4cmthaTdmIn0.dG_tl0WkmBFP3K32TlEr5A";

window.mapboxgl.accessToken = ACCESS_TOKEN;

const Map = (props) => {
  const mapRef = useRef();
  const { center, zoom, markedPlaceTitle, markedPlaceDescription } = props;
  // const [coord, setCoord] = useState({
  //   lng: center.lng,
  //   lat: center.lat,
  // });

  useEffect(() => {
    const map = new window.mapboxgl.Map({
      container: mapRef.current,
      style: "mapbox://styles/shivam-214/cl050aizd000k14o59evhkjjt",
      center: [center.lng, center.lat],
      zoom: zoom,
      pitch: 50,
    });

    //<------------For Adding Events----------------->
    // map.on("dblclick", (e) => {
    //   e.preventDefault();

    //   console.log(e);
    //   const { lng, lat } = e.lngLat;

    //   setCoord({
    //     lng: lng,
    //     lat: lat,
    //   });
    // });

    const markerContent = document.createElement("div");
    markerContent.className = "marker";

    new window.mapboxgl.Marker(markerContent)
      .setLngLat([center.lng, center.lat])
      .setPopup(
        new window.mapboxgl.Popup({ offset: 25 }) // add popups
          .setHTML(
            `<h3>${markedPlaceTitle}</h3><p>${markedPlaceDescription}</p>`
          )
      )
      .addTo(map);

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
  }, [center, zoom, markedPlaceTitle, markedPlaceDescription]);

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};
export default Map;
