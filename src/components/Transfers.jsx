import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ErrorBoundary from './ErrorBoundary';
import { AppBar, Toolbar, Typography, Drawer, List, ListItem, ListItemText, Container, TextField, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
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
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Transfers Management
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ marginLeft: 240, padding: '16px' }}>
                <Typography variant="h4" gutterBottom>
                    Transfers
                </Typography>
                <div style={{ marginBottom: '16px' }}>
                    <TextField
                        label="Check Number"
                        name="checkNumber"
                        value={formData.checkNumber}
                        onChange={handleInputChange}
                        variant="outlined"
                        style={{ marginRight: '8px' }}
                    />
                    <TextField
                        label="Account Number"
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleInputChange}
                        variant="outlined"
                        style={{ marginRight: '8px' }}
                    />
                    <TextField
                        label="Amount"
                        name="amount"
                        value={formData.amount}
                        onChange={handleInputChange}
                        variant="outlined"
                        style={{ marginRight: '8px' }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={isEditing ? handleUpdateTransfer : handleCreateTransfer}
                        style={{ marginRight: '8px' }}
                    >
                        {isEditing ? 'Update Transfer' : 'Create Transfer'}
                    </Button>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Transfer Number</TableCell>
                                <TableCell>Check Number</TableCell>
                                <TableCell>Account Number</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {transfers.map((transfer) => (
                                <TableRow key={transfer.transfer_number}>
                                    <TableCell>{transfer.transfer_number}</TableCell>
                                    <TableCell>{transfer.check_number}</TableCell>
                                    <TableCell>{transfer.account_number}</TableCell>
                                    <TableCell>{transfer.amount}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleEditTransfer(transfer)}
                                            style={{ marginRight: '8px' }}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handleDeleteTransfer(transfer.transfer_number)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </ErrorBoundary>
    );
};

export default Transfers;
