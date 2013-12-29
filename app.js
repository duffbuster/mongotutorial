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

// Launch server
app.listen(4242);
