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
      <div className="relative  w-screen h-screen flex justify-center items-center  space-y-5 ">
        <br></br>
        <div>
          {showcreate ? (
            <div className="flex  flex-col relative border-2 space-y-2 p-20 md:w-96 md:h-96 rounded-lg bg-pink">
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
                className="border-2 rounded-md hover:scale-90 "
                onClick={() => {
                  setArray();
                }}
              >
                Save
              </button>
              {message && <div className="text-black"> {message} </div>}
              {error && <div className="text-red"> {error} </div>}
              <div className={"absolute top-1 space-x-3"}>
                <button
                  className="border-2 rounded-md bg-pink md:p-1 hover:scale-90 "
                  onClick={getFriends}
                >
                  Get friends
                </button>

                <button
                  className="border-2 rounded-md bg-pink md:p-1 hover:scale-90"
                  onClick={() => {
                    setShowCreate(true);
                  }}
                >
                  Add Friend
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col relative rounded-lg p-2 border-2 bg-pink">
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
              <div className={"absolute -top-4 md:-top-7  space-x-3  "}>
                <button
                  className="border-2 rounded-md bg-pink md:p-1 hover:scale-90 "
                  onClick={getFriends}
                >
                  Get friends
                </button>

                <button
                  className="border-2 rounded-md bg-pink md:p-1 hover:scale-90 "
                  onClick={() => {
                    setShowCreate(true);
                  }}
                >
                  Add Friend
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default bm;
