import { jsPDF } from "jspdf";

export const gerarPDF = (funcionario) => {
  const doc = new jsPDF();
  
  doc.text(`Nome: ${funcionario.nome}`, 10, 10);
  doc.text(`Cargo: ${funcionario.cargo}`, 10, 20);
  doc.text(`Endereço: ${funcionario.endereco}`, 10, 30);
  doc.text(`Telefone: ${funcionario.telefone}`, 10, 40);
  doc.text(`Data de Admissão: ${funcionario.dataAdmissao}`, 10, 50);
  doc.text(`Salário: ${funcionario.salario}`, 10, 60);

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
