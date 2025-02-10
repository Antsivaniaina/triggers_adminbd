import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorBoundary from './ErrorBoundary';
import config from '../config';

const { API_URL } = config;

const Transfers = () => {
    const [transfers, setTransfers] = useState([]);
    const [formData, setFormData] = useState({
        transferNumber: '',
        checkNumber: '',
        accountNumber: '',
        amount: ''
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchTransfers();
    }, []);

    const fetchTransfers = async () => {
        try {
            const response = await axios.get(`${API_URL}/transfers/read.php`);
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
            await axios.post(`${API_URL}/transfers/create.php`, formData);
            fetchTransfers();
            setFormData({
                transferNumber: '',
                checkNumber: '',
                accountNumber: '',
                amount: ''
            });
        } catch (error) {
            console.error('Error creating transfer:', error);
        }
    };

    const handleUpdateTransfer = async () => {
        try {
            await axios.post(`${API_URL}/transfers/update.php`, formData);
            fetchTransfers();
            setFormData({
                transferNumber: '',
                checkNumber: '',
                accountNumber: '',
                amount: ''
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error updating transfer:', error);
        }
    };

    const handleEditTransfer = (transfer) => {
        setFormData({
            transferNumber: transfer.transfer_number,
            checkNumber: transfer.check_number,
            accountNumber: transfer.account_number,
            amount: transfer.amount
        });
        setIsEditing(true);
    };

    const handleDeleteTransfer = async (transferNumber) => {
        try {
            await axios.delete(`${API_URL}/transfers/delete.php`, { data: { transferNumber } });
            fetchTransfers();
        } catch (error) {
            console.error('Error deleting transfer:', error);
        }
    };

    return (
        <ErrorBoundary>
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl">Transfers Management</h1>
            </header>
            <div className="container mx-auto p-4">
                <h2 className="text-xl font-bold mb-4">Transfers</h2>
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
                        onClick={isEditing ? handleUpdateTransfer : handleCreateTransfer}
                        className="bg-blue-500 text-white p-2 rounded mr-2"
                    >
                        {isEditing ? 'Update Transfer' : 'Create Transfer'}
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">Transfer Number</th>
                                <th className="py-2 px-4 border">Check Number</th>
                                <th className="py-2 px-4 border">Account Number</th>
                                <th className="py-2 px-4 border">Amount</th>
                                <th className="py-2 px-4 border">Actions</th>
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
                                            onClick={() => handleEditTransfer(transfer)}
                                            className="bg-green-500 text-white p-2 rounded mr-2"
                                        >
                                            Edit
                                        </button>
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
            </div>
        </ErrorBoundary>
    );
};

export default Transfers;
