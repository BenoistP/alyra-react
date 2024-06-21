use anchor_lang::prelude::*;

// This is your program's public key and it will update
// automatically when you build the project.
declare_id!("4P6BrJrMbyBwsbfexDFtDJLnK7BjwgNVArvmjmbqm2hm");

#[program]
mod hello_anchor {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, data: u64, age: u16, taille: u8) -> Result<()> {
        ctx.accounts.new_account.data = data;
        ctx.accounts.new_account.age = age;
        ctx.accounts.new_account.taille = taille;

        msg!(
            "{} Changed data: {} , age: {}, taille: {}",
            id(),
            data,
            age,
            taille
        ); // Message will show up in the tx logs
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    // We must specify the space in order to initialize an account.
    // First 8 bytes are default account discriminator,
    // next 8 bytes come from NewAccount.data being type u64.
    // (u64 = 64 bits unsigned integer = 8 bytes)
    #[account(
        init_if_needed,
        payer = signer,
        space = 8 + NewAccount::INIT_SPACE,
        seeds = [b"account".as_ref(), signer.key().as_ref()],
        bump
    )]
    pub new_account: Account<'info, NewAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct NewAccount {
    data: u64,
    age: u16,
    taille: u8,
}

/*
#[program]
mod hello_anchor {
    use super::*;
    pub fn initialize(ctx: Context<Initialize>, data: u64, age: u16) -> Result<()> {
        ctx.accounts.new_account.data = data;
        ctx.accounts.new_account.age = age;

        msg!(
            "{} Changed data: {} , age: {}",
            id(),
            data,
            age
        ); // Message will show up in the tx logs
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    // We must specify the space in order to initialize an account.
    // First 8 bytes are default account discriminator,
    // next 8 bytes come from NewAccount.data being type u64.
    // (u64 = 64 bits unsigned integer = 8 bytes)
    #[account(
        init_if_needed,
        payer = signer,
        //space = 8 + 8,
        space = 8 + NewAccount::INIT_SPACE,
        seeds = [b"account".as_ref(), signer.key().as_ref()],
        bump
    )]
    pub new_account: Account<'info, NewAccount>,
    #[account(mut)]
    pub signer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct NewAccount {
    data: u64,
    age: u16
}
 */
