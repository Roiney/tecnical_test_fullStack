<!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Projeto Previsão do Tempo</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      margin: 20px;
    }
    h1, h2, h3 {
      color: #333;
    }
    pre {
      background-color: #f4f4f4;
      padding: 10px;
      overflow-x: auto;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    code {
      font-family: 'Courier New', Courier, monospace;
    }
    a {
      color: #007BFF;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
    section {
      margin-top: 20px;
    }
  </style>
</head>
<body>

  <h1>Projeto Previsão do Tempo</h1>

  <section>
    <h2>Teste para Desenvolvedor Full Stack</h2>

    <p>Este projeto consiste no desenvolvimento de uma solução para previsões meteorológicas, utilizando as tecnologias NodeJS (com o framework NestJS) para o backend e ReactJS para o frontend. O ORM escolhido para a solução é o Prisma.</p>

  </section>

<section>
  <h3>Caso de Uso</h3>
  
  <p>O site <a href="https://openweathermap.org/api" target="_blank" rel="noopener noreferrer">OpenWeatherMap API</a> fornece APIs para previsões meteorológicas e informações climáticas. O objetivo é criar um ambiente online que permita visualizar o clima da região do usuário, fornecendo informações para os próximos 5 dias. Além disso, o usuário pode consultar informações de outras cidades.</p>
</section>

  <section>
    <h3>Diretrizes Gerais</h3>

    <ol>
      <li>
        <strong>Linguagens/Frameworks:</strong>
        <ul>
          <li>Backend: NodeJS com NestJS.</li>
          <li>Frontend: ReactJS.</li>
          <li>ORM: Prisma.</li>
          <li>DAATABASE: MySQL</li>
        </ul>
      </li>
      <li>

    </ol>

  </section>

 <section>
  <h3>Instruções para Execução</h3>

  <p><strong>Backend (NestJS):</strong></p>
  <ol>
    <li>Navegue até a pasta <code>backend</code> e execute <code>npm install || yarn</code> para instalar as dependências.</li>
    <li>Configure o arquivo <code>.env</code> com as credenciais necessárias. Lembrese-se de colocar suas credencias para o MySQL</li>
    <li>Execute o servidor com <code>npm run start:dev || yarn start:dev</code>.</li>
  </ol>

  <p><strong>Frontend (ReactJS):</strong></p>
  <ol>
    <li>Navegue até a pasta <code>frontend</code> e execute <code>npm install || yarn</code>.</li>
    <li>Inicie o aplicativo com <code>npm run start|| yarn start</code>.</li>
  </ol>

  <p><strong>Banco de Dados:</strong></p>
  <ol>
    <li>Certifique-se de ter um banco de dados configurado conforme as migrações do Prisma.</li>
    <li>Consulte a <a href="https://www.prisma.io/docs/" target="_blank" rel="noopener noreferrer">documentação do Prisma</a> para detalhes sobre migrações.</li>
  </ol>

  <p><strong>Hospedagem:</strong></p>
  <p>O projeto está hospedado em <a href="http://18.221.190.16:3000/" target="_blank" rel="noopener noreferrer">http://18.221.190.16:3000//</a>.</p>
</section>

</body>
</html>