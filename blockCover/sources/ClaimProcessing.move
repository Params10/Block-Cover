address 0x2 {
module ClaimsProcessing {
    use sui::object::{Self, UID, new};
   use sui::tx_context;
 // Assuming `object` contains the functions you need

   use 0x5::PolicyManagement::{InsurancePolicy};
   use 0x3::LiquidityPool as lp;
 // Update this path according to your actual module address
    const FILED: u8 = 0;
    const UNDER_REVIEW: u8 = 1;
    const APPROVED: u8 = 2;
    const DENIED: u8 = 3;

    struct Claim has key, store {
        id: UID,
        policy_id: UID,
        description: vector<u8>,
        status: u8,
        assessment_amount: u64,
    }

    // Function to file a new claim
    public fun file_claim(ctx: &mut tx_context::TxContext, policy_id: UID, description: vector<u8>) {
        let claim_id = new(ctx);
        let claim = Claim {
            id: claim_id,
            policy_id,
            description,
            status: FILED,
            assessment_amount: 0,
        };
        // Specify the address of the claims processor or reviewer
        //--------------- add address here
      // let claims_processor_address: address =0xf821d3483fc7725ebafaa5a3d12373d49901bdfce1484f219daa7066a30df77d;

        // Transfer the claim object to the claims processor
       // sui::transfer::transfer(claim, claims_processor_address);
    }

    // Function to update the status of a claim (for reviewers)
    public fun update_claim_status(ctx: &mut tx_context::TxContext, claim_id: UID, new_status: u8, assessment_amount: u64) {
        let reviewer = tx_context::sender(ctx);
        let claim: &mut Claim=  Claim::borrow_mut( &mut claim_id);
        claim.status = new_status;
        if (new_status == APPROVED) {
            claim.assessment_amount = assessment_amount;
            // Trigger payout upon claim approval, no need to specify LiquidityPool UID anymore
          lp::disburse_funds(ctx, claim.policyholder, assessment_amount);

        }
    }
    // Example function to illustrate claim filing
    #[test]
    public fun test_file_claim() {
        use sui::test_scenario::dummy;

        let ctx = dummy();
        let policy_id = UID::new(); // Assuming a valid UID for demonstration
        let description = b"Phone screen cracked".to_vec();

        file_claim(&mut ctx, policy_id, description);
    }
}
}
