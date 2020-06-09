/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "~/store/modules/auth/actions";
import api from "~/services/api";

export default function Dashboard() {
  const dispatch = useDispatch();
  const signed = useSelector((state) => state.auth.signed);
  const [users, setUsers] = useState([]);

  function handleSignOut() {
    dispatch(signOut());
  }

  useEffect(() => {
    async function getUsers() {
      const response = await api.get("/api/users");
      setUsers(response.data);
      console.tron.log(users);
    }
    getUsers();
  }, []);

  return (
    <>
      <h3>Users:</h3>
      {users.map((user) => {
        return (
          <h4 id={user.name} key={user.email}>
            {user.email}
          </h4>
        );
      })}
      {signed ? (
        <button type="button" onClick={handleSignOut}>
          LogOut
        </button>
      ) : (
        ""
      )}
    </>
  );
}
