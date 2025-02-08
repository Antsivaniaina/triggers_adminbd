import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorBoundary from './ErrorBoundary';

const Transfers = () => {
    const [transfers, setTransfers] = useState([]);
    const [formData, setFormData] = useState({
        transferNumber: '',
        checkNumber: '',
        accountNumber: '',
        amount: ''
    });

    useEffect(() => {
        fetchTransfers();
    }, []);

    const fetchTransfers = async () => {
        try {
            const response = await axios.get('http://localhost:8002/triggers.adminbd/api/transfers/read.php');
            setTransfers(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching transfers:', error);
            setTransfers([]);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreateTransfer = async () => {
        try {
            await axios.post('http://localhost:8002/triggers.adminbd/api/transfers/create.php', formData);
            fetchTransfers();
        } catch (error) {
            console.error('Error creating transfer:', error);
        }
    };

    const handleUpdateTransfer = async () => {
        try {
            await axios.post('http://localhost:8002/triggers.adminbd/api/transfers/update.php', formData);
            fetchTransfers();
        } catch (error) {
            console.error('Error updating transfer:', error);
        }
    };

    const handleDeleteTransfer = async (transferNumber) => {
        try {
            await axios.delete('http://localhost:8002/triggers.adminbd/api/transfers/delete.php', { data: { transferNumber } });
            fetchTransfers();
        } catch (error) {
            console.error('Error deleting transfer:', error);
        }
    };

    return (
        <ErrorBoundary>
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Transfers</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        name="checkNumber"
                        placeholder="Check Number"
                        value={formData.checkNumber}
                        onChange={handleInputChange}
                        className="border p-2 mr-2"
                    />
                    <input
                        type="text"
                        name="accountNumber"
                        placeholder="Account Number"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        className="border p-2 mr-2"
                    />
                    <input
                        type="text"
                        name="amount"
                        placeholder="Amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        className="border p-2 mr-2"
                    />
                    <button
                        onClick={handleCreateTransfer}
                        className="bg-blue-500 text-white p-2 rounded"
                    >
                        Create Transfer
                    </button>
                    <button
                        onClick={handleUpdateTransfer}
                        className="bg-green-500 text-white p-2 rounded ml-2"
                    >
                        Update Transfer
                    </button>
                </div>
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="py-2">Transfer Number</th>
                            <th className="py-2">Check Number</th>
                            <th className="py-2">Account Number</th>
                            <th className="py-2">Amount</th>
                            <th className="py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transfers.map((transfer) => (
                            <tr key={transfer.transfer_number}>
                                <td className="border px-4 py-2">{transfer.transfer_number}</td>
                                <td className="border px-4 py-2">{transfer.check_number}</td>
                                <td className="border px-4 py-2">{transfer.account_number}</td>
                                <td className="border px-4 py-2">{transfer.amount}</td>
                                <td className="border px-4 py-2">
                                    <button
                                        onClick={() => handleDeleteTransfer(transfer.transfer_number)}
                                        className="bg-red-500 text-white p-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </ErrorBoundary>
    );
};

export default Transfers;
