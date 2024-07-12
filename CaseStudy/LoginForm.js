import React from 'react'
import { Link } from 'react-router-dom';
import axios from "axios";
import './loginform.css';

const LoginForm = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [data, setData] = React.useState('');

    const handlechange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
    };

    React.useEffect(() => {
        axios.get("http://localhost:8000/users").then((response) => {
            setData(response.data);
        });
    }, []);

    const handleLogin = (e) => {
        if (data) {
            const isMatch = data.some((item) => item.email === email && item.password === password);
            if (isMatch) {

                alert('Email and password match!');
            }
            else {
                alert('Email and password doesnt match with server');
                e.preventDefault();
            }
        }
    };

    return (
        <div>
            <div className="sidenav">
                <div className="login-main-text">
                    <h2 style={{color:"aqua"}}>CaseStudy<br /> Login Page</h2>
                    <p>Login or register from here to access.</p>
                </div>
            </div>
            <div className="main">
                <div className="col-md-6 col-sm-12">
                    <div className="login-form">
                        <form>
                            <div className="form-group">
                                <label>Email</label>
                                    <input className="form-control" type="email" name="email" value={email} onChange={handlechange} placeholder="Enter Email" />
                            </div>
                            <div className="form-group">
                                <label >Password</label>
                                    <input className="form-control" type="password" name="password" value={password} onChange={handlechange} placeholder="Enter Password" required />
                            </div>
                            <br/>
                            <Link to="/ProductList">
                                <button type="submit" style={{color:"white"}} className="btn btn-black" onClick={handleLogin}>Login</button>
                            </Link>
                            <Link to="/signUpPage">
                                <button type="submit" className="btn btn-secondary">SignUp</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default LoginForm
