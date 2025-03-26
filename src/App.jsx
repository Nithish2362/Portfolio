import React, { useState } from "react";
import profile from "./assets/nkpro.jpg";
import "./App.css";

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };
  const closeMenu = () => {
    setMenuOpen(false);
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
          {menuOpen ? "✕" : "☰"} {/* Changes icon based on state */}
        </button>
        <nav className={`navbar ${menuOpen ? "active" : "☰"}`}>
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
          <h2 className="name">Nashkumar M</h2>
          <p className="data">
            Software Developer | React | Spring Boot | Java | SQL | HTML | CSS
            <br />
            . . . . . . . . .
            <br />
            <br />
            . . . . . . . . .
            <br />
            <br />
            . . . . . . . . .
            <br />
            <br />
            . . . . . . . . .
            <br />
            <br />
            . . . . . . . . .
            <br />
            <br />
            . . . . . . . . .
            <br />
            <br />
            . . . . . . . . .
            <br />
            <br />
            . . . . . . . . .
            <br />
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
            <br />
            . . . . . . . . .
            <br />
            <br />
            . . . . . . . . .
            <br />
            <br />
            . . . . . .
            <br />
            . . . . . . . <br />
            . . . . . . . . .
            <br />
            <br />
            . . . . . . . . .
            <br />
            <br />
            . . . . . .
            <br />
            . . . . . . . . .
            <br />
            <br />
            . . . . . . . . .
            <br />
            <br />
            . . . . . . . .
            <br />
            <br />
            . . . . . . . . .
            <br />
            <br />. . . . . .
          </p>
        </section>
        <section id="content" className="section">
          <h2>My Projects</h2>
          <div className="projects-grid">
            <div class="project-card">
              <h3 class="rainbow-title">Tic Tac Toe (Java Swing)</h3>
              <br />
              <br />
              <p>Tic Tac Toe game with win detection and turn tracking.</p>
              <br />
              <a
                href="https://github.com/Nithish2362/TICTAKTOE/releases/download/v1.0/TicTacToe.jar"
                class="download-button"
              >
                Download Tic Tac Toe
              </a>
              <br />
              <br />{" "}
              <p
                style={{ width: "100%", textAlign: "center", fontSize: "12px" }}
              >
                NOTE : After downloading the jar file.Run your jar file
                Example:java -jar TicTacToe.jar (with correct path){" "}
              </p>
              <br />
              <a href="https://github.com/Nithish2362/TICTAKTOE" class="button">
                View Code{" "}
              </a>
            </div>
            <div className="project-card">
              <h3>Project 2</h3>
              <p>Description of project 2</p>
            </div>
            <div className="project-card">
              <h3>Project 3</h3>
              <p>Description of project 3</p>
              <p>
                nk n nk k
                <br />
                . . . . . . . . .
                <br />
                <br />
                . . . . . . . . .
                <br />
                <br />
                . . . . . .
                <br />
                . . . . . . . . .
                <br />
                <br />
                . . . . . . . . .
                <br />
                <br />
                . . . . . .
                <br />
                . . . . . . . . .
                <br />
                <br />
                . . . . . . . . .
                <br />
                <br />. . . . . .
              </p>
            </div>
          </div>
        </section>{" "}
        <section id="contact" className="section">
          <h2>Contact</h2>
          <p>Get in touch with me:</p>
          <ul>
            <li>Email: [Your Email Address]</li>
            <li>Phone: [Your Phone Number]</li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Layout;
