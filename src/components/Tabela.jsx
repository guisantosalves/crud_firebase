import React, { useState, useEffect } from "react";
import { Table, Form, Button } from "react-bootstrap";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../db/Firebase";
import { BsWrench } from "react-icons/bs";
import { BsFillBookmarkXFill } from "react-icons/bs";

//! buscando do bd
const Tabela = (props) => {
  //variáveis para o update
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState(0);
  const [id, setId] = useState("");

  const [formToUpdate, setformToUpdate] = useState(false);

  const [getData, setGetData] = useState([]);

  //pegando os dados do firebase em tempo real
  useEffect(() => {
    //doc.id e doc.date -> onde ta os dados
    const q = query(collection(db, "usuario"), orderBy("criado", "desc"));
    onSnapshot(q, (querySnapshot) => {
      setGetData(
        querySnapshot.docs.map((doc) => ({
          id: doc.id, //id
          data: doc.data(), //dados in real time
        }))
      );
    });
  }, []);

  //! excluindo dados
  const handleDelete = async (id) => {
    const dadoReferente = doc(db, "usuario", id);
    try {
      await deleteDoc(dadoReferente);
      alert("excluido com sucesso");
    } catch (err) {
      alert(err);
    }
  };

  //! update dos dados
  const handleUpdateDoc = async (nome, idade, id) => {
    const dadoReferente = doc(db, "usuario", id);

    try {
      //updating
      await updateDoc(dadoReferente, {
          nome: nome,
          idade: idade
      })


    } catch (err) {
      alert(err);
    }
  };

  //! getting these datas
  const GettingDataForUpdate = (nome, idade, id) => {
    setformToUpdate(!formToUpdate);
    setNome(nome);
    setIdade(idade);
    setId(id)

  };

  return (
    <>
      <Table striped bordered hover variant="dark" style={style.containerTable}>
        <thead>
          <tr>
            <th>id</th>
            <th>nome</th>
            <th>idade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {getData.map((data) => {
            return (
              <tr key={data.id}>
                <td>{data.id}</td>
                <td>{data.data.nome}</td>
                <td>{data.data.idade}</td>
                <td>
                  <button
                    style={style.button}
                    onClick={(e) => {
                      GettingDataForUpdate(data.data.nome, data.data.idade, data.id);
                    }}
                  >
                    <BsWrench size="23px" />
                  </button>
                  <button
                    style={style.button}
                    onClick={(e) => {
                      handleDelete(data.id);
                    }}
                  >
                    <BsFillBookmarkXFill size="23px" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      {formToUpdate ? (
        <Form>
          <Form.Group className="mb-3" controlId="formUsuario">
            <Form.Label>Digite seu nome:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ex: guilherme"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUsuario">
            <Form.Label>Digite sua idade:</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ex: 29"
              value={idade}
              onChange={(e) => setIdade(parseInt(e.target.value))}
            />
          </Form.Group>
          <Button variant="primary" onClick={(e)=>{handleUpdateDoc(nome, idade, id)}}>
            Alterar
          </Button>
        </Form>
      ) : false}
    </>
  );
};

const style = {
  containerTable: {
    marginTop: "15px",
  },
  button: {
    margin: "7px",
  },
};

export default Tabela;
