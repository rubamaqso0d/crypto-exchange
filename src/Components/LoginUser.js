import React, { useState } from 'react';
import './LoginUser.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate,Link } from 'react-router-dom'

function LoginUser(props) {
  const { onLogin, users} = props; // Access the onLogin prop
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [loginAttempts, setLoginAttempts] = useState(0);
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate(); // Access the navigate function
  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform login logic here
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    console.log(user);

    if (user) {
      onLogin(user);
      setLoginAttempts(0);
      toast.success('Login successful');
      navigate('/dashboard');
    } else {
      setLoginAttempts((prevAttempts) => prevAttempts + 1);
      if (loginAttempts >= 3) {
        toast.error('User blocked');
      } else {
        toast.error('Invalid email or password');
        setFormData({
          email: '',
          password: '',
        });
      }
    }
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <h2 className="Auth-form-title">Sign In</h2>
        
        <div className="Auth-form-content">
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
          <button className="d-grid gap-2 mt-3 btn btn-primary" type="submit">
            Login
          </button>
          <div className="text-center mt-3">
            Not registered yet?{' '}
            <Link to="/register-user" className="link-primary">
              Register
            </Link>
          </div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default LoginUser;
