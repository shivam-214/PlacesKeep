import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useForm from "../../shared/hooks/form-hook";
import Button from "../../shared/component/FormElements/Button";
import Input from "../../shared/component/FormElements/Input";

import classes from "./PlaceForm.module.css";

import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useEffect } from "react/cjs/react.development";
import Card from "../../shared/component/UIElements/Card";

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
    description: "One of the 7 wonders of world!",
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

const UpdatePlace = (prop) => {
  const [isLoading, setIsLoading] = useState(true);

  const { placeId } = useParams();

  const [formState, inputHandler, setFormHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormHandler(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }

    setIsLoading(false);
  }, [setFormHandler, identifiedPlace]);

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  const placeUpdateSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form className={classes["place-form"]} onSubmit={placeUpdateSubmitHandler}>
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        type="text"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description(at least 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />

      <Button type="submit" disabled={!formState.isValid}>
        UPDATE PLACE
      </Button>
    </form>
  );
};

export default UpdatePlace;
