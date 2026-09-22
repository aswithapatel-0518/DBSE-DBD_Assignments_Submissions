import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [student, setStudent] = useState({
    name: "",
    age: "",
    course: "",
    email: "",
  });

  const [students, setStudents] = useState([]);
  const [message, setMessage] = useState("");

  // Get all students from backend
  const getStudents = async () => {
    try {
      const response = await fetch("http://localhost:3000/students");
      const data = await response.json();

      if (response.ok) {
        setStudents(data);
      }
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  // Load students when page opens
  useEffect(() => {
    getStudents();
  }, []);

  const handleChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value,
    });
  };

  // Add student
  const addStudent = async () => {
    try {
      const response = await fetch("http://localhost:3000/students", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: student.name,
          age: Number(student.age),
          course: student.course,
          email: student.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Student added successfully!");

        setStudent({
          name: "",
          age: "",
          course: "",
          email: "",
        });

        // Refresh student list
        getStudents();
      } else {
        setMessage("❌ " + (data.message || "Failed to add student"));
      }
    } catch (error) {
      setMessage("❌ Cannot connect to the backend.");
    }
  };

  return (
    <div className="app">
      <div className="container">

        {/* HEADER */}
        <div className="header">
          <h1>🎓 Student Records</h1>
          <p>Student Records Management System</p>
        </div>

        {/* ADD STUDENT FORM */}
        <div className="card">

          <div className="form-group">
            <label>Student Name</label>
            <input
              name="name"
              placeholder="Enter student name"
              value={student.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Age</label>
            <input
              name="age"
              type="number"
              placeholder="Enter age"
              value={student.age}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Course</label>
            <input
              name="course"
              placeholder="Enter course"
              value={student.course}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="Enter email"
              value={student.email}
              onChange={handleChange}
            />
          </div>

          <button className="add-button" onClick={addStudent}>
            Add Student
          </button>

          <div className="message">
            {message}
          </div>

        </div>

        {/* STUDENT LIST */}
        <div className="students-section">

          <h2>📋 Student Records</h2>

          {students.length === 0 ? (
            <p className="no-students">
              No students found.
            </p>
          ) : (
            <div className="student-list">

              {students.map((item) => (
                <div className="student-card" key={item._id}>

                  <div>
                    <h3>{item.name}</h3>

                    <p>
                      <strong>Age:</strong> {item.age}
                    </p>

                    <p>
                      <strong>Course:</strong> {item.course}
                    </p>

                    <p>
                      <strong>Email:</strong> {item.email}
                    </p>
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default App;