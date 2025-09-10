import React from 'react';

const LeadList = ({ leads, onEdit, onDelete }) => {
  const getStatusBadgeClass = (status) => {
    const classes = {
      'New': 'status-badge status-new',
      'Contacted': 'status-badge status-contacted',
      'Converted': 'status-badge status-converted',
      'Lost': 'status-badge status-lost'
    };
    return classes[status] || 'status-badge';
  };

  if (leads.length === 0) {
    return (
      <div className="card">
        <p>No leads found for this customer. Add a lead to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {leads.map(lead => (
        <div key={lead._id} className="card">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-1">
              <h3 className="card-title">{lead.title}</h3>
              <p className="mb-2" style={{ color: '#718096' }}>{lead.description}</p>
              <div className="flex items-center gap-4">
                <span className={getStatusBadgeClass(lead.status)}>
                  {lead.status}
                </span>
                <span><strong>Value:</strong> ${lead.value?.toLocaleString() || 0}</span>
                <span style={{ color: '#718096', fontSize: '0.875rem' }}>
                  Created: {new Date(lead.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(lead)}
                className="btn btn-secondary btn-sm"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(lead._id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadList;