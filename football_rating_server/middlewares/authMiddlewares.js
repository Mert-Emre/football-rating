export const requireAuth = (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json(JSON.stringify({ redirectUrl: "/login", authorized: false }));
  }
  next();
};
