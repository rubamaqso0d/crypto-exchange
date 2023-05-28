import React, { useState } from 'react';
import './RegisterUser.css'; // Import the CSS file
import { useNavigate,Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const RegisterUser = ({ onRegister }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    address:'',
    email: '',
    password: '',
    cnic: null, // Store the selected CNIC file
 
    
  });

  const { firstName, lastName, address,email, password, cnic } = formData;
  const navigate = useNavigate(); // Access the navigate function
  const handleChange = (e) => {
    if (e.target.name === 'cnic') {
      setFormData({ ...formData, [e.target.name]: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the formData to the onRegister callback function in the parent component
    onRegister(formData);
    console.log(formData);
    // Reset form data
    setFormData({
      firstName: '',
      lastName: '',
      address:'',
      email: '',
      password: '',
      cnic: null,
     
    });
    toast.success('Registration successful');
    navigate('/login');
  };

  return (
    <div className="Auth-form-container">
      
      <form className="Auth-form"  onSubmit={handleSubmit}>
      <h2 className="Auth-form-title">Sign Up</h2>
   
      <div className="Auth-form-content">
        <div>
          <label className="form-group mt-3">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            className="form-control mt-1"
            required
          />
        </div>
        <div>
          <label className="form-group mt-3">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            className="form-control mt-1"
            required
          />
        </div>
        <div>
          <label className="form-group mt-3"> Home Address:</label>
          <input
            type="address"
            name="address"
            value={address}
            onChange={handleChange}
            className="form-control mt-1"
            required
          />
        </div>
        <div>
          <label className="form-group mt-3">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="form-control mt-1"
            required
          />
        </div>
        <div>
          <label className="form-group mt-3">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            className="form-control mt-1"
            required
          />
        </div>
        <div>
            <label className="form-group mt-3">CNIC:</label>
            <input
              type="file"
              name="cnic"
              accept="application/pdf"
              onChange={handleChange}
              className="form-control mt-1"
              required
            />
          </div>
       
        <button  className="d-grid gap-2 mt-3 btn btn-primary" type="submit">Register</button>
        <div className="text-center mt-3">
        Already registered?{' '}
            <Link to="/login" className="link-primary">
              Please Log in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};
   
export default RegisterUser;