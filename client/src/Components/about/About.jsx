import React from 'react'
import './about.css'

const About = () => {
  return (
    <div className="sideNote2 container col-12 col-md-6 ms-md-2  mt-sm-5">
          <p className="forTitle">About</p>
          <h1>Evangadi Networks Q&A</h1>
      <p>
        Evangadi Forum is a Stack Overflow clone powered by the MERN stack and MySQL. It enables users to register, post questions, provide answers, and engage in discussions. With a responsive interface and search functionality, users can easily find relevant content. The platform fosters a community-driven environment for knowledge sharing and collaboration. Robust authentication ensures data security. The MySQL database efficiently manages user profiles, questions, answers, and comments. Users can comment, upvote, and downvote content, promoting quality contributions. Evangadi Tech features a user-friendly interface built with React, offering seamless accessibility across devices. It aims to create a vibrant community where users can share knowledge and engage in meaningful interactions.
          </p>
          <button className="btn1">HOW IT WORKS</button>
        </div>
  )
}

export default About