import express, { Router, Request, Response } from 'express'
import {
    createNewUser,
    loginUser,
    updateUserEmail,
    updateUserPassword,
    updateUserProfile,
    delUser,
    resetPassword,
} from '../../middleware/firebase/useAuth'
import { createUserDatabase, deleteUserDatabase } from '../../middleware/firebase/useFirestore'

// signIn handles creating a new user with his database and sending a verification email
const signIn: Router = express.Router()
signIn.use(express.json())
signIn.use(express.urlencoded({ extended: true }))
signIn.use(createNewUser)
signIn.use(createUserDatabase)

signIn.post('/', (req: Request, res: Response, next: Function) => {
    res.status(201).send(`Successfully created user ${req.body.displayName}\n`)
    next()
})

// logIn
const logIn: Router = express.Router()
logIn.use(express.json())
logIn.use(express.urlencoded({ extended: true }))
logIn.use(loginUser)

logIn.post('/', (req: Request, res: Response, next: Function) => {
    res.status(200).send(`Welcome back!\n`)
    next()
})

// updateEmail
const updateEmail: Router = express.Router()
updateEmail.use(express.json())
updateEmail.use(express.urlencoded({ extended: true }))
updateEmail.use(updateUserEmail)

updateEmail.put('/', (req: Request, res: Response, next: Function) => {
    res.status(200).send(`A verification email has been sent to ${req.body.email}\n`)
    next()
})

// updatePassword
const updatePassword: Router = express.Router()
updatePassword.use(express.json())
updatePassword.use(express.urlencoded({ extended: true }))
updatePassword.use(updateUserPassword)

updatePassword.put('/', (req: Request, res: Response, next: Function) => {
    res.status(200).send(`A reset password email has been sent to ${req.body}\n`)
    next()
})

// updateName: (automatically called when the user is created if a user's name is provided).
const updateName: Router = express.Router()
updateName.use(express.json())
updateName.use(express.urlencoded({ extended: true }))
updateName.use(updateUserProfile)

updateName.put('/', (req: Request, res: Response, next: Function) => {
    res.status(200).send(`Successfully updated user ${req.body.displayName}\n`)
    next()
})

// delete user (automatically delete user's database)
const deleteUser: Router = express.Router()
deleteUser.use(express.json())
deleteUser.use(express.urlencoded({ extended: true }))
deleteUser.use(deleteUserDatabase)
deleteUser.use(delUser)

deleteUser.delete('/', (req: Request, res: Response, next: Function) => {
    res.status(200).send(`Successfully deleted user\n`)
    next()
})

// reset password
const resPassword: Router = express.Router()
resPassword.use(express.json())
resPassword.use(express.urlencoded({ extended: true }))
resPassword.use(resetPassword)

resPassword.post('/', (req: Request, res: Response, next: Function) =>{
    res.status(200).send(`A reset password email has been sent to ${req.body.email}\n`)
    next()
})



export {
    signIn,
    logIn,
    updateEmail,
    updatePassword,
    updateName,
    deleteUser,
    resPassword,
}
