
export const getUser = state => state.user.user;

export const isUserLogged = state => {
    const user = getUser(state);

    return Boolean(user && user.id);
};