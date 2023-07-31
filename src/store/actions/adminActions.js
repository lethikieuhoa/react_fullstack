import actionTypes from './actionTypes';
import * as userService from '../../services/userService';
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START });
            let res = await userService.getAllcodeService('gender');
            //console.log('check action', res)
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            }
            else {
                dispatch(fetchGenderFailed());
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
            console.log(e);
        }
    }
}
export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});
export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILDED
});
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllcodeService('position');
            //console.log('check action', res)
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            }
            else {
                dispatch(fetchPositionFailed());
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
            console.log(e);
        }
    }
}
export const fetchPositionSuccess = (postionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: postionData
});
export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILDED
});
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllcodeService('role');
            //console.log('check action', res)
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            }
            else {
                dispatch(fetchRoleFailed());
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
            console.log(e);
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: roleData
});
export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILDED
});

export const createNewUser = (dataUser) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.createNewUserService(dataUser);
            console.log('check create user redux', res)
            if (res && res.errCode === 0) {
                dispatch(createNewUserSuccess());
            }
            else {
                dispatch(createNewUserFailed(res.errMessage));
            }
        } catch (e) {
            dispatch(createNewUserFailed('err'));
            console.log(e);
        }
    }
}
export const createNewUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS
});
export const createNewUserFailed = (errMessage) => ({
    type: actionTypes.CREATE_USER_FAILDED,
    errMessage: errMessage
});