import {Router} from "express";
import userRoutes from "./user-routes.js";
import chatRoutes from "./chat-routes.js";

const appRouter = Router();

appRouter.use("/user", userRoutes); // if request is domain/api/v1/user, userRoutes will handle the request
appRouter.use("/chat", chatRoutes);

export default appRouter;