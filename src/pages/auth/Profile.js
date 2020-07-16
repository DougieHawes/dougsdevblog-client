import axios from "axios";
import React, { useState, useMemo, Fragment, useContext } from "react";
import Resizer from "react-image-file-resizer";
import omitDeep from "omit-deep";

import { toast } from "react-toastify";

import { useQuery, useMutation } from "@apollo/react-hooks";

import { AuthContext } from "../../context/authContext";

import { PROFILE } from "../../graphql/queries";
import { USER_UPDATE } from "../../graphql/mutations";

const Profile = () => {
  const { state } = useContext(AuthContext);
  const [values, setValues] = useState({
    username: "",
    name: "",
    email: "",
    about: "",
    images: [],
  });

  const [loading, setLoading] = useState(false);

  const { data } = useQuery(PROFILE);

  useMemo(() => {
    if (data) {
      setValues({
        ...values,
        username: data.profile.username,
        name: data.profile.name,
        email: data.profile.email,
        about: data.profile.about,
        images: omitDeep(data.profile.images, ["__typename"]),
      });
    }
  }, [data]);

  const [userUpdate] = useMutation(USER_UPDATE, {
    update: ({ data }) => {
      console.log("USER UPDATE MUTATION IN PROFILE", data);
      toast.success("profile updated");
    },
  });

  const { username, name, email, about, images } = values;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    userUpdate({ variables: { input: values } });
    setLoading(false);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const fileResizeAndUpload = (e) => {
    setLoading(true);
    let fileInput = false;
    if (e.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      Resizer.imageFileResizer(
        e.target.files[0],
        300,
        300,
        "JPEG",
        100,
        0,
        (uri) => {
          axios
            .post(
              `${process.env.REACT_APP_REST_ENDPOINT}/uploadimages`,
              { image: uri },
              {
                headers: {
                  authtoken: state.user.token,
                },
              }
            )
            .then((response) => {
              setLoading(false);
              console.log("CLOUDINARY UPLOAD", response);
            })
            .catch((error) => {
              setLoading(false);
              console.log("CLOUDINARY UPLOAD FAILED", error);
            });
        },
        "base64"
      );
    }
  };

  const profileUpdateForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        className="input"
        type="text"
        name="username"
        placeholder="Enter username..."
        value={username}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        className="input"
        type="text"
        name="name"
        placeholder="Enter name..."
        value={name}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        className="input"
        type="text"
        name="email"
        placeholder="Enter email..."
        value={email}
        onChange={handleChange}
        disabled={loading}
      />
      <input
        className="input"
        accept="image/*"
        type="file"
        placeholder="Enter image..."
        onChange={fileResizeAndUpload}
      />
      <textarea
        className="input"
        name="about"
        placeholder="About me..."
        value={about}
        onChange={handleChange}
        disabled={loading}
      />
      <button type="submit" disabled={!email || loading}>
        Submit
      </button>
    </form>
  );

  return <div className="profile">{profileUpdateForm()}</div>;
};

export default Profile;
