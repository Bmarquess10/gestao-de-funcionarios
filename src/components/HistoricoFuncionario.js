import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHistoricoFuncionario } from "../services/funcionarioService";

const HistoricoFuncionario = () => {
  const { id } = useParams(); // Captura o id da URL
  const [historico, setHistorico] = useState([]);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchHistorico = async () => {
      try {
        if (id) {
          const historicoData = await getHistoricoFuncionario(id);
          setHistorico(historicoData);
        } else {
          console.error("ID do funcionário não foi fornecido.");
        }
      } catch (error) {
        setErro("Erro ao obter histórico do funcionário.");
        console.error("Erro ao obter histórico do funcionário:", error);
      }
    };

    fetchHistorico();
  }, [id]);

  if (erro) {
    return <p>{erro}</p>;
  }

  // Função para formatar a exibição das alterações
  const formatarAlteracao = (alteracao) => {
    return (
      <div className="detalhes-alteracao">
        {Object.entries(alteracao).map(([campo, valores], index) => (
          <p key={index}>
            <strong>{campo}:</strong> de "{valores.antigo}" para "{valores.novo}"
          </p>
        ))}
      </div>
    );
  };

  return (
    <div className="historico-container">
      <h2>Histórico do Funcionário</h2>
      {historico.length > 0 ? (
        <ul>
          {historico.map((entry, index) => (
            <li className="historico-item" key={index}>
              <span className="historico-data">
                {entry.data instanceof Date
                  ? entry.data.toLocaleDateString("pt-BR")
                  : entry.data}
              </span>
              <div className="historico-descricao">
                {formatarAlteracao(entry.alteracao)}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhuma alteração encontrada no histórico.</p>
      )}
    </div>
  );
};

export default HistoricoFuncionario;










