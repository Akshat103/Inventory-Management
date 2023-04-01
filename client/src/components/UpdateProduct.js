import React, { useEffect, useState } from 'react';
import {useParams, useNavigate} from 'react-router-dom';

const UpdateProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const params = useParams();
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const getProductDetails = async()=>{
        console.warn(params);
        let result = await fetch(`http://172.20.96.1:5000/api/product/single-product/${params.id}`,
        {
            headers: {
                auth:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        console.warn(result);
        setName(result.Product.name);
        setPrice(result.Product.price);
        setCategory(result.Product.category);
        setCompany(result.Product.company);
    }

    useEffect(()=>{
        console.warn(params);
        getProductDetails();
    },[]);

    const updateProduct = async () => {
        if (!name || !price || !company || !category) {
            setError(true);
            return false;
        }

        const userID = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch(`http://172.20.96.1:5000/api/product/edit-product/${params.id}`, {
            method: "POST",
            body: JSON.stringify({ name, price, category, company, userID }),
            headers: {
                'Content-Type': 'application/json',
                auth:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result){
            alert("Product Updated...");
            navigate('/')
        }
        else return false;
    }

    return (
        <div className='addProduct'>
            <h3>Update product</h3>
            <input type='text' placeholder='Product Name' value={name} onChange={(e) => { setName(e.target.value) }} />
            {error && !name && <span>Enter valid Name</span>}
            <input type='text' placeholder='Product Price' value={price} onChange={(e) => { setPrice(e.target.value) }} />
            {error && !price && <span>Enter valid Price</span>}
            <input type='text' placeholder='Product Category' value={category} onChange={(e) => { setCategory(e.target.value) }} />
            {error && !category && <span>Enter valid Category</span>}
            <input type='text' placeholder='Product Company' value={company} onChange={(e) => { setCompany(e.target.value) }} />
            {error && !company && <span>Enter valid Company</span>}
            <button className='button' onClick={updateProduct}>Update</button>
        </div>
    )
}

export default UpdateProduct;