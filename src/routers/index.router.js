import { Router } from 'express';
import { ProductManager } from '../ProductManager.js';

const router = Router();
const classProducts = new ProductManager("./products.json")
const products = classProducts.getProductsPlain()
router.get('/', (req, res) => {
  res.render('home', products);
});


export default router;