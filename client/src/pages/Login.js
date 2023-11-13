import React from "react";
import "../styles/Loginstyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../image/logo.png"

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //form handler
  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/login", values);
      window.location.reload();
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login Successfully");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("something went wrong");
    }
  };
  return (
    <div className='form-container'>
      <Form layput="vertical" onFinish={onfinishHandler} className='register-form'>
        <img src={logo} alt='logo'></img>
        <br/>
      <span class="material-symbols-outlined">account_circle</span> 
      <h4>Sign in</h4>       
<Form.Item name="email">
          <Input type="email" required placeholder='Email' className='input-box' autoComplete='off'/>
        </Form.Item>
        <Form.Item name="password">
          <Input type="password" required placeholder='Password' className='input-box' autoComplete='off'/>
        </Form.Item>
        <button className='btn btn-primary' type="submit">Sign in</button>
        <p className='redirect'>Don't have a account</p>
        <p className='redirect-button'>
          <Link to="/register" className='redirect-button'>Sign up</Link>
        </p>
      </Form>
    </div>
  );
};

export default Login;
