import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
export async function register(req, res) {
  try {
    const {
      email,
      password,
      rePassword,
      firstName,
      lastName,
      phone,
      address,
      userType,
    } = req.body;

    // Check if email already exists in the database
    const existEmail = new Promise(async (resolve, reject) => {
      let user = await UserModel.findOne({ email });

      if (user) {
        reject({ error: "Please provide a unique email" });
      }
      resolve();
    });

    // Wait for all promises to resolve or reject
    Promise.all([existEmail])
      .then(async () => {
        // Perform validation checks
        if (!password) {
          return res.status(400).send({
            statusCode: 400,
            message: "Please Provide Valid Password",
          });
        }
        if (!rePassword) {
          return res.status(400).send({
            statusCode: 400,
            message: "Please Provide Valid Password",
          });
        }
        if (!firstName) {
          return res.status(400).send({
            statusCode: 400,
            message: "Please Provide Valid First Name",
          });
        }
        if (password !== rePassword) {
          return res
            .status(400)
            .send({ statusCode: 400, message: "Passwords do not match" });
        }
        const salt = await bcrypt.genSalt(10);

        // Hash the password
        bcrypt
          .hash(password, salt)
          .then((hashedPassword) => {
            // Create a new user object with hashed password
            const user = new UserModel({
              email: email,
              password: hashedPassword,
              firstName: firstName,
              lastName: lastName,
              phone: phone,
              address: address,
              userType: userType,
              isDelete: false,
            });

            // Save the user to the database
            user
              .save()
              .then((result) =>
                res.status(201).send({
                  statusCode: 200,
                  message: "User Register Successfull",
                })
              )
              .catch((error) => res.status(500).send({ error }));
          })
          .catch((error) => {
            // Handle password hashing error
            return res.status(500).send({ error: "Password Hashing failed" });
          });
      })
      .catch((error) => {
        // Handle validation or database search errors
        return res.status(500).send({
          error: error.error || `Something went wrong`,
        });
      });
  } catch (error) {
    // Catch any synchronous errors
    return res.status(500).send({ error });
  }
}
/**POST: http://localhost:8080/api/user/customer/register
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
export async function registerCustomer(req, res) {
  try {
    const { email, password, rePassword, firstName, lastName, phone, address } =
      req.body;

    // Check if email already exists in the database
    const existEmail = new Promise(async (resolve, reject) => {
      let user = await UserModel.findOne({ email });
      console.log(user);
      if (user) {
        reject({ error: "Please provide a unique email" });
      }
      resolve();
    });

    // Wait for all promises to resolve or reject
    Promise.all([existEmail])
      .then(async () => {
        // Perform validation checks
        if (!password) {
          return res.status(400).send({
            statusCode: 400,
            message: "Please Provide Valid Password",
          });
        }
        if (!rePassword) {
          return res.status(400).send({
            statusCode: 400,
            message: "Please Provide Valid Password",
          });
        }
        if (!firstName) {
          return res.status(400).send({
            statusCode: 400,
            message: "Please Provide Valid First Name",
          });
        }
        if (password !== rePassword) {
          return res
            .status(400)
            .send({ statusCode: 400, message: "Passwords do not match" });
        }

        const salt = await bcrypt.genSalt(10);

        // Hash the password
        bcrypt
          .hash(password, salt)
          .then((hashedPassword) => {
            // Create a new user object with hashed password
            const user = new UserModel({
              email: email,
              password: hashedPassword,
              firstName: firstName,
              lastName: lastName,
              phone: phone,
              address: address,
              userType: "CUSTOMER",
              isDelete: false,
            });

            // Save the user to the database
            user
              .save()
              .then((result) =>
              res.status(201).send({
                statusCode: 200,
                message: "User Register Successfull",
              })
              )
              .catch((error) => res.status(500).send({ error }));
          })
          .catch((error) => {
            // Handle password hashing error
            return res.status(500).send({ error: "Password Hashing failed" });
          });
      })
      .catch((error) => {
        // Handle validation or database search errors
        return res.status(500).send({
          error: error.error || `Something went wrong`,
        });
      });
  } catch (error) {
    // Catch any synchronous errors
    return res.status(500).send({ error });
  }
}

/**PUT: http://localhost:8080/api/user/updateuser
 * @body : {
    "userId":"jhasgdhas5476asd78as56d75a7",
    "firstName":"example fname",
    "lastName":"example lname",
    "phone":"07100000000",
    "address":"No.10/1, Example area, Example City",
    "userType":"ADMIN",
}
 * **/
/**
 * Asynchronously updates a user's information based on the provided details.
 *
 * @param {Object} req - The HTTP request object containing user details in the body.
 * @param {Object} res - The HTTP response object used to send back the status of the update operation.
 * @returns {Promise<Response>} A response indicating the success or failure of the update operation.
 */
