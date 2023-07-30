import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            let copyState = state;
            copyState.isloadingGender = true;
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            //console.log('check action at reedux', action)
            //let stateCopy = { ...state };
            state.genders = action.data;
            state.isloadingGender = false;
            //console.log('check action at reedussssx', stateCopy)
            return {
                ...state
            }
        case actionTypes.FETCH_GENDER_FAIDED:
            state.genders = [];
            state.isloadingGender = false;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_POSITION_FAIDED:
            state.positions = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAIDED:
            state.roles = [];
            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;