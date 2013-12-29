var application_root = 'mongotutorial',
	express = require("express"),
	path = require("path"),
	mongoose = require('mongoose');

var app = express();

// Database
mongoose.connect('mongodb://localhost/ecomm_database');

// Config
app.configure(function() {
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.static(path.join(application_root, "public")));
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true}));
});

var Schema = mongoose.Schema;

var Product = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    style: { type: String, unique: true },
    modified: { type: Date, default: Date.now }
});

var ProductModel = mongoose.model('Product', Product);

app.get('/api', function(req, res) {
	res.send('Ecomm API is running');
});

// READ a list of products
app.get('api/products', function(req, res) {
	return ProductModel.find(function(err, products) {
		if(!err)
			return res.send(products);
		else
			return console.log(err);
	});
});

// CREATE a single product
app.post('/api/products', function(req, res) {
	var product;
	console.log("POST: ");
	console.log(req.body);
	product = new ProductModel({
		title: req.body.title,
		description: req.body.description,
		style: req.body.style
	});
	product.save(function(err) {
		if(!err)
			return console.log("Created");
		else
			return console.log(err);
	});
	return  res.send(product);
});

// READ a single product by ID
app.get('api/products/:id', function(req, res) {
	return ProductModel.findById(req.params.id, function(err, product) {
		if(!err)
			return res.send(product);
		else
			return console.log(err);
	});
});

// UPDATE a single product by ID
app.put('/api/products/:id', function(req, res) {
	return ProductModel.findById(req.params.id, function(err, product) {
		product.title = req.body.title;
		product.description = req.body.description;
		product.style = req.body.style;
		return product.save(function(err) {
			if(!err)
				console.log("updated");
			else
				console.log(err);
			return res.send(products);
		});
	});
});

// Launch server
app.listen(4242);
