import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate('/signup');
    }

    return (
        <div>
            <img alt="logo" className='logo' src='https://static.vecteezy.com/system/resources/thumbnails/006/249/361/small/at-circular-letter-logo-with-circle-brush-design-and-white-background-vector.jpg'/>
            {
                auth ? <ul className='nav-ul'>
                    <li><Link to='/'>Product</Link></li>
                    <li><Link to='/add'>Add Product</Link></li>
                    <li><Link to='/update'>Update Product</Link></li>
                    <li><Link to='/profile'>Profile</Link></li>
                    <li><Link onClick={logout} to='/signup'>Logout ({JSON.parse(auth).name})</Link></li>
                </ul>
                    :
                    <ul className='nav-ul nav-right'>
                        <li><Link to='/signup'>SignUp</Link></li>
                        <li><Link to='/login'>Login</Link></li>
                    </ul>
            }
        </div>
    )
}

export default Nav;