const db = require('../db/connection');

exports.runSimulation = async (policyDetails) => {
  // Mock simulation logic
  const outcome = policyDetails.includes('tax') ? 'High Impact' : 'Low Impact';
  return outcome;
};
