"use client";
import { useState } from "react";
import "../styles/addPopularCollege.css";
import { getCookie } from "../../Helper/Helper";
import { useSnackbar } from "notistack";
const AddCollegeByLocation = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [cName, setCname] = useState("");
  const [location, setLocation] = useState("");
  const [cLogo, setCLogo] = useState(null);
  const [description, setDescription] = useState("");
  const [courses, setCourses] = useState([""]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cName", cName.trim());
    formData.append("token", getCookie("adminToken"));
    formData.append("address", location.trim());
    formData.append("logo", cLogo);
    formData.append("description", description.trim());
    formData.append(
      "courses",
      JSON.stringify(courses.filter((item) => item.trim() !== ""))
    );
    fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/addCollegeByLocation`, {
      method: "POST",
      body: formData,
    })
      .then((res) =>
        res.json().then((data) => {
          data.code === 200 &&
            enqueueSnackbar(data.message, {
              variant: "success",
              autoHideDuration: 3000,
            });
          setCname("");
          setLocation("")
          setDescription("");
          setCourses([""]);
          setCLogo(null);
        })
      )
      .catch((err) => {
        enqueueSnackbar(err.message, {
          variant: "error",
          autoHideDuration: 3000,
        });
      });
  };

  return (
    <section className="add-popular">
      <h2>Add Colleges by location</h2>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="cName">College Name</label>
          <input
            type="text"
            id="cName"
            required
            value={cName}
            onChange={(e) => setCname(e.target.value)}
            placeholder="College Name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            required
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Location"
          />
        </div>
        <div className="input-group">
          <label htmlFor="cLogo">Logo</label>
          <input
            type="file"
            required
            id="cLogo"
            onChange={(e) => setCLogo(e.target.files[0])}
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <div className="input-group">
          <label>Courses</label>
          <div className="groups">
            {courses.map((course, index) => (
              <input
                key={index}
                type="text"
                value={course}
                placeholder={`Course ${index + 1}`}
                onChange={(e) => {
                  const newCourses = [...courses];
                  newCourses[index] = e.target.value;
                  setCourses(newCourses);
                }}
              />
            ))}
          </div>
          <button type="button" onClick={() => setCourses([...courses, ""])}>
            Add Course
          </button>
        </div>
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default AddCollegeByLocation;
