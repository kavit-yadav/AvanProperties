import React, { useState, useEffect } from "react";
import "./contactMe.scss";
import { FaEnvelope, FaLinkedin, FaGithub } from "react-icons/fa";

function ContactMe() {
  const texts = [
    "Kavit Kumar",
    "Aspiring Software Engineer",
    "Full-Stack Developer",
    "Open to SDE/SWE Roles",
  ];
  const [index, setIndex] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[index];
    let typingSpeed = isDeleting ? 50 : 150;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentText.substring(0, textIndex + 1));
        setTextIndex((prev) => prev + 1);

        if (textIndex + 1 === currentText.length) {
          setTimeout(() => setIsDeleting(true), 1500); // wait before deleting
        }
      } else {
        setDisplayedText(currentText.substring(0, textIndex - 1));
        setTextIndex((prev) => prev - 1);

        if (textIndex - 1 === 0) {
          setIsDeleting(false);
          setIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [textIndex, isDeleting, index, texts]);

  return (
    <div className="contact-me">
      <div className="left">
        <h1 className="animated-text">{displayedText}</h1>
        <p className="education">
          Student at <strong>NIT Kurukshetra</strong>, Information Technology Branch
        </p>
        <p>
          I’m passionate about building scalable, high-quality web applications and constantly learning modern technologies. Feel free to connect with me!
        </p>
      </div>
      <div className="right">
        <h2>Get In Touch</h2>
        <div className="contact-info">
          <a href="mailto:kavitdiwa@gmail.com" className="contact-card">
            <FaEnvelope className="icon" />
            <span>kavitdiwa@gmail.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/kavit-kumar-429197370/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <FaLinkedin className="icon" />
            <span>linkedin.com/in/kavit-kumar-429197370</span>
          </a>
          <a
            href="https://github.com/kavit-yadav"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <FaGithub className="icon" />
            <span>github.com/kavit-yadav</span>
          </a>
        </div>
        <p className="cta">Let’s build something great together!</p>
      </div>
    </div>
  );
}

export default ContactMe;
