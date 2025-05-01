import React, { useState } from 'react';
import moment from 'moment';

const MovieTable = ({ movies = [], onDelete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const totalPages = Math.ceil(movies.length / pageSize);
  
  const handleDelete = (id) => {
    if (onDelete) onDelete(id);
  };
  
  const handleEdit = (movie) => {
    if (onEdit) onEdit(movie);
  };
  
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  
  const paginatedMovies = movies.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Table Header */}
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Movies List</h2>
      </div>
      
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Poster
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-10 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Duration
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Genre
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Language
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Release Date
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedMovies.map((movie, index) => (
              <tr key={movie._id || index} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap align-middle">
                  <div className="flex items-center justify-center">
                    <img 
                      src={movie.poster} 
                      alt={`${movie.title} poster`} 
                      className="h-24 w-16 object-cover rounded shadow-sm"
                    />
                  </div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <div className="text-sm font-medium text-gray-900 text-center">{movie.title}</div>
                </td>
                <td className="px-6 py-4 align-middle">
                  <div className="text-sm text-gray-500 max-w-xs text-center line-clamp-3">{movie.description}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap align-middle">
                  <div className="text-sm text-gray-500 text-center">{movie.duration}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap align-middle">
                  <div className="flex justify-center">
                    {movie.genre.map((val)=>
                    <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {val}
                    </span>)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap align-middle">
                  <div className="text-sm text-gray-500 text-center">{movie.language}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap align-middle">
                  <div className="text-sm text-gray-500 text-center">{moment(movie.releaseDate).format("DD-MM-YYYY")}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium align-middle">
                  <div className="flex items-center justify-center space-x-3">
                    <button 
                      className="text-red-600 hover:text-red-900 transition-colors"
                      onClick={() => handleDelete(movie._id)}
                    >
                      <i className="ri-delete-bin-line text-lg"></i>
                    </button>
                    <button 
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                      onClick={() => handleEdit(movie)}
                    >
                      <i className="ri-pencil-line text-lg"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            
            {paginatedMovies.length === 0 && (
              <tr>
                <td colSpan="8" className="px-6 py-10 text-center text-gray-500">
                  No movies found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Mobile Cards View */}
      <div className="md:hidden">
        {paginatedMovies.map((movie, index) => (
          <div key={movie._id || index} className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <img 
                  src={movie.poster} 
                  alt={`${movie.title} poster`} 
                  className="h-24 w-16 object-cover rounded shadow-sm mr-3"
                />
                <h3 className="font-medium text-gray-900">{movie.title}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  className="text-red-600 hover:text-red-900 transition-colors"
                  onClick={() => handleDelete(movie._id)}
                >
                  <i className="ri-delete-bin-line text-lg"></i>
                </button>
                <button 
                  className="text-blue-600 hover:text-blue-900 transition-colors"
                  onClick={() => handleEdit(movie)}
                >
                  <i className="ri-pencil-line text-lg"></i>
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">Genre:</div>
              <div className="font-medium">
                <span className="px-2 py-1 inline-flex text-xs leading-4 font-semibold rounded-full bg-blue-100 text-blue-800">
                  {movie.genre}
                </span>
              </div>
              
              <div className="text-gray-500">Duration:</div>
              <div className="font-medium">{movie.duration}</div>
              
              <div className="text-gray-500">Language:</div>
              <div className="font-medium">{movie.language}</div>
              
              <div className="text-gray-500">Release Date:</div>
              <div className="font-medium">{moment(movie.releaseDate).format("DD-MM-YYYY")}</div>
            </div>
            
            <div className="mt-3">
              <div className="text-gray-500 mb-1">Description:</div>
              <div className="text-sm text-gray-700">{movie.description}</div>
            </div>
          </div>
        ))}
        
        {paginatedMovies.length === 0 && (
          <div className="px-6 py-10 text-center text-gray-500">
            No movies found
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

export default MovieTable;