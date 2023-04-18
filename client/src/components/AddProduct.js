import React, { useState } from 'react';

const AddProduct = () => {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');

    const [error, setError] = useState('');

    const addProduct = async () => {

        if (!name || !price || !company || !category) {
            setError(true);
            return false;
        }

        const userID = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch("http://localhost:5000/api/product/add-product", {
            method: "POST",
            body: JSON.stringify({ name, price, category, company, userID }),
            headers: {
                'Content-Type': 'application/json',
                auth:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if (result) alert("Product Added...");
        else return false;
        setName("");
        setPrice("");
        setCategory("");
        setCompany("");
    }

    return (
        <div className='addProduct'>
            <h3>Add product</h3>
            <input type='text' placeholder='Product Name' value={name} onChange={(e) => { setName(e.target.value) }} />
            {error && !name && <span>Enter valid Name</span>}
            <input type='text' placeholder='Product Price' value={price} onChange={(e) => { setPrice(e.target.value) }} />
            {error && !price && <span>Enter valid Price</span>}
            <input type='text' placeholder='Product Category' value={category} onChange={(e) => { setCategory(e.target.value) }} />
            {error && !category && <span>Enter valid Category</span>}
            <input type='text' placeholder='Product Company' value={company} onChange={(e) => { setCompany(e.target.value) }} />
            {error && !company && <span>Enter valid Company</span>}
            <button className='button' onClick={addProduct}>Add</button>
        </div>
    )
}

export default AddProduct;