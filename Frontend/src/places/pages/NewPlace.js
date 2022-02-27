import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import Button from "../../shared/component/FormElements/Button";
import Input from "../../shared/component/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import useForm from "../../shared/hooks/form-hook";
import useHttp from "../../shared/hooks/http-hook";

import classes from "./PlaceForm.module.css";
import ErrorModal from "../../shared/component/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/component/UIElements/LoadingSpinner";

const NewPlace = () => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.auth.userId);
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
  const { isLoading, error, clearError, sendRequest } = useHttp();

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest("http://localhost:5000/api/places", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
          address: formState.inputs.address.value,
          creator: userId,
        }),
      });
      navigate("../");
    } catch (err) {}
  };

  return (
    <Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form onSubmit={placeSubmitHandler} className={classes["place-form"]}>
        {isLoading && <LoadingSpinner asOverlay />}
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
    </Fragment>
  );
};

export default NewPlace;
