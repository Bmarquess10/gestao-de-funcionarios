import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, storage } from "../services/firebaseConfig"; // Certifique-se de que o caminho para firebaseConfig está correto
import { doc, getDoc, updateDoc, collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AtualizarFuncionario = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [funcionario, setFuncionario] = useState({
    nome: "",
    sobrenome: "",
    sexo: "",
    endereco: "",
    telefone: "",
    email: "",
    dataNascimento: "",
    cargo: "",
    dataAdmissao: "",
    setor: "",
    salario: "",
    status: "ativo",
    fotoURL: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [foto, setFoto] = useState(null);

  // Função para buscar os dados do funcionário
  useEffect(() => {
    const fetchFuncionario = async () => {
      try {
        const docRef = doc(db, "funcionarios", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setFuncionario(docSnap.data());
        } else {
          alert("Funcionário não encontrado!");
          navigate("/lista-funcionarios"); // Redireciona para a lista de funcionários
        }
      } catch (error) {
        console.error("Erro ao buscar funcionário:", error);
        alert("Ocorreu um erro ao buscar o funcionário.");
      }
    };

    fetchFuncionario();
  }, [id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFuncionario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFoto(e.target.files[0]);
  };

  // Função para salvar o histórico de atualizações na subcoleção 'historico'
  const salvarHistorico = async (dadosAnteriores, dadosAtualizados) => {
    const alteracoes = {};

    // Comparar os dados antigos com os novos
    Object.keys(dadosAtualizados).forEach((campo) => {
      if (dadosAtualizados[campo] !== dadosAnteriores[campo]) {
        alteracoes[campo] = {
          antigo: dadosAnteriores[campo] || "não informado",
          novo: dadosAtualizados[campo] || "não informado",
        };
      }
    });

    if (Object.keys(alteracoes).length > 0) { // Só salva se houver alterações
      const historicoRef = collection(db, "funcionarios", id, "historico");
      const novaAlteracao = {
        data: new Date(),
        alteracao: alteracoes,
      };
      await addDoc(historicoRef, novaAlteracao);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let fotoURL = funcionario.fotoURL;
      if (foto) {
        const fotoRef = ref(storage, `fotos/${Date.now()}_${foto.name}`); // Garante um nome único para a foto
        await uploadBytes(fotoRef, foto);
        fotoURL = await getDownloadURL(fotoRef);
      }

      const updatedData = { ...funcionario, fotoURL };
      const docRef = doc(db, "funcionarios", id);
      const docSnap = await getDoc(docRef);
      const dadosAnteriores = docSnap.data();

      await updateDoc(docRef, updatedData);

      // Salva o histórico da atualização
      await salvarHistorico(dadosAnteriores, updatedData);

      alert("Funcionário atualizado com sucesso!");
      navigate("/lista-funcionarios");
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      alert("Ocorreu um erro ao atualizar o funcionário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome:</label>
      <input
        type="text"
        name="nome"
        value={funcionario.nome}
        onChange={handleChange}
        placeholder="Digite o nome do funcionário"
        required
      />
      
      <label>Sobrenome:</label>
      <input
        type="text"
        name="sobrenome"
        value={funcionario.sobrenome}
        onChange={handleChange}
        placeholder="Digite o sobrenome do funcionário"
        required
      />
      
      <label>Sexo:</label>
      <input
        type="text"
        name="sexo"
        value={funcionario.sexo}
        onChange={handleChange}
        placeholder="Informe o sexo (masculino, feminino, etc.)"
        required
      />
      
      <label>Endereço:</label>
      <input
        type="text"
        name="endereco"
        value={funcionario.endereco}
        onChange={handleChange}
        placeholder="Endereço completo"
        required
      />
      
      <label>Telefone:</label>
      <input
        type="text"
        name="telefone"
        value={funcionario.telefone}
        onChange={handleChange}
        placeholder="Número de telefone com DDD"
        required
      />
      
      <label>Email:</label>
      <input
        type="email"
        name="email"
        value={funcionario.email}
        onChange={handleChange}
        placeholder="Email corporativo"
        required
      />
      
      <label>Data de Nascimento:</label>
      <input
        type="date"
        name="dataNascimento"
        value={funcionario.dataNascimento}
        onChange={handleChange}
        required
      />
      
      <label>Cargo:</label>
      <input
        type="text"
        name="cargo"
        value={funcionario.cargo}
        onChange={handleChange}
        placeholder="Cargo atual"
        required
      />
      
      <label>Data de Admissão:</label>
      <input
        type="date"
        name="dataAdmissao"
        value={funcionario.dataAdmissao}
        onChange={handleChange}
        required
      />
      
      <label>Setor:</label>
      <input
        type="text"
        name="setor"
        value={funcionario.setor}
        onChange={handleChange}
        placeholder="Setor ou departamento"
        required
      />
      
      <label>Salário:</label>
      <input
        type="number"
        name="salario"
        value={funcionario.salario}
        onChange={handleChange}
        placeholder="Salário atual"
        required
      />
      
      <label>Foto do Funcionário:</label>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
      />
      
      <label>Status:</label>
      <select
        name="status"
        value={funcionario.status}
        onChange={handleChange}
      >
        <option value="ativo">Ativo</option>
        <option value="promovido">Promovido</option>
        <option value="desligado">Desligado</option>
      </select>
      
      <button type="submit" disabled={loading}>
        {loading ? "Atualizando..." : "Atualizar Funcionário"}
      </button>
    </form>
  );
};

export default AtualizarFuncionario;
















       

