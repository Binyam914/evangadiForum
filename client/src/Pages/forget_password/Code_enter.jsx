import React, { useContext, useState } from 'react'
import './forget_password.css'
import { useNavigate,Link } from 'react-router-dom';
import axios from '../../utility/axios';
import About from '../../components/about/About';
import { UserContext } from '../../context/UserContext';
const Code_enter = () => {
 const [userData, setUserData] = useContext(UserContext);
  const [form, setForm] = useState({});
  const [errors, setError] = useState({});
  const [auth, setAuth] = useState(false);
  const [message, setMessage] = useState('');
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

    const handleSubmit = async (e) => {
      e.preventDefault();
        if (1) {
    // if (validateForm()) {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(`/api/users/confimCode`,form);
        const data = response.data;
        alert(data.msg)
        if (data.state == 'success') { 
          navigate('/newPassword');

        }
        console.log(data);
        
     
        
      } catch (error) {
        alert("Error authenticating user");
      console.log('Error authenticating user:', error.message);
      setError({
        ...errors,
        pass: 'Network Error: Unable to reach the server',
      });
      }
    }
  };



  
  return (
    <div className="container-fluid login_page">
      <div className="container py-5 d-md-flex justify-content-between login_container">
        <div className="main col-12 col-md-6 me-md-2 p-5 d-flex flex-column justify-content-center">
          <p className="p1">Verify email</p>
          <p className="p2 text-center">
            Don't have an account?
            <Link to="/signup" className="a3">
              Create a new account
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className="in1"
              type="number"
              name="v_code"
              onChange={(e) => setField('v_code', e.target.value)}
              placeholder="verification code"
            />
            <span  className="showHide2">
             <br />
            </span>
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



export default Code_enter