import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { fetchTransactionDetails, editTransaction } from '../actions/transactionActions';
import AlertMessage from '../components/AlertMessage';

const EditTransaction = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, transaction } = useSelector((state) => state.transactionDetails);

    const [isExpense, setIsExpense] = useState("");
    const [transactionName, setTransactionName] = useState("");
    const [transactionAmount, setTransactionAmount] = useState("");
    const [transactionDate, setTransactionDate] = useState("");
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => {
        dispatch(fetchTransactionDetails(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (transaction) {
            setTransactionName(transaction.transactionName || "");
            setTransactionAmount(transaction.transactionAmount || "");
            setTransactionDate(transaction.transactionDate || "");
            setIsExpense(transaction.isExpense);
            setCategoryId(transaction.categoryId || "");
        }
    }, [transaction]);

    function formatDate(dateInput) {
        try {
            const isoString = new Date(dateInput).toISOString(); // always in UTC
            return isoString.split("T")[0]; // get yyyy-mm-dd
        } catch {
            return "";
        }
    }

    const handleIsExpense = (e) => {
        setIsExpense(e.target.value === "Expense");
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

    const dispatchTransactionUpdate = useDispatch();
    const { successUpdate, errorUpdate } = useSelector((state) => state.transactionEdit)
    console.log("successUpdate:", successUpdate);
    console.log("errorUpdate:", errorUpdate);

    const editTransactionHandler = (e) => {
        e.preventDefault();
        dispatchTransactionUpdate(
            editTransaction(
                transactionName,
                transactionAmount,
                isExpense,
                transactionDate,
                categoryId,
                id
            )
        );
    };

    useEffect(() => {
        if (successUpdate) {
            const refresh = setTimeout(() => {
                navigate('/home');
                window.location.reload();
            }, 1000);

            return () => clearTimeout(refresh);
        }
    }, [successUpdate, navigate]);


    return (
        <>
            {loading && (
                <AlertMessage variant="info" message="Laoding product details..." />
            )}
            {error && <AlertMessage variant="danger" message={error} />}
            {successUpdate && (
                <AlertMessage variant="success" message="Transaction updated successfully!" />
            )}
            {errorUpdate && <AlertMessage variant="danger" message={errorUpdate} />}
            <form
                className="row g-3 border border-dark bg-light border-3 p-4 border-opacity-50 rounded m-5"
                id='transactionForm'
                onSubmit={editTransactionHandler}>

                <h3 className="text-center fw-bold mb-4 text-success">Edit Transaction</h3>

                <div className="row g-2 mb-2">
                    <div className="col-12">
                        <div className="input-group">
                            <span className="input-group-text">Category:</span>
                            <select className="form-select" id="categorySelection" value={categoryId} onChange={(e) => handleCategoryId(e)}>
                                <option value="" disabled>Pick a Category</option>
                                <option value="67f0131580662f95d664e740">Income</option>
                                <option value="67f0135080662f95d664e744">Housing</option>
                                <option value="67f0135980662f95d664e748">Transportation</option>
                                <option value="67f0135f80662f95d664e74c">Food</option>
                                <option value="67f0136580662f95d664e750">Personal</option>
                                <option value="67f0136b80662f95d664e754">Lifestyle</option>
                                <option value="67f0137180662f95d664e758">Health</option>
                                <option value="67f0137880662f95d664e75c">Insurance</option>
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
                            <input className="form-check-input" type="radio" id="Income" name='transactionType' value="Income" checked={isExpense === false} required onChange={handleIsExpense} />
                            <label className="form-check-label" htmlFor="Income">Income</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" id="Expense" name='transactionType' value="Expense" checked={isExpense === true} required onChange={handleIsExpense} />
                            <label className="form-check-label" htmlFor="Expense">Expense</label>
                        </div>
                    </div>
                </div>
                <div className='row g-2 mb-2'>
                    <div className="col-12">
                        <div className="input-group">
                            <span className="input-group-text">Transaction Date:</span>
                            <input type="date" className="form-control" placeholder='mm/dd/yyyy' aria-label="date" value={formatDate(transactionDate)} onChange={(e) => handleTransactionDate(e)} required />
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

export default EditTransaction;