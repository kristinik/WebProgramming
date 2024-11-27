import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeFromCart, clearCart, updateCartItemQuantity } from '../../redux/actions/cartActions';
import stadiums from '../Icons/dataCard'; // Масив даних про стадіони
import './cartpage.css';

const CartPage = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getAvailableSeats = (id, selectedSection) => {
        const stadium = stadiums.find(stadium => stadium.id === id);
        if (stadium && Array.isArray(stadium.sections)) {
            const sectionInfo = stadium.sections.find(section => section.name === selectedSection);
            return sectionInfo ? sectionInfo.availableSeats : 0;
        }
        return 0;
    };

    const handleRemoveFromCart = (id, selectedSection) => {
        console.log("Removing item:", id, selectedSection); // Перевірка
        dispatch(removeFromCart(id, selectedSection));
    };


    const handleIncreaseQuantity = (id, selectedSection, currentQuantity) => {
        const availableSeats = getAvailableSeats(id, selectedSection);
        if (currentQuantity < availableSeats) {
            dispatch(updateCartItemQuantity(
                cartItems.map(item =>
                    item.id === id && item.selectedSection === selectedSection
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            ));
        } else {
            alert('Неможливо додати більше квитків, ніж доступно.');
        }
    };

    const handleDecreaseQuantity = (id, selectedSection, currentQuantity) => {
        if (currentQuantity > 1) {
            dispatch(updateCartItemQuantity(
                cartItems.map(item =>
                    item.id === id && item.selectedSection === selectedSection
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
            ));
        }
    };

    const totalAmount = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleCheckout = () => {
        dispatch(clearCart());
        navigate('/checkout');
    };

    return (
        <div className="cart-container">
            <h2 className="cart-header">Кошик</h2>
            {cartItems.length === 0 ? (
                <p>Ваш кошик порожній.</p>
            ) : (
                <div>
                    <ul>
                        {cartItems.map(item => (
                            <li key={`${item.id}-${item.selectedSection}`} className="cart-item">
                                <p>{item.title}</p>
                                <p>Секція: {item.selectedSection}</p>
                                <p>Доступні місця: {getAvailableSeats(item.id, item.selectedSection)}</p>
                                <p>Ціна за квиток: {item.price} UAH</p>
                                <div className="quantity-container">
                                    <button
                                        onClick={() => handleDecreaseQuantity(item.id, item.selectedSection, item.quantity)}
                                        disabled={item.quantity === 1}
                                    >
                                        -
                                    </button>
                                    <p>Кількість квитків: {item.quantity}</p>
                                    <button
                                        onClick={() => handleIncreaseQuantity(item.id, item.selectedSection, item.quantity)}
                                        disabled={item.quantity >= getAvailableSeats(item.id, item.selectedSection)}
                                    >
                                        +
                                    </button>
                                </div>
                                <p>Загальна сума для цього стадіону: {item.price * item.quantity} UAH</p>
                                <button
                                    onClick={() => handleRemoveFromCart(item.id, item.selectedSection)}
                                    className="remove-button"
                                >
                                    Видалити
                                </button>

                            </li>
                        ))}
                    </ul>
                    <h3 className="cart-total">Загальна сума кошика: {totalAmount} UAH</h3>
                    <button onClick={handleCheckout} className="checkout-button">
                        Перейти до оформлення
                    </button>
                </div>
            )}
        </div>
    );
};

export default CartPage;
