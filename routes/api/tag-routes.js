const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const allTags = await Tag.findAll({
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ],
  }).catch((err) => {
    res.json(err);
  });
  res.json(allTags);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const tagById = await Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: Product,
        attributes: ['product_name']
      }
    ],
  }).catch((err) => {
    res.json(err);
  });
  res.json(tagById);
});
router.post('/', async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(
    {
      tag_name: req.body.tag_name,
    }
  ).catch((err) => {
    res.json(err);
  });
  res.json(newTag);
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  }).then((updatedTag) => {
    res.json(updatedTag);
  }).catch((err) => res.json(err)); 
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    },
  }).then((deletedTag) => {
    res.json(deletedTag);
  }).catch((err) => res.json(err));
});

module.exports = router;
