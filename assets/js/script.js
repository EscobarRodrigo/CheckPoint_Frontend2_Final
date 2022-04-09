/****************************
Animação do Scroll
**********************************************
*/

"https://ctd-todo-api.herokuapp.com/#/users/getMe"

"https://dh-3bi-frontend2-checkpoint2-resolucao-parcial.netlify.app/index.html"



const URLAPI = "https://ctd-todo-api.herokuapp.com/v1"


//1. Seleção do formulário Login

let formulario = document.getElementById("formularioLogin");
let formularioCadastro = document.getElementById("formularioCadastro");

//2. Captura o evento de envio do formulário	e dispara a função (rotina)

if (formulario) {
  formulario.addEventListener("submit", function (event) {
    event.preventDefault(); //evita carregar o fórmulário novamente
    let email = event.target["email"].value; // pega o valor do campo email
    let senha = event.target["senha"].value;

    if (email == "") {
      alert("Preencha o campo de email");
    } else if (senha == "") {
      alert("Preencha o campo de senha");
    } else {
      const dadosLogin = {
        email: email,
        senha: senha
      }

      const configuracaoFetch = {
        method: "POST",
        body: JSON.stringify(dadosLogin),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }

      console.log(URLAPI);

      fetch(`${URLAPI}/users/login`, configuracaoFetch)
        .then(function (response) {
          return response.json();
        })
        .then(function (resultado) {
          if (resultado === "Contraseña incorrecta") {
            alert("Senha incorreta");
          } else if (resultado === "El usuario no existe") {
            alert("Usuário não existe");
          } else if (resultado === "Error del servidor") {
            alert("Erro do servidor");
          } else {
            alert(resultado.jwt);
            sessionStorage.setItem("token", resultado.jwt);
            window.location.href = "tarefas.html";
            console.log('Usuário criado com sucesso')
          }
        });
    }
  });
}

if (formularioCadastro) {
  formularioCadastro.addEventListener("submit", function (event) {
    event.preventDefault(); //evita carregar o fórmulário novamente

    let nome = event.target["nome"].value; // pega o valor do campo nome
    let sobrenome = event.target["sobrenome"].value;
    let email = event.target["email"].value; // pega o valor do campo email
    let senha = event.target["senha"].value;
    let confirmaSenha = event.target["confirmarSenha"].value;


    if (nome == "") {
      alert("Preencha o campo nome");
    } else if (sobrenome == "") {
      alert("Preencha o campo sobrenome");
    } else if (email == "") {
      alert("Preencha o campo de email");
    } else if (senha == "") {
      alert("Preencha o campo de senha");
    } else if (confirmaSenha == "") {
      alert("Preencha o campo Repetir Senha");
    } else {
      const dadosCadastro = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        senha: senha
      }
      const configuracaoFetch = {
        method: "POST",
        body: JSON.stringify(dadosCadastro),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        }
      }
      fetch(`${URLAPI}/users`, configuracaoFetch)
        .then(function (response) {
          return response.json();
        })
        .then(function (resultado) {
          if (resposta === "El usuario ya se encuentra registrado") {
            alert("O usuário já se encontra registrado")
          } else if (resposta === "Alguno de los datos requeridos está incompleto") {
            alert("Alguns dados requeridos estão incompletos.")
          } else if (resposta === "Error del servidor") {
            alert("Erro do servidor")
          } else {
            alert(resultado);
            sessionStorage.setItem("token", resultado);
            window.location.href = "login.html?mensagem=Usuário criado com sucesso";
            alert('Usuário criado com sucesso')
          }

        });
    }
  });
}