import {Product ,ProductModel } from "../../models/Product";

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

      it('create method should add a product', async () => {
        const result = await ProductModel.create({
          name:"firstproduct",
          price:25
        });
        expect(result).toEqual({
          id: result.id,
          name:"firstproduct",
          price:25
        });
      });
    
      it('Get All Products', async () => {
        const products = await ProductModel.index();
        expect(products.length).toBe(1);
      });
    
      it('show method should return the correct product', async () => {
        const result = await ProductModel.show('1');
        expect(result).toEqual({
          id: 1,
          name:"firstproduct",
          price:25
        });
      });
    
})