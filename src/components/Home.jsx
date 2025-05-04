
import axios from 'axios';
import '../App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { setAllProducts } from '../features/product/productSlice';

const Home = () => {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    function getAllProducts() {
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                console.log(res);

                dispatch(setAllProducts(res.data));
                setProducts(res.data.slice(0, 10));
            });
    }

    useEffect(() => {
        getAllProducts();
    }, []);


    return (
        <div className='container'>
            <div className='row'>
                {products.map((product) => {
                    return (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
                            <div className="card h-100">
                                <img src={product.image} className="card-img-top product-list-image" alt={product.title} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.title.slice(0, 30)}</h5>
                                    <p className="card-text">{product.description.slice(0, 100)}.....</p>
                                    <p><strong>$ {product.price}</strong></p>
                                    <a href="#" onClick={() => dispatch(addToCart(product))} className="btn btn-success mt-auto">Add to Cart</a>
                                </div>
                            </div>
                        </div>
                    );
                })}

            </div>

        </div>
    );
}

export default Home;

