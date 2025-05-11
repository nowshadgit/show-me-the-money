import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from '../src/Table/Table';

describe('BalanceSheetTable', () => {
  it('renders header rows', () => {
    const rows = [
      {
        RowType: 'Header',
        Cells: [{ Value: 'Account' }, { Value: 'Amount' }]
      }
    ];

    render(<Table rows={rows} />);
    expect(screen.getByText('Account')).toBeInTheDocument();
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });

  it('renders sections', () => {
    const rows = [
      {
        RowType: 'Section',
        Title: 'Assets',
        Rows: [
          {
            RowType: 'Row',
            Cells: [{ Value: 'Sample Business' }, { Value: '92911.00' }]
          }
        ]
      }
    ];

    render(<Table rows={rows} />);
    expect(screen.getByText('Assets')).toBeInTheDocument();
    expect(screen.getByText('Sample Business')).toBeInTheDocument();
    expect(screen.getByText('92911.00')).toBeInTheDocument();
  });

  it('renders summary row', () => {
    const rows = [
      {
        RowType: 'SummaryRow',
        Cells: [{ Value: 'Total' }, { Value: '5000' }]
      }
    ];

    render(<Table rows={rows} />);
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('5000')).toBeInTheDocument();
  });

  it('returns null for unknown row types', () => {
    const rows = [
      { RowType: 'Unknown', Cells: [{ Value: 'akaksj' }] }
    ];

    const { container } = render(<Table rows={rows} />);
    expect(container.querySelector('td')).not.toBeInTheDocument();
  });
});
