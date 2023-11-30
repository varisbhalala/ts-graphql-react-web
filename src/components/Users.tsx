import React from "react";
import { gql, useQuery } from "@apollo/client";




const USERS_QUERY = gql`
  query USERS_QUERY {
    allUsers {
      id
      name
    }
  }
`;

interface User {
  name: string;
}

export const Users = () => {
  const { loading, error, data } = useQuery(USERS_QUERY);
  if (loading) <></>;
  return (
    <>
      {data?.allUsers?.map((user: User) => (
        <p>{user.name}</p>
      ))}
    </>
  );
};
