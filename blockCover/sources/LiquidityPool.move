address 0x3 {
module LiquidityPool {
    use sui::object::{Self, UID, new};
    use sui::tx_context::TxContext;
    use sui::coin::{Coin, mint, from_balance, into_balance};
    use sui::transfer::{self};
    use sui::balance::Balance;

    struct Pool has key, store {
        balance: Balance<Coin>,
    }

    entry fun initialize_pool(ctx: &mut TxContext) {
        let initial_balance: Balance<Coin> = Balance::new(); // Assuming a Balance::new() or equivalent initialization
        let pool = Pool {
            balance: initial_balance,
        };
        sui::object::move_to(ctx, pool);
    }

    public fun add_premium(ctx: &mut TxContext, amount: u64) {
        let mut pool: &mut Pool = sui::object::borrow_global_mut<Pool>(sui::object::address(ctx));
        let premium_coin = Coin::mint(amount, ctx); // Mint coins equivalent to the premium amount
        Balance::put(&mut pool.balance, premium_coin); // Add the minted coins to the pool's balance
    }

  public fun disburse_funds(ctx: &mut TxContext, recipient: address, amount: u64) {
        let mut pool: &mut Pool = sui::object::borrow_global_mut<Pool>(sui::object::address(ctx));
        let disbursed_coin: Coin = Balance::take(&mut pool.balance, amount, ctx); // Take coins equivalent to the disbursal amount from the pool
        transfer::public_transfer(disbursed_coin, recipient); // Transfer the coins to the recipient
    }
}
}
