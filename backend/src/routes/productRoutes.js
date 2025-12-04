const express = require("express");
const upload = require("../middleware/upload");
const {
  getAll,
  create,
  remove,
  getNew,
  getPopular,
  getRelated,
} = require("../controllers/productController");

const router = express.Router();

router.get("/products", getAll);
router.post("/products", upload.single("product"), create);
router.delete("/products/:id", remove);

router.get("/products/new", getNew);
router.get("/products/popular", getPopular);
router.get("/products/related", getRelated);

module.exports = router;
