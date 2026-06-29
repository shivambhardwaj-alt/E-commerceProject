// const making schema for the category collection page here i will get array of products and make the request worth it 

import { response } from "express";

const makeProducts = (products) => { 
    const res = [];
    products.forEach((product,inndex) => {
        let tempProduct = {}
        tempProduct.variantId = product.variants[0]._id;
        tempProduct._id = product._id;
        tempProduct.name = product.name;
        tempProduct.brand = product.brand;
        tempProduct.pricing = product.pricing;
        tempProduct.image = product.variants[0].image.length > 0 && product.variants[0].image[0];
        tempProduct.size = product.variants[0].size;
        tempProduct.ratings = product.ratings;
        tempProduct.bestSeller = product.bestSeller;
        tempProduct.featured = product.featured;
        tempProduct.newArrival = product.newArrival;
        tempProduct.slug = product.slug;
        tempProduct.freeShipping = product.shipping.freeShipping;
        tempProduct.stock = product?.variants[0]?.stock;
        
        


        res.push(tempProduct);
    })

    return res;
}


// will process data for the related products for frontend homepage 
const generateProductRelatedProducts = (products) => {
    const res = [];


    products.forEach((item,index) => {
        let temp =  {};
        temp.name = item.name;
        temp.brand = item.brand;
        temp.pricing = item.pricing;
        temp.image = item.variants[0].image[0];
        temp.slug = item.slug;
        temp.size = item.variants[0].size;
        temp.color = item.variants[0].color;
        temp.variantId = item.variants[0]._id;
        temp._id = item._id;
        res.push(temp);
    })
    return res;

}


const generateWishListProducts  = (products) => {

    const res = [] ;

    products.forEach((product,index) => {
        let temp = {} ;
        temp.productId = product._id;
        temp.variantId  = product.variants[0]._id;
        temp.image = product.variants[0].image[0];
        temp.slug = product.slug;
        temp.pricing = product.pricing;
        temp.ratings = product.ratings;
        temp.name = product.name;
        temp.collectionType  = product.collection;
        temp.size = product.variants[0].size;
        temp.color = product.variants[0].color;;
        res.push(temp);
    });


    return res;




}

export {makeProducts ,generateProductRelatedProducts ,generateWishListProducts};