import { Router } from "express";

import { Product } from "../models/products_model.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await Product.find();
    if (result.length > 0) {
      res.status(200).json({ data: result, msg: [], sucess: true });
    } else {
      res
        .status(404)
        .json({ msg: "No result were found", data: [], sucess: false });
    }
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({
        msg: "Enternal server error",
        error: error.message,
        sucess: false,
      });
  }
});

router.post("/", async (req, res) => {

  try {
    const product = new Product(req.body);
    await product.save();
    res
      .status(200)
      .json({
        msg: "Product created sucessfully",
        data: product,
        sucess: true,
      });
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) =>
        err.message.replace("Path", "").trim()
      );
      res
        .status(400)
        .json({
          msg: "Product creation failed",
          errors: messages,
          sucess: false,
        });
    } else {
      console.error(error); // Log other errors for debugging
      res
        .status(500)
        .json({ msg: "An internal server error occurred", success: false });
    }
  }
});

router.put("/", async (req, res) => {
  const { id, name, price, image } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ msg: "Product ID is required", sucess: false });
  }
  try {
    const updated_product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        image,
      },
      { new: true, runValidators: true }
    );
    if (updated_product) {
      return res
        .status(200)
        .json({
          msg: "Product updated successfully",
          data: updated_product,
          sucess: true,
        });
    } else {
      return res.status(404).json({ msg: "Product not found", sucess: false });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return res
      .status(500)
      .json({
        msg: "Internal server error",
        error: error.message,
        success: false,
      });
  }
});

router.delete("/", async (req, res) => {
  const { id } = req.body;
  try {
    const product = await Product.findById(id);
    if (product) {
      await product.deleteOne();
      res
        .status(200)
        .json({ msg: "Product deleted successfully", success: true });
    } else {
      res.status(404).json({ msg: "Product not found", success: false });
    }
  } catch (error) {
    console.error("Error during deletion:", error); // Log the error for debugging
    res
      .status(500)
      .json({
        msg: "Internal server error",
        error: error.message,
        success: false,
      });
  }
});

export default router;
