export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

export type IProductUpdate = Omit<IProduct, 'image'>

export type IProductCreate = Omit<IProduct, 'id'>

export const Categories = ['men\'s clothing', 'jewelery', 'electronics','women\'s clothing'] as const;
