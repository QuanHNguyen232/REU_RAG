import { NextFunction, Request, Response } from "express";
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";

const saltRounds = 10;

export const getAllUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        //get all users
        const users = await User.find();
        return res.status(201).json({ message: "OK", users });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};

export const userSignup = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {name, email, password} = req.body;
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(401).send("User already registered.");
        }
        const hashedPassword = await hash(password, saltRounds); // password must be encrypted
        const user = new User({name, email, password: hashedPassword});
        await user.save();

        // ###########################################################################
        // AUTHENTICATION: Clear and Create new COOKIE
        // ###########################################################################
        // if user login again, we should use new cookie
        // --> clear old cookie
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });

        // Create Auth Token with JWT
        const token = createToken(user._id.toString(), email, "7d");
        // Send cookie from backend to frontend
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); // set expire in the next 7 days 
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true, // sign encrypt the cookie
        });
        // ###########################################################################
        // ###########################################################################

        return res.status(200).json({ message: "OK", id: user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};

export const userLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {email, password} = req.body;
        // get user with email provided
        const user = await User.findOne({email});
        // CASE user not exist
        if (!user) {
            return res.status(401).send("User not registered.");
        }
        // Check password
        const isPasswordCorrect = await compare(password, user.password);
        // Case password not correct
        if (!isPasswordCorrect) {
            return res.status(403).send("Incorrect password.");
        }
        
        // ###########################################################################
        // AUTHENTICATION: Clear and Create new COOKIE
        // ###########################################################################
        // if user login again, we should use new cookie
        // --> clear old cookie
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });

        // Create Auth Token with JWT
        const token = createToken(user._id.toString(), email, "7d");
        // Send cookie from backend to frontend
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); // set expire in the next 7 days 
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires,
            httpOnly: true,
            signed: true, // sign encrypt the cookie
        });
        // ###########################################################################
        // ###########################################################################

        return res.status(200).json({ message: "OK", id: user._id.toString() });
    } catch (error) {
        console.log(error);
        return res.status(200).json({ message: "ERROR", cause: error.message });
    }
};