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
import * as tasks from './handlers/tasks/tasksHandler'

const app: Express = express();
const port = 3000;
const date = new Date

// const tasks = require('./routes/api/tasks');

// users management routes
app.use('/users/signIn', signIn)
app.use('/users/logIn', logIn)
app.use(`users/updateEmail`, updateEmail)
app.use(`/users/updatePassword`, updatePassword)
app.use(`/users/updateName/`, updateName)
app.use(`/users/deleteUser/`, deleteUser)
app.use('/users/resetPassword', resPassword)

// tasks management routes
app.get('/', tasks.getTasks)
app.post('/', tasks.createNewTask)
app.put('/', tasks.editTask)
app.put('/', tasks.switchCompletedTask)
app.delete('/', tasks.deleteTask)


app.listen(port, () => {
    console.log(`Server started at ${date.toTimeString()} listening at port: ${port}`)
});
