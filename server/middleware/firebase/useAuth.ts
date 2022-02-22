import { auth } from './firebaseConfig'
import { Request, Response } from 'express'
import {
    UserCredential,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    updateEmail,
    sendEmailVerification,
    updatePassword,
    sendPasswordResetEmail,
    deleteUser,
    User,
} from 'firebase/auth'

const createNewUser = async (req: Request, res: Response, next: Function) => {
    console.log("Received request to create new user")
    const { email, password, displayName } = req.body
    try {
        const user: UserCredential = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(user.user, { displayName: displayName })
        console.log(`Sendint verification email to ${email}\n`)
        await sendEmailVerification(user.user)
        console.log(`Successfully created new user ${user.user.displayName}\n`)
        next()
    } catch (error) {
        console.log(`An error has ocurred while creating new user: ${error}\n`)
        res.status(501).send(`An error has ocurred while creating new user: ${error}\n`)
        return
    }
}

const loginUser = async (req: Request, res: Response, next: Function) => {
    console.log("Received request to sign in user")
    const { email, password } = req.body
    try {
        const user: UserCredential = await signInWithEmailAndPassword(auth, email, password)
        console.log(`Successfully signed in user ${user.user.displayName}\n`)
        next()
    } catch (error) {
        console.log(`An error has ocurred while signing in user: ${error}\n`)
        res.status(501).send(`An error has ocurred while signing in user: ${error}\n`)
        return
    }
}

const updateUserEmail = async (req: Request, res: Response, next: Function) => {
    console.log("Received request to update user email")
    const user: User | null = auth.currentUser
    const { email } = req.body
    if (user){
        try {
            await updateEmail(user, email)
            await sendEmailVerification(user)
            console.log(`Successfully updated user email to ${email}\n`)
            next()
        } catch (error) {
            console.log(`An error has ocurred while updating user email: ${error}\n`)
            res.status(501).send(`An error has ocurred while updating user email: ${error}\n`)
            return
        }        
    } else {
        console.log(`User is not logged in\n`)
        res.status(401).send(`User is not logged in\n`)
        return
    }
}

const updateUserPassword = async (req: Request, res: Response, next: Function) => {
    console.log("Received request to update user password")
    const user: User | null = auth.currentUser
    const { password } = req.body
    if (user){
        try {
            await updatePassword(user, password)
            console.log(`Successfully updated user password\n`)
            next()
        } catch (error) {
            console.log(`An error has ocurred while updating user password: ${error}\n`)
            res.status(501).send(`An error has ocurred while updating user password: ${error}\n`)
            return
        }        
    } else {
        console.log(`User is not logged in\n`)
        res.status(401).send(`User is not logged in\n`)
        return
    }
}

const updateUserProfile = async (req: Request, res: Response, next: Function) => {
    console.log("Received request to update user profile")
    const user: User | null = auth.currentUser
    const { displayName } = req.body
    if (user){
        try {
            await updateProfile(user, { displayName: displayName })
            console.log(`Successfully updated user profile to ${displayName}\n`)
            next()
        } catch (error) {
            console.log(`An error has ocurred while updating user profile: ${error}\n`)
            res.status(501).send(`An error has ocurred while updating user profile: ${error}\n`)
            return
        }        
    } else {
        console.log(`User is not logged in\n`)
        res.status(401).send(`User is not logged in\n`)
        return
    }
}

const resetPassword = async (req: Request, res: Response, next: Function) => {
    console.log("Received request to reset password")
    const { email } = req.body
    try {
        await sendPasswordResetEmail(auth, email)
        console.log(`Successfully sent password reset email to ${email}\n`)
        next()
    } catch (error) {
        console.log(`An error has ocurred while resetting password: ${error}\n`)
        res.status(501).send(`An error has ocurred while resetting password: ${error}\n`)
        return
    }
}

const delUser = async (req: Request, res: Response, next: Function) => {
    console.log("Received request to delete user")
    const user: User | null = auth.currentUser
    const email: string = req.body.email
    if (user){
        try {
            // change to get user's password instead
            if (user.email === email){
                await deleteUser(user)
                console.log(`Successfully deleted user ${user.email}\n`)
                next()
            } else {
                console.log(`User email does not match user email\n`)
                res.status(401).send(`User email does not match user email\n`)
                return
            }
        } catch (error) {
            console.log(`An error has ocurred while deleting user: ${error}\n`)
            res.status(501).send(`An error has ocurred while deleting user: ${error}\n`)
            return
        }
    } else {
        console.log(`User is not logged in\n`)
        res.status(401).send(`User is not logged in\n`)
        return
    }
}

const getUserEmail = (): string | null => {
    const user: User | null = auth.currentUser
    if (user){
        return user.email?.split('@')[0] as string
    } else {
        return null
    }
}

export {
    createNewUser,
    loginUser,
    updateUserEmail,
    updateUserPassword,
    updateUserProfile,
    resetPassword,
    delUser,
    getUserEmail,
}
