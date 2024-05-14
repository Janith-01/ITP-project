import { Router } from "express";
import * as controller from "../controllers/userController.js";
import Auth from "../middleware/auth.js";

const userRouter = Router();

// Register
userRouter.route("/register").post(Auth, controller.register);

// Register
userRouter.route("/customer/register").post(controller.registerCustomer);

// Update User Info
userRouter.route("/updateuser").put(Auth, controller.updateUser);

// Update User Password
userRouter.route("/changepassword").put(Auth, controller.changePassword);

// Log in
userRouter.route("/login").post(controller.login);

// get All users Search
userRouter.route("/all").get(Auth, controller.getSearchUsers);

// get User
userRouter.route("/:userId").get(Auth, controller.getUser);

//delete User
userRouter.route("/:userId").delete(Auth, controller.deleteUser);

export default userRouter;
