import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AlertMessage from '../components/AlertMessage';
import { registerUser } from '../actions/userActions';
import { Link } from 'react-router-dom';


const Signup = () => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleFirstNameChange = (e) => {
        setFirstName(e.target.value);
    };

    const handleLastNameChange = (e) => {
        setLastName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleUserNameChange = (e) => {
        setUserName(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const dispatch = useDispatch();
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, success, error } = userRegister;
    console.log(loading, success, error);


    const registerHandler = (event) => {
        event.preventDefault();
        dispatch(registerUser(firstname, lastname, email, username, password))

        const refresh = setTimeout(() => {
            window.location.reload();
        }, 5000);

        return () => clearTimeout(refresh);
    };

    useEffect(() => {
        if (success) {
            setFirstName("");
            setLastName("");
            setEmail("");
            setUserName("");
            setPassword("");
        }
    }, [success]);

    return (
        <>
            {error && <AlertMessage variant="danger" message={error} />}
            {success && <AlertMessage variant="success" message={success} />}
            <div className="d-flex justify-content-center align-items-center vh-50">
                <form
                    className="bg-light p-4 border border-2 rounded shadow-sm mb-5"
                    style={{ width: "100%", maxWidth: "450px" }}
                    id='signUpForm'
                >
                    <h3 className="text-center fw-bold mb-4 text-primary">Sign Up</h3>
                    <div className="col-12 mb-2">
                        <label htmlFor="inputFirstName" className="form-label fw-bold">First Name:</label>
                        <input type="text" className="form-control" id="inputFirstName" value={firstname} onChange={(e) => handleFirstNameChange(e)} required />
                    </div>
                    <div className="col-12 mb-2">
                        <label htmlFor="inputLastName" className="form-label fw-bold">Last Name:</label>
                        <input type="text" className="form-control" id="inputLastName" value={lastname} onChange={(e) => handleLastNameChange(e)} required />
                    </div>
                    <div className="col-12 mb-2">
                        <label htmlFor="inputEmail4" className="form-label fw-bold">Email:</label>
                        <input type="email" className="form-control" id="inputEmail4" value={email} onChange={(e) => handleEmailChange(e)} required />
                    </div>
                    <div className="col-12 mb-2">
                        <label htmlFor="inputUsername" className="form-label fw-bold">Username:</label>
                        <input type="text" className="form-control" id="inputUsername" value={username} onChange={(e) => handleUserNameChange(e)} required />
                    </div>
                    <div className="col-12 mb-4">
                        <label htmlFor="inputPassword4" className="form-label fw-bold">Password:</label>
                        <input type="password" className="form-control" id="inputPassword4" value={password} onChange={(e) => handlePasswordChange(e)} required />
                    </div>
                    <div className="col-12 d-flex justify-content-center mb-3">
                        <button type="submit" className="btn btn-primary w-75 fw-bold" onClick={registerHandler}>
                            Sign Up
                        </button>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                        <Link to="/" className="text-decoration-none fw-bold fs-6 text-primary">
                            Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup