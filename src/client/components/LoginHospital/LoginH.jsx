import React, { useReducer, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import login from '../../login.png';


const LoginH = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(''); // Xóa thông báo lỗi trước khi gửi yêu cầu

    try {
      const response = await axios.post(`http://42.96.2.80:3000/login`, { cccd: username, pass: password });
      console.log(response.data);
      if (response.data) {
        const patient = response.data;
        localStorage.setItem("customer", JSON.stringify(patient)); // lưu thông tin đăng nhập trên localStorge
        if (patient) {
          navigate('/dashboard-1'); // Điều hướng đến trang benh vien
        } 
      } else {
        setMessage('Đăng nhập thất bại');
      }
    } catch (error) {
      if (error.response && error.response.status == 401) { // phản hồi lỗi 401 trong node js sai cccd hoặc mật khẩu
        alert('CCCD hoặc mật khẩu không đúng');
      } else {
        console.error('Lỗi khi đăng nhập:', error);
        setMessage('Đã xảy ra lỗi khi đăng nhập');
      }
    }
  };

  return (
    <>
      <div className='container-fluid'>
      <h1>WELCOME TO HOSPITALL</h1>
      <div className="login-container">
      <div className="login-left-section">
        <img src={login} alt="Welcome" />
      </div>
      <div className="login-right-section">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="cccd"
            name="cccd"
            required
            placeholder='CCCD Number'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="password"
            name="password"
            required
            placeholder='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
          <p><a href="#">Forgot PassWord ?</a></p>
        </form>
      </div>
      </div>  
      </div>

    </>
  );
};

export default LoginH;