export interface Product {
  id: number;
  attributes: {
    description: string;
    price: number;
    slug: string;
    title: string;
    __typename: string;
    image: {
      data: {
        attributes: {
          formats: {
            large: ProductImageFormat;
            medium: ProductImageFormat;
            small: ProductImageFormat;
            thumbnail: ProductImageFormat;
          };
        };
      };
    };
  };
}

type ProductImageFormat = {
  ext: string;
  hash: string;
  url: string;
  name: string;
  height: number;
  size: number;
  width: number;
  mime: string;
};
