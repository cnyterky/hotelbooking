import { toast } from "react-toastify";
import { login } from "../actions/auth";
import LoginForm from "../components/LoginForm";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({
        email,
        password,
      });
      if (res.data) {
        window.localStorage.setItem("auth", JSON.stringify(res.data));
        dispatch({
          type: "LOGGED_IN_USER",
          payload: res.data,
        });
        history.push("/dashboard");
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              <LoginForm
                handleSubmit={handleSubmit}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
