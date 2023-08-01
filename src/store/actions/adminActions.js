import actionTypes from './actionTypes';
import * as userService from '../../services/userService';
import { toast } from "react-toastify";
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

            if (res && res.errCode === 0) {
                toast.success("Create a new user succeed!");
                dispatch(createNewUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error("Create a new user error!");
                dispatch(createNewUserFailed(res.errMessage));
            }
        } catch (e) {
            toast.error("Create a new user error!");
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

export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllUser('ALL');
            if (res && res.errCode === 0) {
                //toast.success("Fetch all user successed!");
                dispatch(fetchAllUsersSuccess(res.users.reverse()));

            }
            else {
                toast.error("Fetch all user error!");
                dispatch(fetchAllUsersFailed());
            }
        } catch (e) {
            toast.error("Fetch all user error!");
            dispatch(fetchPositionFailed());
            console.log(e);
        }
    }
}
export const fetchAllUsersSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
});
export const fetchAllUsersFailed = () => ({
    type: actionTypes.FETCH_ALL_USER_FAILDED
});

export const deleteUser = (idInput) => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.deleteUserService(idInput);

            if (res && res.errCode === 0) {
                toast.success("Delete user succeed!");
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error("Delete user error!");
                dispatch(deleteUserFailed());
            }
        } catch (e) {
            toast.error("Delete user error!");
            dispatch(deleteUserFailed('err'));
            //console.log(e);
        }
    }
}
export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS
});
export const deleteUserFailed = () => ({
    type: actionTypes.DELETE_USER_FAILDED
});
//edit
export const editUser = (data) => {
    return async (dispatch, getState) => {
        try {
            //console.log('adminaction', data);
            let res = await userService.EditUserService(data);

            if (res && res.errCode === 0) {
                toast.success("edit user succeed!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUsersStart());
            }
            else {
                toast.error("edit user error!");
                dispatch(editUserFailed());
            }
        } catch (e) {
            toast.error("edit user error!");
            dispatch(editUserFailed('err'));
            // console.log(e);
        }
    }
}
export const editUserSuccess = () => ({
    type: actionTypes.EDIT_USER_SUCCESS
});
export const editUserFailed = () => ({
    type: actionTypes.EDIT_USER_FAILDED
});