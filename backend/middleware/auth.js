import jwt from "jsonwebtoken";

export default async function Auth(req, res, next) {
  try {
    // Extract JWT token from the 'Authorization' header
    const token = req.headers.authorization.split(" ")[1];

    // Verify and decode the JWT token using the provided secret
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded token (user information) to the request object for further processing
    req.user = decodedToken;
    // return res.json(decodedToken);
    // Call the next middleware function in the request-response cycle
      next();
  } catch (error) {
    // If authentication fails (e.g., invalid or expired token), send a 401 Unauthorized response
    return res.status(401).json({ error: "Authentication Failed" });
  }
}