export async function updateUser(req, res) {
  try {
    // Extract the user details from the request body
    const { userId, firstName, lastName, phone, address, userType } = req.body;
    const userAdmin = req.user;

    // Validate the incoming data (especially the userID)
    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    // Define the update object
    const updateData = {
      firstName,
      lastName,
      phone,
      address,
      userType,
    };

    // Find the user by ID and update their details
    const updatedUser = await UserModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    // Check if the user was found and updated
    if (!updatedUser) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "User not found or update failed" });
    }

    // Return the updated user details
    const user = await UserModel.findById(userId);
    user.updateHistory.push({
      userId: userAdmin.userId,
      changes: updateData,
    });
    await user.save();
    return res
      .status(200)
      .json({ statusCode: 200, message: "User update Success" });
  } catch (error) {
    // Log the error and return a response

    return res
      .status(500)
      .send({ statusCode: 500, message: "Internal Server Error" });
  }
}

/**PUT: http://localhost:8080/api/user/changepassword
 * @param : {
     
    "oldPassword":"12345678",
    "newPassword":"12345678",
    "reNewPassword":"12345678",
}
 * **/
/**
 * Asynchronously changes a user's password after validating the old password and confirming the new password.
 *
 * @param {Object} req - The HTTP request object containing the old and new password details.
 * @param {Object} res - The HTTP response object used to communicate the outcome of the password change request.
 * @returns {Promise<Response>} A response indicating the success or failure of the password change.
 */
export async function changePassword(req, res) {
  try {
    const { oldPassword, newPassword, reNewPassword } = req.body;
    const userAdmin = req.user;

    // Validate required fields
    if (!userAdmin.userId || !oldPassword || !newPassword || !reNewPassword) {
      return res
        .status(400)
        .send({ statusCode: 400, message: "All fields are required" });
    }

    // Check if new passwords match
    if (newPassword !== reNewPassword) {
      return res
        .status(400)
        .send({ statusCode: 400, message: "New passwords do not match" });
    }

    // Find the user by ID
    const user = await UserModel.findById(userAdmin.userId);
    if (!user) {
      return res
        .status(404)
        .send({ statusCode: 404, message: "User not found" });
    }

    // Verify old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res
        .status(403)
        .send({ statusCode: 403, message: "Old password is incorrect" });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);

    // Update user's password
    user.password = hash;

    user.updateHistory.push({
      userId: userAdmin.userId,
      changes: "password Changed ",
    });
    await user.save();

    // Send success response
    return res
      .status(200)
      .send({ statusCode: 200, message: "Password successfully changed" });
  } catch (error) {
    return res
      .status(500)
      .send({ statusCode: 500, message: "Internal Server Error" });
  }
}

/**POST: http://localhost:8080/api/user/login
 * @param : {
    "email":"example@mail.com",
    "password":"12345678",
}
 * **/
/**
 * Asynchronously handles user login, including authentication and token generation.
 *
 * @param {Object} req - The HTTP request object containing the user's credentials.
 * @param {Object} res - The HTTP response object used to send back the login status.
 * @returns {Promise<Response>} A response indicating the success or failure of the login attempt.
 */
