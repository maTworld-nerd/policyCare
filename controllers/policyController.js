const policyModel = require('../models/policyModel');

exports.simulatePolicy = async (req, res) => {
  try {
    const result = await policyModel.runSimulation(req.body.policy);
    res.json({ outcome: result });
  } catch (error) {
    res.status(500).json({ error: 'Simulation failed' });
  }
};
