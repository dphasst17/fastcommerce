import {create} from "zustand";
import { CategoryProductType, ProductType } from "../types/types";

interface ProductStoreType {
  product: ProductType[] | null;
  category:CategoryProductType[] | null;
  setProduct: (product: ProductType[]) => void;
  setCategory: (product: CategoryProductType[]) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

export const productStore = create<ProductStoreType>((set:any) => ({
  product: null,
  category:null,
  setProduct: (product: ProductType[]) => set({ product }),
  setCategory: (category: CategoryProductType[]) => set({ category }),
  error: null,
  setError: (error: string | null) => set({ error }),
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
}));


