import actionTypes from '../actions/actionTypes';

const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    allDoctors: [],
    allScheduleTime: []
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
        case actionTypes.FETCH_GENDER_FAILDED:
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
        case actionTypes.FETCH_POSITION_FAILDED:
            state.positions = [];
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ROLE_FAILDED:
            state.roles = [];
            return {
                ...state
            }
        case actionTypes.CREATE_USER_SUCCESS:
            return {
                ...state
            }
        case actionTypes.CREATE_USER_FAILDED:
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users = action.users
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_USER_FAILDED:
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILDED:
            state.topDoctors = []
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILDED:
            state.allDoctors = []
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.data
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILDED:
            state.allScheduleTime = []
            return {
                ...state
            }

        default:
            return state;
    }
}

export default adminReducer;