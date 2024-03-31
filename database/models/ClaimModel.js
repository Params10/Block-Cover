const mongoose = require('mongoose');

const { Schema } = mongoose;

const ClaimSchema = new Schema({
 policyDetails: {
    type: Schema.Types.ObjectId,
    ref: 'InsurancePolicy', // Assuming you have an InsurancePolicy model
    required: true,
 },
 claimReason: {
    type: String,
    enum: ['stolen', 'damaged'],
    required: true,
 },
 claimImage: {
    type: String, // Assuming the image is stored as a URL or file path
    required: true,
 },
 createdAt: {
    type: Date,
    default: Date.now,
 },
});

const Claim = mongoose.model('Claim', ClaimSchema);

module.exports = Claim;
