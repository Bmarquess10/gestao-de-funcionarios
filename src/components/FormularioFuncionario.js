import React, { useState } from "react";
import { db, storage } from "../services/firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { jsPDF } from "jspdf";

const FormularioFuncionario = () => {
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [sexo, setSexo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [foto, setFoto] = useState(null);
  const [cargo, setCargo] = useState("");
  const [dataAdmissao, setDataAdmissao] = useState("");
  const [setor, setSetor] = useState("");
  const [salario, setSalario] = useState("");
  const [status, setStatus] = useState("ativo");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !nome ||
      !sobrenome ||
      !sexo ||
      !endereco ||
      !telefone ||
      !email ||
      !dataNascimento ||
      !cargo ||
      !dataAdmissao ||
      !setor ||
      !salario
    ) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setLoading(true);

    try {
      let fotoURL = "";
      if (foto) {
        const fotoRef = ref(storage, `fotos/${foto.name}`);
        await uploadBytes(fotoRef, foto);
        fotoURL = await getDownloadURL(fotoRef);
      }

      await addDoc(collection(db, "funcionarios"), {
        nome,
        sobrenome,
        sexo,
        endereco,
        telefone,
        email,
        dataNascimento,
        fotoURL,
        cargo,
        dataAdmissao,
        setor,
        salario,
        status,
      });

      const doc = new jsPDF();
      doc.setFontSize(18);
      doc.text("Informações do Funcionário", 105, 20, null, null, "center");
      doc.setFontSize(12);
      doc.text(`Nome: ${nome} ${sobrenome}`, 10, 40);
      doc.text(`Sexo: ${sexo}`, 10, 50);
      doc.text(`Endereço: ${endereco}`, 10, 60);
      doc.text(`Telefone: ${telefone}`, 10, 70);
      doc.text(`Email: ${email}`, 10, 80);
      doc.text(`Data de Nascimento: ${dataNascimento}`, 10, 90);
      doc.text(`Cargo: ${cargo}`, 10, 100);
      doc.text(`Data de Admissão: ${dataAdmissao}`, 10, 110);
      doc.text(`Setor: ${setor}`, 10, 120);
      doc.text(`Salário: R$ ${salario}`, 10, 130);
      doc.text(`Status: ${status}`, 10, 140);

      if (fotoURL) {
        const imageResponse = await fetch(fotoURL);
        const imageBlob = await imageResponse.blob();
        const imageDataURL = URL.createObjectURL(imageBlob);
        const img = new Image();
        img.src = imageDataURL;
        img.onload = () => {
          doc.addImage(img, "JPEG", 10, 150, 50, 50); // Adiciona a imagem no PDF
          doc.save(`Funcionario_${nome}_${sobrenome}.pdf`);
        };
      } else {
        doc.save(`Funcionario_${nome}_${sobrenome}.pdf`);
      }

      alert("Funcionário cadastrado e PDF gerado com sucesso!");

      // Limpar os campos do formulário após o cadastro
      setNome("");
      setSobrenome("");
      setSexo("");
      setEndereco("");
      setTelefone("");
      setEmail("");
      setDataNascimento("");
      setFoto(null);
      setCargo("");
      setDataAdmissao("");
      setSetor("");
      setSalario("");
      setStatus("ativo");
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
      alert("Ocorreu um erro ao cadastrar o funcionário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="nome">Nome</label>
      <input
        type="text"
        id="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Nome"
        required
      />
      
      <label htmlFor="sobrenome">Sobrenome</label>
      <input
        type="text"
        id="sobrenome"
        value={sobrenome}
        onChange={(e) => setSobrenome(e.target.value)}
        placeholder="Sobrenome"
        required
      />

      <label htmlFor="sexo">Sexo</label>
      <select
        id="sexo"
        value={sexo}
        onChange={(e) => setSexo(e.target.value)}
        required
      >
        <option value="">Selecione o Sexo</option>
        <option value="masculino">Masculino</option>
        <option value="feminino">Feminino</option>
      </select>

      <label htmlFor="endereco">Endereço</label>
      <input
        type="text"
        id="endereco"
        value={endereco}
        onChange={(e) => setEndereco(e.target.value)}
        placeholder="Endereço"
        required
      />

      <label htmlFor="telefone">Telefone</label>
      <input
        type="text"
        id="telefone"
        value={telefone}
        onChange={(e) => setTelefone(e.target.value)}
        placeholder="Telefone"
        required
      />

      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />

      {/* Campo de Data de Nascimento */}
      <label htmlFor="dataNascimento">Data de Nascimento</label>
      <input
        type="date"
        id="dataNascimento"
        value={dataNascimento}
        onChange={(e) => setDataNascimento(e.target.value)}
        required
      />

      {/* Campo de Anexar Foto */}
      <label htmlFor="foto">Anexar Foto (JPEG, PNG)</label>
      <input
        type="file"
        id="foto"
        accept="image/jpeg, image/png"
        onChange={(e) => setFoto(e.target.files[0])}
      />

      <label htmlFor="cargo">Cargo</label>
      <input
        type="text"
        id="cargo"
        value={cargo}
        onChange={(e) => setCargo(e.target.value)}
        placeholder="Cargo"
        required
      />

      {/* Campo de Data de Admissão */}
      <label htmlFor="dataAdmissao">Data de Admissão</label>
      <input
        type="date"
        id="dataAdmissao"
        value={dataAdmissao}
        onChange={(e) => setDataAdmissao(e.target.value)}
        required
      />

      <label htmlFor="setor">Setor</label>
      <input
        type="text"
        id="setor"
        value={setor}
        onChange={(e) => setSetor(e.target.value)}
        placeholder="Setor"
        required
      />

      <label htmlFor="salario">Salário</label>
      <input
        type="number"
        id="salario"
        value={salario}
        onChange={(e) => setSalario(e.target.value)}
        placeholder="Salário"
        required
      />

      <label htmlFor="status">Status</label>
      <select
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="ativo">Ativo</option>
        <option value="promovido">Promovido</option>
        <option value="desligado">Desligado</option>
      </select>

      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Cadastrar Funcionário"}
      </button>
    </form>
  );
};

export default FormularioFuncionario;











