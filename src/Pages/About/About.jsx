import React from "react";
import "./About.css";


const About = () => {
  return (
    <div>
      <div className="about-banner">
        <div>
          <h2>#About Us</h2>
          <p>LEARN ABOUT OUR HISTORY</p>
        </div>
      </div>
      <section className="contact-wrapper py-2">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-6 col-12">
              <div className="contact-title">
                <h4>Our Mission</h4>
              </div>
              <div className="contact-content mt-md-0 mt-4">
                At NurseryHub, our mission is to create a nurturing and secure
                environment that promotes holistic child development. We are
                committed to inspiring a lifelong love for learning through
                engaging activities and a curriculum that fosters curiosity and
                creativity. Our focus is on providing a safe, supportive, and
                inclusive space where each child's individual growth is
                nurtured. We strongly believe in collaborating closely with
                families, encouraging open communication, and fostering strong
                partnerships. Our dedicated team is empowered through continuous
                support and training, ensuring the highest quality care and
                education. Ultimately, we aim to instill confidence and
                readiness in every child, preparing them for a bright and
                successful future.
              </div>
            </div>

            <div className="col-lg-6 col-12 about-imgg">
              <img src="/images/About3.jpg" className="img-fluid" alt="" />
            </div>
          </div>
          <div className="mt-5 ">
            <div className="about-title">
              <h4>Our Services</h4>
            </div>
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-6 col-12">
                <img src="/images/About1.jpg" className="img-fluid" alt="" />
              </div>
              <div className="col-lg-6 col-12">
                <div className="about-content mt-lg-0 mt-4">
                  At NurseryHub, our mission is to create a nurturing and secure
                  environment that promotes holistic child development. We are
                  committed to inspiring a lifelong love for learning through
                  engaging activities and a curriculum that fosters curiosity
                  and creativity. Our focus is on providing a safe, supportive,
                  and inclusive space where each child's individual growth is
                  nurtured. We strongly believe in collaborating closely with
                  families, encouraging open communication, and fostering strong
                  partnerships. Our dedicated team is empowered through
                  continuous support and training, ensuring the highest quality
                  care and education. Ultimately, we aim to instill confidence
                  and readiness in every child, preparing them for a bright and
                  successful future.
                </div>
              </div>
            </div>
            <div className="row mt-5 y">
              <div className="about-title">
                <h4>Meet our Team</h4>
              </div>
              <div className="col-md-4 col-sm-6 col-12 op mt-3 ">
                <div className="x">
                  <div className="x-item mb-3">
                    <img className="img-fluid" src="/images/o1.jpg" alt="" />
                  </div>
                  <h4>Justice Efetobor</h4>
                  <b>Director, NurseryHub</b>
                  <p>
                    Oversees operations, sets policies, and ensures compliance
                    with regulations to maintain a safe and nurturing
                    environment for children.
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12 op mt-3 ">
                <div className="x x1">
                  <div className="x-item x-item-1 mb-3">
                    <img className="img-fluid" src="/images/p2.jpg" alt="" />
                  </div>
                  <h4>Flora shaw</h4>
                  <b>Principal, NurseryHub</b>
                  <p>
                    Mange enrollment, staff, finances, and reporting with a
                    comprehensive administrator dashboard. Enhance efficiency
                    and control
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12 op mt-3 ">
                <div className="x">
                  <div className="x-item x-item-2 mb-3">
                    <img className="img-fluid" src="/images/p3.jpg" alt="" />
                  </div>
                  <h4>John Doe</h4>
                  <p>
                    Mange enrollment, staff, finances, and reporting with a
                    comprehensive administrator dashboard. Enhance efficiency
                    and control
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12 op mt-3 ">
                <div className="x">
                  <div className="x-item mb-3">
                    <img className="img-fluid" src="/images/p4.jpg" alt="" />
                  </div>
                  <h4>David James</h4>
                  <p>
                    Mange enrollment, staff, finances, and reporting with a
                    comprehensive administrator dashboard. Enhance efficiency
                    and control
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12 op mt-3 ">
                <div className="x x1">
                  <div className="x-item x-item-1 mb-3">
                    <img className="img-fluid" src="/images/p5.jpg" alt="" />
                  </div>
                  <h4>Michelle Grace</h4>
                  <p>
                    Mange enrollment, staff, finances, and reporting with a
                    comprehensive administrator dashboard. Enhance efficiency
                    and control
                  </p>
                </div>
              </div>
              <div className="col-md-4 col-sm-6 col-12 op mt-3 ">
                <div className="x">
                  <div className="x-item x-item-2 mb-3">
                    <img className="img-fluid" src="/images/p6.jpg" alt="" />
                  </div>
                  <h4>Mary Jane</h4>
                  <p>
                    Mange enrollment, staff, finances, and reporting with a
                    comprehensive administrator dashboard. Enhance efficiency
                    and control
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
