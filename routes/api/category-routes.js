const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const allCategories = await Category.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ],
  });
  res.json(allCategories).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});


router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryByID = await Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ],
  });
  res.json(categoryByID).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', async (req, res) => {
  // create a new category
  const newCategory = await Category.create(
    {
      category_name: req.body.category_name,
  }).then(res.json(newCategory))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((updatedCategory) => {
    res.json(updatedCategory);
  }).catch((err) => res.json(err)); 
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id
    },
  }).then((deletedCategory) => {
    res.json(deletedCategory);
  }).catch((err) => res.json(err));
});

module.exports = router;
