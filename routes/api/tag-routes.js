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
  });
  res.json(allTags).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
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
  });
  res.json(tagById).catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.post('/', async (req, res) => {
  // create a new tag
  const newTag = await Tag.create(
    {
      tag_name: req.body.tag_name,
    }
  ).then(res.json(newTag))
   .catch(err => {
     console.log(err);
     res.status(500).json(err);
   })
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
