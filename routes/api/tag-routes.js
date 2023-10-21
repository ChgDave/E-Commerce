const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  try {
    // find all tags
    // be sure to include its associated Product data
    const tags = await Tag.findAll({ include: [{ model: Product }] });
    res.status(200).json(tags);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    // find a single tag by its `id`
    // be sure to include its associated Product data
    const tag = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tag) {
      return res
        .status(404)
        .json({ message: "No tag can be found with that id!" });
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    // create a new tag
    const tag = await Tag.create({
      tag_name: req.body.tag_name,
    });
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const tag = await Tag.update(
      { tag_name: req.body.tag_name },
      { where: { id: req.params.id } }
    );
    if (!tag[0]) {
      return res
        .status(404)
        .json({ message: "No tag can be found with that id!" });
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/:id", async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tag = await Tag.destroy({ where: { id: req.params.id } });
    if (!tag) {
      return res
        .status(404)
        .json({ message: "No tag can be found with that id!" });
    }
    res.status(200).json(tag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
