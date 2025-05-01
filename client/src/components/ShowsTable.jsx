import React, { useState } from 'react';
import moment from 'moment';

const ShowsTable = ({ shows = [], onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(shows.length / pageSize);
  
  const handleDelete = (showId) => {
    if (onDelete) onDelete(showId);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const paginatedShows = shows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  const calculateAvailableSeats = (totalSeats, bookedSeats) => {
    return totalSeats - (bookedSeats?.length || 0);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Shows List</h2>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Show Name
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Movie
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticket Price
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Seats
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Available Seats
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedShows.map((show, index) => (
              <tr key={show._id || index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 align-middle">
                  <div className="text-sm font-medium text-gray-900 text-center">{show.name}</div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <div className="text-sm text-gray-500 text-center">{moment(show.date).format("MMM Do YYYY")}</div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <div className="text-sm text-gray-500 text-center">{show.time}</div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <div className="text-sm text-gray-500 text-center">{show.movie.title}</div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <div className="text-sm text-gray-500 text-center">${show.ticketPrice}</div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <div className="text-sm text-gray-500 text-center">{show.totalSeats}</div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <div className="text-sm text-gray-500 text-center">
                    {calculateAvailableSeats(show.totalSeats, show.bookedSeats)}
                  </div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <div className="flex items-center justify-center">
                    {(show.bookedSeats?.length === 0) && (
                      <i
                        className="ri-delete-bin-line cursor-pointer text-red-600 hover:text-red-800"
                        onClick={() => handleDelete(show._id)}
                      ></i>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            
            {paginatedShows.length === 0 && (
              <tr>
                <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
                  No shows found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Cards View */}
      <div className="md:hidden">
        {paginatedShows.map((show, index) => (
          <div key={show._id || index} className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900 text-lg">{show.name}</h3>
              <div className="flex items-center">
                {(show.bookedSeats?.length === 0) && (
                  <i
                    className="ri-delete-bin-line cursor-pointer text-red-600 hover:text-red-800 text-lg"
                    onClick={() => handleDelete(show._id)}
                  ></i>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-2 text-sm mb-3">
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <div className="text-gray-500">Date:</div>
                <div className="text-gray-800">{moment(show.date).format("MMM Do YYYY")}</div>
              </div>
              
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <div className="text-gray-500">Time:</div>
                <div className="text-gray-800">{show.time}</div>
              </div>
              
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <div className="text-gray-500">Movie:</div>
                <div className="text-gray-800">{show.movie.title}</div>
              </div>
              
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <div className="text-gray-500">Ticket Price:</div>
                <div className="text-gray-800">${show.ticketPrice}</div>
              </div>
              
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <div className="text-gray-500">Total Seats:</div>
                <div className="text-gray-800">{show.totalSeats}</div>
              </div>
              
              <div className="flex justify-between items-center py-1 border-b border-gray-100">
                <div className="text-gray-500">Available Seats:</div>
                <div className="text-gray-800">
                  {calculateAvailableSeats(show.totalSeats, show.bookedSeats)}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {paginatedShows.length === 0 && (
          <div className="px-6 py-10 text-center text-gray-500">
            No shows found
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

export default ShowsTable;