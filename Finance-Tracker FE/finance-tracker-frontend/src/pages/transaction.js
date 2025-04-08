import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { useLocation } from 'react-router-dom';
import { addTransaction } from '../actions/transactionActions';
import { Spinner } from 'react-bootstrap';
import AlertMessage from '../components/AlertMessage';


const Transaction = () => {
    const { state } = useLocation();
    const [category, setCategory] = useState("");
    const [isExpense, setIsExpense] = useState("");
    const [transactionName, setTransactionName] = useState("");
    const [transactionAmount, setTransactionAmount] = useState("");
    const [transactionDate, setTransactionDate] = useState("");
    const [categoryId, setCategoryId] = useState("");

    const handleIsExpense = (e) => {
        setIsExpense(e.target.value === "Expense")
    };

    const handleTransactionName = (e) => {
        setTransactionName(e.target.value);
    };

    const handleTransactionAmount = (e) => {
        setTransactionAmount(e.target.value);
    };
    const handleTransactionDate = (e) => {
        setTransactionDate(e.target.value);
    };

    const handleCategoryId = (e) => {
        setCategoryId(e.target.value);
    };

    const dispatch = useDispatch();
    const transactionCreation = useSelector((state) => state.transactionCreation);
    const { loading, success, error } = transactionCreation;

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(addTransaction(transactionName, transactionAmount, isExpense, transactionDate, categoryId))
    };

    const fetchCategoryId = (categoryName) => {
        const categoryMap = {
            "Income": "67f0131580662f95d664e740",
            "Housing": "67f0135080662f95d664e744",
            "Transportation": "67f0135980662f95d664e748",
            "Food": "67f0135f80662f95d664e74c",
            "Personal": "67f0136580662f95d664e750",
            "Lifestyle": "67f0136b80662f95d664e754",
            "Health": "67f0137180662f95d664e758",
            "Insurance": "67f0137880662f95d664e75c"
        };
        return categoryMap[categoryName] || ""; 
    };

    useEffect(() => {
        if (state && state.category) {
            setCategory(state.category);
            setCategoryId(fetchCategoryId(state.category));
        }
    }, [state]);

    useEffect(() => {
        if (success) {
            setTransactionName("");
            setTransactionAmount("");
            setTransactionDate("");
            setIsExpense("");
            setCategoryId("");
            setCategory("");

            const refresh = setTimeout(() => {
                navigate('/home');
                window.location.reload();
            }, 1000);

            return () => clearTimeout(refresh);
        }
    }, [success, navigate]);

    return (
        <>
            {loading && (
                <div className="d-flex justify-content-center my-3">
                    <Spinner animation="border" variant="primary" />
                </div>
            )}
            {error && <AlertMessage variant="danger" message={error} />}
            {success && <AlertMessage variant="success" message={success} />}
            <form
                className="row g-3 border border-dark bg-light border-3 p-4 border-opacity-50 rounded m-5"
                id='transactionForm'
                onSubmit={handleSubmit}>

                <h3 className="text-center fw-bold mb-4 text-success">Add Transaction to {category}</h3>

                <div className="row g-2 mb-2">
                    <div className="col-12">
                        <div className="input-group">
                            <span className="input-group-text">Category:</span>
                            <select className="form-select" id="categorySelection" value={categoryId} onChange={(e) => handleCategoryId(e)}>
                                <option>{category}</option>
                                <option value="Income">Income</option>
                                <option value="Housing">Housing</option>
                                <option value="Transportation">Transportation</option>
                                <option value="Food">Food</option>
                                <option value="Personal">Personal</option>
                                <option value="Lifestyle">Lifestyle</option>
                                <option value="Health">Health</option>
                                <option value="Insurance">Insurance</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className='row g-2 mb-2'>
                    <div className='col-12'>
                        <div className="input-group">
                            <span className="input-group-text">Name:</span>
                            <input type="text" className="form-control" placeholder="Enter Transaction Name" value={transactionName} onChange={(e) => handleTransactionName(e)} required />
                        </div>
                    </div>
                </div>
                <div className="row g-2 mb-2">
                    <div className="col-md-6">
                        <div className="input-group">
                            <span className="input-group-text">Amount:</span>
                            <input type="number" className="form-control" placeholder='$0.00' step="0.01" min="0" aria-label="Dollar amount" value={transactionAmount} onChange={(e) => handleTransactionAmount(e)} required />
                        </div>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center align-items-center">
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="Income" name='transactionType' value="Income" required onChange={handleIsExpense} />
                            <label className="form-check-label" htmlFor="Income">Income</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="Expense" name='transactionType' value="Expense" required onChange={handleIsExpense} />
                            <label className="form-check-label" htmlFor="Expense">Expense</label>
                        </div>
                    </div>
                </div>
                <div className='row g-2 mb-2'>
                    <div className="col-12">
                        <div className="input-group">
                            <span className="input-group-text">Transaction Date:</span>
                            <input type="date" className="form-control" placeholder='mm/dd/yyyy' aria-label="date" value={transactionDate} onChange={(e) => handleTransactionDate(e)} required />
                        </div>
                    </div>
                </div>
                <div className="d-flex justify-content-center mb-2">
                    <button type="submit" className="btn btn-success w-75 fw-bold" >Submit</button>
                </div>
                <div className="d-flex justify-content-center">
                    <Link to="/home" className="text-decoration-none fw-bold fs-6">
                        Back to Home
                    </Link>
                </div>
            </form >
        </>
    )
}

export default Transaction;