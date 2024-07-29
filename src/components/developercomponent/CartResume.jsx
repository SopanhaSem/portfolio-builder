import React, { useState, useEffect } from "react";
import ContentEditable from "react-contenteditable";

function CartResume({ title: initialTitle, yearExp: initialYearExp, desc: initialDesc }) {
  const [title, setTitle] = useState(initialTitle);
  const [yearExp, setYearExp] = useState(initialYearExp);
  const [desc, setDesc] = useState(initialDesc);
  const [isEditing, setIsEditing] = useState(
    localStorage.getItem("isEditing") === "true"
  );

  const handleStorageChange = () => {
    setIsEditing(localStorage.getItem("isEditing") === "true");
  };

  useEffect(() => {
    handleStorageChange();
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleContentChange = (setter) => (evt) => {
    setter(evt.target.value);
  };

  const editableStyle = {
    border: "1px dashed red",
  };

  return (
    <section className="relative ml-5 md:ml-10 mb-5">
      <div className="h-[20px] w-[20px] absolute top-0 bg-white dark:bg-gray-800 z-10 -left-4 md:-left-6 rounded-full border-[5px] border-primary-developer-template"></div>
      <div className="h-full w-1 bg-primary-developer-template absolute bottom-0 -left-2 md:-left-4 rounded-lg"></div>
      <div className="font-sans w-full max-w-[500px] sm:max-w-full bg-white hover:text-gray-100 hover:outline hover:bg-primary-developer-template dark:bg-gray-700 dark:hover:bg-primary-developer-template hover:outline-1 hover:outline-gray-200 p-4 md:p-7 gap-4 md:gap-6 flex flex-col justify-start items-start rounded-lg">
        <h2 className="text-lg md:text-xl font-medium dark:text-gray-100">
          <ContentEditable
            html={title}
            disabled={!isEditing}
            onChange={handleContentChange(setTitle)}
            style={isEditing ? editableStyle : {}}
          />
        </h2>
        <p className="text-sm md:text-base dark:text-gray-100">
          <ContentEditable
            html={yearExp}
            disabled={!isEditing}
            onChange={handleContentChange(setYearExp)}
            style={isEditing ? editableStyle : {}}
          />
        </p>
        <p className="text-xs md:text-sm dark:text-gray-300">
          <ContentEditable
            html={desc}
            disabled={!isEditing}
            onChange={handleContentChange(setDesc)}
            style={isEditing ? editableStyle : {}}
          />
        </p>
      </div>
    </section>
  );
}

export default CartResume;
