use anchor_lang::prelude::*;
pub mod constant;
pub mod states;
use crate::{constant::* , states::*};
declare_id!("2sg5c4c65udAkahm9uFBUyMk6xe9DRZ8c9VqDD6qUHEy");

const USER_NAME_LENGTH :usize = 100;
const USER_PROFILE_URL : usize = 225;
const PROPERTY_TITLE : usize = 225;
const PROPERTY_DESCRIPTION : usize = 225;
const VIDEO_URL : usize = 225;
const PRROPERTY_FIRST_IMG : usize = 225;
const PROPERTY_SECOND_IMG : usize = 225;
const PROPERTY_THIRD_IMG : usize = 225;
const PROPERTY_FOURTH_IMG : usize = 225;
const PROPERTY_FIFTH_IMG : usize = 225;

#[program]
pub mod property { 
    use super::*;

    pub fn initialize_seller(
        ctx : Context<InitializeSeller>,
        name : String,
        profile_url : String,
    ) ->  Result<()> {
        let seller_account = &mut ctx.accounts.seller_account;
        seller_account.authority = ctx.accounts.authority.key();
        seller_account.name  = name;
        seller_account.profile_url = profile_url;
        seller_account.property_index = 0;

        Ok(())
    }

    pub fn initialize_buyer(
        ctx : Context<InitializeBuyer>,
        name : String,
        profile_url : String,
    ) -> Result<()>{
        let buyer_account = &mut ctx.accounts.buyer_account;
        buyer_account.authority = ctx.accounts.authority.key();
        buyer_account.name = name;
        buyer_account.profile_url = profile_url;

        Ok(())
    }

    pub fn list_property (
        ctx : Context<ListProperty>,
        property_title : String,
        property_description : String,
        property_price : u8,
        video_url : String,
        property_first_img: String,
        property_second_img : String,
        property_third_img: String,
        property_fourth_img : String,
        property_fifth_img : String
    )  -> Result<()> {
        
        let seller_account  = &mut ctx.accounts.seller_account;
        let property_account = &mut ctx.accounts.property_account;
        property_account.authority = ctx.accounts.authority.key();
        property_account.property_title = property_title;
        property_account.property_description  = property_description;
        property_account.property_index = seller_account.property_index;
        property_account.property_price = property_price;
        property_account.video_url =video_url ;
        property_account.property_first_img =property_first_img ;
        property_account.property_second_img = property_second_img;
        property_account.property_third_img =property_third_img ;
        property_account.property_fourth_img = property_fourth_img;
        property_account.property_fifth_img = property_fifth_img;

        seller_account.property_index = seller_account.property_index
        .checked_add(1)
        .unwrap();

        Ok(())
    }

    pub fn update_property(
        ctx : Context<UpdateProperty>,
        property_index : u8,
        property_title : String,
        property_description : String,
        property_price : u8,
        video_url : String,
        property_first_img: String,
        property_second_img : String,
        property_third_img: String,
        property_fourth_img : String,
        property_fifth_img : String
    ) -> Result<()> {
        let property_account = &mut ctx.accounts.property_account;
        property_account.authority = ctx.accounts.authority.key();
        property_account.property_title = property_title;
        property_account.property_description  = property_description;
        property_account.property_price = property_price;
        property_account.video_url =video_url ;
        property_account.property_first_img =property_first_img ;
        property_account.property_second_img = property_second_img;
        property_account.property_third_img =property_third_img ;
        property_account.property_fourth_img = property_fourth_img;
        property_account.property_fifth_img = property_fifth_img;

        Ok(())
    }

    pub fn remove_property(
        ctx:Context<RemoveProperty>,
        property_index : u8,
    ) -> Result<()> {
        Ok(())
    }

    
}

#[derive(Accounts)]
#[instruction()]
pub struct InitializeSeller<'info>{
    #[account(
        init,
        seeds = [SELLER_TAG , authority.key().as_ref()],
        bump,
        payer = authority,
        space = std::mem::size_of::<SellerAccount>() +USER_NAME_LENGTH + USER_PROFILE_URL + 8,
    )]
    pub  seller_account : Box<Account<'info , SellerAccount>>,

    #[account(mut)]
    pub  authority : Signer<'info>,

    pub system_program : Program<'info , System>,
}

#[derive(Accounts)]
#[instruction()]

pub struct InitializeBuyer<'info>{
    #[account(
        init,
        seeds = [BUYER_TAG , authority.key().as_ref()],
        bump,
        payer = authority,
        space = std::mem::size_of::<BuyerAccount>() + USER_NAME_LENGTH + USER_PROFILE_URL + 8,
    )]

    pub buyer_account : Box<Account<'info , BuyerAccount>>,

    #[account(mut)]

    pub authority : Signer<'info>,

    pub system_program : Program<'info , System>,
}

#[derive(Accounts)]
#[instruction()]

pub struct ListProperty<'info>{
    
    #[account(
        mut,
        seeds = [PROPERTY_TAG, authority.key().as_ref()],
        bump,
        has_one = authority
    )]
    
    pub seller_account : Box<Account<'info , SellerAccount>>,

    #[account(
        init,
        seeds = [PROPERTY_TAG , authority.key().as_ref() , &[seller_account.property_index as u8].as_ref()],
        bump,
        payer = authority,
        space = std::mem::size_of::<PropertyAccount>() +PROPERTY_TITLE + PROPERTY_DESCRIPTION + VIDEO_URL + PRROPERTY_FIRST_IMG + PROPERTY_SECOND_IMG + PROPERTY_THIRD_IMG + PROPERTY_FOURTH_IMG + PROPERTY_FIFTH_IMG +8,
    )]

    pub property_account : Box<Account<'info , PropertyAccount>>,

    #[account(mut)]
    pub authority : Signer<'info>,

    pub system_program : Program<'info , System>,
}

#[derive(Accounts)]
#[instruction(property_index : u8)]

pub struct UpdateProperty<'info>{
     #[account(
         mut,
         seeds = [PROPERTY_TAG , authority.key().as_ref() , &[property_index].as_ref()],
         bump,
         has_one = authority
     )]

    pub property_account : Box<Account<'info , PropertyAccount>>,

    #[account(mut)]

    pub authority : Signer<'info>,

    pub system_program : Program<'info , System>,
}

#[derive(Accounts)]
#[instruction(property_index : u8)]
pub struct RemoveProperty<'info>{
    #[account(
        mut,
        seeds = [SELLER_TAG , authority.key().as_ref()],
        bump,
        has_one = authority
    )]

    pub seller_account : Box<Account<'info , SellerAccount>>,

    #[account(
        mut,
        close = authority,
        seeds = [PROPERTY_TAG , authority.key().as_ref(), &[property_index].as_ref()],
        bump,
        has_one = authority,
    )]

    pub property_account : Box<Account<'info , PropertyAccount>>,

    #[account(mut)]
    
    pub authority : Signer<'info>,

    pub system_program : Program<'info , System>,
}
