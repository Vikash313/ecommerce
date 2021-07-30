export const reducer = (state, action) => {
    if(action.type === "REMOVE_ITEM"){
        return{
            ...state,
            items: state.items.filter((currElem) => {
                return currElem.id !== action.payload
            })
        }
    }
    if(action.type === "CLEAR_CART"){
        return{
            ...state, items:[]
        };
    }
    if(action.type === "INCREMENT"){
        let updatedCart = state.items.map((currElem) => {
            if(currElem.id === action.payload){
                return{...currElem, available: currElem.available + 1};
            }
            return currElem;
        })
        return {...state, items:updatedCart}
    }
    if(action.type === "DECREMENT"){
        let updatedCart = state.items.map((currElem) => {
            if(currElem.id === action.payload){
                return{...currElem, available: currElem.available - 1};
            }
            return currElem;
        }).filter((currElem) => currElem.available !== 0)
        return {...state, items:updatedCart}
    }
    if(action.type === "GET_TOTAL"){
        let {totalItem, totalAmount} = state.items.reduce((accum, curVal) => {
            let { price, available } = curVal;
            let totalUpdatedAmount = price * available;
            accum.totalAmount += totalUpdatedAmount;
            accum.totalItem += available;
            return accum;
        }, {
            totalItem:0,
            totalAmount: 0,
        });
        return { ...state, totalItem, totalAmount };
    }
   return state;
}