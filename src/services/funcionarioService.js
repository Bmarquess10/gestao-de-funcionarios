import { db } from "./firebaseConfig";
import { collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";

// Função para obter o histórico de um funcionário específico
export const getHistoricoFuncionario = async (idFuncionario) => {
  try {
    if (!idFuncionario) {
      throw new Error("ID do funcionário não foi fornecido.");
    }

    const historicoRef = collection(db, "funcionarios", idFuncionario, "historico");
    const q = query(historicoRef, orderBy("data", "desc")); // Ordena por data
    const querySnapshot = await getDocs(q);
    
    const historico = querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        data: data.data instanceof Timestamp ? data.data.toDate() : "Data não disponível"
      };
    });

    return historico;
  } catch (error) {
    console.error("Erro ao obter histórico do funcionário:", error);
    throw error;
  }
};

