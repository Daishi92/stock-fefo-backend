const { Low } = require("lowdb");
const { JSONFile } = require("lowdb/node");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createUser = require("../models/User");

const adapter = new JSONFile("./database/db.json");
const db = new Low(adapter, {
  users: []
});

const SECRET = "stock_fefo_secret_2026";

async function register(req, res) {
  await db.read();

  const { nom, email, password, role } = req.body;

  const existe = db.data.users.find(
    user => user.email === email
  );

  if (existe) {
    return res.status(400).json({
      message: "Utilisateur déjà existant"
    });
  }

  const hash = await bcrypt.hash(password, 10);

  const user = createUser({
    nom,
    email,
    password: hash,
    role
  });

  db.data.users.push(user);

  await db.write();

  res.json({
    message: "Utilisateur créé",
    user: {
      id: user.id,
      nom: user.nom,
      role: user.role
    }
  });
}


async function login(req, res) {
  await db.read();

  const { email, password } = req.body;

  const user = db.data.users.find(
    u => u.email === email
  );

  if (!user) {
    return res.status(404).json({
      message: "Utilisateur introuvable"
    });
  }

  const ok = await bcrypt.compare(
    password,
    user.password
  );

  if (!ok) {
    return res.status(401).json({
      message: "Mot de passe incorrect"
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role
    },
    SECRET,
    {
      expiresIn: "7d"
    }
  );

  res.json({
    message: "Connexion réussie",
    token,
    user: {
      nom: user.nom,
      role: user.role
    }
  });
}

module.exports = {
  register,
  login
};
