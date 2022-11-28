import '../styles/App.scss';
import { useState, useEffect } from 'react';
import callToApi from '../services/api';
import ls from '../services/localStorage';

function App() {
  //useState
  const [data, setData] = useState(ls.get('data', []));

  //useEffect
  useEffect(() => {
    if (!ls.isKeyInLocal('data')) {
      callToApi().then((response) => {
        setData(response);
        ls.set('data', response);
      });
    }
  }, []);

  //Render data
  const htmlData = data.map((item) => {
    return (
      <tr key={item.id}>
        <td>{item.name}</td>
        <td>{item.counselor}</td>
        <td>{item.speciality}</td>
      </tr>
    );
  });

  return (
    <div>
      <header>
        <h1 className="title">Adalabers</h1>
      </header>
      <main>
        <table className="table">
          {/* <!-- Fila de cabecera --> */}
          <thead className="table__thead">
            <tr>
              <th>Nombre</th>
              <th>Tutora</th>
              <th>Especialidad</th>
            </tr>
          </thead>
          {/* <!-- Fin fila de cabecera --> */}
          <tbody className="table__tbody">{htmlData}</tbody>
        </table>
      </main>
    </div>
  );
}

export default App;
