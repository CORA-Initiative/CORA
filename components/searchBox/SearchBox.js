import React from "react";

export default function SearchBox({ text = "Search" }) {
  return (
    <>
      <div className="rounded-md overflow-clip">
        <input
          type="text"
          className="w-full bg-slate-200 text-gray-900 pl-4 p-2"
          id="searchBoxInput"
          placeholder={text}
        />
      </div>
    </>
  );
}
