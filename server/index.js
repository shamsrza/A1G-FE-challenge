const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3001;
const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const path = require('path');

let storage = [
  {
    id: 1,
    name: 'Croissant',
    stock: 12,
    price: 1.7,
    slug: 'croissant',
    image: '/assets/images/croissant.png',
    stock: 9,
  },
  {
    id: 2,
    name: 'Bread',
    stock: 7,
    price: 1.5,
    slug: 'bread',
    image: '/assets/images/bread.png',
    stock: 9,
  },
  {
    id: 3,
    name: 'Cupcake',
    stock: 25,
    price: 1.6,
    slug: 'cupcake',
    image: '/assets/images/cupcake.png',
    stock: 9,
  },
  {
    id: 4,
    name: 'Pretzel',
    stock: 18,
    price: 0.8,
    slug: 'pretzel',
    image: '/assets/images/pretzel.png',
    stock: 0,
  },
  {
    id: 5,
    name: 'Muffin',
    stock: 31,
    price: 2.3,
    slug: 'muffin',
    image: '/assets/images/muffin.png',
    stock: 9,
  },
  {
    id: 6,
    name: 'Pancake',
    stock: 9,
    price: 1.5,
    slug: 'pancake',
    image: '/assets/images/pancake.png',
    stock: 9,
  },
  {
    id: 7,
    name: 'Waffle',
    stock: 14,
    price: 2.2,
    slug: 'waffle',
    image: '/assets/images/waffle.png',
    stock: 9,
  },
  {
    id: 8,
    name: 'Cake',
    stock: 3,
    price: 8.5,
    slug: 'cake',
    image: '/assets/images/cake.png',
    stock: 9,
  },
];
app.use(
  '/assets/images',
  express.static(path.join(__dirname, 'public/assets/images'))
);

app.get('/api/storage', urlencodedParser, (req, res) => {
  res.json({ storage });
});

app.post('/api/order', jsonParser, (req, res) => {
  const items = req.body.items;
  let error = '';
  let errorItem = '';

  items.every((item) => {
    const filtered = storage.filter((el) => el.name === item.name);
    const match = filtered.length ? filtered[0] : null;

    if (item.quantity > match.stock) {
      error = `There are not enough ${item.name} in stock`;
      errorItem = match.name;
      return false;
    }

    match.stock = match.stock - item.quantity;
    return true;
  });

  if (error) {
    return res.status(400).json({ error, errorItem });
  }
  res.json({ message: 'success' });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
