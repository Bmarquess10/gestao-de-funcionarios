import React, { useEffect, useState } from "react";
import { db } from "../services/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf";
import { Button } from "@mui/material";

const ListaFuncionarios = () => {
  const [funcionarios, setFuncionarios] = useState([]);
  const navigate = useNavigate();

  // Função para buscar dados dos funcionários
  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "funcionarios"));
      setFuncionarios(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  // Função para gerar PDF com dados do funcionário
  const gerarPDF = (funcionario) => {
    const doc = new jsPDF();

    doc.text(`Nome: ${funcionario.nome}`, 10, 10);
    doc.text(`Cargo: ${funcionario.cargo}`, 10, 20);
    doc.text(`Endereço: ${funcionario.endereco}`, 10, 30);
    doc.text(`Telefone: ${funcionario.telefone}`, 10, 40);
    doc.text(`Data de Admissão: ${funcionario.dataAdmissao}`, 10, 50);
    doc.text(`Salário: ${funcionario.salario}`, 10, 60);

    // Verificar se a foto do funcionário existe
    if (funcionario.fotoURL) {
      const img = new Image();
      img.src = funcionario.fotoURL;
      img.onload = () => {
        doc.addImage(img, "JPEG", 10, 70, 50, 50);
        doc.save(`${funcionario.nome}_informacoes.pdf`);
      };
    } else {
      doc.save(`${funcionario.nome}_informacoes.pdf`);
    }
  };

  return (
    <div>
      <h1>Lista de Funcionários</h1>

      {/* Botão para cadastrar um novo funcionário */}
      <Button variant="contained" color="primary" onClick={() => navigate("/cadastrar")}>
        Cadastrar Novo Funcionário
      </Button>

      {/* Lista de funcionários */}
      <ul>
        {funcionarios.map((func) => (
          <li key={func.id}>
            {func.nome} - {func.cargo}

            {/* Botão para atualizar as informações do funcionário */}
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate(`/atualizar/${func.id}`)}
            >
              Atualizar
            </Button>

            {/* Botão para gerar PDF com as informações do funcionário */}
            <Button
              variant="contained"
              color="default"
              onClick={() => gerarPDF(func)}
            >
              Gerar PDF
            </Button>

            {/* Botão para ver o histórico do funcionário */}
            <Button
              variant="contained"
              color="info"
              onClick={() => navigate(`/historico/${func.id}`)}
            >
              Ver Histórico
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListaFuncionarios;




