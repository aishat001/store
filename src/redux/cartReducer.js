const initialState = {
  items: [], // Each item will have an id, name, image, price, quantity, etc.
  totalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);

      if (existingItem) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
          ),
          totalPrice: state.totalPrice + newItem.price,
        };
      } else {
        newItem.quantity = 1;
        return {
          ...state,
          items: [...state.items, newItem],
          totalPrice: state.totalPrice + newItem.price,
        };
      }
    case 'INCREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
        totalPrice: state.totalPrice + state.items.find((item) => item.id === action.payload).price,
      };
    case 'DECREASE_QUANTITY':
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, quantity: item.quantity - 1 } : item
        ),
        totalPrice: state.totalPrice - state.items.find((item) => item.id === action.payload).price,
      };
    case 'REMOVE_FROM_CART':
      const removedItem = state.items.find((item) => item.id === action.payload);
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
        totalPrice: state.totalPrice - removedItem.price * removedItem.quantity,
      };
    default:
      return state;
  }
};

export default cartReducer;
