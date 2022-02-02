import React from "react";
import Button from "../../shared/component/FormElements/Button";
import Input from "../../shared/component/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import useForm from "../../shared/hooks/form-hook";

import classes from "./PlaceForm.module.css";

const NewPlace = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <form onSubmit={placeSubmitHandler} className={classes["place-form"]}>
      <Input
        id="title"
        type="text"
        label="Title"
        element="input"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please provide a valid Text."
        onInput={inputHandler}
      />

      <Input
        id="description"
        type="text"
        label="description"
        element="textarea"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valuid description(at least 5 character)."
        onInput={inputHandler}
      />

      <Input
        id="address"
        type="text"
        label="address"
        element="textarea"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valuid description(at least 5 character)."
        onInput={inputHandler}
      />

      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};

export default NewPlace;
