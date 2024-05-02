const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');

const app = express();
const port = 5510;
const productRoutes = require('./routes/product.routes');
const viewRoutes = require('./routes/views.routes');

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(bodyParser.json());

app.use('/static', express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');


app.use(viewRoutes);

app.use('/api/products', productRoutes);
app.use('/api/carts', productRoutes);


const httpServer = app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  console.log("New Client Connected")
})