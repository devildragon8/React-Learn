import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style.css';


const PlaceOrder = () => {
    const location = useLocation();
    const { cart } = location.state || [];
    const [total, setTotal] = React.useState(cart);

    const handleDelete = (id) => {
        const updatedProducts = total.filter(product => product.id !== id);
        setTotal(updatedProducts);
    };

    return (
        <div>
            <h1>Product List</h1>
            <table className="table table table-hover table-bordered table-striped" align="center" border="2">
                <thead className="table-dark">
                    <tr className="tr">
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Quantity</th>
                        <th>SumTotal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        total.map((cart,rowIndex) => (
                            <tr className="tr" key={cart.id}>
                                <td>{cart.id}</td>
                                <td>{cart.name}</td>
                                <td>{cart.price}</td>
                                <td>{cart.quantity}</td>
                                <td>{cart.total}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(cart.id)}>Delete</button>
                                </td>

                            </tr>
                        ))
                    }
                    
                </tbody>
            </table>
            <Link to="/ConfirmOrder" state={{total}}>
                <button className="but mint">Place Order</button>
            </Link>
        </div>
    )
}

export default PlaceOrder