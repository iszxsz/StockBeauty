var firebaseConfig = {
    apiKey: "AIzaSyBzEmaREkYeUBUijuHVxVzG012euNrvK40",
    authDomain: "gerenciador-vendas-60e98.firebaseapp.com",
    projectId: "gerenciador-vendas-60e98",
    storageBucket: "gerenciador-vendas-60e98.appspot.com",
    messagingSenderId: "587888700191",
    appId: "1:587888700191:web:3ed4337dfe87ab6f219e2a",
    measurementId: "G-4BV9F62P3P"
};

const app = firebase.initializeApp(firebaseConfig);
var provider = new firebase.auth.GoogleAuthProvider();


function cadastrar(){
    document.getElementById("respostaLogin").innerText = "";
    let email = document.getElementById('email-login').value
    let senha = document.getElementById('senha-login').value
    let senhaConfere = document.getElementById('senha-login-confere').value
    let nome = document.getElementById('nome-login').value
    console.log("foraIF")

    if(nome === "" || email === "" || senha === "" || senhaConfere === ""){
        document.getElementById("respostaLogin").innerText = "Preencha todos os campos";
        return;
    }

    if (senha !== senhaConfere) {
        document.getElementById("respostaLogin").innerText = "As senhas não coincidem.";
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        firebase.firestore().collection("usuario").doc(user.uid).set({
            nome: nome,
            id: user.uid,
            email: email
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ..
    });    
}

function logar(){
    document.getElementById("respostaLogin").innerText = "";
    let email = document.getElementById('email-login').value
    let senha = document.getElementById('senha-login').value

    if(senha === "" || email === ""){
        document.getElementById("respostaLogin").innerText = "Preencha todos os campos";
        return;
    }

    firebase.auth().signInWithEmailAndPassword(email, senha)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log("entrou")
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
  });

}

const menu = document.getElementById("menu");
const botaoAbrirFecharMenu = document.querySelectorAll(".botao-abrir-fechar-menu")

botaoAbrirFecharMenu.forEach((bnt) => {
    bnt.addEventListener("click", function() {
        menu.classList.toggle("visible");
    })
});

document.addEventListener( "click", function (e) {
    if(!menu.contains(e.target) && !menuBnts[0].contains(e.target)){
        menu.classList.remove("visible")
    }
})
