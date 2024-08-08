export const auth = (req, res, next) => {
  if (req.query.key === "a") return next();
  return res.status(401).json({
    error: {
      status: 401,
      message: "Unauthorized",
    },
  });
};
