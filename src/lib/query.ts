export const PRODUCT_QUERY = `
query{
	products{
    data{
      attributes{
        title
        description
        slug
        price
        image {
          data {
            attributes {
              formats
            }
          }
        }
      }
    }
  }
}
`;

export const GET_PRODUCT_DETAILS_QUERY = `
  query getProductDetails($slug: String!){
    products(filters: {slug: {eq: $slug}}){
      data{
        attributes{
          title,
          description,
          slug,
          price,
          image {
            data {
              attributes {
                formats
              }
            }
          }
        }
      }
    }
  }
`;
