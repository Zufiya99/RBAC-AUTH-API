// Intercept the request and check the token to see if the user is authenticated then only it will allow users to access the route

import jsonwebtoken from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "No token, authorization denied!" });
    }

    try {
      const decode = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      req.user = decode;
      console.log("The decoded token is: ", decode);
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token is not valid!" });
    }
  } else {
    return res.status(401).json({ message: "No token, authorization denied!" });
  }
};

export default verifyToken;
