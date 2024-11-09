import {
  UPDATE_FREELANCERS,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  CLEAR_CART,
} from './actions';

const initialState = {
  freelancers: [],
  cart: [],
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {

    case UPDATE_FREELANCERS:
      return {
        ...state,
        freelancers: [...action.freelancers],
      };

    case ADD_TO_CART:
      return {
        ...state,
        cartOpen: true,
        cart: [...state.cart, action.freelancer],
      };
    case ADD_MULTIPLE_TO_CART:
      return {
        ...state,
        cart: [...state.cart, ...action.freelancers],
      };

    
    case REMOVE_FROM_CART:
      let newState = state.cart.filter((freelancer) => {
        return freelancer._id !== action._id;
      });
  
      return {
        ...state,
        cartOpen: newState.length > 0,
        cart: newState,
      };
  
    case CLEAR_CART:
      return {
        ...state,
        cartOpen: false,
        cart: [],
      };

    default:
      return state;
  }
};
