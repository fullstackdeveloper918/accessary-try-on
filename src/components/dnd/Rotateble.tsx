import { Position, PositionableContainer } from "re-position";
import { PropsWithChildren, useState } from "react";

const Rotatable = ({ children }: PropsWithChildren) => {
  const [position, setPosition] = useState<Position>({
    height: "80px",
    left: "0",
    rotation: "0deg",
    top: "0",
    width: "80px",
  });

  const onUpdate = (position: Position) => {
    setPosition((prev) => ({
      ...prev,
      rotation: position.rotation,
    }));
  };
  return (
    <PositionableContainer
      resizable={false}
      rotatable
      movable={false}
      position={position}
      onUpdate={onUpdate}
      //   render={children}
      onDragStart={() => {}}
    >
      {children}
    </PositionableContainer>
  );
};
export default Rotatable;
