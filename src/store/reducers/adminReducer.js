import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            //console.log('check action at reedux', action)
            let stateCopy = { ...state };
            stateCopy.genders = action.data
            //console.log('check action at reedussssx', stateCopy)
            return {
                ...stateCopy
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;