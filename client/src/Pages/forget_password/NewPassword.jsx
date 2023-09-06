import React, { useContext, useState } from 'react'
import './forget_password.css'
import { useNavigate,Link } from 'react-router-dom';
import axios from '../../utility/axios';
import { UserContext } from "../../context/UserContext";
import About from '../../components/about/About';

const newPassword = () => {
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
        form.email = userData.email;
        console.log(form);
        const response = await axios.post(`/api/users/changePassword`,form);
        const data = response.data;
        alert(data.msg)
        if (data.msg == 'password changed successfully') { 
          navigate('/login');
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
          <p className="p1">Enter new password</p>
          <p className="p2 text-center">
            Don't have an account?
            <Link to="/signup" className="a3">
              Create a new account
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              className="in1"
              type="password"
              name="new_password"
              onChange={(e) => setField('new_password', e.target.value)}
              placeholder="new_password"
                    />
            <input
              className="in1"
              type="password"
              name="c_password"
              onChange={(e) => setField('c_password', e.target.value)}
              placeholder="confirm_password"
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

export default newPassword