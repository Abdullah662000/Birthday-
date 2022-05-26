import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
function usersignup() {
  const router = useRouter();
  const gotoSignup = () => {
    router.push("/");
  };
  const signupUser = async () => {
    try {
      if (email == "" && password == "" && firstName == "" && lastName == "") {
        return setError("please check your credentials");
      }
      const res = await axios.post("http://localhost:5000/user/signup", {
        firstName,
        lastName,
        email,
        password,
      });
      if (res) {
        alert("account created please sign in");
        router.push("/");
      }
    } catch (err) {
      console.log(err.response.data);
      setError(err.response.data);
    }
  };
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [ShowPass, setShowPass] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {}, []);
  return (
    <div className=" bg-cover bg-no-repeat w-full h-full bg-[url('/project.png')] text-mycolor ">
      <div className=" w-screen h-screen flex justify-end items-center  ">
        <div className="flex justify-end flex-col items-center  border-4 px-14 pb-7 w-72 h-96 md:w-96 md:h-96 lg:mr-32 xl:mr-64 bg-pink  border-mycolor rounded-lg">
          <div className="space-y-1 ">
            <h1 className="">Lets Get you Signed up</h1>
            <div className="relative space-y-4">
              <input
                className="outline-mycolor px-1 rounded-md w-40 md:w-56 h-8"
                type="text"
                placeholder="First Name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              />
              <input
                className="outline-mycolor px-1 rounded-md w-40 md:w-56 h-8"
                type="text"
                placeholder="Last Name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              />
              <input
                className=" outline-mycolor px-1 rounded-md w-40 md:w-56 h-8 "
                type="text"
                placeholder="Email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                className=" outline-mycolor px-1 rounded-md w-40 md:w-56 h-8"
                type={ShowPass ? "text" : "password"}
                placeholder="Password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                className="absolute left-28 top-32 px-5 pt-2 md:left-44 xl:left-44"
                onClick={() => setShowPass(!ShowPass)}
              >
                <div className="">
                  {ShowPass ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                        clip-rule="evenodd"
                      />
                      <path d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fill-rule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              </button>
              <br></br>
              <div className="">
                <button
                  className="border-2 hover:scale-90  border-black pl-12 pr-12 md:pl-20 md:pr-20 rounded-md"
                  onClick={() => {
                    signupUser();
                  }}
                >
                  Sign up
                </button>
              </div>
              <div>
                <p className="inline">already have an account?</p>
                <button
                  onClick={() => {
                    gotoSignup();
                  }}
                >
                  &nbsp;Sign in
                </button>
                {error && <div className="text-red"> {error} </div>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default usersignup;
