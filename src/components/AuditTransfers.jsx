import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
            <header className="bg-blue-600 text-white p-4">
                <h1 className="text-2xl">Audit Transfers Management</h1>
            </header>

            <div className="container mx-auto p-4">
                <h2 className="text-xl font-bold mb-4">Audit Transfers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-green-100 p-4 rounded shadow">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">INSERT</h3>
                            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </div>
                        <p className="text-2xl">{counts.insert}</p>
                    </div>
                    <div className="bg-yellow-100 p-4 rounded shadow">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">UPDATE</h3>
                            <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </div>
                        <p className="text-2xl">{counts.update}</p>
                    </div>
                    <div className="bg-red-100 p-4 rounded shadow">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold">DELETE</h3>
                            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </div>
                        <p className="text-2xl">{counts.delete}</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead>
                            <tr>
                                <th className="py-2 px-4 border">Operation Type</th>
                                <th className="py-2 px-4 border">Transfer Number</th>
                                <th className="py-2 px-4 border">Operation Date</th>
                                <th className="py-2 px-4 border">Ancien solde</th>
                                <th className="py-2 px-4 border">Nouvelle solde</th>
                                <th className="py-2 px-4 border">Colonne modifiée</th>
                            </tr>
                        </thead>
                        <tbody>
                            {audits.map((audit) => (
                                <tr key={audit.id}>
                                    <td className="border px-4 py-2">{audit.operation_type}</td>
                                    <td className="border px-4 py-2">{audit.transfer_number}</td>
                                    <td className="border px-4 py-2">{audit.operation_date}</td>
                                    <td className="border px-4 py-2">{audit.ancien_solde}</td>
                                    <td className="border px-4 py-2">{audit.new_solde}</td>
                                    <td className="border px-4 py-2">{audit.colonne}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AuditTransfers;