export async function login(req, res) {
  try {
    // Destructure email and password from request body
    const { email, password } = req.body;

    // Ensure both email and password are provided
    if (!email || !password) {
      return res
        .status(400)
        .send({ message: "Email and password are required" });
    }

    // Attempt to find the user by email
    UserModel.findOne({ email })
      .then((user) => {
        if (!user) {
          // Return 404 Not Found if no user is associated with the provided email
          return res.status(403).send({
            statusCode: 403,
            message: "User not found",
          });
        }

        // Compare provided password with stored hash
        bcrypt.compare(password, user.password).then((checkPassword) => {
          if (!checkPassword) {
            // Return 403 Forbidden if password comparison fails
            return res
              .status(403)
              .send({ statusCode: 403, message: "Invalid Password" });
          }

          // Generate a token upon successful authentication
          const token = jwt.sign(
            { userId: user._id, username: user.email, userType: user.userType },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
          );

          // Return the email, token, and success message
          return res.status(200).send({
            statusCode: 200,
            email: user.email,
            firstName: user.firstName,
            userType: user.userType,
            token: token,
            message: "Login Success",
          });
        });
      })
      .catch((error) => {
        // Log the error and return a 500 Internal Server Error for any database-related issues
        console.error("Database error during login:", error);
        return res.status(500).send({ message: "Internal Server Error" });
      });
  } catch (error) {
    // Handle unexpected errors
    console.error("Unexpected error during login:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

/**GET: http://localhost:8080/api/user/all
 * @param : {
    "keyword":"example",
}
 * **/
/**
 * Asynchronously searches users based on the provided keyword.
 *
 * @param {Object} req - The HTTP request object, including the query parameter 'searchKeyword'.
 * @param {Object} res - The HTTP response object used to send back the found users or an error message.
 * @returns {Promise<Response>} A response with the search results or an error message.
 */
export async function getSearchUsers(req, res) {
  try {
    // Retrieve the search keyword from the query parameters
    const { searchKeyword } = req.query;
    const { userId, userType } = req.user;

    if (userType != "ADMIN") {
      return res.status(401).send("Invalid Credentials ... ");
    }

    // Check if the search keyword is provided
    // if (!searchKeyword) {
    //   return res.status(400).send({ message: "Search keyword is required" });
    // }

    // Define the search criteria to look for the keyword in name, email, or phone
    const searchCriteria = {
      $and: [
        // Added $and to ensure all conditions are met
        {
          $or: [
            { name: { $regex: searchKeyword, $options: "i" } }, // Case insensitive matching for name
            { email: { $regex: searchKeyword, $options: "i" } }, // Case insensitive matching for email
            { phone: { $regex: searchKeyword, $options: "i" } }, // Case insensitive matching for phone
          ],
        },
        { isDelete: false }, // Ensure isDelete is false
      ],
    };

    const searchCriteria2 = {
      $and: [{ isDelete: false }],
    };

    // Execute the search using the defined criteria
    const users = await UserModel.find(
      searchKeyword == "" ? searchCriteria2 : searchCriteria
    ).select("-password");

    // Check if any users are found
    if (users.length === 0) {
      return res
        .status(404)
        .send({ message: "No users found matching the criteria" });
    }

    // Return the found users
    return res.status(200).json({ data: users, statusCode: 200 });
  } catch (error) {
    // Log the error and respond with an internal server error message
    console.error("Error searching users:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

/**POST: http://localhost:8080/api/user/7162312hgh12g3hj12gj
  
 * **/
/**
 * Asynchronously retrieves a user by ID from the database.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<Response>} The response with the user data or an error message.
 */
export async function getUser(req, res) {
  try {
    // Extract userId from request parameters
    const { userId } = req.params;

    // Validate userId is not null or empty
    if (!userId) {
      // Use 400 Bad Request for missing or invalid user ID input
      return res.status(400).send({ error: "Invalid User ID" });
    }

    // Find the user in the database by _id
    UserModel.findOne({ _id: userId })
      .then((user) => {
        if (!user) {
          // Return 404 Not Found if no user is found
          return res.status(404).send({ error: "User not found" });
        }

        // Destructure to exclude the password and convert Mongoose model instance to JSON
        const { password, ...rest } = user.toJSON();

        // Return successful response with user data, excluding password
        return res.status(200).send({ user: rest });
      })
      .catch((error) => {
        // Handle possible database errors
        console.error("Database error:", error);
        return res.status(500).send({ message: "Internal Server Error" });
      });
  } catch (error) {
    // Handle unexpected errors
    console.error("Unexpected error:", error);
    return res.status(500).send({ message: "Internal Server Error" });
  }
}

/**DELETE : http://localhost:8080/api/user/7162312hgh12g3hj12gj
  
 * **/
/**
 * Asynchronously retrieves a user by ID from the database.
 *
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @returns {Promise<Response>} The response with the user data or an error message.
 */
export async function deleteUser(req, res) {
  try {
    // Extract userId from request parameters
    const { userId } = req.params;
    const userAdmin = req.user;

    // Validate userId is not null or empty
    if (!userId) {
      // Use 400 Bad Request for missing or invalid user ID input
      return res
        .status(400)
        .send({ statusCode: 400, message: "Invalid User ID" });
    }

    // Find the user in the database by _id
    UserModel.findOne({ _id: userId })
      .then(async (user) => {
        if (!user) {
          // Return 404 Not Found if no user is found
          return res
            .status(404)
            .send({ statusCode: 400, message: "User not found" });
        }

        // Destructure to exclude the password and convert Mongoose model instance to JSON
        user.isDelete = true;

        user.updateHistory.push({
          userId: userAdmin.userId,
          changes: "User Deleted",
        });
        await user.save();

        // Return successful response with user data, excluding password
        return res.status(200).send({
          statusCode: 200,
          message: "User Successfully deleted ",
        });
      })
      .catch((error) => {
        // Handle possible database errors

        return res
          .status(500)
          .send({ statusCode: 500, message: "Internal Server Error" });
      });
  } catch (error) {
    // Handle unexpected errors

    return res
      .status(500)
      .send({ statusCode: 500, message: "Internal Server Error" });
  }
}
