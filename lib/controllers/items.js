const { Router } = require('express');
const Item = require('../models/Item');
const authenticate = require('../middleware/authenticate');
const authorizeItem = require('../middleware/authenticate');
// get put post delete

module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const newItem = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(newItem);
    } catch (e) {
      next(e);
    }
  })
  .get('/', [authenticate, authorizeItem], async (req, res, next) => {
    try {
      const allItems = await Item.getAll(req.user.id);
      res.json(allItems);
    } catch (e) {
      next(e);
    }
  });

// TO DO - implement items CRUD
