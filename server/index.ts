import express, { Express } from 'express';
import {
    signIn,
    logIn,
    updateEmail,
    updatePassword,
    updateName,
    deleteUser,
    resPassword,
} from './handlers/users/usersHandlers'
import { getUserName } from './middleware/firebase/useAuth';

// regex declaration to handle dynamic routes
const regex = (): string | void => {
    const userName = getUserName()
    if (userName != null){
        return userName
    } else {
        return
    }
}

const app: Express = express();
const port = 3000;
const date = new Date

// const tasks = require('./routes/api/tasks');

// setting handlers for /users/ routes
app.use('/users/signIn', signIn)
app.use('/users/logIn', logIn)
app.use(`users/${regex}/updateEmail`, updateEmail)
app.use(`/users/${regex}/updatePassword`, updatePassword)
app.use(`/users/${regex}/updateName/`, updateName)
app.use(`/users/${regex}/deleteUser/`, deleteUser)
app.use('/users/resetPassword', resPassword)

app.listen(port, () => {
    console.log(`Server started at ${date.toTimeString()} listening at port: ${port}`)
});
