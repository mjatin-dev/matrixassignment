//Import all the packages

const app                      =   require('express')(),
      bodyParser               =   require('body-parser'),

      session                  =   require('express-session'),
      flash                    =   require('express-flash'),
      path                     =   require('path'),
      passport                 =   require('passport'),
      methodOverride           =   require('method-override'),
     
      multer                   =   require('multer'),
      multipart                =   require('connect-multiparty'),
      multipartMiddleware      =   multipart(),
      initializePassword       =   require('./passport.js')

      initializePassword.initialize(passport);



var http = require('http').Server(app);
//****** PENDING

var io = require('socket.io')(http);

var clients = 0;
io.on('connection', function(socket) {
   clients++;
   io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   socket.on('disconnect', function () {
      clients--;
      io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
   });
});
//*****ENDS*******




// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
app.use(multipartMiddleware)
// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(flash())
app.use(session({
	secret:"thesecret",
	saveUninitialized:false,
	resave:false
}));
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');


const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

//CALL ALL THE ROUTES
var users = require('./routes/user.route.js'); 
var auth = require('./routes/auth.route.js');
var search = require('./routes/search.route.js');

app.use('/',users);
app.use('/auth',auth);
app.use('/search',search);




console.log(process.env.SCERET_KEY)
http.listen(3000,() => {
	console.log('sever is connected at 3000');
}) 