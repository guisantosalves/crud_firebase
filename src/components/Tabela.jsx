import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "../db/Firebase";

//buscando do bd

const Tabela = (props) => {
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

  return (
    <Table striped bordered hover variant="dark" style={style.containerTable}>
      <thead>
        <tr>
          <th>id</th>
          <th>nome</th>
          <th>idade</th>
        </tr>
      </thead>
      <tbody>
        {getData.map((data) => {
          return (
            <tr key={data.id}>
              <td>{data.id}</td>
              <td>{data.data.nome}</td>
              <td>{data.data.idade}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

const style = {
  containerTable: {
    marginTop: "15px",
  },
};

export default Tabela;
