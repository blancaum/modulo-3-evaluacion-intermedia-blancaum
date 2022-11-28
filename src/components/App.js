import '../styles/App.scss';
import { useState, useEffect } from 'react';
import callToApi from '../services/api';
import ls from '../services/localStorage';

function App() {
  //useState
  const [data, setData] = useState(ls.get('data', []));
  const [newData, setNewData] = useState({
    id: crypto.randomUUID(),
    name: '',
    counselor: '',
    speciality: '',
  });

  //useEffect
  useEffect(() => {
    if (!ls.isKeyInLocal('data')) {
      callToApi().then((response) => {
        setData(response);
        ls.set('data', response);
      });
    }
  }, []);

  //Handler Functions
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleAddChange = (event) => {
    setNewData({ ...newData, [event.target.id]: event.target.value });
  };

  const handleAddClick = () => {
    //set id
    if (newData.name && newData.counselor && newData.speciality) {
      ls.set('data', [...data, newData]);
      setData([...data, newData]);
      const resetNewData = {
        id: crypto.randomUUID(),
        name: '',
        counselor: '',
        speciality: '',
      };
      setNewData(resetNewData);
    }
  };

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
        <form onSubmit={handleSubmit}>
          <h2>Añadir una adalaber</h2>
          <fieldset>
            <label htmlFor="name">
              Nombre:
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleAddChange}
                value={newData.name}
              />
            </label>
            <label htmlFor="counselor">
              Tutora:
              <input
                type="text"
                name="counselor"
                id="counselor"
                onChange={handleAddChange}
                value={newData.counselor}
              />
            </label>
            <label htmlFor="speciality">
              Especialidad:
              <input
                type="text"
                name="speciality"
                id="speciality"
                onChange={handleAddChange}
                value={newData.speciality}
              />
            </label>
          </fieldset>
          <button onClick={handleAddClick}>Añadir una nueva adalaber</button>
        </form>
      </main>
    </div>
  );
}

export default App;
