import React from 'react'
import axios from "axios";
import './signup.css';
import { useForm } from 'react-hook-form'; 
import { useNavigate } from 'react-router-dom';

const SignupPage = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const { register, handleSubmit,formState: {errors}} = useForm();
    const navigate = useNavigate();

    const handlechange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        else if (name === "password") setPassword(value);
        else if (name === "name") setName(value);
    };

    const handleClick = () => {
        axios.post("http://localhost:8000/users", {
            name: name,
            email: email,
            password: password
        })
            .then(() => {
                alert("User Added");
                navigate("/")
            });
    }

    return (
        <div>
            <h1 align="center">SignUp Page </h1>
            <form className="kit" align="center">
                <label className="lab form-group">Name
                    <input className="inp form-control" type="text" name="name" value={name} onChange={handlechange} placeholder="Enter Name" />
                </label><br />
                <label className="lab lab-txt">Email
                    <input className="inp form-control" {...register("email",{required :true,pattern:/^\S+@\S+$/i})} type="email" name="email" value={email} onChange={handlechange} placeholder="Enter Email" />
                    {errors.email && <p style={{color:"red"}}>Email is required and must be valid</p>}
                </label><br />
                <label className="lab lab-txt" >Password
                    <input className="inp form-control" {...register("password",{required :true,minLength:6,maxLength:12})} type="password" name="password" value={password} onChange={handlechange} placeholder="Enter Password" required />
                    {errors.password && <p style={{color:"red"}}>Password is required and should contain 6 to 12 charcters</p>}
                </label><br />
                    <button className="but oreo" onClick={handleSubmit(handleClick)}>Login</button>
            </form>
        </div>
    )
}

export default SignupPage