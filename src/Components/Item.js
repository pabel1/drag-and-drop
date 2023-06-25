import React, { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const Item = ({ id, title, status, index, moveItem }) => {
  const ref = useRef(null);

  const [{ isDragging }, drag] = useDrag({
    item: { type: "item", id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "item",
    hover(item) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <tr
      className="gap-4 shadow-[2px_2px_3px_rgba(0,0,0,0.2)] rounded-lg mt-3 hover:bg-gray-100 cursor-pointer"
      ref={ref}
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <td className="py-6 px-[24%]">{title}</td>
      <td className="py-6">{status ? "Completed" : "Incomplete"}</td>
    </tr>
  );
};

export default Item;
