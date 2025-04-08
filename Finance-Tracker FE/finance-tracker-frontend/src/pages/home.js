import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { fetchTransactionForHome } from '../actions/homeActions';
import { deleteTransaction } from '../actions/transactionActions';


const Home = () => {
    const [incomeTransactions, setIncomeTransactions] = useState([]);
    const [housingTransactions, setHousingTransactions] = useState([]);
    const [transportationTransactions, setTransportationTransactions] = useState([]);
    const [foodTransactions, setFoodTransactions] = useState([]);
    const [personalTransactions, setPersonalTransactions] = useState([]);
    const [lifestyleTransactions, setLifestyleTransactions] = useState([]);
    const [healthTransactions, setHealthTransactions] = useState([]);
    const [insuranceTransactions, setInsuranceTransactions] = useState([]);
    const [netBalance, setNetBalance] = useState([]);
    const [totalIncome, setTotalIncome] = useState([]);
    const [totalExpense, setTotalExpense] = useState([]);


    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { transactions, loading, error } = useSelector((state) => state.fetchTransaction);
    console.log(loading, error);

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure you want to delete the transaction?")) {
            dispatch(deleteTransaction(id));
            window.location.reload();
        }
    };

    const handleNavWithCategory = (category) => {
        navigate('/transaction', { state: { category } })
    };

    const formatCurrency = (amount) => {
        return amount.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",

        });
    };

    function formatDate(dateString) {
        const date = new Date(dateString);
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
    }

    useEffect(() => {
        dispatch(fetchTransactionForHome());
    }, [dispatch]);

    useEffect(() => {
        if (transactions && transactions.length > 0) {

            const incomeTransactions = transactions.filter(transaction => transaction.categoryId === '67f0131580662f95d664e740');
            setIncomeTransactions(incomeTransactions);

            const housingTransactions = transactions.filter(transaction => transaction.categoryId === '67f0135080662f95d664e744');
            setHousingTransactions(housingTransactions);

            const transportationTransactions = transactions.filter(transaction => transaction.categoryId === '67f0135980662f95d664e748');
            setTransportationTransactions(transportationTransactions);

            const foodTransactions = transactions.filter(transaction => transaction.categoryId === '67f0135f80662f95d664e74c');
            setFoodTransactions(foodTransactions);

            const personalTransactions = transactions.filter(transaction => transaction.categoryId === '67f0136580662f95d664e750');
            setPersonalTransactions(personalTransactions);

            const lifestyleTransactions = transactions.filter(transaction => transaction.categoryId === '67f0136b80662f95d664e754');
            setLifestyleTransactions(lifestyleTransactions);

            const healthTransactions = transactions.filter(transaction => transaction.categoryId === '67f0137180662f95d664e758');
            setHealthTransactions(healthTransactions);

            const insuranceTransactions = transactions.filter(transaction => transaction.categoryId === '67f0137880662f95d664e75c');
            setInsuranceTransactions(insuranceTransactions);

            const income = transactions
                .filter((transaction) => transaction.isExpense === false)
                .reduce((totalIncome, transaction) => totalIncome + transaction.transactionAmount, 0);

            const expense = transactions
                .filter((transaction) => transaction.isExpense === true)
                .reduce((totalExpense, transaction) => totalExpense + transaction.transactionAmount, 0);

            const net = income - expense;

            setTotalIncome(income);
            setTotalExpense(expense);
            setNetBalance(net.toFixed(2));
        }
    }, [transactions]);

    return (
        <>
            <div className="container px-6">
                <div className="row g-3 mb-3">
                    <div className="col p-3 border border-secondary-subtle border-4 rounded-pill me-3">
                        <div className="p-3 text-center fw-bold fs-3">Net Balance:  ${netBalance}</div>
                    </div>
                </div>
            </div>
            <div className="container px-6">
                <div className="row g-3 mb-3">
                    <div className="col p-3 border border-success border-4 rounded-pill me-3">
                        <div className="p-3 text-center fw-bold fs-5">Total Income:  ${totalIncome}</div>
                    </div>
                    <div className="col p-3 border border-danger border-4 rounded-pill me-3">
                        <div className="p-3 text-center fw-bold fs-5">Total Expenses:  ${totalExpense}</div>
                    </div>
                </div>
            </div>
            <div className="container px-6">
                <div className="mb-4">
                    <h4 className="fw-bold">Income:</h4>
                    <table className="table table-bordered table-striped bg-light p-4 rounded shadow-sm mb-3" style={{ tableLayout: "fixed" }}>
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {incomeTransactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <th>{transaction.transactionName}</th>
                                    <th>{formatCurrency(transaction.transactionAmount)}</th>
                                    <th>{formatDate(transaction.transactionDate)}</th>
                                    <td className="d-flex justify-content-around">
                                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/transaction/${transaction._id}`)}>Edit</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deleteHandler(transaction._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-success w-50" onClick={() => { handleNavWithCategory('Income') }}>Add Income</button>
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="fw-bold">Housing:</h4>
                    <table className="table table-bordered table-striped bg-light p-4 rounded shadow-sm mb-3" style={{ tableLayout: "fixed" }}>
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {housingTransactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <th>{transaction.transactionName}</th>
                                    <th>{formatCurrency(transaction.transactionAmount)}</th>
                                    <th>{formatDate(transaction.transactionDate)}</th>
                                    <td className="d-flex justify-content-around">
                                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/transaction/${transaction._id}`)}>Edit</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deleteHandler(transaction._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-success w-50" onClick={() => { handleNavWithCategory('Housing') }}>Add Housing Transaction</button>
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="fw-bold">Transportation:</h4>
                    <table className="table table-bordered table-striped bg-light p-4 rounded shadow-sm mb-3" style={{ tableLayout: "fixed" }}>
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transportationTransactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <th>{transaction.transactionName}</th>
                                    <th>{formatCurrency(transaction.transactionAmount)}</th>
                                    <th>{formatDate(transaction.transactionDate)}</th>
                                    <td className="d-flex justify-content-around">
                                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/transaction/${transaction._id}`)}>Edit</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deleteHandler(transaction._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-success w-50" onClick={() => { handleNavWithCategory('Transportation') }}>Add Transportation Transaction</button>
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="fw-bold">Food:</h4>
                    <table className="table table-bordered table-striped bg-light p-4 rounded shadow-sm mb-3" style={{ tableLayout: "fixed" }}>
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {foodTransactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <th>{transaction.transactionName}</th>
                                    <th>{formatCurrency(transaction.transactionAmount)}</th>
                                    <th>{formatDate(transaction.transactionDate)}</th>
                                    <td className="d-flex justify-content-around">
                                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/transaction/${transaction._id}`)}>Edit</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deleteHandler(transaction._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-success w-50" onClick={() => { handleNavWithCategory('Food') }}>Add Food Transaction</button>
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="fw-bold">Personal:</h4>
                    <table className="table table-bordered table-striped bg-light p-4 rounded shadow-sm mb-3" style={{ tableLayout: "fixed" }}>
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {personalTransactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <th>{transaction.transactionName}</th>
                                    <th>{formatCurrency(transaction.transactionAmount)}</th>
                                    <th>{formatDate(transaction.transactionDate)}</th>
                                    <td className="d-flex justify-content-around">
                                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/transaction/${transaction._id}`)}>Edit</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deleteHandler(transaction._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-success w-50" onClick={() => { handleNavWithCategory('Personal') }}>Add Personal Transaction</button>
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="fw-bold">Lifestyle:</h4>
                    <table className="table table-bordered table-striped bg-light p-4 rounded shadow-sm mb-3" style={{ tableLayout: "fixed" }}>
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody className='fw-light'>
                            {lifestyleTransactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <th>{transaction.transactionName}</th>
                                    <th>{formatCurrency(transaction.transactionAmount)}</th>
                                    <th>{formatDate(transaction.transactionDate)}</th>
                                    <td className="d-flex justify-content-around">
                                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/transaction/${transaction._id}`)}>Edit</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deleteHandler(transaction._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-success w-50" onClick={() => { handleNavWithCategory('Lifestyle') }}>Add Lifestyle Transaction</button>
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="fw-bold">Health:</h4>
                    <table className="table table-bordered table-striped bg-light p-4 rounded shadow-sm mb-3" style={{ tableLayout: "fixed" }}>
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {healthTransactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <th>{transaction.transactionName}</th>
                                    <th>{formatCurrency(transaction.transactionAmount)}</th>
                                    <th>{formatDate(transaction.transactionDate)}</th>
                                    <td className="d-flex justify-content-around">
                                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/transaction/${transaction._id}`)}>Edit</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deleteHandler(transaction._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-success w-50" onClick={() => { handleNavWithCategory('Health') }}>Add Health Transaction</button>
                    </div>
                </div>

                <div className="mb-4">
                    <h4 className="fw-bold">Insurance:</h4>
                    <table className="table table-bordered table-striped bg-light p-4 rounded shadow-sm mb-3" style={{ tableLayout: "fixed" }}>
                        <thead className="table-dark">
                            <tr>
                                <th>Name</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Edit / Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {insuranceTransactions.map((transaction) => (
                                <tr key={transaction._id}>
                                    <th>{transaction.transactionName}</th>
                                    <th>{formatCurrency(transaction.transactionAmount)}</th>
                                    <th>{formatDate(transaction.transactionDate)}</th>
                                    <td className="d-flex justify-content-around">
                                        <button className="btn btn-outline-primary btn-sm me-2" onClick={() => navigate(`/transaction/${transaction._id}`)}>Edit</button>
                                        <button className="btn btn-outline-danger btn-sm" onClick={() => deleteHandler(transaction._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-center">
                        <button className="btn btn-outline-success w-50" onClick={() => { handleNavWithCategory('Insurance') }}>Add Insurance Transaction</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
