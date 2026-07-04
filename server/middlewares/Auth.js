export const schedulerAuth = (req, res, next) => {
  const secretKey = req.headers["x-secret-key"];

  if (!secretKey) {
    return res.status(401).json({
      success: false,
      message: "Secret key is required",
    });
  }

  if (secretKey !== process.env.SCHEDULER_SECRET) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  next();
};