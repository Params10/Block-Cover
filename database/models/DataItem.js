const mongoose = require('mongoose');

const InsurancePolicySchema = new mongoose.Schema({
 makeModel: {
    brand: { type: String, required: true },
    model: { type: String, required: true },
 },
 imeiNumber: { type: String, required: true },
 yearBought: { type: String, required: true },
 ownerName: { type: String, required: true },
 ownerAddress: { type: String, required: true },
 coverageAmount: { type: Number, required: true },
});

const InsurancePolicy = mongoose.model('InsurancePolicy', InsurancePolicySchema);


module.exports = InsurancePolicy;
