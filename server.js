const express = require('express')
const agents = require('./data/agentes')
const app = express()
const jwt = require("jsonwebtoken")

app.listen(3000, () => console.log('Your app listening on port 3000'))

app.use('/', express.static(__dirname + '/views'))

const secretKey = 'Llave Secreta'

app.get("/SignIn", (req, res) => {
    const { email, password } = req.query;
    console.log(req.query)
    const user = agents.find((user) => user.email == email && user.password == password);
    if(user){
      const token_usuario = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 120,  //tiempo o duracion de un token
        data: user,                 //datos que afectara
      }, 
      secretKey
      );
    res.send(
     `
     <a href="/usuario?token=${token_usuario}"> <p>Ingreso Usuario</p> </a>
     Bienvenido, ${email}... 
     <script>
      localStorage.setItem('token_usuario', JSON.stringify("${token_usuario}"))
     </script>
     `
    );
    }else{
      res.send("Usuario o contraseña invalidos...")
    }
  });