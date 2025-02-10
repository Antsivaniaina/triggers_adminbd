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

            const countsData = auditsData.reduce(
                (acc, audit) => {
                    if (audit.operation_type === 'INSERT') acc.insert += 1;
                    if (audit.operation_type === 'UPDATE') acc.update += 1;
                    if (audit.operation_type === 'DELETE') acc.delete += 1;
                    return acc;
                },
                { insert: 0, update: 0, delete: 0 }
            );
            setCounts(countsData);
        } catch (error) {
            console.error('Error fetching audit transfers:', error);
        }
    };

    return (
        <>
            <header className="bg-gradient-to-r from-blue-500 to-blue-700 text-white p-4 shadow-lg">
                <h1 className="text-3xl font-bold">Audit Transfers Management</h1>
            </header>
            <div className="container mx-auto p-4">
                <h2 className="text-2xl font-bold mb-4">Audit Transfers</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gradient-to-r from-green-400 to-green-600 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white">INSERT</h3>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </div>
                        <p className="text-4xl text-white">{counts.insert}</p>
                    </div>
                    <div className="bg-gradient-to-r from-yellow-400 to-yellow-600 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white">UPDATE</h3>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </div>
                        <p className="text-4xl text-white">{counts.update}</p>
                    </div>
                    <div className="bg-gradient-to-r from-red-400 to-red-600 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                        <div className="flex justify-between items-center">
                            <h3 className="text-lg font-bold text-white">DELETE</h3>
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                        </div>
                        <p className="text-4xl text-white">{counts.delete}</p>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white shadow-lg rounded-lg">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="py-3 px-6 text-left">Operation Type</th>
                                <th className="py-3 px-6 text-left">Transfer Number</th>
                                <th className="py-3 px-6 text-left">Operation Date</th>
                                <th className="py-3 px-6 text-left">Ancien solde</th>
                                <th className="py-3 px-6 text-left">Nouvelle solde</th>
                                <th className="py-3 px-6 text-left">Colonne modifiée</th>
                            </tr>
                        </thead>
                        <tbody>
                            {audits.map((audit) => (
                                <tr key={audit.id} className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                                    <td className="py-4 px-6">{audit.operation_type}</td>
                                    <td className="py-4 px-6">{audit.transfer_number}</td>
                                    <td className="py-4 px-6">{audit.operation_date}</td>
                                    <td className="py-4 px-6">{audit.ancien_solde}</td>
                                    <td className="py-4 px-6">{audit.new_solde}</td>
                                    <td className="py-4 px-6">{audit.colonne}</td>
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

