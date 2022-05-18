import { useState } from "react";
import axios from "axios";

function bm() {
  const setArray = async () => {
    const token = localStorage.getItem("auth-token");
    const mydate = new window.Date(Date);
    try {
      const res = await axios.post(
        "http://localhost:5000/user/friend",
        {
          name,
          date: mydate,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      setMessage("Saved!");

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (err) {
      setError(err);
    }
  };
  const getFriends = async () => {
    const token = localStorage.getItem("auth-token");
    try {
      const result = await axios.get("http://localhost:5000/user/findfriend", {
        headers: {
          "auth-token": token,
        },
      });
      setFriend(result.data);
      setShowCreate(false);
      console.log(result);
    } catch (error) {
      setError(error);
    }
  };
  const [friend, setFriend] = useState([{ name: "", date: null }]);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [Date, setDate] = useState(null);
  const [showcreate, setShowCreate] = useState(true);
  const [error, setError] = useState(null);
  return (
    <div className=" bg-cover bg-no-repeat w-full h-full bg-[url('/project.png')] text-mycolor ">
      <div className="relative  w-screen h-screen flex justify-center items-center mx-64 space-y-5 ">
        <div
          className={
            showcreate
              ? "absolute top-96 space-x-3"
              : "absolute top-64 space-x-3 "
          }
        >
          <button className="border-2 rounded-md   " onClick={getFriends}>
            Get friends
          </button>

          <button
            className="border-2 rounded-md "
            onClick={() => {
              setShowCreate(true);
            }}
          >
            Add Friend
          </button>
        </div>

        <br></br>
        <div>
          {showcreate ? (
            <div className="flex  flex-col border-2 p-20 rounded-lg ">
              <label className="">Enter the name</label>
              <input
                type="text"
                className="placeholder-mycolor"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></input>
              <label className="">Enter the Date of Birth</label>
              <input
                type="date"
                onChange={(e) => {
                  setDate(e.target.value);
                }}
              ></input>
              <button
                onClick={() => {
                  setArray();
                }}
              >
                Save
              </button>
              {message && <div className="text-black"> {message} </div>}
              {error && <div className="text-red"> {error} </div>}
            </div>
          ) : (
            <div className="flex flex-col rounded-lg p-2 border-2">
              {friend.map((user) => {
                const { name, date } = user;

                return (
                  <div key={name} className=" space-y-1">
                    <ul>
                      <li className="text-black">name :{name}</li>
                      <li className="text-black">DOB :{date}</li>
                    </ul>
                  </div>
                );
              })}
              {message && <div className="text-black"> {message} </div>}
              {error && <div className="text-red"> {error} </div>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default bm;
