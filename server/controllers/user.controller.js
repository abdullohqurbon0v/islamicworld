const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const { translates } = require("../locales/translate");
const userDto = require("../dtos/user.dto");
const token = require("../utils/token");
class UserController {
  async crete(req, res) {
    try {
      const { lang } = req.query;
      const { fullName, email, phone, password } = req.body;
      const existingUser = await userModel.findOne({ fullName });
      if (existingUser) {
        return res.status(400).json({
          message: translates.user.create.emailExist[lang],
          error: true,
        });
      }
      if (password.length < 8) {
        return res.status(400).json({
          message: translates.user.passwordShort[lang],
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await userModel.create({
        fullName,
        phone,
        email,
        password: hashedPassword,
      });
      const payload = userDto(createdUser);
      const token = token(payload);

      return res.status(201).json({
        message: "",
        token,
        user: createdUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Something went wrong",
        error: true,
      });
    }
  }
  async login(req, res) {}
  async getuser(req, res) {}
  async update(req, res) {}
  async delete(req, res) {}
}

module.exports = new UserController();
