const { Router } = require('express');
const Item = require('../models/Item');
const authenticate = require('../middleware/authenticate');
const authorizeItem = require('../middleware/authorizeItem');
const { restart } = require('nodemon');
// get put post delete

module.exports = Router()
  .delete('/:id', authenticate, authorizeItem, async (req, res, next) => {
    try {
      const deletedItem = await Item.delete(req.params.id);
      res.json(deletedItem);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', authenticate, authorizeItem, async (req, res, next) => {
    try {
      const updatedItem = await Item.updateById(req.params.id, req.body);
      res.json(updatedItem);
    } catch (e) {
      next(e);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const newItem = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(newItem);
    } catch (e) {
      next(e);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const allItems = await Item.getAll(req.user.id);
      res.json(allItems);
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
