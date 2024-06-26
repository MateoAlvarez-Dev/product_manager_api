const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const { Server } = require('socket.io');
const dbConnection = require('./db/database');

const app = express();
const port = 5510;

const productRoutes = require('./routes/product.routes');
const cartRoutes = require('./routes/cart.routes');
const chatRoutes = require('./routes/chat.routes');
const viewRoutes = require('./routes/views.routes');
const realTimeRoutes = require('./services/realTime');

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
app.use(chatRoutes);

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);


const httpServer = app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})

const socketServer = new Server(httpServer);

socketServer.on("connection", (socket) => realTimeRoutes(socket, socketServer));

dbConnection().then(() => {
  console.log("Database connection stablished");
}).catch((e) => {
  console.log(e);
});