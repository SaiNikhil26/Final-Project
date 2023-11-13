import React from "react";
import "../styles/RegiserStyles.css";
import { Form, Input, message } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import logo from "../image/logo.png"
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/register", values);
      dispatch(hideLoading());
      if (res.data.success) {
        message.success("Register Successfully!");
        navigate("/login");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
    <div className='form-container'>
      <Form layout="vertical" onFinish={onfinishHandler} className='register-form'>
        <img src={logo} alt='logo'></img>
        <br/>
      <span class="material-symbols-outlined">account_circle</span> 
      <h4>Sign Up</h4>
        <Form.Item name="name" >
          <Input type="text" required className='input-box' autoComplete='off' placeholder='Name'/>
        </Form.Item>
        <Form.Item  name="email">
          <Input type="email" required className='input-box' autoComplete='off' placeholder='Email'/>
        </Form.Item>
        <Form.Item  name="password">
          <Input type="password" required className='input-box' autoComplete='off' placeholder='Password'/>
        </Form.Item>
        <button className='btn btn-primary' type="submit">Register</button>
        <p className='redirect'>Already a User</p>
        <p className='redirect-button'>
          <Link to="/login" className='redirect-button'>Login here</Link>
        </p>
      </Form>
    </div>
    </>
  );
};

export default Register;
