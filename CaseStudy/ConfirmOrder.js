import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css';


const ConfirmOrder = () => {
    const location = useLocation();
    const { total } = location.state || [];
    const [state, setState] = React.useState({
        address: '',
        payment: '',
    });

    const totalPrice = total.reduce((sum, total) => sum + total.total, 0);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <h1>Billing</h1>
            <div >
                <table className="table table table-hover table-bordered table-striped" align="center" border="2">
                    <thead className="table-dark">
                        <tr className="tr">
                            <th>Product ID</th>
                            <th>Product Name</th>
                            <th>Product Price</th>
                            <th>Quantity</th>
                            <th>SubTotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {total.map((row) => {
                            return (
                                <tr className="tr" key={row.id}>
                                    <td>{row.id}</td>
                                    <td>{row.name}</td>
                                    <td>{row.price}</td>
                                    <td>{row.quantity}</td>
                                    <td>{row.total}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div className="container">
                <div className="kit">
                    <label>Enter Delivery Address
                        <input className="form-control" type="text" name="address" value={state.address} onChange={handleChange} /><br />
                    </label><br />
                    <label>Enter payment Mode<br />
                        <select style={{ marginBottom: "30%" }} name="payment" value={state.payment} onChange={handleChange}>
                            <option>COD</option>
                            <option>UPI ID</option>
                            <option>Internet Banking</option>
                        </select>
                    </label><br />
                    <Link to="/Bill" state={{ totalPrice, state }}>
                        <button className="but" style={{ marginTop: "30px" }}>Confirm Order</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ConfirmOrder