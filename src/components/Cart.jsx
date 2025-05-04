import React, { useEffect, useState } from 'react'
import "../App.css"
import { useDispatch, useSelector } from 'react-redux'
import { decrement, increment } from '../features/counter/counterSlice';
import { decreaseQuantity, deleteItem, increaseQuantity } from '../features/cart/cartSlice';
const Cart = () => {
    const count = useSelector((state) => state.counter.value);
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.cartItems);
    const [discount, setDiscount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [Shipping, setShipping] = useState(5);
    const [total, setTotal] = useState();

    useEffect(() => {
        const calculatedSubtotal = cartItems.reduce((subtotal, item) => subtotal + (item.price * item.quantity), 0).toFixed(2);
        setSubtotal(calculatedSubtotal);
        const calculatedDiscount = cartItems.reduce((discount, item) => discount + (item.price * (20 / 100) * item.quantity), 0).toFixed(2);
        setDiscount(calculatedDiscount);
        setTotal((calculatedSubtotal + Shipping - discount).toFixed(2));
    }, [cartItems]);
    return (
        <div>
            <div class="cart-wrapper">
                <div class="container">
                    <div class="row g-4">
                        <div class="col-lg-8">
                            <div class="d-flex justify-content-between align-items-center mb-4">
                                <h4 class="mb-0">Shopping Cart</h4>
                                <span class="text-muted"> {cartItems.length} Items</span>
                            </div>


                            <div class="d-flex flex-column gap-3">
                                {
                                    cartItems.length === 0 ? (
                                        <p>The cart is empty</p>
                                    ) :
                                        (
                                            cartItems.map((item) => (
                                                <div key={item.id} class="product-card p-3 shadow-sm">
                                                    <div class="row align-items-center">
                                                        <div class="col-md-2">
                                                            <img src={item.image} alt="Product" class="product-image" />
                                                        </div>
                                                        <div class="col-md-4">
                                                            <h6 class="mb-1">{item.name}</h6>
                                                            {/* <p class="text-muted mb-0">{item.price}</p> */}
                                                            <span class="discount-badge mt-2">20% OFF</span>

                                                        </div>
                                                        <div class="col-md-3">
                                                            <div class="d-flex align-items-center gap-2">
                                                                <button class="quantity-btn" onClick={() => dispatch(decreaseQuantity(item.id))}>-</button>
                                                                <input type="number" class="quantity-input" value={item.quantity} min="1" />
                                                                <button class="quantity-btn" onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-2">
                                                            <span class="fw-bold">${(item.quantity === 1) ? item.price : ((item.price) * (item.quantity)).toFixed(2)}</span>
                                                        </div>
                                                        <div class="col-md-1">
                                                            <i class="bi bi-trash remove-btn" onClick={() => dispatch(deleteItem(item.id))}></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )
                                }

                            </div>
                        </div>


                        <div class="col-lg-4">
                            <div class="summary-card p-4 shadow-sm">
                                <h5 class="mb-4">Order Summary</h5>

                                <div class="d-flex justify-content-between mb-3">
                                    <span class="text-muted">Subtotal</span>
                                    <span> ${subtotal} </span>


                                </div>
                                <div class="d-flex justify-content-between mb-3">
                                    <span class="text-muted">Discount</span>
                                    <span class="text-success">${discount}</span>
                                </div>
                                <div class="d-flex justify-content-between mb-3">
                                    <span class="text-muted">Shipping</span>
                                    <span>{(cartItems.length > 0) ? `${Shipping}` : 0}</span>
                                </div>
                                <hr />
                                <div class="d-flex justify-content-between mb-4">
                                    <span class="fw-bold">Total</span>
                                    <span class="fw-bold">
                                        ${(cartItems.length > 0) ? `${total}` : 0}
                                    </span>
                                </div>


                                <div class="mb-4">
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder="Promo code" />
                                        <button class="btn btn-outline-secondary" type="button">Apply</button>
                                    </div>
                                </div>

                                <button class="btn btn-primary checkout-btn w-100 mb-3">
                                    Proceed to Checkout
                                </button>

                                <div class="d-flex justify-content-center gap-2">
                                    <i class="bi bi-shield-check text-success"></i>
                                    <small class="text-muted">Secure checkout</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
