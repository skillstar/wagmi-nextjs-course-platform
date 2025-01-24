"use client";
import SearchAndLayout from "./components/SearchAndLayout";
import CourseList from "./components/CourseList";

const React = () => {
  return (
    <div className=" text-white min-h-screen">
      <SearchAndLayout />
      <CourseList />
    </div>
  );
};

export default React;
export const runtime = "edge";
