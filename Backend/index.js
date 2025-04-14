import express from 'express'
import sales from './routes/salesRoute.js'
import purchase from './routes/purchaseRoute.js'
import supplier from './routes/supplierRoute.js'
import unit from './routes/unitRoute.js'
import category from './routes/catergoryRoutes.js'
import product from './routes/productRoute.js'

const app = express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.json({msg:"Welcome to MartGuide"});
})
app.use('/sales',sales);
app.use('/purchases',purchase);
app.use('/category',category);
app.use('/product',product);
app.use('/unit',unit);
app.use('/supplier',supplier);
app.listen(3000,()=>console.log('Server is online'));