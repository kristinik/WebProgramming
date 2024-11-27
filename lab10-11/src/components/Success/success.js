import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './success.css';

const Success = () => {
    const navigate = useNavigate();

    useEffect(() => {

        const timer = setTimeout(() => {
            console.log('Перенаправляю на /home');
            navigate('/home');
        }, 2000);


        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="success-container">
            <h2>Дякуємо за замовлення!</h2>
            <p>Ваше замовлення успішно оформлене.</p>
        </div>
    );
};

export default Success;
