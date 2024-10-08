import express from 'express'

const app = express()

app.get('/api/products', (req, res) => {
    const products = [
        {
            id: 1,
            name: 'phone case',
            price: 150,
            image: 'https://example.com/images/phonecase.jpg'
        },
        {
            id: 2,
            name: 'laptop cover',
            price: 500,
            image: 'https://example.com/images/laptopcover.jpg'
        },
        {
            id: 3,
            name: 'tablet holder',
            price: 300,
            image: 'https://example.com/images/tabletholder.jpg'
        },
        {
            id: 4,
            name: 'earphone case',
            price: 100,
            image: 'https://example.com/images/earphonecase.jpg'
        },
        {
            id: 5,
            name: 'mouse pad',
            price: 200,
            image: 'https://example.com/images/mousepad.jpg'
        }
    ]

    //to send these data , use this syntax
    // res.send(products)
    //this is ok but we want to take data on basis of some search query , we dont want all data from api 

    //http://localhost:3000/api/products?search=metal
    // req.query.search basically search for any thing write after search= .............. in the url
    if(req.query.search){
        const filterProduct = products.filter(product => product.name.includes(req.query.search))
        res.send(filterProduct)
        return;
    }

    setTimeout(() => {
        res.send(products)
    }, 3000);

})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})
