export const addToCart = (updatedCart) => ({
    type: 'UPDATE_CART',
    payload: updatedCart,
});

export const removeFromCart = (productId, selectedSection) => ({
    type: 'REMOVE_FROM_CART',
    payload: { productId, selectedSection },
});


export const clearCart = () => {
    return {
        type: 'CLEAR_CART',
    };
};

export const updateCartItemQuantity = (updatedCart) => ({
    type: 'UPDATE_CART',
    payload: updatedCart,
});
