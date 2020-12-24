
import {

    ADD_USER,
    FETCH_USERAPI

} from "../actionTypes";

const initialState = {
    ids: [],
    data: {}
};

export default function (state = initialState, action) {
    switch (action.type) {
        case ADD_USER: {
            const { id, email, admin, active } = action.payload;
            return {
                ...state,
                ids: [...state.ids, id],
                data: {
                    ...state.data,
                    [id]: {
                        email,
                        admin,
                        active
                    }
                }
            }
        }
        case FETCH_USERAPI: {
            let ids = [];
            let data = [];
            for (let i = 0; i <= action.payload.length - 1; i++) {
                ids.push(action.payload[i].id);
                data.push(action.payload[i]);
            }
            return {
                ...state,
                ids: ids,
                data: data
            }
        }
        default:
            return state;
    }
}