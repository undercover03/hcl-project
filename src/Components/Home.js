import React, { useEffect, useState } from "react";
import { db } from "/home/shelby-boy/task_app/src/Firebase.js";
// eslint-disable-next-line
import { useMemo } from "react";

import "./Home.css";
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Serve = () => {
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [prio, setPrio] = useState("");
  const [type_work, setType] = useState("");

  const [data, setData] = useState([]);

  const collectionRef = collection(db, "sample");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((name === "" || task === "" || prio === "", type_work === "")) {
      return;
    }
    await addDoc(collectionRef, { name, task, prio, type_work });
    setName("");
    setTask("");
    setPrio("");
    setType("");
  };
  useEffect(() => {
    const fetchData = async () => {
      onSnapshot(collectionRef, (snapshot) => {
        setData(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
        );
      });
    };

    fetchData();

    console.log("useeffect is running");
  }, [collectionRef]);

  const handleDelete = (id) => {
    const deleteData = doc(db, "sample", id);
    deleteDoc(deleteData);
  };

  const [home, setHome] = useState(false);
  const onHomeClickHandler = () => {
    setHome((val) => {
      return !val;
    });
  };

  return (
    <>
      <div>
        <button onClick={onHomeClickHandler} style={{backgroundColor:"violet",  width:"32.5cm" , height:"1cm" , marginBottom:"0.5cm"}}>Home</button>
      </div>
      {home && (
        <div>
          <div className="home-form">
            <form onSubmit={handleSubmit}>
              <div className="lay">
                <div className="task">
                  task:{" "}
                  <input
                    onChange={(e) => setTask(e.target.value)}
                    value={task}
                    type="text"
                  />
                </div>
                <div className="time">
                  time:{" "}
                  <input
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    type="text"
                  />
                </div>

                <div className="prio">
                  prio:{" "}
                  <input
                    onChange={(e) => setPrio(e.target.value)}
                    value={prio}
                    type="text"
                  />
                </div>
                <div className="type_work">
                  type_work:{" "}
                  <input
                    onChange={(e) => setType(e.target.value)}
                    value={type_work}
                    type="text"
                  />
                </div>
              </div>
              <div className="su">
                <input type="submit" />
                <br />
                <br />
              </div>
            </form>
          </div>
          <div>
            {data.map((d) => {
              return (
                <>
                  <div className="border">
                    <div className="t">{d.task}</div>
                    <div className="n">{d.name}</div>
                    <div className="f">{d.prio}</div>
                    <div className="w">{d.type_work}</div>
                    <button className="b" onClick={() => handleDelete(d.id)}>
                    MARK AS DONE
                    </button>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};
export default Serve;
