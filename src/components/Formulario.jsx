import react, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import {db} from "../db/Firebase"
import { collection, addDoc, Timestamp } from "firebase/firestore";

const Formulario = (props) => {

  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);

  //cadastra usuário
  const handlePost = () => {
    try{

      //addDoc recebe dois parâmetros a collection e o objeto que vai pra collection
      addDoc(collection(db, 'usuario'), {
        nome: nome,
        idade: idade,
        criado: Timestamp.now()
      })
      alert("Cadastrado")
    }catch(err){
      alert(err)
    }
  }

  
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formUsuario">
        <Form.Label>Digite seu nome:</Form.Label>
        <Form.Control type="text" placeholder="Ex: guilherme" onChange={e=>setNome(e.target.value)}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formUsuario">
        <Form.Label>Digite sua idade:</Form.Label>
        <Form.Control type="number" placeholder="Ex: 29" onChange={e=>setIdade(parseInt(e.target.value))}/>
      </Form.Group>
      <Button variant="primary" onClick={handlePost}>
        Salvar
      </Button>
    </Form>
  );
};

export default Formulario;
