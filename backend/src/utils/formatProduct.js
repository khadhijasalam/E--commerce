
const formatProduct = (p, port) => ({
  id: p._id,
  name: p.name,
  category: p.category,
  new_price: p.new_price,
  old_price: p.old_price,
  image: `http://localhost:${port}/images/${p.image}`
});

module.exports= formatProduct