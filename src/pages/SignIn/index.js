import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Form, Input } from "@rocketseat/unform";

import { signInRequest } from "~/store/modules/auth/actions";

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  function handleSubmit({ email, password }) {
    console.tron.log(email);
    console.tron.log(password);
    dispatch(signInRequest(email, password));
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Digite seu e-mail" />
        <Input name="password" type="password" placeholder="Digite sua senha" />
        <button type="submit">{loading ? "Carregando" : "Logar"}</button>
        <Link to="/register">Criar conta</Link>
      </Form>
    </>
  );
}
