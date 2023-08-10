import { callApi } from "@/api/config";
import { useProductDetailsStore } from "@/store/productDetails";
import { Carousel } from "flowbite-react";
import { ChevronLeftCircle, ChevronRightCircle, XSquare } from "lucide-react";
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
    <div className="flex justify-between">
      <div>
        <div className="flex flex-col gap-2 justify-start items-start">
          <h2 className="text-2xl leading-6 font-semibold">
            {productDetails?.title}
          </h2>
          <p className="capitalize leading-8 p-1 border-b-2 text-slate-500 text-base">
            FINE PIERCINGS
          </p>
        </div>
        <div className="flex flex-wrap items-start w-full">
          <div className="w-[360px] m-4 h-[300px]">
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
          <div className="w-[200px]">
            <p className="text-lg">${productDetails?.variants[0]?.price}</p>
            <p className="text-base">Tax included.</p>
            <button
              className="px-4 py-2 bg-gray-900 text-white text-lg rounded-md"
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

        <div className="text-left">
          <h2
            className="text-
        xl"
          >
            Description
          </h2>
          <p
            className="text-left"
            dangerouslySetInnerHTML={{
              __html: productDetails?.body_html ?? "",
            }}
          ></p>
        </div>
      </div>

      <button
        className="self-start"
        onClick={() => {
          setShowDetails(false);
        }}
      >
        <XSquare size={24} />
      </button>
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
    price: string;
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
