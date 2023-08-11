import { callApi } from "@/api/config";
import { useProductDetailsStore } from "@/store/productDetails";
import { Carousel } from "flowbite-react";
import { ChevronLeftCircle, ChevronRightCircle, Undo2, X, XSquare } from "lucide-react";
import { useEffect, useState } from "react";

const ProductDetailsTab = () => {
  const productId = useProductDetailsStore((state) => state.productId);
  const [productDetails, setProductDetails] = useState<IProduct>();
  const setShowDetails = useProductDetailsStore(
    (state) => state.setShowDetails
  );
  useEffect(() => {
    if (productId === undefined) return;
    (async () => {
      const response = await callApi("singleproducts/" + productId);
      if (response.ok) {
        const singleProduct: { data: IProduct[] } = await response.json();
        setProductDetails(singleProduct.data[0]);
      }
    })();
    return () => {
      setShowDetails(false);
    };
  }, [productId, setShowDetails]);

  return (
   
    <div className="flex justify-between prod-detail-grid"> 
    
      <div>
      <div className="goback">
        <button  onClick={() => {
          setShowDetails(false);
        }}>
          <Undo2 className="icon-back"/> Go Back
        </button>
    
    </div>
        <div className="flex flex-col gap-2 justify-start items-start">
          <h2 className="text-2xl leading-6 font-semibold">
            {productDetails?.title}
          </h2>
          <p className="capitalize leading-8 p-1 border-b-2 text-slate-500 text-base">
            FINE PIERCINGS
          </p>
        </div>
        <div className="price-val">
        <p className="text-lg mt-4">
              ${productDetails?.variants[0]?.price} <span className="tax-val">Tax included.</span>
            </p>
           
        </div>
        <div className="flex flex-wrap items-start w-full galley-prod-detail">
          <div className="w-[360px] h-[300px] my-5">
            <Carousel
              leftControl={<ChevronLeftCircle />}
              rightControl={<ChevronRightCircle />}
            >
              {productDetails?.images.map((image) => (
                <img
                  key={image?.src}
                  src={image?.src}
                  // className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                  alt=""
                />
              ))}
            </Carousel>
          </div>
          <div className="w-full flex flex-col items-start">
            <h3 className="text-2xl font-semibold mb-4">Options</h3>
            <div className="flex gap-2 flex-wrap w-full thumb-prod">
              {productDetails?.variants.map((variant) => {
                // return <div key={variant.id}>{variant?.title}</div>;
                return (
                  <div
                    className="cursor-pointer thumb-prod-item"
                    onClick={() => {
                      console.log("variant", variant.id);
                    }}
                  >
                    <div className="prod-thumb-img">
                      <img
                      src={variant.mainImage}
                      alt=""
                      className="h-14 w-full object-cover border rounded-md "
                    />
                      </div>
                  
                    <span className="text-sm">{variant?.title}</span>
                  </div>
                );
              })}
            </div>
            
            <button
              className="px-4 py-2 bg-gray-900 text-white text-lg rounded-md btn-addcart"
              onClick={() => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                add_to_single_product(productDetails?.variants[0]?.id);
              }}
            >
              Add to cart
            </button>
          </div>
        </div>

        <div className="text-left desc-data-bottom">
          <h3
            className="text-
        xl"
          >
            Description
          </h3>
          <p
            className="text-left"
            dangerouslySetInnerHTML={{
              __html: productDetails?.body_html ?? "",
            }}
          ></p>
        </div>
      </div>

      {/* <button
        className="self-start"
        onClick={() => {
          setShowDetails(false);
        }}
      > */}
        
       
        {/* <XSquare size={24} /> */}
      {/* </button> */}
    </div>
  );
};
export default ProductDetailsTab;
interface IProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: Vendor;
  product_type: ProductType;
  created_at: Date;
  handle: string;
  updated_at: Date;
  published_at: Date | null;
  template_suffix: null;
  status: Status;
  published_scope: PublishedScope;
  tags: string;
  admin_graphql_api_id: string;
  options: Option[];
  images: Image[];
  image: Image;
  type: "circle" | "dot";
  variants: {
    id: number;
    product_id: number;
    title: string;
    price: string;
    sku: string;
    position: number;
    inventory_policy: string;
    compare_at_price: string;
    fulfillment_service: string;
    inventory_management: string;
    option1: string;
    option2: null;
    option3: null;
    created_at: Date;
    updated_at: Date;
    taxable: boolean;
    barcode: string;
    grams: number;
    image_id: number;
    weight: number;
    weight_unit: string;
    inventory_item_id: number;
    inventory_quantity: number;
    old_inventory_quantity: number;
    requires_shipping: boolean;
    admin_graphql_api_id: string;
    mainImage: string;
    imagesAll: ImagesAll;
  }[];
}
interface Image {
  // id: number;
  // product_id: number;
  // position: number;
  // created_at: Date;
  // updated_at: Date;
  // alt: null | string;
  // width: number;
  // height: number;
  src: string;
  // variant_ids: number[];
  // admin_graphql_api_id: string;
}
interface ImagesAll {
  A: string;
  B: string;
  C: string;
  D: string;
  E: string;
  F: string;
}
interface Option {
  id: number;
  product_id: number;
  name: Name;
  position: number;
}

type Name =
  | "Size"
  | "Color"
  | "Gold Colour"
  | "Stone"
  | "Title"
  | "Side"
  | "Size of Hoop"
  | "Gold";

type ProductType =
  | "Fine Piercings"
  | "Piercing Charm"
  | ""
  | "Rings"
  | "Necklaces"
  | "Earrings"
  | "Bracelets";

type PublishedScope = "global" | "web";

type Status = "active" | "draft";

type Vendor = "Ear Envy" | "Lark & Berry";
