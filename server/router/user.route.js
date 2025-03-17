const userController = require("../controllers/user.controller");

const router = require("express").Router();

// GET
router.get("/get", userController.getuser);

// POST
router.post("/login", userController.login);
router.post("/create", userController.crete);

// PUT
router.put("/update", userController.update);

// DELETE
router.delete("/delete", userController.delete);

module.exports = router;
