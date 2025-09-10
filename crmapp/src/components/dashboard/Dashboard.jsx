import React, { useState, useEffect } from 'react';
import CustomerList from '../customers/CustomerList';
import CustomerForm from '../customers/CustomerForm';
import api from '../../services/api';

const Dashboard = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCustomers();
  }, [search, page]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/customers?search=${search}&page=${page}&limit=10`);
      setCustomers(response.data.customers);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const handleAddCustomer = () => {
    setEditingCustomer(null);
    setShowForm(true);
  };

  const handleEditCustomer = (customer) => {
    setEditingCustomer(customer);
    setShowForm(true);
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await api.delete(`/customers/${id}`);
        fetchCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingCustomer(null);
    fetchCustomers();
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="card-title">CRM Dashboard</h1>
        <button 
          onClick={handleAddCustomer}
          className="btn btn-primary"
        >
          Add Customer
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search customers..."
          value={search}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {loading ? (
        <div className="loading">Loading customers...</div>
      ) : (
        <>
          <CustomerList
            customers={customers}
            onEdit={handleEditCustomer}
            onDelete={handleDeleteCustomer}
          />
          
          {totalPages > 1 && (
            <div className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={page === pageNum ? 'active' : ''}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {showForm && (
        <CustomerForm
          customer={editingCustomer}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
};

export default Dashboard;