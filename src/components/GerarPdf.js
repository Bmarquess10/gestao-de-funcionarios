import { jsPDF } from "jspdf";

// Função auxiliar para converter a imagem em base64
const getBase64FromImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "Anonymous"; // Para evitar problemas de CORS
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL("image/jpeg");
      resolve(dataURL);
    };
    img.onerror = (error) => reject(error);
  });
};

const gerarPDF = async (funcionario) => {
  const doc = new jsPDF();
  
  // Informações textuais do funcionário
  doc.text(`Nome: ${funcionario.nome}`, 10, 10);
  doc.text(`Cargo: ${funcionario.cargo}`, 10, 20);
  doc.text(`Endereço: ${funcionario.endereco}`, 10, 30);
  doc.text(`Telefone: ${funcionario.telefone}`, 10, 40);
  doc.text(`Data de Admissão: ${funcionario.dataAdmissao}`, 10, 50);
  doc.text(`Salário: ${funcionario.salario}`, 10, 60);

  // Verifica se há uma foto do funcionário para ser inserida no PDF
  if (funcionario.fotoURL) {
    try {
      const base64Image = await getBase64FromImage(funcionario.fotoURL);
      doc.addImage(base64Image, "JPEG", 10, 70, 50, 50);
    } catch (error) {
      console.error("Erro ao carregar a imagem:", error);
      alert("Não foi possível carregar a imagem.");
    }
  }

  // Salva o arquivo PDF
  doc.save(`${funcionario.nome}_informacoes.pdf`);
};

export default gerarPDF;

