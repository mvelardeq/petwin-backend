import { request, response } from "express";

export const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).send({
      msg: "It's necessary validate tha token first",
    });
  }

  const { role, firstName } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).send({
      msg: `${firstName} is not admin`,
    });
  }
  next();
};

export const hasPermissionRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(500).send({
        msg: "It's necessary validate tha token first",
      });
    }

    const { role, firstName } = req.user;

    if (!roles.includes(role)) {
      return res.status(401).send({
        msg: `This service required one of these roles: ${roles}`,
      });
    }
    next();
  };
};
