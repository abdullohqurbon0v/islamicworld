const quranController = require("../controllers/quran.controller");
const authMiddleware = require("../middlewares/auth");

const router = require("express").Router();

// GET
router.get("/get", authMiddleware, quranController.getSurah);

router.delete("/delete", authMiddleware, quranController.delete);

// POST ADMIN
router.post("/create", quranController.create);
router.post("/create", quranController.create);
// PUT
router.put("/update", authMiddleware, quranController.update);

// DELETE

module.exports = router;
