import DraggableCus from "./Draggable";
import DroppableCus from "./Droppable";
import { products } from "../api/products";
import { dropPoints } from "../api/points";

const Field = () => {
  return (
    <>
      <div className="flex gap-4">
        {/* These are the products that will be dragged */}
        <div className="flex gap-3 flex-col">
          {products.map((product) => (
            <DraggableCus data={product} key={product.id} />
          ))}
        </div>
        {/* These are the points where products can be dropped */}
        <div className="flex gap-2 flex-col">
          <div className="relative">
            {dropPoints.map((p, idx) => (
              <div
                key={idx}
                style={{ position: "absolute", top: `${p.y}`, left: `${p.x}` }}
              >
                <DroppableCus idx={idx} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
export default Field;
