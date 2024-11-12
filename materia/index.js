const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const materias = [
  "matematica",
  "fisica",
  "quimica",
  "biologia",
  "literatura",
  "portugues",
  "historia",
  "geografia",
];
let materiasRecebidas = [];
let materiasCadastradas = [];

app.post("/cadastrarmateria/", (req, res) => {
  materiasRecebidas = req.body;

  materiasRecebidas.forEach((materia) => {

    const { titulo, conteudo } = materia;

    let tituloMinusculo = titulo.toLowerCase();

    materiasCadastradas.push({
      titulo: tituloMinusculo,
      conteudo: conteudo,
      id: verificarId(tituloMinusculo),
    });

    function verificarId( titulo ){
        const materiaEncontrada = materias.find((materia) => materia === titulo)
        return materias.indexOf(materiaEncontrada) + 1
    }
  });

  return res.status(200).json({
    mensagem: `${materiasCadastradas.length} matéria(s) cadastrada(s) com sucesso!`,
    materias: materiasCadastradas,
  });
});
///////// GET TODAS AS MATERIAS
app.get("/materias", (req, res) => {
  return res.status(200).json({
    mensagem: "Lista de materias cadastradas",
    materias: materiasCadastradas,
  });
});
////////// GET MATERIAS POR ID
app.get("/materias/:id", (req, res) => {
  let id = req.params.id;
  let idMateria = Number(id);
  let encontrarMateriasPorId = [];

  materiasCadastradas.forEach((materia) => {
    if (idMateria === materia.id) {
      encontrarMateriasPorId.unshift(materia);
    }
  });
  return res.status(200).json({
    mensagem: "Materias Filtradas!",
    materias: encontrarMateriasPorId,
  });
});

app.listen(5000, () => {
  console.log("Servidor rodando na porta 5000");
});
