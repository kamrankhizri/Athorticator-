import { getByIdUsersModel } from "../modules/users/users.model.js";

export const authorizeRoles = (roles) => {
  return async (req, res, next) => {
    // get id from req.user
    if (!req.user) return res.status(401).json({ error: "Not authenticated" });
    // get user data based on id
    const user = await getByIdUsersModel(req.user?.id);
    // send error if user is not admin
    const isEligible = user?.roles?.some(role => roles?.includes(role))
    if (!isEligible) {
      return res.status(403).json({ error: "Forbidden — insufficient role" });
    }
    // if user is admin run next function
    next();
  };
};
