const { Router } = require('express');
const Item = require('../models/Item');
const { post } = require('./users');
const authenticate = require('../middleware/authenticate');
const authorizeItem = require('../middleware/authenticate');
// get put post delete

module.exports = Router().get(
  '/',
  [authenticate, authorizeItem],
  async (req, res) => {
    const allItems = await Item.getAll(req.user.id);
    res.json(allItems);
  }
);

// TO DO - implement items CRUD
