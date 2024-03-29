import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../styles/Authorization.css";
import { TextField } from "@mui/material";
import { loginToggle, SignupToggle } from "../redux/auth";
import { useNavigate } from "react-router-dom";


const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

const Auth = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const currentauthState = useSelector((state)=>state.auth)
  // console.log(currentauthState);

  const [login, setLogin] = useState(currentauthState);


  useEffect(() => {
    setLogin(currentauthState);
  }, [currentauthState]);

//signup code: 


const [values, setValues] = useState({
  name: "",
  email: "",
  password: "",
});
const { name, email, password } = values;

//

//Single handle change event
const handleChange = (name) => (event) => {
  const value = event.target.value;
  setValues({ ...values, [name]: value });
};

const AddUser = async (event) => {
  event.preventDefault();
  try {
    const newData = {
      name,
      email,
      password,
    };
    const response = await fetch("https://imdb-server-7smr.onrender.com/auth/adduser", {
      method: "POST",
      body: JSON.stringify(newData),

      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    // console.log(data);
    setValues({
      ...values,
      name: "",
      email: "",
      password: "",
    });
    alert("Successfully added");
  } catch (error) {
    // console.log(error);
  }
};


//=================================
//login_code:

// const [values, setValues] = useState({
//     email: "",
//     password: "",
//   });
//   const { email, password } = values;

//   //Single handle change event
//   const handleloginChange = (name) => (event) => {
//     const value = event.target.value;
//     setValues({ ...values, [name]: value });
//   };

  const loginUser = async (event) => {
    event.preventDefault();
    try {
      // setLoading(true);

      const newData = {
        email,
        password,
      };
      const response = await fetch("https://imdb-server-7smr.onrender.com/auth/login", {
      // const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        body: JSON.stringify(newData),

        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      // console.log(data);
      
       



       setValues({
        ...values,
        email: "",
        password: "",
      });
        navigate('/home')
      
    } catch (error) {
      // console.log(error);
    } finally{
      // setLoading(false)
    }
  };


  return (
    <ThemeProvider theme={theme}>
      {login ? (
          <div className="auth_main">
          <div className="signup_card">
            <section className="sub_card">
              <h2 className="title">Login Here</h2>

              <div className="inputs">
                <TextField
                  focused
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  onChange={handleChange("email")}
                  value={email}
                  name="email"
                  
                  sx={{ width: "100%", margin: "1rem" }}
                />
                <TextField
                  focused
                  id="standard-basic"
                  label="Password"
                  variant="standard"
                  type="password"
                  onChange={handleChange("password")}
                  value={password}
                  name="password"
                  sx={{ width: "100%", margin: "1rem" }}
                />
                <button onClick={loginUser} className="btn" type="button">
                  <strong>Login</strong>
                  <div id="container-stars">
                    <div id="stars"></div>
                  </div>

                  <div id="glow">
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                </button>
              </div>
            </section>
            <p onClick={()=>dispatch(SignupToggle())} style={{float:'right', cursor:'pointer'}} className="login">
              Create a new account !
            </p>
            
          </div>
        </div>


      ) : (
      

<div className="auth_main">
          <div className="signup_card">
            <section className="sub_card">
              <h2 className="title">Signup</h2>

              <div className="inputs">
                <TextField
                  focused
                  id="standard-basic"
                  label="Name"
                  onChange={handleChange("name")}
                  value={name}
                  name="name"
                  variant="standard"
                  sx={{ width: "100%", margin: "1rem" }}
                />
                <TextField
                  focused
                  id="standard-basic"
                  label="Email"
                  variant="standard"
                  onChange={handleChange("email")}
                  value={email}
                  name="email"
                  sx={{ width: "100%", margin: "1rem" }}
                />
                <TextField
                  focused
                  id="standard-basic"
                  label="Password"
                  variant="standard"
                  type="password"
                  onChange={handleChange("password")}
                  value={password}
                  name="password"
                  sx={{ width: "100%", margin: "1rem" }}
                />
                <button onClick={AddUser} className="btn" type="button">
                  <strong>Sign Up</strong>
                  <div id="container-stars">
                    <div id="stars"></div>
                  </div>

                  <div id="glow">
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                </button>
              </div>
            </section>
            <p onClick={()=>dispatch(loginToggle())} style={{float:'right', cursor:'pointer'}} className="login">
              Already have an account ?
            </p>
          </div>
        </div>




      )}
    </ThemeProvider>
  );
};

export default Auth;
