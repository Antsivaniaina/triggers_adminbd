import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import config from '../config';

const { API_URL } = config;

const AuditTransfers = () => {
    const [audits, setAudits] = useState([]);

    useEffect(() => {
        fetchAudits();
    }, []);

    const fetchAudits = async () => {
        try {
            const response = await axios.get(`${API_URL}/audit/read.php`);
            setAudits(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching audit transfers:', error);
        }
    };

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6">
                        Audit Transfers Management
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container style={{ marginLeft: 240, padding: '16px' }}>
                <Typography variant="h4" gutterBottom>
                    Audit Transfers
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Operation Type</TableCell>
                                <TableCell>Transfer Number</TableCell>
                                <TableCell>Operation Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {audits.map((audit) => (
                                <TableRow key={audit.id}>
                                    <TableCell>{audit.operation_type}</TableCell>
                                    <TableCell>{audit.transfer_number}</TableCell>
                                    <TableCell>{audit.operation_date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    );
};

export default AuditTransfers;
