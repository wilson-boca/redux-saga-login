import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";

import { signInRequest } from "~/store/modules/auth/actions";

export default function SignIn() {
  const dispatch = useDispatch();
  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input
          name="email"
          type="email"
          placeholder="Digite seu e-mail"
          value="hypatia@pecege.com"
        />
        <Input
          name="password"
          type="password"
          placeholder="Digite sua senha"
          value="123456"
        />
        <button type="submit">Login</button>
        <Link to="/register">Criar conta</Link>
      </Form>
    </>
  );
}
