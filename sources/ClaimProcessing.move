module blockcover::ClaimsProcessing {
    use sui::object::{Self, UID, new};
    use sui::tx_context::TxContext;
    use 0x2::PolicyManagement::{InsurancePolicy};
    use std::vector::Vector;

    struct Claim has key, store {
        id: UID,
        policy_id: UID,
        description: Vector<u8>,
        status: ClaimStatus,
        assessment_amount: u64,
    }

    public enum ClaimStatus {
        Filed,
        UnderReview,
        Approved,
        Denied,
    }

    // Function to file a new claim
public(entry) fun file_claim(ctx: &mut TxContext, policy_id: UID, description: Vector<u8>) {
    let claim_id = new(ctx);
    let claim = Claim {
        id: claim_id,
        policy_id,
        description,
        status: ClaimStatus::Filed,
        assessment_amount: 0,
    };
    // Assume 'claims_processor_address' is the address of the dedicated claims processor or reviewer
    let claims_processor_address = /* address of the claims processor */;

    // Transfer the claim object to the claims processor
    sui::transfer::transfer(claim, claims_processor_address);
}


    // Function to update the status of a claim (for reviewers)
public fun update_claim_status(ctx: &mut TxContext, claim_id: UID, new_status: ClaimStatus, assessment_amount: u64) {
    let reviewer = tx_context::sender(ctx); // Assumed to be the claim reviewer
    let mut claim: &mut Claim = sui::object::borrow_global_mut<Claim>(claim_id, &reviewer);
    claim.status = new_status;
    if (new_status == ClaimStatus::Approved) {
        claim.assessment_amount = assessment_amount;
        // Triggering payout upon claim approval
        PaymentGateway::disburse_funds(ctx, /* LiquidityPool UID */, claim.policyholder, assessment_amount);
    }
}

    // Example function to illustrate claim filing
    #[test]
    public fun test_file_claim() {
        use sui::test_scenario;

        let ctx = test_scenario::dummy();
        let policy_id = UID::new(); // Assuming a valid UID for demonstration
        let description = b"Phone screen cracked".to_vec();

        file_claim(&mut ctx, policy_id, description);
    }
}
