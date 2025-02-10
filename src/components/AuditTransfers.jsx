import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Card, CardContent, Grid, Icon } from '@mui/material';
import config from '../config';

const { API_URL } = config;

const AuditTransfers = () => {
    const [audits, setAudits] = useState([]);
    const [counts, setCounts] = useState({ insert: 0, update: 0, delete: 0 });

    useEffect(() => {
        fetchAudits();
    }, []);

    const fetchAudits = async () => {
        try {
            const response = await axios.get(`${API_URL}/audit/read.php`);
            const auditsData = Array.isArray(response.data) ? response.data : [];
            setAudits(auditsData);

            const counts = auditsData.reduce(
                (acc, audit) => {
                    if (audit.operation_type === 'INSERT') acc.insert += 1;
                    if (audit.operation_type === 'UPDATE') acc.update += 1;
                    if (audit.operation_type === 'DELETE') acc.delete += 1;
                    return acc;
                },
                { insert: 0, update: 0, delete: 0 }
            );
            setCounts(counts);
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
                <Grid container spacing={3} style={{ marginBottom: '16px' }}>
                    <Grid item xs={4}>
                        <Card style={{ background: 'linear-gradient(to right, #e0f7fa, #00c853)' }}>
                            <CardContent>
                                <Icon style={{ float: 'right', color: '#00c853' }}>add_circle</Icon>
                                <Typography variant="h5" component="div">
                                    INSERT
                                </Typography>
                                <Typography variant="h4">
                                    {counts.insert}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card style={{ background: 'linear-gradient(to right, #fffde7, #ffeb3b)' }}>
                            <CardContent>
                                <Icon style={{ float: 'right', color: '#ffeb3b' }}>edit</Icon>
                                <Typography variant="h5" component="div">
                                    UPDATE
                                </Typography>
                                <Typography variant="h4">
                                    {counts.update}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card style={{ background: 'linear-gradient(to right, #ffebee, #d32f2f)' }}>
                            <CardContent>
                                <Icon style={{ float: 'right', color: '#d32f2f' }}>delete</Icon>
                                <Typography variant="h5" component="div">
                                    DELETE
                                </Typography>
                                <Typography variant="h4">
                                    {counts.delete}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Operation Type</TableCell>
                                <TableCell>Transfer Number</TableCell>
                                <TableCell>Operation Date</TableCell>
                                <TableCell>Ancien solde</TableCell>
                                <TableCell>Nouvelle solde</TableCell>
                                <TableCell>Colonne modifiée</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {audits.map((audit) => (
                                <TableRow key={audit.id}>
                                    <TableCell>{audit.operation_type}</TableCell>
                                    <TableCell>{audit.transfer_number}</TableCell>
                                    <TableCell>{audit.operation_date}</TableCell>
                                    <TableCell>{audit.ancien_solde}</TableCell>
                                    <TableCell>{audit.new_solde}</TableCell>
                                    <TableCell>{audit.colonne}</TableCell>
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
