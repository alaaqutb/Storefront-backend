import { ProductModel } from "../../models/Product";

describe('Product', ()=> {
    it('index should be defined', () => {
        expect(ProductModel.index).toBeDefined();
      });

      it('show should be defined', () => {
        expect(ProductModel.show).toBeDefined();
      });

      it('create should be defined', () => {
        expect(ProductModel.create).toBeDefined();
      });
    
      it('Get All Products', async () => {
        await ProductModel.create({
          name:"firstproduct",
          price:25
        });
        const products = await ProductModel.index();
        expect(products.length).toBeGreaterThan(0);
      });    
});