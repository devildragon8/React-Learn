import React from 'react'; //"json-server --watch Data.json --port 8000"
import axios from "axios";
import { Link} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobile, faLaptop } from '@fortawesome/free-solid-svg-icons'
import './style.css';

const baseurl = "http://localhost:8000/products";


const ProductList = () => {
    const [data, setData] = React.useState([]);
    const [cart, setCart] = React.useState([]);

    const iconMapping ={
        faMobile,
        faLaptop
    };

    React.useEffect(() => {
        axios.get(baseurl).then(response => setData(response.data)).catch(error => console.log("Error:",error));
    }, []);
 
    if (!data) return null

    const handleAdd = (row) => {
        setCart((prevCart) => {
        const existingProduct = prevCart.find((item) => item.id === row.id);
          if (existingProduct) {
            return prevCart.map((item) =>
            item.id === row.id ? { ...item, quantity: item.quantity + 1, total: item.total + row.price } : item);
          } 
          else {
            return [...prevCart, { ...row, quantity: 1, total: row.price }];
          }
        });
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
                        <th>Product Description</th>
                        <th>Product Image URL</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => {
                        return (
                            <tr className="tr" key={row.id}>
                                <td>{row.id}</td>
                                <td>{row.name}</td>
                                <td>{row.price}</td>
                                <td>{row.description}</td>
                                <td><FontAwesomeIcon icon={iconMapping[row.imageURL]} style={{fontSize:'30px'}}/></td>
                                <td>
                                    <button onClick={() => handleAdd(row)}>Add to Cart</button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <Link to="/PlaceOrder" state={{cart}}>
                <button className="but mint">View Cart</button>
            </Link>
            
        </div>
    )
}

export default ProductList;