import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";
import api from "~/services/api";
import { signInSuccess, signFailure } from "./actions";
import history from "~/services/history";

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;
    const response = yield call(api.post, "/api/users/login", {
      email,
      password,
    });

    const { token } = response.data;
    const user = {
      name: response.data.name,
      email: response.data.email,
      profile: response.data.profile,
      active: response.data.active,
    };
    if (!response.data.success) {
      toast.error("Dados de login inválidos");
      yield put(signFailure());
      return;
    }
    api.defaults.headers.Authorization = `Bearer ${token}`;
    yield put(signInSuccess(token, user));
    history.push("/dashboard");
  } catch (err) {
    toast.error("Erro acessando a API");
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  history.push("/");
}

export default all([
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_OUT", signOut),
  takeLatest("persist/REHYDRATE", setToken),
]);
