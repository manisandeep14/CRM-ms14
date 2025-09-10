import React from 'react';
import { Link } from 'react-router-dom';

const CustomerList = ({ customers, onEdit, onDelete }) => {
  if (customers.length === 0) {
    return (
      <div className="card">
        <p>No customers found. Add your first customer to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {customers.map(customer => (
        <div key={customer._id} className="card">
          <div className="flex items-center justify-between mb-2">
            <h3 className="card-title">{customer.name}</h3>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(customer)}
                className="btn btn-secondary btn-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(customer._id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
          
          <div className="mb-2">
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Company:</strong> {customer.company}</p>
          </div>
          
          <Link 
            to={`/customer/${customer._id}`}
            className="btn btn-primary btn-sm"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CustomerList;