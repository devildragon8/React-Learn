import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css';


const Bill = () => {
  const location = useLocation();
    const { totalPrice,state } = location.state || 0;

  return (
    <div className="kit">
        <h1>Thank you for shopping with us!, You need to pay {totalPrice} </h1>
        <br></br>
        <h5>payment mode : {state.payment}</h5>
        <h5>Billing Address : {state.address}</h5>
        <Link to="/">
                <button className="but oreo">Home</button>
        </Link>
    </div>
  )
}

export default Bill