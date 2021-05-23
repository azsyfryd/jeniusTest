const initialState = {
    contactData : null,
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_CONTACT":
            return {
                ...state,
                contactData: action.contactData
            };
        default:
            return state;
    } 
 }
 
 export default authReducer; 