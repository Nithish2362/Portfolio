import React, { useState, useEffect } from "react";
import profile from "./assets/nkpro.jpg";
import "./App.css";

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
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
    if (name && name[0] !== name[0]?.toUpperCase()) {
      return "First name must start with Uppercase";
    }
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
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") {
      setErrors((prev) => ({ ...prev, firstName: validateFirstName(value) }));
    } else if (name === "email" && value) {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {
      firstName: validateFirstName(formData.firstName),
      email: validateEmail(formData.email),
    };

    setErrors(newErrors);

    if (!newErrors.firstName && !newErrors.email) {
      setIsSubmitting(true);

      try {
        const response = await fetch(e.target.action, {
          method: "POST",
          body: new FormData(e.target),
          headers: {
            Accept: "application/json",
          },
        });

        if (response.ok) {
          setFormData({
            firstName: "",
            lastName: "",
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

      <main className="main-content">
        <section id="home" className="section">
          <img src={profile} alt="Profile" className="profile" />
          <h2 className="name">Nithishkumar M</h2>
          <p className="data">
            Software Developer | React | Spring Boot | Java | SQL | HTML | CSS
          </p>
        </section>
        <section id="about" className="section">
          <h2>About Me</h2>
          <p className="data">
            I specialize in modern web development with React, Spring Boot, and
            more.
          </p>
          <p className="data">
            With experience in both front-end and back-end technologies, I love
            building scalable and user-friendly applications. My focus is on
            creating clean, maintainable code and delivering seamless user
            experiences.
          </p>
        </section>
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
                style={{ width: "100%", textAlign: "center", fontSize: "12px" }}
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
        <form
          action="https://formspree.io/f/mpwplvbg"
          method="POST"
          className="section"
          id="contact"
          onSubmit={handleSubmit}
        >
          <h2>Contact</h2>
          <p>contact Info:</p>
          <p>Email: kumarnithish941@gmail.com</p>
          <p>Phone: +91 6666666666</p>
          <p>Address: 123 Main St, City, Country</p>
          <br />
          <div className="contact">
            <div className="form-group">
              <label className="label" htmlFor="firstName">
                First Name
              </label>
              <input
                className={`input ${errors.firstName ? "error" : ""}`}
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.firstName && (
                <div className="error-message">{errors.firstName}</div>
              )}
            </div>

            <div className="form-group">
              <label className="label" htmlFor="lastName">
                Last Name
              </label>
              <input
                className="input"
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="label" htmlFor="email">
                Email
              </label>
              <input
                className={`input ${errors.email ? "error" : ""}`}
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errors.email && (
                <div className="error-message">{errors.email}</div>
              )}
            </div>

            <div className="form-group">
              <label className="label" htmlFor="message">
                Message
              </label>
              <textarea
                className="input"
                id="message"
                name="message"
                value={formData.message}
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
