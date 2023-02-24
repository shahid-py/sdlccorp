import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, selectAuthStatus, selectAuthError } from "../index";
import "../../index.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  useEffect(() => {
    if (status === "signed in") {
      navigate("/");
    }
  }, [status, navigate]);

  const login = () => {
    if (email && password) {
      dispatch(loginUser({ email: email, password: password }));
    }
  };

  return (
    <div className="flex flex-col mx-auto items-center ">
      <h1 className="lg:text-2xl text-xl lg:text-base my-8 sm:my-4 font-bold"> Welcome to WeatherApp </h1>
      <div className="flex flex-col rounded-xl bg-gray-50 lg:p-4 lg:w-1/2 md:w-1/3 w-68 p-2">
        <h2 className="lg:text-2xl text-xl text-center uppercase"> Login </h2>
        <button
          className="text-blue-500 font-bold text-lg mb-4"
          onClick={() => {
            setEmail("heytest@gmail.com");
            setPassword("test");
          }}
        >
          Use guest credentials
        </button>
        <form className="flex flex-col items-center mt-4 text-xl">
        <div className="flex w-2/3  justify-between"> 
        <label className="font-bold">
            Email
            </label>
            <input
              className={
                status === "failed"
                  ? "bg-gray-300  mb-4 ml-4 px-2 py-2 rounded-lg focus:ring-blue-500 focus:ring-2 focus:outline-none ring-2 ring-red-500"
                  : "bg-gray-300 mb-4 ml-4 px-2 py-2 rounded-lg focus:ring-blue-500 focus:ring-2 focus:outline-none "
              }
              name="email"
              id="email"
              placeholder="email"
              type="email"
              value={email}
              required={true}
              onChange={(e) => setEmail(() => e.target.value)}
            />
          
         </div>

         <div className="flex w-2/3 justify-between"> 
         <label className="font-bold">
            Password  </label>
            <input
              className={
                status === "failed"
                  ? "bg-gray-300 mb-4 ml-4 px-4 py-2 rounded-lg focus:ring-blue-500 focus:ring-2 focus:outline-none ring-2 ring-red-500"
                  : "bg-gray-300 mb-4 ml-4 px-4 py-2 rounded-lg focus:ring-blue-500 focus:ring-2 focus:outline-none"
              }
              name="password"
              id="password"
              placeholder="password"
              type="password"
              required={true}
              value={password}
              onChange={(e) => setPassword(() => e.target.value)}
            />
         
         
          </div>
         
          
          <button
            type="button"
            className="text-white py-2 px-6 bg-blue-500 rounded-lg uppercase mt-4"
            onClick={login}
          >
            {status === "signing in" ? (
              <p> Signing in... </p>
            ) : (
              <p> Sign in </p>
            )}
          </button>
          {status === "failed" && <p> {error} </p>}
        </form>
        <p className="text-center mt-4">
          Don't have an account?
          <Link to="/signup" className="text-blue-500 ml-2 font-bold">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}