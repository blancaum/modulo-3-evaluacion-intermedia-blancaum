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

  return (
    <div>
      <h1>Adalabers</h1>
      <table className="table">
        {/* <!-- Fila de cabecera --> */}
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Tutora</th>
            <th>Especialidad</th>
          </tr>
        </thead>
        {/* <!-- Fin fila de cabecera --> */}
        <tbody>
          {/* <!-- Primera fila --> */}
          <tr>
            <td>MariCarmen</td>
            <td>Yanelis</td>
            <td>Python</td>
          </tr>
          {/* <!-- Segunda fila --> */}
          <tr>
            <td>Amparo</td>
            <td>Dayana</td>
            <td>IA</td>
          </tr>
          {/* <!-- Tercera fila --> */}
          <tr>
            <td>Escandia</td>
            <td>Iván</td>
            <td>3D graphics</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
