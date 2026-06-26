// const making schema for the category collection page here i will get array of products and make the request worth it 

const makeProducts = (products) => { 
    const res = [];
    products.forEach((product,inndex) => {
        let tempProduct = {}
        tempProduct._id = product.variants[0]._id;
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
        


        res.push(tempProduct);
    })

    return res;
}

export {makeProducts};