// DataTable.js

import React from 'react';
import { useTable, usePagination } from 'react-table';
//mport './DataTable.css'; // Import a separate CSS file for styles
import { CiSquareChevLeft,CiSquareChevRight } from "react-icons/ci";
const DataTable = ({ columns, data }) => {
  // const pageSize = data && data.length > 3 ? 3 : 1;
  const pageSize = 3;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex },
    previousPage,
    nextPage, 
    canPreviousPage,
    canNextPage,
  } = useTable({ columns, data, initialState: { pageSize } }, usePagination);

  return (
    <div className="data-table-container">
      <table {...getTableProps()} className="data-table">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()} className="header-row">
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} className="data-row" >
                {row.cells.map(cell => (
                  <td {...cell.getCellProps()}>
                    {cell.column.id === 'customColumn' ? (
                      <div>
                        <span>Custom Content: </span>
                        {cell.render('Cell')}
                      </div>
                    ) : (
                      cell.render('Cell')
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className='pagination-container'>
        {/* <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          Previous
        </button> */}
        <div className='pagination-btn'>
        <CiSquareChevLeft color={canNextPage ? '#000000' : '#EBEBE4'} size={30} onClick={() => previousPage()} disabled={!canPreviousPage} cursor={!canNextPage && 'pointer'}/>
        </div>
        
        <span style={{display:'flex',alignItems:'center'}}>
          Page{' '}
          <strong>
            {pageIndex} of {page && page.length}
          </strong>{' '}
        </span>
        {/* <button onClick={() => nextPage()} disabled={!canNextPage}>
          Next
        </button> */}
        <div className='pagination-btn'>
        <CiSquareChevRight cursor={!canNextPage && 'pointer'} color={canNextPage ? '#000000' : '#EBEBE4'} size={30} onClick={() => nextPage()} disabled={!canNextPage}/>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
