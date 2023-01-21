use anchor_lang::prelude::*;

#[account]
#[derive(Default)]
pub struct SellerAccount{
    pub authority : Pubkey,
    pub name : String,
    pub profile_url : String,
    pub property_index : u8,
    
}

#[account]
#[derive(Default)]

pub struct BuyerAccount {
    pub authority : Pubkey,
    pub name : String,
    pub profile_url : String,
}

#[account]
#[derive(Default)]

pub struct PropertyAccount {
    pub authority : Pubkey,
    pub property_title : String,
    pub property_description : String,
    pub property_price : u8,
    pub property_index : u8,
    pub video_url : String,
    pub property_first_img: String,
    pub property_second_img : String,
    pub property_third_img: String,
    pub property_fourth_img : String,
    pub property_fifth_img : String,
}