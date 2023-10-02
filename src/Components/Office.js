import React, { useEffect, useState } from "react";
import { db } from "/home/shelby-boy/task_app/src/Firebase.js";
import "./Home.css";
// eslint-disable-next-line
import { useMemo } from "react";

import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore";

const Office = () => {
  const [name, setName] = useState("");
  const [task, setTask] = useState("");
  const [prio, setPrio] = useState("");
  const [type_work, setType] = useState("");

  const [data, setData] = useState([]);

  const collectionOffRef = collection(db, "sample_office");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ((name === "" || task === "" || prio === "", type_work === "")) {
      return;
    }
    await addDoc(collectionOffRef, { name, task, prio, type_work });
    setName("");
    setTask("");
    setPrio("");
    setType("");
  };
  useEffect(() => {
    const fetchData = async () => {
      onSnapshot(collectionOffRef, (snapshot) => {
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
  }, [collectionOffRef]);

  const handleDelete = (id) => {
    const deleteData = doc(db, "sample_office", id);
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
        <button
          onClick={onHomeClickHandler}
          style={{
            backgroundColor: "yellow",
            width: "32.5cm",
            height: "1cm",
            marginBottom: "0.5cm",
          }}
        >
          Office
        </button>
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
                    <div style={{ float: "left", marginRight: "0.5cm" }}>
                      {" "}
                      {d.task}
                    </div>
                    <div style={{ float: "left", marginRight: "0.5cm" }}>
                      {d.name}
                    </div>
                    <div style={{ float: "left", marginRight: "0.5cm" }}>
                      {d.prio}
                    </div>
                    <div style={{ float: "left", marginRight: "0.5cm" }}>
                      {d.type_work}
                    </div>
                    <div>
                      <button onClick={() => handleDelete(d.id)}>MARK AS DONE</button>{" "}
                    </div>
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
export default Office;
