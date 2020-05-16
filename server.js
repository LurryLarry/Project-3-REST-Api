const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const database = require('./database'); // Käytetään database tiedostoa
const arvostelu = require('./database'); // Käytetään arvostelu modelia

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


app.use(express.json());
app.use(express.static("public"));


app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
})

// Haetaan kaikki arvostelut ja lähetetään tulokset jsonina
app.get("/api/arvostelut", function (req, res) {
  arvostelu.find({}, function (err, results) {
    if (err) {
      console.error(err);
      res.status(500).send('Error 500:' + err);
    }

    res.status(200).json(results); // Lähetetään tulokset jsonina statuksen ollessa 200

  });


  // Haetaan arvostelu id:n perusteella ja lähetetään tulokset jsonina

})
app.get("/api/arvostelut/:id", function (req, res) {
  arvostelu.findOne({ "_id": req.params.id }, function (err, results) {
    if (err) {
      return res.status(500).send(err); // Virheilmoitus jos palvelimella vikaa
    }
    res.status(200).json(results); // Lähetetään tulokset jsonina statuksen ollessa 200
  });
});


// Lisätään yksi arvostelu
app.post("/api/lisaa", function (req, res) {

  // Luodaan database.js validoinnin mukainen arvostelu
  let uusiArvostelu = new arvostelu({
    arvostelija: req.body.arvostelija,
    elokuva: req.body.elokuva,
    kommentti: req.body.kommentti,
    arvostelupaiva: Date.now()
  });

  // Tallennetaan olio tietokantaan
  uusiArvostelu.save(function (err, result) {
    if (err) {
      console.log("Epäonnistui: " + err);
      return res.status(400).send(); // Virheilmoitus jos käyttäjä ei täytä arvostelun tietoja

    }
    const response = {
      message: "Arvostelu lisätty onnistuneesti", // Ilmoitus onnistuneesta poistosta
    };
    return res.status(200).send(response); // Status koodin ollessa 200 lähetetään aikaisemmin luotu ilmoitus
  });


});
// Muokataan leffan tietoja id-numeron perusteella.
app.put("/api/muokkaa/:id", function (req, res) {
  arvostelu.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, results) {
    if (err) {
      res.status(500).send('Error 500:' + err);
    }
    const response = {
      message: "Arvostelu muokattu onnistuneesti", // Ilmoitus onnistuneesta poistosta
    };
    return res.status(200).send(response); // Status koodin ollessa 200 lähetetään aikaisemmin luotu ilmoitus
  });

});

// Poistetaan arvostelu id:n perusteella
app.delete("/api/poista/:id", function (req, res) {

  arvostelu.findByIdAndDelete(req.params.id, function (err) {
    if (err) {
      res.status(500).send('Error 500:' + err);
    }
    const response = {
      message: "Arvostelu poistettu onnistuneesti", // Ilmoitus onnistuneesta poistosta
    };
    return res.status(200).send(response); // Status koodin ollessa 200 lähetetään aikaisemmin luotu ilmoitus
  });


});


const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});