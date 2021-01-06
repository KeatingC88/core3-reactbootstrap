import { VISIBILITY_FILTERS } from "../constants";

export const getUsersState = store => store.users;

export const getUserIds = store =>
    getUsersState(store) ? getUsersState(store).ids : [];

export const getUserById = (store, id) =>
    getUsersState(store) ? { ...getUsersState(store).data[id], id } : {};

export const getUsers = store =>
    getUserIds(store).map(id => getUserById(store, id));

export const getUsersByVisibilityFilter = (store, visibilityFilter) => {
    const allUsers = store.users.data;
    switch (visibilityFilter) {
        case VISIBILITY_FILTERS.ADMIN:
            return allUsers.filter(user => user.admin);
        case VISIBILITY_FILTERS.USER:
            return allUsers.filter(user => user.user);
        default:
            return allUsers;
    }
};