import React, { useContext } from "react";
import { useHistory } from "react-router-dom";

import { gql } from "apollo-boost";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";

import { AuthContext } from "../context/authContext";

const GET_ALL_POSTS = gql`
  {
    allPosts {
      id
      title
      description
    }
  }
`;

const Home = () => {
  const { data, loading } = useQuery(GET_ALL_POSTS);

  const [fetchPosts, { data: postsData }] = useLazyQuery(GET_ALL_POSTS);

  const { state, dispatch } = useContext(AuthContext);

  let history = useHistory();

  const updateUsername = () => {
    dispatch({
      type: "LOGGED_IN_USER",
      payload: "Dougie Hawes",
    });
  };

  if (loading) return <p className="loading">loading...</p>;

  return (
    <div className="home">
      {data &&
        data.allPosts.map((post) => (
          <div key={post.id} className="post">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-desc">{post.description}</p>
          </div>
        ))}
      <button onClick={() => fetchPosts()} className="post-btn">
        fetch post
      </button>
      {JSON.stringify(state.user)}
    </div>
  );
};

export default Home;
