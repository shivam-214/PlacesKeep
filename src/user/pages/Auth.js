import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";

import Button from "../../shared/component/FormElements/Button";
import Input from "../../shared/component/FormElements/Input";
import Card from "../../shared/component/UIElements/Card";
import useForm from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";

import classes from "./Auth.module.css";

const Auth = () => {
  const dispatch = useDispatch();

  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevState) => !prevState);
  };

  const authSubmitHandler = (event) => {
    event.preventDefault();

    dispatch(authActions.login());

    console.log(formState.inputs);
  };

  return (
    <Card className={classes.authentication}>
      <form
        onSubmit={authSubmitHandler}
        className={classes["authentication form"]}
      >
        <h2>{isLoginMode ? "Login Required" : "Signup Requied"}</h2>
        <hr />
        {!isLoginMode && (
          <Input
            id="name"
            type="text"
            label="Your Name"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          ></Input>
        )}
        <Input
          id="email"
          type="text"
          label="E-Mail"
          element="input"
          validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
          errorText="Please Provide a valid Email."
          onInput={inputHandler}
        ></Input>

        <Input
          id="password"
          type="text"
          label="Password"
          element="input"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please provide a valid password, at least 5 character."
          onInput={inputHandler}
        ></Input>

        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "LOGIN" : "SIGNUP"}
        </Button>
      </form>

      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {!isLoginMode ? "LOGIN" : "SIGNUP"}
      </Button>
    </Card>
  );
};

export default Auth;
