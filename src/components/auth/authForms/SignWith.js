import React from "react";

const SignWith = () => {
  return (
    <>
      <button className="sign-with-btn">
        <img
          src="https://steelbluemedia.com/wp-content/uploads/2019/06/new-google-favicon-512.png"
          alt=""
        />
        <span>continue with google</span>
      </button>

      <button className="sign-with-btn">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6c/Facebook_Logo_2023.png"
          alt=""
        />
        <span>continue with facebook</span>
      </button>
      <div className="sep-box">
        <hr />
        <span>or</span>
        <hr />
      </div>
    </>
  );
};

export default SignWith;
