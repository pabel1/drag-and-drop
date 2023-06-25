import axios from "axios";
import { useEffect, useState } from "react";
import Item from "./Item";

const ItemList = () => {
  const [items, setItems] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        const formattedRows = response?.data?.map((item) => ({
          id: item.id,
          title: item.title,
          completed: item.completed,
        }));
        setItems(formattedRows);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    setCurrentItems(currentItems);
  }, [currentPage, items]);

  const [currentItems, setCurrentItems] = useState([]);

  const moveItem = (dragIndex, hoverIndex) => {
    const draggedItem = currentItems[dragIndex];
    setCurrentItems((prevItems) => {
      const newItems = [...prevItems];
      newItems.splice(dragIndex, 1);
      newItems.splice(hoverIndex, 0, draggedItem);
      return newItems;
    });
  };

  return (
    <>
      <div className="text-center container mx-auto py-3">
        <h1 className="text-xl text-gray-500 font-medium">Todo List</h1>

        <table className="mx-auto my-6 w-[50%] shadow-md rounded-md">
          <thead className="">
            <tr className="bg-blue-800 text-white">
              <th className="p-2 text-lg text-white w-[70%]">Title</th>
              <th className="p-2 text-lg text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <Item
                key={index}
                id={item.id}
                title={item.title}
                status={item.completed}
                index={index}
                moveItem={moveItem}
              />
            ))}
          </tbody>
        </table>

        <div>
          {currentPage < Math.ceil(items.length / itemsPerPage) && (
            <button
              onClick={handleNextPage}
              className=" py-2 px-6 bg-blue-900 text-white rounded-sm"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ItemList;
