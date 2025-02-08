import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AuditTransfers = () => {
    const [audits, setAudits] = useState([]);

    useEffect(() => {
        fetchAudits();
    }, []);

    const fetchAudits = async () => {
        try {
            const response = await axios.get('http://localhost:8002/triggers.adminbd/api/audit/read.php');
            setAudits(response.data);
        } catch (error) {
            console.error('Error fetching audit transfers:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Audit Transfers</h1>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="py-2">Operation Type</th>
                        <th className="py-2">Transfer Number</th>
                        <th className="py-2">Operation Date</th>
                    </tr>
                </thead>
                <tbody>
                    {audits.map((audit) => (
                        <tr key={audit.id}>
                            <td className="border px-4 py-2">{audit.operation_type}</td>
                            <td className="border px-4 py-2">{audit.transfer_number}</td>
                            <td className="border px-4 py-2">{audit.operation_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AuditTransfers;
