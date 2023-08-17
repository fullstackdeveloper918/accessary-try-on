import { callApi } from "@/api/config";
import { useAnnotationsStore } from "@/store/annotations";
import { useEar } from "@/store/earDetails";
import { useProductDetailsStore } from "@/store/productDetails";
import { Carousel } from "flowbite-react";
import { ChevronLeftCircle, ChevronRightCircle, Undo2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { IProduct } from "./data.type";

const ProductDetailsTab = () => {
  const product = useProductDetailsStore((state) => state.product);
  const { annotations, setAnnotations } = useAnnotationsStore();
  const [productDetails, setProductDetails] = useState<IProduct>();
  const side = useEar((state) => state.side);
  const setShowDetails = useProductDetailsStore(
    (state) => state.setShowDetails
  );
  const sideIndex = useMemo(
    () => (side === "L" ? ("left" as const) : ("right" as const)),
    [side]
  );
  useEffect(() => {
    if (product?.id === undefined) return;
    (async () => {
      const response = await callApi("singleproducts/" + product?.id);
      if (response.ok) {
        const singleProduct: { data: IProduct[] } = await response.json();
        setProductDetails(singleProduct.data[0]);
       
      }
    })();
    return () => {
      setShowDetails(false);
    };
  }, [product?.id, setShowDetails]);

  const changeVariantColor = async (idx: number) => {
    if (product?.position) {
      const images =
        annotations[sideIndex][product.position].options[idx].imagesAll
      setAnnotations({
        ...annotations,
        [sideIndex]: {
          ...annotations[sideIndex],
          [product.position]: {
            ...annotations[sideIndex][product.position],
            images,
          },
        },
      });
    }
  };

  return (
    <div className="flex justify-between prod-detail-grid">
      <div>
        <div className="goback">
          <button
            onClick={() => {
              setShowDetails(false);
            }}
          >
            <Undo2 className="icon-back" /> Go Back
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
            ${productDetails?.variants[0]?.price}{" "}
            <span className="tax-val">Tax included.</span>
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
            {productDetails?.variants &&
              productDetails?.variants.length > 1 && (
                <>
                  <h3 className="text-2xl font-semibold mb-4">Options</h3>
                  <div className="flex gap-2 flex-wrap w-full thumb-prod">
                    {productDetails?.variants.map((variant, idx) => {
                      return (
                        <div
                          className="cursor-pointer thumb-prod-item"
                          onClick={() => {
                            changeVariantColor(idx);
                          }}
                        >
                          <div className="prod-thumb-img">
                            <img
                              src={variant.imagesAll["D"]}
                              alt=""
                              className="h-14 w-full object-cover border rounded-md "
                            /> 
                          </div>

                          <span className="text-sm">{variant?.title}</span>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
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
    </div>
  );
};
export default ProductDetailsTab;
