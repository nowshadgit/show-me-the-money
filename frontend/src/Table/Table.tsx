import React, { JSX } from 'react';
import './Table.css';

interface Cell {
    Value: string;
    Attributes?: { Id: string; Value: string }[];
}

interface Row {
    RowType: string;
    Title?: string;
    Cells?: Cell[];
    Rows?: Row[];
}

type Rows = any[] | undefined

interface Props {
    rows: Rows;
}

const Table: React.FC<Props> = ({ rows }: Props) => {
    const renderRow = (row: Row, level: number = 0): JSX.Element | null => {
        const indentStyle = { paddingLeft: `${level * 20}px` };

        if (row.RowType === 'Header' && row.Cells) {
            return (
                <tr className="header-row">
                    {row.Cells.map((cell, idx) => (
                        <th key={idx + 'row'}>{cell.Value}</th>
                    ))}
                </tr>
            );
        }

        if (row.RowType === 'Section') {
            const { Rows, Title } = row;
            if (Title) {
                return (
                    <>
                        <tr className="section-row">
                            <td colSpan={3} style={indentStyle}>
                                <strong>{Title}</strong>
                            </td>
                        </tr>
                        {Rows?.map((subRow) => renderRow(subRow, level + 1))}
                    </>
                );
            }
            return null

        }

        if ((row.RowType === 'Row' && row.Cells) || (row.RowType === 'SummaryRow' && row.Cells)) {
            return (
                <tr className="data-row">
                    {row.Cells.map((cell, idx) => (
                        <td key={idx + 'row'} style={idx === 0 ? indentStyle : undefined}>
                            {cell.Value}
                        </td>
                    ))}
                </tr>
            );
        }

        return null;
    };

    const renderRows = (rows: Rows) => {
        return <>
            {rows ? rows.map((row, i) => {
                if (row.RowType === 'Header')
                    return <thead key={i + 'header'}>{renderRow(row)}</thead>
                else
                    return <tbody key={i + 'body'}>
                        {renderRow(row)}
                    </tbody>

            }) : null}
        </>
    }

    return (
        <table className="balance-table">
            {renderRows(rows)}
        </table>
    );
};

export default Table;
