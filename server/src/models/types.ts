import type { AuthDB } from "types/auth";
import type {
  CartType,
  CategoryPostsType,
  CommentPostType,
  CommentType,
  ImageProductType,
  OrderDetailType,
  OrderType,
  PaymentType,
  PositionType,
  PostsType,
  ProductType,
  SaleDetailType,
  SaleType,
  StaffType,
  TypeDetail,
  TypeProduct,
  UserAddressType,
  UserType,
  WarehouseType,
} from "types/types";

export interface Database {
  carts: CartType;
  comments: CommentType;
  commentPost:CommentPostType,
  imageProduct: ImageProductType;
  auth: AuthDB;
  posts: PostsType;
  typePost:CategoryPostsType;
  payment:PaymentType;
  products: ProductType;
  sale: SaleType;
  saleDetail: SaleDetailType;

  order: OrderType;
  order_Detail: OrderDetailType;

  type: TypeProduct;
  typedetail: TypeDetail;
  userAddress: UserAddressType;
  users: UserType;
  staff:StaffType;
  position:PositionType;
  warehouse: WarehouseType;
  [anyTable: string]: any;
}

