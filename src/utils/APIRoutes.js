export const host = process.env.REACT_APP_API_URI;

export const registerRoute = `${host}/api/auth/register`;
export const loginRouter = `${host}/api/auth/login`;
export const setAvatarRouter = `${host}/api/auth/setavatar`;
export const allUserRoute = `${host}/api/auth/users`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const getAllMessagesRoute = `${host}/api/messages/getmsg`;
/*
[GET]:
    /users -> call all users
    /users/:id -> call one user from id
[POST]:
    idk what to do lol '-'
[UPDATE]:
    /users/:id -> update data user from id
[DELETE]:
    /users/:id -> remove user from id
*/
