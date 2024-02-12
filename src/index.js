express = require('express');
path = require('path');
app = express();
phash = require('bcrypt');
student = require('./database');
port=8080;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.render('login');
})



app.post('/register', async(req,res) =>{
const{uname, pass} = req.body;
console.log(uname, pass)
saltRounds = 10;
encpass = phash.hash(pass, saltRounds);
console.log(encpass)
 newStudent = new student({uname, encpass});
 studentsave = await newStudent.save();
 res.redirect('/register');

})


app.get('/register', function(req, res){
    res.render('register');
})

app.get('/login', function(req, res){
    res.render('login');
})



app.listen(port, function(){
    console.log(`server started at http://localhost:${port}`);
})