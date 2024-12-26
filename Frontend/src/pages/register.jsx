/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    age: "",
    country: "",
    address: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/v1/users", formData);
      alert("Registration Successful!");
      setFormData({
        fullname: "",
        email: "",
        age: "",
        country: "",
        address: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration Failed!");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.imageSection}>
        <img src="goods.jpg" alt="Registration Illustration" style={styles.image} />
        <p style={styles.quote}>“Empowering the future of delivery with speed, sustainability, and precision—Ecolite ensures your packages reach their destination with minimal impact on the planet.”</p>
      </div>
      <form style={styles.formBox} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>User Registration</h2>
        <div style={styles.formGroup}>
          <label style={styles.label}>Full Name</label>
          <input
            type="text"
            name="fullname"
            value={formData.fullname}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={styles.textarea}
          />
        </div>
        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required style={styles.input} />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Confirm Password</label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required style={styles.input} />
        </div>
        <button type="submit" style={styles.button}>Submit</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",  // Center everything vertically
    height: "100vh",
    backgroundColor: "#000",
    color: "#ffd700",
    padding: "0 50px",
  },
  imageSection: {
    flex: 0.45,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",  // Keep image and quote aligned
    justifyContent: "flex-start",
    marginBottom: "30px",  // Adds space between image and form box
    marginLeft: "-10%",  // Moves the image slightly left
  },
  image: {
    width: "90%",  // Adjust image size
    height: "auto",
    borderRadius: "10px",
  },
  quote: {
    color: "#e9eb77",
    fontStyle: "italic",
    marginTop: "15px",
    textAlign: "center",  // Center quote under image
  },
  formBox: {
    flex: 0.5,
    backgroundColor: "#111",
    border: "2px solid #ffd700",
    padding: "20px 30px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(255, 215, 0, 0.7)",
    maxWidth: "500px",
    marginTop: "-30px",  // Moves the form upward
    marginLeft: "50px",  // Move the form further to the right
    marginBottom:"2px",
    
  },
  heading: {
    textAlign: "center",
    // marginBottom: "2px",
  },
  formGroup: {
    // marginBottom: "5px",
  },
  label: {
    display: "block",
    // marginBottom: "5px",
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #ffd700",
    borderRadius: "5px",
    backgroundColor: "#222",
    color: "#e9eb77",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #e9eb77",
    borderRadius: "5px",
    backgroundColor: "#222",
    color: "#e9eb77",
    resize: "none",
  },
  button: {
    width: "100%",
    padding: "10px",
    // margin: "5px 0",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#e9eb77",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default Registration;