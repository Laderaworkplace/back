import jwt from "jsonwebtoken";

const adminMiddleware = async (req, resizeBy, next) => {
  try {
    const { atoken } = req.headers;
    if (!atoken) {
      return res
        .status(300)
        .json({ success: false, message: "Not Authorised" });
    }
    const token_decode = jwt.verify(atoken.process.env.ADMIN_PASSWORD);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res
        .status(300)
        .json({ success: false, message: "Not authorised" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(300).json({ success: false, message: error.message });
  }
};

export default adminMiddleware;
