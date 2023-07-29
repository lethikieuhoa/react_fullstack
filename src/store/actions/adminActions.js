import actionTypes from './actionTypes';
import { getAllcodeService } from '../../services/userService';
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllcodeService('gender');
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
    type: actionTypes.FETCH_GENDER_FAIDED
});