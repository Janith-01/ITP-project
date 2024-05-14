import { Router } from "express";
import * as controller from "../controllers/feedbackController.js";
import Auth from "../middleware/auth.js";

const feedbackRouter = Router();

// addFeedback
feedbackRouter.route("/addfeedback").post(Auth, controller.addFeedback);
feedbackRouter.route("/company").get(controller.getCompanyById);

export default feedbackRouter;
