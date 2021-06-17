const express = require("express");
const { uuid } = require("uuidv4");
const shortid = require("shortid");
const cors = require("cors");
const { handlerNotFound } = require("./middlewares");
const PORT = process.env.PORT || 3000;
const app = express();

const logger = (req, res, next) => {
  console.log(`Hay ${personas.length} personas en la lista`);

  return next();
};

const personas = [
  { id: 1, nombre: "Juan", edad: 30 },
  { id: 2, nombre: "Analia", edad: 24 },
  { id: 3, nombre: "Daniela", edad: 27 },
  { id: 4, nombre: "Martin", edad: 25 },
];

app.use(cors());
app.use(express.json());

app.use(logger);

app.get("/", (req, res) => {
  res.send("<h1>API PERSONAS</h1>");
});

app.get("/api/personas", (req, res) => {
  res.json(personas);
});

app.get("/api/personas/:id", (req, res) => {
  const id = req.params.id;
  const persona = personas.find((p) => p.id == id);
  persona ? res.json(persona) : res.status(404).end();
});

app.delete("/api/personas/:id", (req, res) => {
  const id = req.params.id;
  const indice = personas.findIndex((p) => p.id == id);
  if (indice != -1) {
    personas.splice(indice, 1);
    res.status(204).end();
  }
  res.status(404).end();
});

app.post("/api/personas", (req, res) => {
  const { nombre, edad } = req.body;

  if (nombre && edad) {
    const newPerson = {
      id: shortid.generate(),
      nombre,
      edad,
    };
    personas.push(newPerson);
    res.status(201).json(newPerson);
  }
  res.status(400).end();
});

app.put("/api/personas/:id", (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const persona = personas.find((p) => p.id == id);
  if (persona) {
    for (const key in data) {
      if (Object.hasOwnProperty.call(persona, key)) {
        persona[key] = data[key];
      }
    }
    res.status(200).json(persona);
  }
  res.status(400).end();
});

app.use(handlerNotFound);

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
