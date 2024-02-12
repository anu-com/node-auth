mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/student").then(() => {
    console.log("database connected");
}).catch((err) => { 
    console.log(err);
});


Schema = mongoose.Schema({
    uname: String,
    pass: String,
})

StudentModel = mongoose.model("student", Schema);



module.exports = StudentModel
