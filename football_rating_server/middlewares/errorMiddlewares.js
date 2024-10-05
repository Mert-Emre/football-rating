import { validationResult } from "express-validator";

export const handleErrors = (url) => {
  return (req, res, next) => {
    const rawErrors = validationResult(req);
    if (!rawErrors.isEmpty()) {
      const mapped = rawErrors.mapped();
      const error = {};
      for (let prop in mapped) {
        error[prop] = mapped[prop].msg;
      }
      return res.status(400).json({ error, redirectUrl: url });
    }
    next();
  };
};
