import jwt from "jsonwebtoken";
import FeedbackModel from "../model/Feedback.model.js";
import CompanyModel from "../model/Company.model.js";

/**POST: http://localhost:8080/api/user/register
 * @param : {
    "email":"example@mail.com",
    "password":"12345678",
    "rePassword":"12345678",
    "firstName":"example fname",
    "lastName":"example lname",
    "phone":"07100000000",
    "address":"No.10/1, Example area, Example City",
    "userType":"ADMIN",
}
 * **/
export async function addFeedback(req, res) {
  try {
    // Extract feedback data from request body
    const { feedback, rating, jobId } = req.body;
    const logUser = req.user;

    // Validate input
    if (!feedback || !rating || !jobId) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    // Create a new feedback document
    const newFeedback = new FeedbackModel({
      user: logUser.userId,
      email: logUser.email,
      firstName: logUser.firstName,
      feedback,
      rating,
      jobId,
    });

    // Save the feedback document to the database
    await newFeedback.save();

    const companyId = 1;
    const company = await CompanyModel.findOne({ companyId });
    if (!company) {
      const newCompany = new CompanyModel({
        companyId: 1,
        companyName: "Garage",
        feedbackCount: 1,
        totalRatings: rating,
        rating,
      });
      await newCompany.save();
    } else {
      company.totalRatings += parseInt(rating);
      company.feedbackCount += 1;
      company.rating = company.totalRatings / company.feedbackCount;
      await company.save();
    }

    // Send success response
    return res
      .status(201)
      .send({ statusCode: 200, message: "Feedback added successfully" });
  } catch (error) {
    console.error("Error adding feedback:", error);
    return res.status(500).send({ message: "Failed to add feedback" });
  }
}

export async function getCompanyById(req, res) {
  try {
    // Assuming the companyId is provided in the request params
    const companyId = 1;

    // Find the company by companyId
    const company = await CompanyModel.findOne({ companyId });

    // Check if the company exists
    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    // If the company exists, return it
    return res.status(200).json({ statusCode: 200, data: company });
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching company:", error);
    return res.status(500).json({ message: "Failed to fetch company" });
  }
}
