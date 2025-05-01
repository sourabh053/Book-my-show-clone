import React, { useState } from 'react';

const TheatreApplyTable = ({ theatres = [], onDelete, onEdit, onShowsClick }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(theatres.length / pageSize);
  
  const handleDelete = (theatreId) => {
    if (onDelete) onDelete(theatreId);
  };
  
  const handleEdit = (theatre) => {
    if (onEdit) onEdit(theatre);
  };
  
  const handleShowsClick = (theatre) => {
    if (onShowsClick) onShowsClick(theatre);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const paginatedTheatres = theatres.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Theatres List</h2>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedTheatres.map((theatre, index) => (
              <tr key={theatre._id || index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 align-middle">
                  <div className="text-sm font-medium text-gray-900 text-center">{theatre.name}</div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <div className="text-sm text-gray-500 text-center">{theatre.address}</div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <div className="text-sm text-gray-500 text-center">{theatre.phone}</div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <div className="text-sm text-gray-500 text-center">{theatre.email}</div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <div className="flex justify-center">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      theatre.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {theatre.isActive ? "Approved" : "Pending / Blocked"}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <div className="flex items-center justify-center gap-3">
                    <i
                      className="ri-delete-bin-line cursor-pointer text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(theatre._id)}
                    ></i>
                    <i
                      className="ri-pencil-line cursor-pointer text-blue-600 hover:text-blue-800"
                      onClick={() => handleEdit(theatre)}
                    ></i>
                    {theatre.isActive && (
                      <span
                        className="underline text-blue-600 hover:text-blue-800 cursor-pointer"
                        onClick={() => handleShowsClick(theatre)}
                      >
                        Shows
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            
            {paginatedTheatres.length === 0 && (
              <tr>
                <td colSpan="6" className="px-6 py-10 text-center text-gray-500">
                  No theatres found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Cards View */}
      <div className="md:hidden">
        {paginatedTheatres.map((theatre, index) => (
          <div key={theatre._id || index} className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900 text-lg">{theatre.name}</h3>
              <span 
                className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                  theatre.isActive 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {theatre.isActive ? "Approved" : "Pending / Blocked"}
              </span>
            </div>
            
            <div className="grid grid-cols-1 gap-2 text-sm mb-3">
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <div className="text-gray-500">Address:</div>
                <div className="text-gray-800">{theatre.address}</div>
              </div>
              
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <div className="text-gray-500">Phone:</div>
                <div className="text-gray-800">{theatre.phone}</div>
              </div>
              
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <div className="text-gray-500">Email:</div>
                <div className="text-gray-800">{theatre.email}</div>
              </div>
            </div>
            
            <div className="flex justify-end gap-3 mt-3">
              <i
                className="ri-delete-bin-line cursor-pointer text-red-600 hover:text-red-800 text-lg"
                onClick={() => handleDelete(theatre._id)}
              ></i>
              <i
                className="ri-pencil-line cursor-pointer text-blue-600 hover:text-blue-800 text-lg"
                onClick={() => handleEdit(theatre)}
              ></i>
              {theatre.isActive && (
                <span
                  className="underline text-blue-600 hover:text-blue-800 cursor-pointer"
                  onClick={() => handleShowsClick(theatre)}
                >
                  Shows
                </span>
              )}
            </div>
          </div>
        ))}
        
        {paginatedTheatres.length === 0 && (
          <div className="px-6 py-10 text-center text-gray-500">
            No theatres found
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="flex-1 flex justify-between items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white ${
                currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <div className="text-sm text-gray-700">
              Page <span className="font-medium">{currentPage}</span> of{' '}
              <span className="font-medium">{totalPages}</span>
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white ${
                currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-50'
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TheatreApplyTable;