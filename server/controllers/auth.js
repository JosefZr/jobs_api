const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const {UnauthenticatedError} = require('../errors')

const register = async (req, res) => {

  const user = await User.create({ ...req.body });
  const token = user.createJWT()
  res.status(StatusCodes.CREATED).json({user:{name:user.name}, token });
};

const login = async (req, res) => {
  const {email, password} = req.body
  if(!email || !password){
    return res.status(StatusCodes.BAD_REQUEST).json({msg: 'Please provide both email and password' });
  }
  const user = await User.findOne({email})

 
  if(!user){
    throw new UnauthenticatedError("invalid credatials")
  }
  const isPasswordCorrext = await user.comparePassword(password)
  if(!isPasswordCorrext){
    throw new UnauthenticatedError("invalid credatials")
  }
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({user:{name:user.name},token})
};

module.exports = {
  register,
  login,
};
