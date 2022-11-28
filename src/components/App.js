import '../styles/App.scss';
import { useState, useEffect } from 'react';
import callToApi from '../services/api';
import ls from '../services/localStorage';

function App() {
  //global variables
  //let newId = 0;

  //useState
  const [data, setData] = useState(ls.get('data', []));
  const [newData, setNewData] = useState({
    id: crypto.randomUUID(),
    name: '',
    counselor: '',
    speciality: '',
  });
  const [search, setSearch] = useState({
    name: '',
    counselor: '',
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
    setNewData({ ...newData, [event.target.name]: event.target.value });
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

  const handleSearch = (event) => {
    setSearch({ ...search, [event.target.name]: event.target.value });
  };

  //Other functions
  const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  };

  //Render data
  const htmlData = data
    .filter((item) => {
      const itemNoAccents = removeAccents(item.name.toLowerCase());
      const searchNoAccents = removeAccents(search.name.toLowerCase());
      return itemNoAccents.includes(searchNoAccents);
    })
    .filter((item) => {
      const itemNoAccents = removeAccents(item.counselor.toLowerCase());
      const searchNoAccents = removeAccents(search.counselor.toLowerCase());
      return itemNoAccents.includes(searchNoAccents);
    })
    .map((item) => {
      return (
        <tr key={item.id}>
          <td className="table__tbody__td">{item.name}</td>
          <td className="table__tbody__td">{item.counselor}</td>
          <td className="table__tbody__td">{item.speciality}</td>
        </tr>
      );
    });

  return (
    <div className="page">
      <header>
        <h1 className="title">Adalabers</h1>
        <form className="form" onSubmit={handleSubmit}>
          <label htmlFor="nameSearch">
            Nombre:
            <input
              type="text"
              name="name"
              id="nameSearch"
              onChange={handleSearch}
              value={search.name}
            />
          </label>
          <label htmlFor="counselorSearch">
            Escoge una tutora:{' '}
            <select
              className="form__special"
              name="counselor"
              id="counselorSearch"
              onChange={handleSearch}
              value={search.counselor}>
              <option value="">Escoge una opción</option>
              <option value="Yanelis">Yanelis</option>
              <option value="Dayana">Dayana</option>
              <option value="Iván">Iván</option>
            </select>
          </label>
        </form>
      </header>
      <main>
        <table className="table">
          {/* <!-- Fila de cabecera --> */}
          <thead className="table__thead">
            <tr>
              <th className="table__thead__th">Nombre</th>
              <th className="table__thead__th">Tutora</th>
              <th className="table__thead__th">Especialidad</th>
            </tr>
          </thead>
          {/* <!-- Fin fila de cabecera --> */}
          <tbody className="table__tbody">{htmlData}</tbody>
        </table>
        <form className="form" onSubmit={handleSubmit}>
          <h2>Añadir una adalaber</h2>
          <fieldset className="form">
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
          <button className="form__special" onClick={handleAddClick}>
            Añadir una nueva adalaber
          </button>
        </form>
      </main>
    </div>
  );
}

export default App;
