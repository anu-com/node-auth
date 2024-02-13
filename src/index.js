express = require('express');
path = require('path');
app = express();
bcrypt = require('bcrypt');
student = require('./database');
port=8080;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/', function(req, res){
    res.render('login');
})

app.get('/home',(req,res) => {
    res.render('home')
})




app.post('/', async(req, res) => {

    checkuser = await student.findOne({uname: req.body.uname})
    if(checkuser){
        const checkpass = await bcrypt.compare(req.body.pass, checkuser.pass);
        if(checkpass){res.redirect('/home')}
        else{res.send('incorrect pasword plese try again')}
    }
    else{res.send('user does not exist')}
    
})

app.post('/register', async(req,res) =>{
const{uname, pass} = req.body;

existingUser = await student.findOne({uname});
if(existingUser){res.send("user already exists. please try another username")}
else{
enpass = await bcrypt.hash(pass, 11);
newStudent = new student({
    uname:uname,
    pass: enpass
});
console.log(uname, enpass)
 studentsave = await newStudent.save();
 res.redirect('/register')};

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