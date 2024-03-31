module blockcover:: PolicyManagement {
    use sui::object::{Self, UID, new};
    use sui::transfer;
    use sui::tx_context::TxContext;
    use std::vector::Vector;

    struct InsurancePolicy has key, store {
        id: UID,
        policyholder: address,
        item_description: Vector<u8>,
        coverage_amount: u64,
        premium_amount: u64,
    }

    // Function to create a new insurance policy
    public(entry) fun create_policy(ctx: &mut TxContext, policyholder: address, item_description: Vector<u8>, coverage_amount: u64, premium_amount: u64) {
        let policy_id = new(ctx);
        let policy = InsurancePolicy {
            id: policy_id,
            policyholder,
            item_description,
            coverage_amount,
            premium_amount,
        };
        transfer::transfer(policy, policyholder);
    }

    // Function to update policy details (example: change in coverage amount or item description)
    public fun update_policy(ctx: &mut TxContext, policy_id: UID, new_coverage_amount: u64, new_item_description: Vector<u8>) {
        let mut policy: &mut InsurancePolicy = sui::object::borrow_global_mut<InsurancePolicy>(policy_id, &tx_context::sender(ctx));
        policy.coverage_amount = new_coverage_amount;
        policy.item_description = new_item_description;
    }

    // Function to calculate and update the premium amount based on the coverage amount
    // This is a placeholder for the actual premium calculation logic
    public fun calculate_premium(policy_id: UID, coverage_amount: u64) {
        let policy_address = tx_context::sender(ctx);
        let mut policy: &mut InsurancePolicy = sui::object::borrow_global_mut<InsurancePolicy>(policy_id, &policy_address);
        let premium_amount = coverage_amount * 5 / 100; // Example calculation: 5% of coverage amount
        policy.premium_amount = premium_amount;
    }

    // Function to list all policies for a given policyholder
    // This functionality requires additional implementation details for storing and retrieving user-specific policies

    // Example test function to demonstrate how you might create a policy
    #[test]
    public fun test_create_policy() {
        use sui::test_scenario;

        let ctx = test_scenario::dummy();
        let policyholder = @0x1;
        let item_description = b"Laptop".to_vec();
        let coverage_amount = 1000; // Example coverage amount
        let premium_amount = 50; // Example premium amount calculated based on coverage

        create_policy(&mut ctx, policyholder, item_description, coverage_amount, premium_amount);
    }
}

