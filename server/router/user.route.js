const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth");

const router = require("express").Router();

// GET
router.get("/get", authMiddleware, userController.getUser);

// POST
router.post("/login", userController.login);
router.post("/create", userController.create);

// PUT
router.put("/update", authMiddleware, userController.update);

// DELETE
router.delete("/delete", authMiddleware, userController.delete);

module.exports = router;
