import { takeLatest, call, put, all } from "redux-saga/effects";
import api from "~/services/api";
import { signInSuccess } from "./actions";
import history from "~/services/history";

export function* signIn({ payload }) {
  const { email, password } = payload;
  const response = yield call(api.post, "/api/users/login", {
    email,
    password,
  });

  const { token, profile } = response.data;
  if (!profile === "master") {
    console.tron.error("Usuário não é admin");
    return;
  }
  yield put(signInSuccess(token, profile));
  history.push("/dashboard");
}

export default all([takeLatest("@auth/SIGN_IN_REQUEST", signIn)]);
