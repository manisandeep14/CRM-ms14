const express = require('express');
const Lead = require('../models/Lead');
const Customer = require('../models/Customer');
const auth = require('../middleware/auth');

const router = express.Router();

// Get leads for a customer
router.get('/customer/:customerId', auth, async (req, res) => {
  try {
    // Verify customer belongs to user
    const customer = await Customer.findOne({ 
      _id: req.params.customerId, 
      ownerId: req.user._id 
    });
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const status = req.query.status;
    let query = { customerId: req.params.customerId };
    
    if (status && status !== 'all') {
      query.status = status;
    }

    const leads = await Lead.find(query).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create lead
router.post('/', auth, async (req, res) => {
  try {
    const { customerId, title, description, status, value } = req.body;

    // Verify customer belongs to user
    const customer = await Customer.findOne({ 
      _id: customerId, 
      ownerId: req.user._id 
    });
    
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const lead = new Lead({
      customerId,
      title,
      description,
      status: status || 'New',
      value: value || 0
    });

    await lead.save();
    res.status(201).json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update lead
router.put('/:id', auth, async (req, res) => {
  try {
    const { title, description, status, value } = req.body;

    const lead = await Lead.findById(req.params.id).populate('customerId');
    
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Check if user owns the customer
    if (lead.customerId.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    lead.title = title;
    lead.description = description;
    lead.status = status;
    lead.value = value;

    await lead.save();
    res.json(lead);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete lead
router.delete('/:id', auth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id).populate('customerId');
    
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    // Check if user owns the customer
    if (lead.customerId.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await Lead.findByIdAndDelete(req.params.id);
    res.json({ message: 'Lead deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;