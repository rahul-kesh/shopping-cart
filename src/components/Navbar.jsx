
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [searchString, setSearchString] = useState("");
    const navigate = useNavigate();

    const searchProduct = () => {
        navigate(`/products?search=${searchString}`);
        console.log(searchString);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid py-2">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                        <div className="d-flex me-3" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" value={searchString} aria-label="Search" onChange={(e) => setSearchString(e.target.value)} />
                            <button className="btn btn-outline-success" type="submit" onClick={searchProduct}>Search</button>
                        </div>

                        <Link className="nav-link me-5 position-relative" to="/cart">
                            <i className="bi bi-cart4" style={{ fontSize: "30px" }}></i>
                            {cartItems.length > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartItems.length}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            )}
                        </Link>


                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;




