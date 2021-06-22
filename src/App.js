import React, { useState, useEffect } from 'react'
import { store } from './Firebase/firebaseConf';


const App = () => {
  const [idUsuario, setIdUsuario] = useState('');
  const [nombre, setNombre] = useState("");
  const [phone, setPhone] = useState('');
  const [usuariosAgenda, setUsuariosAgenda] = useState([]);
  const [error, setError] = useState('');
  const [modoEdicion, setModoEdicion] = useState(null);
  useEffect(() => {
    const getUsuarios = async () => {
      const { docs } = await store.collection('agenda').get();
      const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))

      setUsuariosAgenda(nuevoArray)
    }
    getUsuarios();
  }, [])

  const setUsuarios = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError('El Campo nombre esta vacio')
    } else if (!phone.trim()) {
      setError('El Campo telefono esta vacio')
    }

    const usuario = {
      nombre,
      phone
    }

    try {
      await store.collection('agenda').add(usuario);
      const { docs } = await store.collection('agenda').get();
      const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
      setUsuariosAgenda(nuevoArray)

    } catch (error) {
      console.log(error)
    }
    setNombre('');
    setPhone('');

  }

  const borrarUsuario = async (id) => {
    try {
      await store.collection('agenda').doc(id).delete();
      const { docs } = await store.collection('agenda').get();
      const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
      setUsuariosAgenda(nuevoArray)
    } catch (error) {
      console.log(error)
    }
  }

  const editarUsuario = async (id) => {
    try {
      const data = await store.collection('agenda').doc(id).get();
      const { nombre, phone } = data.data();
      setNombre(nombre);
      setPhone(phone);
      setIdUsuario(id);
      setModoEdicion(true);
    } catch (error) {
      console.log(error)
    }


  }
  const setUpdate = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      setError('El Campo nombre esta vacio')
    } else if (!phone.trim()) {
      setError('El Campo telefono esta vacio')
    }
    const userUpdate = {
      nombre, phone
    }
    try {
      await store.collection('agenda').doc(idUsuario).set(userUpdate);
      const { docs } = await store.collection('agenda').get();
      const nuevoArray = docs.map(item => ({ id: item.id, ...item.data() }))
      setUsuariosAgenda(nuevoArray)
    } catch (error) {
      console.log(error)
    }
    setNombre('');
    setPhone('');
    setIdUsuario('');
    setModoEdicion(false);
  }
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>Formulario de Usuarios</h2>
          <form className="form-group" onSubmit={modoEdicion ? setUpdate : setUsuarios} >
            <div className="mb-3">
              <label htmlFor="exampleInputEmail1" className="form-label">Nombre</label>
              <input type="text" className="form-control" placeholder="Ingrese el nombre" id="exampleInputEmail1" aria-describedby="emailHelp" name="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            </div>
            <div className="mb-3">
              <label className="form-label">Telefono</label>
              <input type="text" className="form-control" placeholder="Ingrese el Telefono" name="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            {
              modoEdicion ?
                (<input type="submit" value='Editar' className="btn btn-primary mt-2" />)
                :
                (<input type="submit" value='Registrar' className="btn btn-primary mt-2" />)
            }

          </form>
          {
            error ?
              (<div><p className="alert alert-danger">{error}</p></div>)
              : (
                <span></span>
              )
          }
        </div>
        <div className="col">
          <h2>Lista de Agenda</h2>
          <ul className="list-group">
            {
              usuariosAgenda.length !== 0 ?
                (
                  usuariosAgenda.map(item => (
                    <li key={item.id} className="list-group-item">
                      {item.nombre} - {item.phone}
                      <button className="btn btn-danger float-end" onClick={(id) => { borrarUsuario(item.id) }}>Eliminar</button>
                      <button className="btn btn-info float-end mx-2" onClick={(id) => { editarUsuario(item.id) }} >Editar</button>
                    </li>

                  )
                  )) :
                (<span>Lo siento no hay Contactos en tu agenda</span>)
            }
          </ul>
        </div>
      </div>
    </div >
  )
}

export default App

