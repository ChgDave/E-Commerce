const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint
router.get("/", async (req, res) => {
  try {
    // find all categories
    const categories = await Category.findAll({
      include: [{ model: Product }],
    });
    // be sure to include its associated Products
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find one category by its `id` value
    // be sure to include its associated Products
    const category = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    console.log(category);
    if (!category) {
      return res
        .status(404)
        .json({ message: "No category can be found with that id!" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    // create a new category
    const newCategory = await Category.create({
      category_name: req.body.category_name,
    });
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  try {
    // update a category by its `id` value
    const category = await Category.update(
      {
        category_name: req.body.category_name,
      },
      { where: { id: req.params.id } }
    );
    console.log(category);
    if (!category[0]) {
      return res
        .status(404)
        .json({ message: "No category can be found with that id!" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    // delete a category by its `id` value
    const category = await Category.destroy({ where: { id: req.params.id } });
    console.log(category);
    if (!category) {
      return res
        .status(404)
        .json({ message: "No category can be found with that id!" });
    }
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
