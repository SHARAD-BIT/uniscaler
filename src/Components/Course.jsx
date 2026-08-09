"use client";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CourseList from "../Utils/CourseList";
import CourseDetails from "../Utils/CourseDetails";

import "./styles/course.css";
import NewsLetter from "../Decorators/NewsLetter";
import { AllCourse } from "../Helper/Helper";
const Course = () => {
  const param = usePathname().split("/")[2];
  const [course, setCourse] = useState(param || "engineering");
  const func = (value) => {
    setCourse(value);
  };
  useEffect(() => {
    setCourse(param);
  }, [param]);
  return (
    <main className="course top">
      <h1>All course List</h1>
      <CourseList courses={AllCourse.map((item) => item.name)} func={func} />
      {param && (
        <CourseDetails
          course={AllCourse.find((item) => item.name === course)}
        />
      )}
      <NewsLetter />
    </main>
  );
};

export default Course;
