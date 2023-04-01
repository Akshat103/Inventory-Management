import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        getproducts();
    }, []);

    const getproducts = async () => {
        let result = await fetch("http://172.20.96.1:5000/api/product/all-product",
        {
            headers: {
                auth:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result.Products);
    }

    const deleteProduct = async (id) => {
        let result = await fetch(`http://172.20.96.1:5000/api/product/delete-product/${id}`, {
            headers: {
                auth:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            },
            method: "POST"
        });
        result = await result.json();
        if (result) {
            getproducts();
        }
    }

    if (products === undefined) return <h3>No Product added...</h3>
    // if (!products.length) return <h3>Loading...</h3>;

    const serachHandle = async (event) => {
        let key = event.target.value
        if (key) {
            let result = await fetch(`http://172.20.96.1:5000/api/product/product-search/${key}`,
            {
                headers: {
                    auth:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                },
                method: "POST"
            });
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        }
        else getproducts();
    }

    return (
        <div className="container">
            <h2>Product List</h2>
            <input type='text' placeholder='Serach Product' onChange={serachHandle} />
            {
                products.length > 0 ?
                    <ul className="responsive-table">
                        <li className="table-header">
                            <div className="col col-1">S. No</div>
                            <div className="col col-2">Name</div>
                            <div className="col col-3">Price</div>
                            <div className="col col-4">Category</div>
                            <div className="col col-4">Delete</div>
                        </li>
                    {products.map((item, index) =>
                        <li className="table-row" key={item._id}>
                            <div className="col col-1" >{index + 1}</div>
                            <div className="col col-2" >{item.name}</div>
                            <div className="col col-3" >{item.price}</div>
                            <div className="col col-4" >{item.category}</div>
                            <div className="col col-4" >
                                <button className="btn btn-delete"
                                    onClick={() => deleteProduct(item._id)}>
                                    Delete
                                </button>
                                <Link to={'/update/' + item._id}>Update</Link>
                            </div>

                        </li>)}
                    </ul>
                    :
                    <h1>NO PRODUCT FOUND</h1>
            }
        </div>
    )
}

export default ProductList;