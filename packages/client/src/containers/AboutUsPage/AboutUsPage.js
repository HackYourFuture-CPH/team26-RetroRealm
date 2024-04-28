import React from 'react';
import './AboutUsPage.css';

const AboutUs = () => {
  return (
    <div>
      <h2 className="about-us">About Us</h2>
      <p className="para">
        Welcome to RetroRealm! We offer an inviting and engaging platform for
        retrospectives, ensuring a fulfilling journey through past experiences
        and future possibilities. This application is co-founded by three
        remarkable individuals who lacked prior experience in coding and web
        development. Each of them hails from diverse backgrounds and one day
        chose to embark on the path of becoming developers. This website stands
        as a collaborative project they initiated during their time at Hack Your
        Future.
      </p>
      <div className="people-container">
        <div className="person">
          <img src="/assets/images/Nishadi.png" alt="Nishadi" />
          <h3>Nishadi Priyangika Samarathunge</h3>
          <p>Co-founder & Software Developer</p>
          <p>
            Former ayurvedic doctor in SriLanka, currently living in Denmark and
            passionate about learning coding. Loves creating immersive
            experiences for the community.
          </p>
        </div>
        <div className="person">
          <img src="/assets/images/Aaron.png" alt="Aaron" />
          <h3>Aaron Belling Moses</h3>
          <p>Co-founder & Software Developer</p>
          <p>
            Currently based in Denmark with 2 beautiful children and lovely
            wife. Has a keen eye for design and ensures that RetroRealms
            interface is both stylish and user-friendly.
          </p>
        </div>
        <div className="person">
          <img src="/assets/images/Komal.png" alt="Komal Ranjan" />
          <h3>Komal Ranjan</h3>
          <p>Co-founder & Software Developer</p>
          <p>
            Former Public Relations Consultant, from writing PR articles to
            learning coding and differrent technical coding languages. Currently
            living in Denamrak. Fell in love with website building.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
