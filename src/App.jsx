import React, { useState, useEffect } from "react";
import profile from "./assets/bk.jpg";
import "./App.css";

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    Mobile: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  useEffect(() => {
    if (isSubmitted) {
      const id = setTimeout(() => {
        setIsSubmitted(false);
      }, 2000);
      setTimeoutId(id);

      return () => clearTimeout(id);
    }
  }, [isSubmitted]);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const validateFirstName = (name) => {
    // Check if name is empty

    if (!name || name.trim() === "") {
      return "";
    }
    // Check if name contains only alphabetic characters
    const nameRegex = /^[A-Za-z]+$/;
    if (!nameRegex.test(name)) {
      return "Name must contain only characters";
    }

    // Check if first character is uppercase
    if (name[0] !== name[0].toUpperCase()) {
      return "First name must start with uppercase";
    }

    // If all checks pass
    return "";
  };
  const validateMobile = (m) => {
    // Remove any non-digit characters and the +91 prefix if present
    const digitsOnly = m.replace(/\D/g, "");

    if (!digitsOnly) return "Mobile number is required";
    if (digitsOnly.length !== 10) return "Mobile number must be 10 digits";
    if (!/^[0-9]\d{9}$/.test(digitsOnly))
      return "Enter a valid Indian mobile number";

    return "";
  };
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailRegex.test(email)) {
      return "Please enter a valid Gmail address (example@gmail.com)";
    }

    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Special handling for mobile input
    if (name === "mobile") {
      // Remove any non-digit characters
      const digitsOnly = value.replace(/\D/g, "");

      // If user tries to delete the +91, prevent it
      if (digitsOnly.length === 0) {
        setFormData((prev) => ({ ...prev, mobile: "" }));
        return;
      }

      // Ensure we don't have more than 10 digits after +91
      const maxDigits = 10;
      const limitedDigits = digitsOnly.slice(0, maxDigits);

      setFormData((prev) => ({ ...prev, mobile: limitedDigits }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };
  const handleMobileFocus = () => {
    setIsMobileFocused(true);
  };

  const handleMobileBlur = () => {
    setIsMobileFocused(false);
    handleBlur({ target: { name: "mobile", value: formData.mobile } });
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") {
      setErrors((prev) => ({ ...prev, firstName: validateFirstName(value) }));
    } else if (name === "email" && value) {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    } else if (name === "mobile") {
      setErrors((prev) => ({ ...prev, mobile: validateMobile(value) }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      firstName: validateFirstName(formData.firstName),
      mobile: validateMobile(formData.mobile),
      email: validateEmail(formData.email),
    };

    setErrors(newErrors);

    if (!newErrors.firstName && !newErrors.mobile && !newErrors.email) {
      setIsSubmitting(true);

      try {
        // Create a new FormData object
        const formDataToSend = new FormData();
        formDataToSend.append("firstName", formData.firstName);
        formDataToSend.append("lastName", formData.lastName);
        formDataToSend.append("mobile", formData.mobile); // Add the prefix when sending
        formDataToSend.append("email", formData.email);
        formDataToSend.append("message", formData.message);

        const response = await fetch(e.target.action, {
          method: "POST",
          body: formDataToSend,
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          setFormData({
            firstName: "",
            lastName: "",
            mobile: "",
            email: "",
            message: "",
          });
          e.target.reset();
          setErrors({});
          setIsSubmitted(true);
        } else {
          throw new Error("Form submission failed");
        }
      } catch (error) {
        console.error("Submission error:", error);
        setErrors((prev) => ({
          ...prev,
          form: "Submission failed, please try again",
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="layout-container">
      <header className="header">
        <h1 className="logo">NK</h1>
        <button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
        <nav className={`navbar ${menuOpen ? "active" : ""}`}>
          <ul>
            <li>
              <a href="#home" className="nav-link" onClick={closeMenu}>
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="nav-link" onClick={closeMenu}>
                About
              </a>
            </li>
            <li>
              <a href="#education" className="nav-link" onClick={closeMenu}>
          Education
              </a>
            </li>
            <li>
              <a href="skills" className="nav-link" onClick={closeMenu}>
                Skills
              </a>
            </li>
            <li>
              <a href="#certifications" className="nav-link" onClick={closeMenu}>
          Certificates
              </a>
            </li>
            <li>
              <a href="#content" className="nav-link" onClick={closeMenu}>
                Projects
              </a>
            </li>
            <li>
              <a href="#contact" className="nav-link" onClick={closeMenu}>
                Contact
              </a>
            </li>
          
          </ul>
        </nav>
      </header>

      {/* ......................................................................................................... */}

      <main className="main-content">
        <section id="home" className="section">
          <img src={profile} alt="Profile" className="profile" />
          <h2 className="name">Nithishkumar M</h2>
          <p className="data">
            nk nk nk nk nk Software Developer | React | Spring nk nk nk nk nk nk
            nk nk nk nk nkBoot | Java | SQL | HTML | CSS nk nk nk nk nk
          </p>
        </section>

        {/* ........................................................................................................................................ */}
        {/* About Me */}
        <section id="about" className="section">
          <h2 className="section-title">About Me</h2>
          <p className="about-text">
            Passionate software developer with expertise in building full-stack
            applications using React and Spring Boot. Strong problem-solving
            skills and a love for clean, efficient code.
          </p>
        </section>
        {/* ........................................................................................................................................ */}
        {/* Skills */}
        <section id="skills" className="section">
          <h2 className="section-title">Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Frontend</h3>
              <ul>
                <li>React </li>
                <li>HTML/CSS</li>
                <li>JavaScript</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Backend</h3>
              <ul>
                <li>Spring Boot</li>
                <li>Java</li>
                <li>Node.js</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Database</h3>
              <ul>
                <li>SQL (MySQL, PostgreSQL)</li>
                <li>MongoDB</li>
              </ul>
            </div>
            <div className="skill-category">
              <h3>Tools</h3>
              <ul>
                <li>Git</li>
                <li>Docker</li>
                <li>AWS (Basics)</li>
              </ul>
            </div>
          </div>
        </section>
        {/* ........................................................................................................................................ */}
        {/* Education */}
        <section id="education" className="section">
          <h2 className="section-title">Education</h2>
          <div className="education-grid">
            <div className="education-category">
              <h3>BE Cse</h3>
              <p className="institution">Hindusthan college of enigineering and technology</p>
              <p className="duration">8.0</p>
              <p className="duration">2020 – 2024 </p>
            </div>
            <div className="education-category">
              <h3>Hsc</h3>
              <p className="institution">Venus matriculation higher secondary school</p>
              <p className="duration"> 63%</p>
              <p className="duration">2018 – 2020 </p>
            </div>
            <div className="education-category">
              <h3>Sslc</h3>
              <p className="institution">sarasu matriculation school</p>
              <p className="duration">84%</p>
              <p className="duration">2017 – 2018 </p>
            </div>
          </div>
        </section>

        {/* ........................................................................................................................................ */}

        {/* Certifications (Optional) */}
        <section id="certifications" className="section">
          <h2 className="section-title">Certifications</h2>
          <div className="certifications-grid">
            <div className="certifications-category">
              <h3>Udemy</h3>
              <p className="institution">
                React - The Complete Guide (incl Hooks, React Router, Redux)
              </p>
            </div>
            <div className="certifications-category">
              <h3>Udemy</h3>
              <p className="institution">
                The Complete Node.js Developer Course (3rd Edition)
              </p>
            </div>
            <div className="certifications-category">
              <h3>Udemy</h3>
              <p className="institution">
                The Complete Web Developer Course 2.0
              </p>
            </div>
          </div>
        </section>
        {/* .......................................................................................................................................................... */}

        <section id="content" className="section">
          <h2>My Projects</h2>
          <div className="projects-grid">
            <div className="project-card">
              <h3 className="rainbow-title">Tic Tac Toe (Java Swing)</h3>
              <br />
              <br />
              <p>Tic Tac Toe game with win detection and turn tracking.</p>
              <br />
              <a
                href="https://github.com/Nithish2362/TICTAKTOE/releases/download/v1.0/TicTacToe.jar"
                className="download-button"
              >
                Download Tic Tac Toe
              </a>
              <br />
              <br />
              <p
                style={{ width: "100%", textAlign: "center", fontSize: "14px" }}
              >
                NOTE: After downloading the jar file. Run your jar file.
                Example: java -jar TicTacToe.jar (with correct path)
              </p>
              <br />
              <a
                href="https://github.com/Nithish2362/TICTAKTOE"
                className="button"
              >
                View Code
              </a>
            </div>
            <div className="project-card">
              <h3>Project 2</h3>
              <p>Description of project 2</p>
            </div>
            <div className="project-card">
              <h3>Project 3</h3>
              <p>Description of project 3</p>
              <p>nk n nk k</p>
            </div>
          </div>
        </section>
        {/* /........................................................................................................................................ */}

        <form
          action="https://formspree.io/f/mpwplvbg"
          method="POST"
          className="section"
          id="contact"
          onSubmit={handleSubmit}
        >
          <h2>Contact</h2>

          <div className="contact">
            <div className="form-group">
              <label className="label" htmlFor="firstName"></label>
              <input
                className={`input ${errors.firstName ? "error" : ""}`}
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter First Name"
                onBlur={handleBlur}
                required
              />
              {errors.firstName && (
                <div className="error-message">{errors.firstName}</div>
              )}
            </div>{" "}
            <br />
            <div className="form-group">
              <label className="label" htmlFor="lastName"></label>
              <input
                className="input"
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
                required 
              />
            </div>
            <br />
            <div className="form-group">
              <label className="label" htmlFor="mobile"></label>
              <div className="mobile-input-container">
                <input
                  className={`input ${errors.mobile ? "error" : ""}`}
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  onFocus={handleMobileFocus}
                  onBlur={handleMobileBlur}
                  maxLength="10"
                  placeholder="Enter 10-digit number"
                  required
                />
              </div>
              {errors.mobile && (
                <div className="error-message">{errors.mobile}</div>
              )}
            </div>
            <br />
            <div className="form-group">
              <label className="label" htmlFor="email"></label>
              <input
                className={`input ${errors.email ? "error" : ""}`}
                type="email"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />

              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>
            <br />
            <div className="form-group">
              <label className="label" htmlFor="message"></label>
              <textarea
                className="input"
                id="message"
                name="message"
                value={formData.message}
                placeholder="Write a message"
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button className="button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "⏳" : "Submit"}
            </button>
            {isSubmitted && (
              <div className="success-message">
                Message sent successfully! I'll get back to you soon.
              </div>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

export default Layout;
