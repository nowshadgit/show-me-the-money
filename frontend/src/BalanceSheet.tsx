import React, { useEffect, useState } from 'react';
import BalanceSheetTable from './Table/Table';

interface Report {
    ReportName: string
    Rows: any[]
}

const fetchData = async (setReport: (report: Report) => void, setLoading: (data: boolean) => void) => {
    try {
        setLoading(true)
        const response = await fetch('http://localhost:3001/api/balance-sheet')
        const result = await response.json()
        const report = result?.Reports[0]
        setReport(report)
    } catch (err) {
        console.log("API has been failed: ", err)
    } finally {
        setLoading(false)
    }
}

const BalanceSheet = () => {
    const [report, setReport] = useState<Report | null>(null);
    const [loading, setLoading] = useState<boolean>(false)
    useEffect(() => {
        fetchData(setReport, setLoading)
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }
    const { ReportName, Rows } = report || {}
    return (
        <div>
            <h1>{ReportName}</h1>
            <BalanceSheetTable rows={Rows} />
        </div>
    );
};

export default BalanceSheet;


