# Gestão de Funcionários

## Descrição
Aplicação web para gerenciar informações cadastrais de funcionários, permitindo cadastrar, atualizar, visualizar o histórico de alterações e gerar relatórios em PDF. O sistema é protegido por autenticação e sincronizado com o Firebase Firestore.

## Tecnologias Utilizadas
- **React.js**: Biblioteca JavaScript para criar a interface do usuário.
- **Firebase Firestore**: Banco de dados NoSQL para armazenar os dados dos funcionários.
- **Firebase Storage**: Armazenamento de fotos dos funcionários.
- **Firebase Authentication**: Gerenciamento de usuários autenticados.
- **React Router**: Biblioteca de navegação entre as páginas da aplicação.
- **jsPDF**: Biblioteca para gerar PDFs com os dados dos funcionários.
- **CSS/SCSS**: Estilização para garantir um design responsivo e moderno.

## Funcionalidades
- **Login**: Autenticação de usuários.
- **Cadastro de Funcionário**: Permite cadastrar um novo funcionário com foto.
- **Atualização de Funcionário**: Edita os dados de um funcionário existente.
- **Visualização do Histórico**: Exibe todas as alterações feitas no cadastro do funcionário.
- **Geração de PDF**: Exporta os dados de um funcionário para um arquivo PDF, incluindo a foto.
- **Listagem de Funcionários**: Exibe uma lista de todos os funcionários cadastrados.

## Instalação e Configuração
1. Clone este repositório:
   git clone https://github.com/seu-usuario/gestao-funcionarios.git

2. Instale as dependências:
   cd gestao-funcionarios
   npm install

3. Configure o Firebase:
   Crie um projeto no Firebase Console.
   Habilite o Firestore Database e o Firebase Storage.
   Adicione o arquivo de configuração do Firebase em src/services/firebaseConfig.js.

4. Inicie o servidor local:
   npm start
   Abra o navegador e acesse http://localhost:3000.

5. Estrutura do Projeto
|-- src/
    |-- components/          # Componentes da interface de usuário
    |-- services/            # Serviços para Firebase e geração de PDFs
    |-- styles/              # Estilos globais e específicos
|-- .gitignore               # Arquivo para ignorar arquivos desnecessários no controle de versão
|-- firebase.json            # Configurações do Firebase
|-- package.json             # Dependências e scripts do projeto
|-- README.md                # Documentação do projeto

# Scripts Disponíveis
npm start: Inicia a aplicação em modo de desenvolvimento.
npm test: Executa os testes unitários.
npm run build: Cria a versão de produção da aplicação.

# Autor   
Bruno Souza Marques - Bmarquess10
#   g e s t a o - d e - f u n c i o n a r i o s  
 