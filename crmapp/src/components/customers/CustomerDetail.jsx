import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import LeadForm from '../leads/LeadForm';
import LeadList from '../leads/LeadList';
import api from '../../services/api';

const CustomerDetail = () => {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [editingLead, setEditingLead] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchCustomer();
    fetchLeads();
  }, [id, statusFilter]);

  const fetchCustomer = async () => {
    try {
      const response = await api.get(`/customers/${id}`);
      setCustomer(response.data);
    } catch (error) {
      console.error('Error fetching customer:', error);
    }
  };

  const fetchLeads = async () => {
    try {
      const response = await api.get(`/leads/customer/${id}?status=${statusFilter}`);
      setLeads(response.data);
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddLead = () => {
    setEditingLead(null);
    setShowLeadForm(true);
  };

  const handleEditLead = (lead) => {
    setEditingLead(lead);
    setShowLeadForm(true);
  };

  const handleDeleteLead = async (leadId) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        await api.delete(`/leads/${leadId}`);
        fetchLeads();
      } catch (error) {
        console.error('Error deleting lead:', error);
      }
    }
  };

  const handleLeadFormClose = () => {
    setShowLeadForm(false);
    setEditingLead(null);
    fetchLeads();
  };

  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  if (loading && !customer) {
    return <div className="loading">Loading customer details...</div>;
  }

  if (!customer) {
    return (
      <div className="card">
        <p>Customer not found.</p>
        <Link to="/dashboard" className="btn btn-primary">
          Back to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <Link to="/dashboard" className="btn btn-secondary">
          ← Back to Dashboard
        </Link>
        <h1 className="card-title">Customer Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="card">
          <h2 className="card-title mb-4">Customer Information</h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Company:</strong> {customer.company}</p>
          </div>
        </div>

        <div className="card">
          <h2 className="card-title mb-4">Lead Summary</h2>
          <div className="space-y-2">
            <p><strong>Total Leads:</strong> {leads.length}</p>
            <p><strong>New:</strong> {leads.filter(l => l.status === 'New').length}</p>
            <p><strong>Contacted:</strong> {leads.filter(l => l.status === 'Contacted').length}</p>
            <p><strong>Converted:</strong> {leads.filter(l => l.status === 'Converted').length}</p>
            <p><strong>Lost:</strong> {leads.filter(l => l.status === 'Lost').length}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="flex items-center justify-between">
            <h2 className="card-title">Leads</h2>
            <button
              onClick={handleAddLead}
              className="btn btn-primary"
            >
              Add Lead
            </button>
          </div>
        </div>

        <div className="mb-4">
          <select
            value={statusFilter}
            onChange={handleStatusFilterChange}
            className="form-select"
            style={{ maxWidth: '200px' }}
          >
            <option value="all">All Statuses</option>
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Converted">Converted</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <LeadList
          leads={leads}
          onEdit={handleEditLead}
          onDelete={handleDeleteLead}
        />
      </div>

      {showLeadForm && (
        <LeadForm
          lead={editingLead}
          customerId={id}
          onClose={handleLeadFormClose}
        />
      )}
    </div>
  );
};

export default CustomerDetail;