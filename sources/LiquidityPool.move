module blockcover::LiquidityPool {
    use sui::object::{Self, UID, new};
    use sui::tx_context::TxContext;
    use sui::coin::{Self as Coin, deposit, withdraw};

    struct Pool has key, store {
        id: UID,
        balance: u64,
    }

    // Initialize a new liquidity pool
   public(entry) fun initialize_pool(ctx: &mut TxContext) -> UID {
    let pool_id = new(ctx);
    let pool = Pool {
        id: pool_id,
        balance: 0,
    };
    // Save the pool to global storage
    sui::object::move_to(ctx, pool); // This line saves the pool object under the transaction sender's address
    pool_id
}

    // Function to add premiums to the pool
    public fun add_premium(ctx: &mut TxContext, pool_id: UID, amount: u64) {
        let sender = tx_context::sender(ctx);
        let mut pool: &mut Pool = sui::object::borrow_global_mut<Pool>(pool_id, &sender);
        // Logic to deposit coins into the pool
        deposit(&mut pool.balance, amount);
    }

    // Function to disburse funds from the pool for approved claims
public fun disburse_funds(ctx: &mut TxContext, pool_id: UID, recipient: address, amount: u64) {
    let pool_owner = tx_context::sender(ctx);
    let mut pool: &mut Pool = sui::object::borrow_global_mut<Pool>(pool_id, &pool_owner);
    // Verify sufficient balance
    assert!(pool.balance >= amount, 1001 /* Error code for insufficient funds */);

    // Reduce the pool's balance by the amount to be disbursed
    pool.balance -= amount;

    // Logic to transfer the specified amount to the recipient
    let coin = Coin::withdraw(&mut pool.balance, amount);
    Coin::deposit(recipient, coin);
}

    // Function to view the current balance of the liquidity pool
    public fun view_balance(pool_id: UID): u64 {
        let pool: &Pool = sui::object::borrow_global<Pool>(pool_id, &/* Pool Owner's Address */);
        pool.balance
    }

    // Additional administrative functions to manage the pool could be added here

    // Example and test functions for module verification and demonstration

}
