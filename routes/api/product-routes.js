const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", async (req, res) => {
  try {
    // find all products
    // be sure to include its associated Category and Tag data
    const products = await Product.findAll({
      include: [{ model: Category }, { model: Tag }],
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get one product
router.get("/:id", async (req, res) => {
  try {
    // find a single product by its `id`
    // be sure to include its associated Category and Tag data
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category }, { model: Tag }],
    });
    if (!product) {
      return res
        .status(404)
        .json({ message: "No product can be found with that id!" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// create new product
router.post("/", async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Swimwear",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
      category_id: 2
    }
  */
  try {
    const product = await Product.create(req.body);
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.tagIds.length) {
      const productTagIdArr = req.body.tagIds.map((tag_id) => {
        return {
          product_id: product.id,
          tag_id,
        };
      });
      const productTagIds = await ProductTag.bulkCreate(productTagIdArr);
      return res.status(200).json({ product, productTagIds });
    }
    // if no product tags, just respond
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// update product
router.put("/:id", async (req, res) => {
  // update product data
  try {
    const product = await Product.update(req.body, {
      where: { id: req.params.id },
    });
    if (!product[0]) {
      return res
        .status(404)
        .json({ message: "No prodcut can be found with that id!" });
    }
    // check if there is tagIds in the update body
    if (req.body.tagIds && req.body.tagIds.length) {
      // find all the tagid that is associated with this product, productTags will be an array with an object as individual element.
      const productTags = await ProductTag.findAll({
        where: { product_id: req.params.id },
      });
      // take out all the tagIds from the productTags and put them into an array
      const productTagIds = productTags.map(({ tag_id }) => tag_id);
      // find out all the new tags
      const newProductTagIds = req.body.tagIds.filter(
        (tagId) => !productTagIds.includes(tagId)
      );
      // create prodcuttag array with object element for all the new tags.
      const newProductTags = newProductTagIds.map((tag_id) => {
        return {
          product_id: req.params.id,
          tag_id,
        };
      });
      // find out all the tags that will be removed
      const removeProductTagIds = productTagIds.filter(
        (tagId) => !req.body.tagIds.includes(tagId)
      );
      // create the new producttag with the newProductTags and delete producttag based on removeProductTagIds
      const updateAddProductTags = await ProductTag.bulkCreate(newProductTags);
      console.log(updateAddProductTags);

      const updateRemoveProductTags = await ProductTag.destroy({
        where: { tag_id: removeProductTagIds },
      });

      return res
        .status(200)
        .json({ product, updateAddProductTags, updateRemoveProductTags });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }

  // Product.update(req.body, {
  //   where: {
  //     id: req.params.id,
  //   },
  // })
  //   .then((product) => {
  //     // check if the product tags are being updated
  //     if (req.body.tagIds && req.body.tagIds.length) {
  //       ProductTag.findAll({
  //         where: { product_id: req.params.id },
  //       }).then((productTags) => {
  //         // create filtered list of new tag_ids
  //         const productTagIds = productTags.map(({ tag_id }) => tag_id);
  //         const newProductTags = req.body.tagIds
  //           .filter((tag_id) => !productTagIds.includes(tag_id))
  //           .map((tag_id) => {
  //             return {
  //               product_id: req.params.id,
  //               tag_id,
  //             };
  //           });

  //         // figure out which ones to remove
  //         const productTagsToRemove = productTags
  //           .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
  //           .map(({ id }) => id);
  //         // run both actions
  //         return Promise.all([
  //           ProductTag.destroy({ where: { id: productTagsToRemove } }),
  //           ProductTag.bulkCreate(newProductTags),
  //         ]);
  //       });
  //     }

  //     return res.json(product);
  //   })
  //   .catch((err) => {
  //     // console.log(err);
  //     res.status(400).json(err);
  //   });
});

router.delete("/:id", async (req, res) => {
  // delete one product by its `id` value
  try {
    const product = await Product.destroy({ where: { id: req.params.id } });
    if (!product) {
      return res
        .status(404)
        .json({ message: "No product can be found with that id!" });
    }
    // identify all the PK producttags ID for this product and put them into an array.
    const productTags = await ProductTag.findAll({
      where: { product_id: req.params.id },
    });
    const productTagsIdPk = productTags.map(({ id }) => id);
    // delete all producttags that matches the productTagsIdPk
    const productDelete = await ProductTag.destroy({
      where: { id: productTagsIdPk },
    });
    res.status(200).json({ product, productDelete });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
