import {
    CLEAR_CART,
    REMOVE,
    INCREASE,
    DECREASE,
    LOADING,
    DISPLAY_ITEMS,
} from "./actions";

const reducer = (state, action) => {
    if (action.type === CLEAR_CART) {
        return { ...state, cart: new Map() }
    } else if (action.type === REMOVE) {
        const newCart = new Map(state.cart);
        newCart.delete(action.payload.id);
        return { ...state, cart: newCart }
    } else if (action.type === INCREASE) {
        const newCart = new Map(state.cart);
        if (newCart.has(action.payload.id)) {
            const item = newCart.get(action.payload.id);
            newCart.set(action.payload.id, { ...item, amount: item.amount + 1 });
        }
        return { ...state, cart: newCart }
    } else if (action.type === DECREASE) {
        const newCart = new Map(state.cart);
        if (newCart.has(action.payload.id)) {
            const item = newCart.get(action.payload.id);
            newCart.set(action.payload.id, { ...item, amount: (item.amount - 1 >= 1 ? item.amount - 1 : 1) });
        }
        return { ...state, cart: newCart }
    } else if (action.type === LOADING) {
        return { ...state, loading: true }
    } else if (action.type === DISPLAY_ITEMS) {
        const newCart = new Map(action.payload.cart.map((item) => [item.id, item]));
        return { ...state, loading: false, cart: newCart }
    }
    throw new Error(`No matching action type: ${action.type}`);
};

export default reducer;