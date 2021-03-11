import React, { useState, useEffect } from "react";
import TutorialDataService from "../services/TutorialService";
import Acordion from "./SimpleAccordion"
import { Link } from "react-router-dom";
import SimpleAccordion from "./SimpleAccordion";

const TutorialsList = () => {
  const [tutorials, setTutorials] = useState([]);
  const [error, seterror] = useState(null);
  const [date, setDate] = useState('fecha');
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [deviceData, setDeviceData] = useState([]);


  useEffect(() => {
    retrieveTutorials();
    fetchDeviceData();
  }, []);

  const onChangeSearchTitle = e => {
    const searchTitle = e.target.value;
    setSearchTitle(searchTitle);
  };

  const fetchDeviceData = async () => {
    setisLoading(true);
    await fetch("http://10.0.10.216:3002/messages/last")
      .then(response => response.json())
      .then(response => {
      /*   const { children } = response.data;
        setDeviceData(children); */
        setDeviceData(response.message);

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
        <h4>Lista de Hash del canal:</h4>

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
    
      <div className="col-md-6" style={{marginBottom:'50px'}}>
        {currentTutorial ? (
          <div>
            <h4>Hash del canal:</h4>
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
            <p>Seleccione un Hash del canal:...</p>
          </div>
        )}
      </div>
    { 

      isClicked && <SimpleAccordion heading={`${new Date(parseInt(deviceData.timestamp)*1000)}`} detail='{
        "id": 100,
        "message": {
            "device": "BCM2835-00000000ec2a41ff-9000c1",
            "timestamp": "1615485519",
            "iot2tangle": [
                {
                    "data": [
                        {
                            "Temp": "24.0"
                        },
                        {
                            "Humidity": "34.0"
                        }
                    ],
                    "sensor": "DHT11-environmental"
                },
                {
                    "data": [
                        {
                            "Pressure": "94172.4905385",
                            "Temp": "24.6955974201"
                        },
                        {
                            "Altitude": "617.288299167"
                        }
                    ],
                    "sensor": "BMP180-Enviromental"
                }
            ]
        },
        "channelId": "160a302ac63eb61ce1d13819b72fb47d8693197a335d04a0b9a8e18e4debca1b0000000000000000:29b6be0b5618f471058163ea"
    }' />}
    </div>
  );
};

export default TutorialsList;
