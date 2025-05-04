
import axios from 'axios';
import '../App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { useLocation } from 'react-router-dom';

const Products = () => {
    const [filteredProducts, setFilteredProducts] = useState([]);
    const dispatch = useDispatch();
    const products = useSelector((state) => state.product.productList);
    const location = useLocation();
    const query = new URLSearchParams(location.search);
    const searchQuery = query.get('search');

    const pageData = [...products];
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const indexOfLastItem = itemsPerPage * currentPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItem = pageData?.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(pageData?.length / itemsPerPage)

    useEffect(() => {
        if (searchQuery !== null) {
            const filtered = products.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts(currentItem);
        }
    }, [products, searchQuery, currentPage]);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='container'>
            <div className='row'>
                {filteredProducts.map((product) => {
                    return (
                        <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4" key={product.id}>
                            <div className="card h-100">
                                <img src={product.image} className="card-img-top product-list-image" alt={product.title} />
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title">{product.title}</h5>
                                    <p className="card-text">{product.description.slice(0, 100)}...</p>
                                    <p><strong>$ {product.price}</strong></p>
                                    <a href="#" onClick={() => dispatch(addToCart(product))} className="btn btn-success mt-auto">Add to Cart</a>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className='pagination'>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={`btn ${currentPage === index + 1 ? 'btn-primary' : 'btn-secondary'} ms-2`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

        </div>
    );
}

export default Products;
