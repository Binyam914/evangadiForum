import React, { useContext, useState } from 'react'
import './forget_password.css'
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import About from '../../components/about/About';
import { UserContext } from "../../context/UserContext";


const Forget_password = () => {
 const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const [errors, setError] = useState({});
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
   const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();

   const setField = (field, value) => {
    setForm({
      ...form,
      [field]: value,
    });

    if (errors[field]) {
      setError({
        ...errors,
        [field]: null,
      });
    }
  };

   const validateEmail = (input) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const loginRes = await axios.post(
        "http://localhost:4000/api/users/login",
        {
          email: form.email,
          password:"OpenAi@2023",
        }
      );
      console.log(loginRes)
      
      // const response = await axios.post(`http://localhost:4000/api/users/forgetpassword`, form);
      // console.log(response);
    
      // if (1) {
      //   // if (validateEmail(!form)) {
      //     console.log(form)
      //     // try {
      //     //   axios.defaults.withCredentials = true;
      //     //   const response = await axios.post(`http://localhost:4000/api/users/forgetpassword`, form);
      //     //   const data = response.data;

      //     //   // console.log(data )
      //     //   // alert(data.msg)
      //     //    navigate('/code');
      //     //   // if (data.state == 'success') {
      //     //   //   setUserData({
      //     //   //       user: response.data.user,
      //     //   //     });
                    
      //     //   //   navigate('/code');
      //     //   // }
      //     //   console.log(data);
        
      //     // } catch (error) {
      //     //   alert("Error authenticating user");
      //     //   console.log('Error authenticating user:', error.message);
      //     //   setError({
      //     //     ...errors,
      //     //     pass: 'Network Error: Unable to reach the server',
      //     //   });
      //     //}
      //  //}
      // }
  };



  
  return (
    <div className="container-fluid login_page">
      <div className="container py-5 d-md-flex justify-content-between login_container">
        <div className="main col-12 col-md-6 me-md-2 p-5 d-flex flex-column justify-content-center">
          <p className="p1">Forget Password</p>
          <p className="p2 text-center">
            Don't have an account?
            <Link to="/signup" className="a3">
              Create a new account
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className="in1"
              type="email"
              name="email"
              onChange={(e) => setField('email', e.target.value)}
              placeholder="Your Email"
            />

            <span className="showHide2">
             
             <br />
            </span>
            {!isValid && <p>Please enter a valid email address.</p>}
            <button className="btn1">submit</button>
          </form>
          <Link to="/login" className="a3 a1">
            Signin with email and password
          </Link>
        </div>
         <About />
      </div>
    </div>
  );

}

export default Forget_password