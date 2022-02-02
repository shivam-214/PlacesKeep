import React from "react";
import PlaceList from "../component/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Taj Mahal",
    description: "One of the 7 wonders of world!",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipM5a6VSARJB0S0uG00NNsvOPsJJGT9VpxQfi72B=w408-h306-k-no",
    address:
      "52FW+F38, Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282006",
    location: {
      lat: 27.1736631,
      lng: 78.043,
    },
    creator: "u1",
  },
  {
    id: "p2",
    title: "Taj Mahal",
    description: "One of the 7 wonders of world",
    imageUrl:
      "https://lh5.googleusercontent.com/p/AF1QipM5a6VSARJB0S0uG00NNsvOPsJJGT9VpxQfi72B=w408-h306-k-no",
    address:
      "52FW+F38, Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282006",
    location: {
      lat: 27.1736631,
      lng: 78.043,
    },
    creator: "u2",
  },
];

const UsersPlaces = (props) => {
  const { userId } = useParams();
  const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};
export default UsersPlaces;
