const express = require('express');
const app = express();
const port = 5510;
const productRoutes = require('./routes/product.routes');


app.use('/products', productRoutes);



app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})