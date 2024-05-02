import { Router } from "express";
import * as controller from "../controllers/reportController.js";
import Auth from "../middleware/auth.js";

const userRouter = Router();

// genarate Report
userRouter.route("/userreport").post(Auth, controller.genarateReport);


export default userRouter;
