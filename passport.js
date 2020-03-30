var LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
var usermodel = require('./models/user.model.js');

exports.initialize = async (passport) => {
const authenticateUser = async (email,password,done) => {
	const user = await usermodel.find({useremail:email});
	if(user.length == 0) return done(null,false,{message:"NO USER WITH THIS EMAIL"});
	else
	 {

       var valid = await bcrypt.compare(password,user[0].password);
       if(!valid) return done(null,false,{message:"INCORRECT PASSWORD"});
       else return done(null,user[0]);
	 }
}

passport.use(new LocalStrategy({usernameField:'email'},authenticateUser))
passport.serializeUser((user,done) => done(null,user.id))

passport.deserializeUser((id, done) => {
  usermodel.findById(id, (err, user) => {
    done(err, user);
  });
})

}



exports.checkauthenticate = async (req,res,next) => {
	if(req.isAuthenticated()) next();
	else res.redirect('/login')

}


exports.isnotcheckauthenticate = async (req,res,next) => {
	if(req.isAuthenticated()) return res.redirect('/login');
	else next();

}
