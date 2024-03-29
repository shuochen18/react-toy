import React from 'react';
import {Grid} from '@material-ui/core';
import Product from './Product/Product';
import useStyles from './styles';

// const products = [
//     {id:1, name:'Shoes', description:'Running shoes.',price:'$5',image:'https://images.timberland.com/is/image/TimberlandEU/A2AMM100-hero?wid=720&hei=720&fit=constrain,1&qlt=85,1&op_usm=1,1,6,0'},
//     {id:2, name:'Macbook', description:'Apple macbook',price:'$10',image:'https://mresell.se/wp-content/uploads/2019/09/macbook-12-mid-2017-space-gray-300x300.jpg'},
// ]

const Products = ({products, onAddToCart})=>{
    const classes = useStyles();
    return (
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Grid container justify="center" spacing={4}>
                {
                products.map((product)=>(
                    <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                        <Product product={product} onAddToCart={onAddToCart} />
                    </Grid>
                ))
                }
            </Grid>

        </main>
    )

}

export default Products;