import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { login } from '../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import AlertMessage from '../components/AlertMessage';

const LoginPage = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const userLogin = useSelector((state) => state.login);
  const { loading, success, error, userInfo } = userLogin;
  console.log("Error:", userLogin);


  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(username, password));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo) {
      navigate('/home')
    }
  }, [userInfo, navigate]);

  return (
    <>
      {loading && (
        <div className="d-flex justify-content-center my-3">
          <Spinner animation="border" variant="primary" />
        </div>
      )}
      {error && <AlertMessage variant="danger" message={error} />}
      {success && <AlertMessage variant="success" message={success} />}
      <div className="d-flex justify-content-center align-items-center mt-5">
        <form
          onSubmit={handleSubmit}
          className="bg-light p-4 border border-2 rounded shadow-sm"
          style={{ width: "100%", maxWidth: "400px" }}
          id='loginForm'
        >
          <h3 className="text-center fw-bold mb-4 text-primary">Login</h3>
          <div className="mb-3">
            <label htmlFor="inputUsername" className="form-label fw-bold">
              Username:
            </label>
            <input
              type="text"
              className="form-control"
              id="inputUsername"
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="inputPassword3" className="form-label fw-bold">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword3"
              onChange={handlePasswordChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            Login
          </button>
          <div className="text-center my-3">
            <span className="fw-bold text-muted">OR</span>
          </div>
          <div className="text-center">
            <Link to="/signup" className="text-decoration-none fw-bold fs-6 text-primary">
              Create An Account
            </Link>
          </div>
        </form>
      </div>
    </>
  )
}

export default LoginPage