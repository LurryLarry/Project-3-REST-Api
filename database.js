const mongoose = require('mongoose');
const connection = "mongodb+srv://lariv:salis123@cluster0-yfapt.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(connection, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => console.log("Database Connected Successfully"))
  .catch(err => console.log(err));

const arvostelu = mongoose.model("arvostelu", {
  arvostelija: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  elokuva: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 20
  },
  kommentti: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 400
  },
  arvostelupaiva: {
    type: Date
  }
});

arvostelu.find({}, function (err, results) {
  console.log(results);
});

module.exports = arvostelu;
// var uusiArvostelu = new arvostelu({
//   arvostelija: "meitsi",
//   elokuva: "shrek 5",
//   kommentti: "tosi hyvä",
//   arvostelupaiva: Date.now()
// });

// // Tallennetaan olio tietokantaan
// uusiArvostelu.save(function (err, result) {
//   if (err) console.log(err);
//   console.log("Tallennettu: " + result);
// });

