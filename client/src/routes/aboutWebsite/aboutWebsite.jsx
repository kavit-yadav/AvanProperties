import React from "react";
import "./aboutWebsite.scss";

function AboutWebsite() {
  return (
    <div className="about-website">
      <div className="left">
        <h1>About This Website</h1>
        <p>
          Avan Properties is a full-stack real estate platform where users can explore, post, and manage property listings.
        </p>
        <p>It’s built to showcase my skills in modern web development with a focus on interactivity and scalability.</p>
        <br></br>
        <p>
          The platform is fully responsive and includes features like profile management, property posting, and notifications.
        </p>
      </div>
      <div className="right">
        <h2>Key Features</h2>
        <ul>
          <li>
            Secure authentication using <span className="tech">JWT + Cookies</span>
          </li>
          <li>
            Real-time chat powered by <span className="tech">Socket.io</span>
          </li>
          <li>
            Image uploads handled with <span className="tech">Multer + Cloudinary</span>
          </li>
          <li>
            Dynamic data fetching & routing via <span className="tech">React Router</span>
          </li>
          <li>
            Rich text editor integration using <span className="tech">React Quill</span>
          </li>
          <li>
            Built with the <span className="tech">MERN</span> stack and <span className="tech">Prisma ORM</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default AboutWebsite;
