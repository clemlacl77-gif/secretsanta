const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

let secretSantaList = [];

app.post('/submit', (req, res) => {
  const { name } = req.body;
  if (secretSantaList.length < 7) {
    secretSantaList.push(name);
    res.send({ success: true });
  } else {
    res.send({ success: false, message: 'Déjà 7 prénoms enregistrés.' });
  }
});

app.post('/reveal', (req, res) => {
  const { password } = req.body;
  if (password === 'jeanneaoubliésonsecretsanta' && secretSantaList.length === 7) {
    res.send({ list: secretSantaList });
  } else {
    res.send({ error: 'Mot de passe incorrect ou liste incomplète.' });
  }
});

app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
