import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import Acordion from "./Acordion"
import { Link } from "react-router-dom";

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [error, seterror] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [deviceData, setDeviceData] = useState([]);


  useEffect(() => {
    retrieveTutorials();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const fetchDeviceData = async () => {
    setisLoading(true);
    await fetch("https://www.reddit.com/r/javascript.json")
      .then(response => response.json())
      .then(response => {
        const { children } = response.data;
        setDeviceData(children);
      })
      .catch(error => seterror(error))
      .finally(() => setisLoading(false));
  };



  const retrieveTutorials = () => {
    TutorialDataService.getAll()
      .then(response => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  const refreshList = () => {
    retrieveTutorials();
    setCurrentTutorial(null);
    setCurrentIndex(-1);
  };

  const setActiveTutorial = (tutorial, index) => {
    setCurrentTutorial(tutorial);
    setCurrentIndex(index);
    setIsClicked(true);

  };

  const removeAllTutorials = () => {
    TutorialDataService.removeAll()
      .then(response => {
        console.log(response.data);
        refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  };

  const findByTitle = () => {
    TutorialDataService.findByTitle(searchTitle)
      .then(response => {
        setTutorials(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por Nombre"
            value={searchTitle}
            onChange={onChangeSearchTitle}
          />
          <div className="input-group-append">
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Buscar
            </button>
          </div>
        </div>
      </div>
      <div className="col-md-6">
        <h4>Lista de Dispositivos</h4>

        <ul className="list-group">
          {tutorials &&
            tutorials.map((tutorial, index) => (
              <li
                className={
                  "list-group-item " + (index === currentIndex ? "active" : "")
                }
                onClick={() => setActiveTutorial(tutorial, index)}
                key={index}
              >
                {tutorial.title}
              </li>
            ))}
        </ul>

        <button
          className="m-3 btn btn-sm btn-danger"
          onClick={removeAllTutorials}
        >
          Borrar todos
        </button>

        <div className="data-list">

        </div>
      </div>
    
      <div className="col-md-6">
        {currentTutorial ? (
          <div>
            <h4>Dispositivo</h4>
            <div>
              <label>
                <strong>Nombre:</strong>
              </label>{" "}
              {currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Hash del canal:</strong>
              </label>{" "}
              {currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Ultima lectura:</strong>
              </label>{" "}
              {currentTutorial.published ? "Published" : "25/02/2021"}
            </div>
            <div>
              <label>
                <strong>Lectura:</strong>
              </label>{" "}
              

                "sensor": "BMP180-Enviromental"
            
            </div>
            <Link
              to={"/tutorials/" + currentTutorial.id}
              className="badge badge-warning"
            >
              Editar
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Seleccione un dispositivo...</p>
          </div>
        )}
      </div>
    {/* {isClicked &&  <div className="row-md-6">
        hola ke ase

        <ul>
          <li>Hola</li>
          <li>Chau</li>
          <li>Chau</li>
          <li>Hola</li>
          <li>Chau</li>
          <li>Hola</li>
        </ul>
      </div>}  */
      isClicked && <Acordion/>}
    </div>
  );
};

export default TutorialsList;
