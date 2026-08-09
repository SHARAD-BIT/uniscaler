"use client";
import { useEffect, useState } from "react";
import "../styles/adminDashboard.css";
import "../styles/addPopularCollege.css";
import { useSnackbar } from "notistack";
import { getCookie } from "../../Helper/Helper";
const AddCollegeInSearch = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [cName, setCname] = useState("");
  const [images, setImages] = useState([]);
  const [logo, setLogo] = useState(null);
  const [collegeList, setCollegeLis] = useState([]);
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [course, setCourse] = useState([
    {
      name: "",
      duration: "",
      content: "",
      fees: "",
    },
  ]);
  const [searchTags, setSearchTags] = useState([]);
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };
  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...course];
    updatedCourses[index][field] = value;
    setCourse(updatedCourses);
  };
  const handleAddCourse = () => {
    setCourse([...course, { name: "", duration: "", content: "", fees: "" }]);
  };

  const handleRemoveCourse = (index) => {
    const updatedCourses = [...course];
    updatedCourses.splice(index, 1);
    setCourse(updatedCourses);
  };
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setLogo(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("cName", cName);
    formData.append("logo", logo);
    images.forEach((image) => formData.append(`images`, image));
    formData.append("description", description);
    formData.append("location", location);
    formData.append("course", JSON.stringify(course));
    formData.append("searchTags", JSON.stringify(searchTags));
    formData.append("token", getCookie("adminToken"));
    fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/addCollegeInSearch`, {
      method: "POST",
      body: formData,
    })
      .then((response) =>
        response.json().then((data) => {
          data.code === 201 &&
            enqueueSnackbar(data.message, {
              variant: "success",
              autoHideDuration: 3000,
            });
          data.code === 201 &&
            (setCname(""),
            setImages([]),
            setDescription(""),
            setLocation(""),
            setLogo(""),
            setCourse([{ name: "", duration: "", content: "", fees: "" }]),
            setSearchTags([]));
        })
      )
      .catch((error) =>
        enqueueSnackbar(error.message, {
          variant: "error",
          autoHideDuration: 3000,
        })
      );
  };
  const handleDelete = (id) => {
    const confirmBox = confirm(
      "Are You want to delete this college, because this action is irreversible"
    );
    if (confirmBox) {
      const code = prompt("Enter security code");
      if (code === process.env.NEXT_PUBLIC_ADMIN_API_CODE) {
        fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/deleteCollege`, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            token: getCookie("adminToken"),
            id: id,
          }),
        }).then((res) =>
          res.json().then((data) => {
            data.code === 200 && fetchData();
            data.code === 200 && alert(data.message);
          })
        );
      } else {
        enqueueSnackbar("Wrong security code", {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    }
  };
  const fetchData = () => {
    fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/getCollegeListOfSearch`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token: getCookie("adminToken"),
      }),
    }).then((res) => res.json().then((data) => setCollegeLis(data.data)));
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section className="addCollegeInSearch add-popular">
      <h2>Add College In Search</h2>
      <p>Here you can add colleges in search for students.</p>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="input-group">
          <label htmlFor="cName">Name:</label>
          <input
            type="text"
            id="cName"
            value={cName}
            required
            onChange={(e) => setCname(e.target.value)}
            placeholder="Enter College Name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="logo">Logo:</label>
          <input
            type="file"
            id="logo"
            required
            accept="image/*"
            onChange={handleLogoChange}
          />
        </div>
        <div className="input-group">
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            multiple
            required
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="input-group">
          {" "}
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
          />
        </div>
        <div className="input-group">
          {" "}
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            required
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter College Location"
          />
        </div>
        <div className="input-group">
          <label>Courses:</label>
          <div className="groups">
            {course.map((courseItem, index) => (
              <div key={index}>
                <input
                  type="text"
                  required
                  value={courseItem.name}
                  onChange={(e) =>
                    handleCourseChange(index, "name", e.target.value)
                  }
                  placeholder="course Name"
                />
                <input
                  type="text"
                  required
                  value={courseItem.duration}
                  onChange={(e) =>
                    handleCourseChange(index, "duration", e.target.value)
                  }
                  placeholder="Course Duration"
                />
                <input
                  type="text"
                  value={courseItem.content}
                  onChange={(e) =>
                    handleCourseChange(index, "content", e.target.value)
                  }
                  placeholder="Course Content"
                />
                <input
                  type="text"
                  required
                  value={courseItem.fees}
                  onChange={(e) =>
                    handleCourseChange(index, "fees", e.target.value)
                  }
                  placeholder="Course Fees"
                />
                <button type="button" onClick={() => handleRemoveCourse(index)}>
                  Remove Course {index + 1}
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={handleAddCourse}>
            Add Course {course.length + 1}
          </button>
        </div>
        <div className="input-group">
          <label htmlFor="searchTags">Search Tags:</label>
          <input
            type="text"
            id="searchTags"
            required
            value={searchTags}
            onChange={(e) => setSearchTags(e.target.value.split(","))}
            placeholder="Enter Search Tags separated by commas"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <h2>All college list</h2>
      {/* show data here */}
      <ul className="collegeListServer">
        {collegeList.length > 0 ? (
          collegeList.map((data) => (
            <li key={data.id}>
              <div className="header">
                Name : {data.collegeName} <br />
                Location : {data.location} <br />
              </div>
              <div className="image">
                <img
                  src={
                    `${process.env.NEXT_PUBLIC_SERVER_URL}collegeGallery/` +
                    JSON.parse(data.images)[0]
                  }
                  alt={data.collegeName}
                  style={{ fontStyle: "italic" }}
                />
              </div>
              <div className="actionBtn">
                <button onClick={() => handleDelete(data.id)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <li>Fetching Data</li>
        )}
      </ul>
    </section>
  );
};

export default AddCollegeInSearch;
