"use client";
import { useEffect, useState } from "react";
import "../styles/addPopularCollege.css";
import { getCookie } from "../../Helper/Helper";
import { useSnackbar } from "notistack";
import CryptoJS from "crypto-js";
const AddPopularCollege = () => {
  const { enqueueSnackbar } = useSnackbar();

  const [name, setName] = useState(""),
    [location, setLocation] = useState(""),
    [collegeList, setCollegeList] = useState([]),
    [description, setDescription] = useState([""]),
    [image, setImage] = useState(null),
    [socialMedia, setSocialMedia] = useState({
      youtube: "",
      facebook: "",
      instagram: "",
      twitter: "",
      linkedin: "",
    }),
    [courses, setCourses] = useState([
      {
        name: "",
        list: [],
      },
    ]);
  const handleCourseNameChange = (index, value) => {
    const newCourses = courses.map((course, i) => {
      if (i === index) {
        return { ...course, name: value };
      }
      return course;
    });
    setCourses(newCourses);
  };

  // Handle adding a new course
  const addCourse = () => {
    setCourses([...courses, { name: "", list: [] }]);
  };

  // Handle removing a course
  const removeCourse = (index) => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  // Handle adding a new item to a course's list
  const addListItem = (courseIndex) => {
    const newCourses = courses.map((course, i) => {
      if (i === courseIndex) {
        return { ...course, list: [...course.list, ""] };
      }
      return course;
    });
    setCourses(newCourses);
  };

  // Handle changing an item within a course's list
  const handleListItemChange = (courseIndex, itemIndex, value) => {
    const newCourses = courses.map((course, i) => {
      if (i === courseIndex) {
        const newList = course.list.map((item, j) => {
          if (j === itemIndex) {
            return value;
          }
          return item;
        });
        return { ...course, list: newList };
      }
      return course;
    });
    setCourses(newCourses);
  };

  // Handle removing an item from a course's list
  const removeListItem = (courseIndex, itemIndex) => {
    const newCourses = courses.map((course, i) => {
      if (i === courseIndex) {
        const newList = course.list.filter((_, j) => j !== itemIndex);
        return { ...course, list: newList };
      }
      return course;
    });
    setCourses(newCourses);
  };

  const handleDescriptionChange = (index, event) => {
    const newDescriptions = description.map((description, i) => {
      if (i === index) {
        return event.target.value;
      }
      return description;
    });
    setDescription(newDescriptions);
  };

  const addDescription = () => {
    setDescription([...description, ""]);
  };

  const removeDescription = (index) => {
    setDescription(description.filter((_, i) => i !== index));
  };
  const handleDelete = (id) => {
    const confirmBox = confirm(
      "Are You want to delete this college, because this action is irreversible"
    );
    if (confirmBox) {
      const code = prompt("Enter security code");
      if (code === process.env.NEXT_PUBLIC_ADMIN_API_CODE) {
        fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/deletePopularCollege`, {
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
    const Data = new Date().getDate();
    const encryptedToken = CryptoJS.AES.encrypt(
      JSON.stringify(process.env.NEXT_PUBLIC_FETCH_BLOG + Data),
      process.env.NEXT_PUBLIC_PUBLIC_ENC
    ).toString();
    fetch(`${process.env.NEXT_PUBLIC_WEBSITE_API}/fetchPopularColleges`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token: encryptedToken,
      }),
    }).then((res) => res.json().then((data) => setCollegeList(data.data)));
  };
  useEffect(() => {
    fetchData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();

    // Append token
    formData.append("token", getCookie("adminToken"));

    // Append other text fields
    formData.append("cName", name);
    formData.append("address", location);
    formData.append("overView", JSON.stringify(description));

    // Append file; ensure 'image' is the file object obtained from file input
    // Check if image is not null to avoid appending null or undefined values
    if (image) {
      formData.append("logo", image, image.name);
    }

    // Append socialMedia object
    // Since FormData doesn't directly support object, convert object to JSON string
    formData.append("socialMedia", JSON.stringify(socialMedia));

    // Append courseDetails array
    // Convert array to JSON string as well
    formData.append("courseDetails", JSON.stringify(courses));

    if (image) {
      fetch(`${process.env.NEXT_PUBLIC_ADMIN_API}/addPopularCollege`, {
        method: "POST",
        body: formData,
      }).then((res) =>
        res
          .json()
          .then((data) => {
            data.code === 200 &&
              enqueueSnackbar(data.message, {
                variant: "success",
                autoHideDuration: 3000,
              });
            // reset all data
            setName("");
            setLocation("");
            setDescription([""]);
            setImage(null);
            setSocialMedia({
              youtube: "",
              facebook: "",
              instagram: "",
              twitter: "",
              linkedin: "",
            });
            setCourses([
              {
                name: "",
                list: [],
              },
            ]);
          })
          .catch((err) => {
            enqueueSnackbar(err.message, {
              variant: "error",
              autoHideDuration: 3000,
            });
          })
      );
    }
  };
  const handleChange = (platform, value) => {
    setSocialMedia((prev) => ({
      ...prev,
      [platform]: value,
    }));
  };
  const handleImageChange = (e) => {
    // Check if any files are selected and set the first one as the image
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      console.log(image);
    }
  };
  return (
    <section className="add-popular">
      <h2>Add Popular College</h2>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="cName">College Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="cName"
            placeholder="College name"
          />
        </div>
        <div className="input-group">
          <label htmlFor="logo">Logo or image</label>
          <input type="file" onChange={handleImageChange} accept="image/*" />
        </div>
        <div className="input-group">
          <label htmlFor="cLocation">College Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            id="cName"
            placeholder="College Location"
          />
        </div>
        <div className="input-group">
          <label htmlFor="overView">Enter OverView and other key Points</label>
          <div className="groups">
            {description.map((description, index) => (
              <div key={index}>
                <textarea
                  value={description}
                  onChange={(event) => handleDescriptionChange(index, event)}
                  placeholder="Enter description here..."
                />
                <button type="button" onClick={() => removeDescription(index)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={addDescription}>
            Add Description
          </button>
        </div>
        <div className="input-group">
          <label htmlFor="socialMedia">Social media</label>
          <div className="groups">
            <input
              type="text"
              value={socialMedia.youtube}
              onChange={(e) => handleChange("youtube", e.target.value)}
              placeholder="YouTube URL"
            />
            <input
              type="text"
              value={socialMedia.facebook}
              onChange={(e) => handleChange("facebook", e.target.value)}
              placeholder="Facebook URL"
            />
            <input
              type="text"
              value={socialMedia.instagram}
              onChange={(e) => handleChange("instagram", e.target.value)}
              placeholder="Instagram URL"
            />
            <input
              type="text"
              value={socialMedia.twitter}
              onChange={(e) => handleChange("twitter", e.target.value)}
              placeholder="Twitter URL"
            />
            <input
              type="text"
              value={socialMedia.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
              placeholder="LinkedIn URL"
            />
          </div>
        </div>
        <div className="input-group">
          <label>Course List</label>
          <div className="groups">
            {courses.map((course, i) => (
              <div key={i}>
                <input
                  type="text"
                  value={course.name}
                  onChange={(e) => handleCourseNameChange(i, e.target.value)}
                  placeholder="Course Name"
                />
                <button type="button" onClick={() => addListItem(i)}>
                  Add List Item
                </button>
                <button type="button" onClick={() => removeCourse(i)}>
                  Remove Course
                </button>
                {course.list.map((item, j) => (
                  <div key={j}>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) =>
                        handleListItemChange(i, j, e.target.value)
                      }
                      placeholder="List Item"
                    />
                    <button type="button" onClick={() => removeListItem(i, j)}>
                      Remove Item
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <button type="button" onClick={addCourse}>
            Add Course
          </button>
        </div>
        <button type="submit"> Submit all Data</button>
      </form>
      <h2>All college list</h2>
      {/* show data here */}
      <ul className="collegeListServer">
        {collegeList?.length > 0 ? (
          collegeList.map((data) => (
            <li key={data.id}>
              <div className="header">
                Name : {data.cName} <br />
                Location : {data.address} <br />
              </div>
              <div className="image">
                <img
                  src={
                    `${process.env.NEXT_PUBLIC_SERVER_URL}popularCollegeLogo/` +
                    data.logo
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

export default AddPopularCollege;
