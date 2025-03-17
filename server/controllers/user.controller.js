const bcrypt = require("bcrypt");
const userModel = require("../models/user.model");
const translates = require("../locales/translate");
const UserDto = require("../dtos/user.dto");
const tokenUtil = require("../utils/token");

class UserController {
  async create(req, res) {
    try {
      const { lang = "en" } = req.query;
      const { fullName, email, phone, password } = req.body;

      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).json({
          message:
            translates.user.create.emailExist[lang] || "Email already exists",
          error: true,
        });
      }
      if (!password || password.length < 8) {
        return res.status(400).json({
          message:
            translates.user.create.passwordShort[lang] ||
            "Password must be at least 8 characters",
          error: true,
        });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const createdUser = await userModel.create({
        fullName,
        phone,
        email,
        password: hashedPassword,
      });
      console.log(createdUser);
      const userDto = new UserDto(createdUser);
      const token = tokenUtil(userDto);

      return res.status(201).json({
        message: translates.user.create.success[lang],
        token,
        user: userDto,
      });
    } catch (error) {
      console.error("Error in user creation:", error);
      return res.status(500).json({
        message: "Something went wrong",
        error: true,
      });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const { lang = "en" } = req.query;

      const userExist = await userModel.findOne({ email });
      if (!userExist) {
        return res.status(400).json({
          message: translates.user.create.emailExist[lang],
          error: true,
        });
      }
      const passwordCompare = await bcrypt.compare(
        password,
        userExist.password
      );
      if (!passwordCompare) {
        return res.status(400).json({
          message: translates.user.login.incorrectPassword[lang],
          error: true,
        });
      }
      const userDto = new UserDto(userExist);
      const token = tokenUtil(userDto);

      return res.status(200).json({
        message: "Login",
        token,
        user: userDto,
      });
    } catch (error) {
      console.error("Error in user creation:", error);
      return res.status(500).json({
        message: "Something went wrong",
        error: true,
      });
    }
  }
  async getUser(req, res) {
    try {
      const { lang = "en" } = req.query;
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          message: translates.user.login.noUser[lang],
          error: true,
        });
      }

      const user = await userModel.findById(userId).select("-password");
      if (!user) {
        return res.status(404).json({
          message:
            translates.user.login.noUser[lang] ||
            "User with this email not found",
          error: true,
        });
      }

      const userDto = new UserDto(user);
      return res.status(200).json({
        message: "User retrieved successfully",
        user: userDto,
      });
    } catch (error) {
      console.error("Error in getUser:", error);
      return res.status(500).json({
        message: "Something went wrong",
        error: true,
      });
    }
  }

  async update(req, res) {
    try {
      const { lang = "en" } = req.query;
      const userId = req.user?.id;
      const { fullName, email, phone, password } = req.body;

      if (!userId) {
        return res.status(401).json({
          message:
            translates.user.login.noUser[lang] || "User not authenticated",
          error: true,
        });
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          message:
            translates.user.login.noUser[lang] ||
            "User with this email not found",
          error: true,
        });
      }
      if (fullName) user.fullName = fullName;
      if (email) {
        const existingUser = await userModel.findOne({ email });
        if (existingUser && existingUser._id.toString() !== userId) {
          return res.status(400).json({
            message:
              translates.user.create.emailExist[lang] || "Email already exists",
            error: true,
          });
        }
        user.email = email;
      }
      if (phone) user.phone = phone;
      if (password) {
        if (password.length < 8) {
          return res.status(400).json({
            message:
              translates.user.create.passwordShort[lang] ||
              "Password must be at least 8 characters",
            error: true,
          });
        }
        user.password = await bcrypt.hash(password, 10);
      }

      await user.save();
      const userDto = new UserDto(user);

      return res.status(200).json({
        message: "User updated successfully",
        user: userDto,
      });
    } catch (error) {
      console.error("Error in update:", error);
      return res.status(500).json({
        message: "Something went wrong",
        error: true,
      });
    }
  }

  async delete(req, res) {
    try {
      const { lang = "en" } = req.query;
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({
          message:
            translates.user.login.noUser[lang] || "User not authenticated",
          error: true,
        });
      }

      const user = await userModel.findById(userId);
      if (!user) {
        return res.status(404).json({
          message:
            translates.user.login.noUser[lang] ||
            "User with this email not found",
          error: true,
        });
      }

      await userModel.deleteOne({ _id: userId });

      return res.status(200).json({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error in delete:", error);
      return res.status(500).json({
        message: "Something went wrong",
        error: true,
      });
    }
  }
}

module.exports = new UserController();
