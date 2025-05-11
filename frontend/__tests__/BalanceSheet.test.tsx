import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BalanceSheet from '../src/BalanceSheet';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({
      Reports: [
        {
          ReportName: 'Bank',
          Rows: [
            {
              RowType: 'Header',
              Cells: [{ Value: '126.70' }]
            }
          ]
        }
      ]
    })
  })
) as jest.Mock;

describe('BalanceSheet', () => {
  it('fetches and displays report data', async () => {
    render(<BalanceSheet />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText('Bank')).toBeInTheDocument()
    );

    expect(screen.getByText('126.70')).toBeInTheDocument();
  });
});
