import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  deleteProduct,
  updateProduct
} from "../controllers/product.controller.js";



const router = express.Router();

router.post("/",   createProduct);
router.get("/", getAllProducts);
router.get("/:id",  getProductById);
router.delete("/:id",  deleteProduct);
router.put("/:id",   updateProduct);

export default router;