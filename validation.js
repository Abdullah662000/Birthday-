const joi = require("joi");
const signupvalidate = async (data) => {
  const scheme = joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  const res = await scheme.validateAsync(data);
  return res;
};
const loginvalidate = async (data) => {
  const scheme = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
  });
  const res = await scheme.validateAsync(data);
  return res;
};
const friendvalidate = async (data) => {
  const schema = joi.object({
    name: joi.string().required(),
    date: joi.date(),
  });
  const res = joi.validateAsync(schema);
  return res;
};
module.exports.friendvalidate = friendvalidate;
module.exports.signupvalidate = signupvalidate;
module.exports.loginvalidate = loginvalidate;
