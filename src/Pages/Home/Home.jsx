import React, { useState } from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Testimonial from "../../Components/Testimonial/Testimonial";
import FAQ from "../../Components/Faq";

import "lazysizes";

import "lazysizes/plugins/parent-fit/ls.parent-fit";

const slides = [
  {
    id: 1,
    imageUrl: "/images/hero1.JPG",
    title: "Special Child Session",
    description: "For Brain Growth",
  },
  {
    id: 2,
    imageUrl: "/images/hero2.JPG",
    title: "Best Children Study",
    description: "And Future Care",
  },
  {
    id: 3,
    imageUrl: "/images/hero3.JPG",
    title: "We Prepare Your",
    description: "Child For Life",
  },
];

const Home = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  React.useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 10000); // Auto slide every 5 seconds

    return () => clearInterval(interval);
  }, [activeIndex]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };
  return (
    <>
      <div className="home-wrapper ">
        {/* <LazyLoading/> */}
        <div className="carousel-containerr">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-itemm ${
                index === activeIndex ? "active" : ""
              }`}
            >
              <img
                data-src={slide.imageUrl}
                alt={`Slide ${slide.id}`}
                className="lazyload"
                alt=""
              />
              <div className="carousel-captionn d-none d-sm-block">
                <h1 className="special mt-0">
                  {slide?.title}
                  <br /> {slide?.description}
                </h1>
                <p className="mt-0">
                  Montessori Is A Nurturing And Holistic Approach To Learning
                </p>
                <Link to={"/enrol"}>
                  {" "}
                  <button className="special-btn">Apply Today</button>
                </Link>
              </div>
            </div>
          ))}

          <button className="prev-btn" onClick={prevSlide}>
            &#10094;
          </button>
          <button className="next-btn" onClick={nextSlide}>
            &#10095;
          </button>
          <div className="indicators">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`indicator ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
              ></div>
            ))}
          </div>
        </div>

        <section className="container mt-5">
          <div className="d-flex flex-lg-row flex-column align-items-center">
            <div className="w-100">
              <h1 className="home-heading">
                Welcome to a new era of daycare management
              </h1>
              <p>
                Welcome to Nursery Hub,innovating digital solutionsto optimize
                daycare administration for benefits of administrators, staffs
                and parents
              </p>
              <div className="d-flex gap-2 home-section1">
                <input
                  type="text"
                  value="Enroll your child"
                  style={{ fontStyle: "italic" }}
                ></input>
                <button>
                  <Link to={"/enrol"} style={{ color: "white" }}>
                    Enroll Child
                  </Link>
                </button>
              </div>
            </div>
            <div className="img-section  w-100 mt-lg-0 mt-5">
              <div className="img-cont">
                <img
                  className="img-fluid blob-img"
                  data-src="/images/l2.jpg"
                  class="lazyload"
                  alt=""
                />
              </div>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-lg-6 col-12 ">
              <div className="row">
                <div className="col-sm-6 col-6 re">
                  <img
                    className="img-fluid lazyload"
                    data-src="/images/a1.JPG"
                    alt="imageA3"
                  />
                </div>
                <div className="col-sm-6 col-6 re">
                  <img
                    className="img-fluid lazyload"
                    data-src="/images/a2.JPG"
                    alt="imageA2"
                  />
                </div>
                <div className="col-sm-6 col-6 mt-3 re">
                  <img
                    className="img-fluid lazyload"
                    data-src="/images/a3.JPG"
                    alt=""
                  />
                </div>
                <div className="col-sm-6 col-6 mt-3 re">
                  <img
                    className="img-fluid lazyload"
                    data-src="/images/a4.JPG"
                    alt=""
                  />
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12  your-child mt-5">
              <h4>PART OF THE FAMILY SINCE 2001,</h4>
              <h1>Your Child Will Take The Lead Learning</h1>
              <p>
                We are constantly expanding the range of services offered,
                taking care of children of all ages. Our goal is to carefully
                educate and develop children in a fun way. We strive to turn the
                learning process into a bright event so that children study with
                pleasure.
              </p>
              <div className="d-flex justify-content-between">
                <div className="d-flex flex-column flex-md-row align-items-center gap-4">
                  <div className="house">
                    <svg
                      className="sv"
                      xmlns="http://www.w3.org/2000/svg"
                      width="56"
                      height="56"
                      viewBox="0 0 56 56"
                      fill="none"
                    >
                      <path
                        d="M39.7041 33.8691C39.3978 33.5639 38.9756 33.3889 38.5436 33.3889C38.1117 33.3889 37.6894 33.5639 37.3832 33.8691C37.0781 34.1742 36.903 34.5975 36.903 35.0295C36.903 35.4616 37.0781 35.8838 37.3832 36.1889C37.6895 36.4952 38.1117 36.6702 38.5436 36.6702C38.9756 36.6702 39.3979 36.4952 39.7041 36.1889C40.0092 35.8838 40.1842 35.4605 40.1842 35.0295C40.1842 34.5975 40.0092 34.1742 39.7041 33.8691Z"
                        fill="black"
                      ></path>
                      <path
                        d="M29.1604 33.8691C28.8541 33.5639 28.432 33.3889 28 33.3889C27.568 33.3889 27.1447 33.5639 26.8395 33.8691C26.5344 34.1742 26.3594 34.5975 26.3594 35.0295C26.3594 35.4605 26.5344 35.8838 26.8395 36.1889C27.1447 36.4952 27.568 36.6702 28 36.6702C28.432 36.6702 28.8542 36.4952 29.1604 36.1889C29.4655 35.8838 29.6406 35.4605 29.6406 35.0295C29.6406 34.5975 29.4655 34.1742 29.1604 33.8691Z"
                        fill="black"
                      ></path>
                      <path
                        d="M54.3594 52.7187H50.7281V27.8835H54.3594C55.0359 27.8835 55.6431 27.4682 55.8883 26.8376C56.1336 26.2071 55.9666 25.4906 55.4679 25.0335L50.7281 20.6886V10.8666C50.7281 9.96052 49.9936 9.22596 49.0875 9.22596C48.1814 9.22596 47.4469 9.96052 47.4469 10.8666V17.6809L34.3804 5.70321C33.7532 5.12823 32.7904 5.12823 32.1631 5.70321L11.0756 25.0334C10.5769 25.4906 10.4099 26.207 10.6552 26.8375C10.9004 27.4681 11.5077 27.8834 12.1842 27.8834H15.8154V52.7187H1.64063C0.734563 52.7187 0 53.4533 0 54.3593C0 55.2654 0.734563 56 1.64063 56H28H38.5436H54.3594C55.2654 56 56 55.2654 56 54.3593C56 53.4533 55.2654 52.7187 54.3594 52.7187ZM36.903 52.7185H29.6406V45.4562H36.903V52.7185ZM47.4469 52.7185H40.1844V43.8156C40.1844 42.9095 39.4498 42.175 38.5438 42.175H28C27.0939 42.175 26.3594 42.9095 26.3594 43.8156V52.7185H19.0969V27.8835H47.4469V52.7185ZM49.0875 24.6022H17.4563H16.4021L33.2718 9.13824L50.1416 24.6022H49.0875Z"
                        fill="black"
                      ></path>
                      <path
                        d="M15.6989 7.02942H15.383C15.2187 6.35141 14.9492 5.69428 14.5776 5.08222L14.8003 4.85953C15.441 4.21892 15.4411 3.18008 14.8004 2.53936C14.1597 1.89853 13.121 1.89853 12.4802 2.53925L12.2593 2.76019C11.6547 2.39148 10.9988 2.1198 10.3105 1.953V1.64063C10.3105 0.734563 9.57589 0 8.66983 0C7.76377 0 7.0292 0.734563 7.0292 1.64063V1.953C6.34113 2.1198 5.6852 2.39148 5.08069 2.76019L4.85964 2.53914C4.21903 1.89842 3.18019 1.89842 2.53947 2.53925C1.89875 3.17997 1.89886 4.2187 2.53958 4.85942L2.76238 5.08222C2.39083 5.69428 2.12144 6.35141 1.95694 7.02931H1.64063C0.734563 7.02931 0 7.76388 0 8.66994C0 9.576 0.734563 10.3105 1.64063 10.3105H1.95694C2.12144 10.9883 2.39072 11.6452 2.76227 12.2571L2.53947 12.4799C1.89875 13.1205 1.89864 14.1594 2.53936 14.8001C2.85972 15.1206 3.27961 15.2807 3.6995 15.2807C4.11928 15.2807 4.53917 15.1205 4.85953 14.8002L5.08058 14.5793C5.68509 14.948 6.34102 15.2196 7.0292 15.3864V15.6991C7.0292 16.6052 7.76377 17.3398 8.66983 17.3398C9.57589 17.3398 10.3105 16.6052 10.3105 15.6991V15.3865C10.9988 15.2198 11.6548 14.9481 12.2593 14.5794L12.4801 14.8003C12.8005 15.1207 13.2204 15.2808 13.6402 15.2808C14.06 15.2808 14.4799 15.1207 14.8003 14.8003C15.441 14.1596 15.441 13.1208 14.8003 12.4801L14.5775 12.2573C14.949 11.6454 15.2184 10.9885 15.3829 10.3107H15.6989C16.605 10.3107 17.3396 9.57611 17.3396 8.67005C17.3396 7.76399 16.605 7.02942 15.6989 7.02942ZM11.2387 11.2363C11.2384 11.2366 11.238 11.237 11.2376 11.2373C11.2372 11.2376 11.237 11.2381 11.2365 11.2385C10.5509 11.9236 9.63955 12.301 8.67005 12.301C7.7 12.301 6.78814 11.9233 6.10236 11.2373C4.68661 9.82166 4.68672 7.51789 6.10236 6.10203C6.78759 5.41658 7.69858 5.03902 8.66775 5.03847C8.66841 5.03847 8.66917 5.03858 8.66983 5.03858C8.6706 5.03858 8.67125 5.03847 8.67202 5.03847C9.64053 5.03902 10.5511 5.41603 11.2362 6.10039C11.2366 6.10083 11.2371 6.10138 11.2375 6.10181C11.238 6.10225 11.2385 6.10269 11.239 6.10324C12.653 7.51888 12.6529 9.82078 11.2387 11.2363Z"
                        fill="black"
                      ></path>
                    </svg>
                  </div>
                  <div className="d-flex align-items-center floor flex-column">
                    <h1>75</h1>
                    <h5>Outdoor Activities</h5>
                  </div>
                </div>
                <div className="d-flex flex-column flex-md-row align-items-center gap-4">
                  <div className="house">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="48"
                      viewBox="0 0 52 48"
                      fill="none"
                    >
                      <path
                        d="M9.67986 31.14C8.30094 31.14 6.95299 30.7311 5.8065 29.9649C4.66 29.1988 3.76647 28.1098 3.2389 26.8358C2.71134 25.5618 2.57344 24.16 2.84265 22.8076C3.11186 21.4552 3.77609 20.213 4.75133 19.2382C5.72656 18.2633 6.96899 17.5996 8.32148 17.3309C9.67397 17.0622 11.0758 17.2006 12.3496 17.7287C13.6234 18.2568 14.712 19.1507 15.4777 20.2975C16.2434 21.4443 16.6518 22.7924 16.6512 24.1713C16.6491 26.0194 15.9138 27.791 14.6068 29.0975C13.2998 30.404 11.5279 31.1385 9.67986 31.14ZM9.67986 19.92C8.83902 19.92 8.01706 20.1693 7.31793 20.6365C6.6188 21.1036 6.07389 21.7676 5.75211 22.5444C5.43034 23.3213 5.34615 24.1761 5.51019 25.0007C5.67423 25.8254 6.07913 26.583 6.67369 27.1775C7.26826 27.7721 8.02578 28.177 8.85046 28.341C9.67514 28.5051 10.5299 28.4209 11.3068 28.0991C12.0836 27.7773 12.7476 27.2324 13.2147 26.5333C13.6819 25.8341 13.9312 25.0122 13.9312 24.1713C13.9305 23.044 13.4824 21.9631 12.6852 21.166C11.8881 20.3689 10.8072 19.9207 9.67986 19.92Z"
                        fill="black"
                      ></path>
                      <path
                        d="M17.8399 47.12C17.4792 47.12 17.1333 46.9767 16.8782 46.7217C16.6232 46.4666 16.4799 46.1207 16.4799 45.76V43.04C16.4799 41.2365 15.7635 39.5069 14.4882 38.2317C13.213 36.9564 11.4834 36.24 9.67991 36.24C7.87644 36.24 6.14683 36.9564 4.87159 38.2317C3.59634 39.5069 2.87991 41.2365 2.87991 43.04V45.76C2.87991 46.1207 2.73663 46.4666 2.48158 46.7217C2.22653 46.9767 1.88061 47.12 1.51991 47.12C1.15922 47.12 0.813297 46.9767 0.558247 46.7217C0.303198 46.4666 0.159912 46.1207 0.159912 45.76V43.04C0.159912 40.5152 1.16291 38.0937 2.94826 36.3084C4.7336 34.523 7.15505 33.52 9.67991 33.52C12.2048 33.52 14.6262 34.523 16.4116 36.3084C18.1969 38.0937 19.1999 40.5152 19.1999 43.04V45.76C19.1999 46.1207 19.0566 46.4666 18.8016 46.7217C18.5465 46.9767 18.2006 47.12 17.8399 47.12Z"
                        fill="black"
                      ></path>
                      <path
                        d="M17.8399 45.3792C17.5812 45.379 17.3279 45.305 17.1098 45.166C16.8917 45.0269 16.7177 44.8286 16.6084 44.5941C16.499 44.3597 16.4588 44.0989 16.4924 43.8425C16.526 43.586 16.632 43.3444 16.7981 43.146L35.8381 20.4069C36.0736 20.1439 36.4021 19.9829 36.7541 19.9577C37.1062 19.9325 37.4543 20.0452 37.7248 20.2719C37.9953 20.4986 38.167 20.8216 38.2038 21.1727C38.2405 21.5237 38.1393 21.8753 37.9216 22.1531L18.8816 44.8923C18.7541 45.0446 18.5947 45.1671 18.4147 45.2513C18.2348 45.3354 18.0385 45.379 17.8399 45.3792Z"
                        fill="black"
                      ></path>
                      <path
                        d="M6.95985 14.48C6.59916 14.48 6.25324 14.3367 5.99819 14.0817C5.74314 13.8266 5.59985 13.4807 5.59985 13.12V2.24C5.59985 1.87931 5.74314 1.53339 5.99819 1.27834C6.25324 1.02329 6.59916 0.880005 6.95985 0.880005C7.32055 0.880005 7.66647 1.02329 7.92152 1.27834C8.17657 1.53339 8.31985 1.87931 8.31985 2.24V13.12C8.31985 13.4807 8.17657 13.8266 7.92152 14.0817C7.66647 14.3367 7.32055 14.48 6.95985 14.48Z"
                        fill="black"
                      ></path>
                      <path
                        d="M50.4799 3.6H4.23988C3.87919 3.6 3.53327 3.45672 3.27822 3.20167C3.02317 2.94662 2.87988 2.6007 2.87988 2.24C2.87988 1.87931 3.02317 1.53339 3.27822 1.27834C3.53327 1.02329 3.87919 0.880005 4.23988 0.880005H50.4799C50.8406 0.880005 51.1865 1.02329 51.4416 1.27834C51.6966 1.53339 51.8399 1.87931 51.8399 2.24C51.8399 2.6007 51.6966 2.94662 51.4416 3.20167C51.1865 3.45672 50.8406 3.6 50.4799 3.6Z"
                        fill="black"
                      ></path>
                      <path
                        d="M47.7599 33.52C47.3992 33.52 47.0533 33.3767 46.7982 33.1217C46.5432 32.8666 46.3999 32.5207 46.3999 32.16V2.24C46.3999 1.87931 46.5432 1.53339 46.7982 1.27834C47.0533 1.02329 47.3992 0.880005 47.7599 0.880005C48.1206 0.880005 48.4665 1.02329 48.7216 1.27834C48.9766 1.53339 49.1199 1.87931 49.1199 2.24V32.16C49.1199 32.5207 48.9766 32.8666 48.7216 33.1217C48.4665 33.3767 48.1206 33.52 47.7599 33.52Z"
                        fill="black"
                      ></path>
                      <path
                        d="M50.4799 33.52H34.1599C33.7992 33.52 33.4533 33.3768 33.1983 33.1217C32.9432 32.8667 32.7999 32.5207 32.7999 32.16C32.7999 31.7994 32.9432 31.4534 33.1983 31.1984C33.4533 30.9433 33.7992 30.8 34.1599 30.8H50.4799C50.8406 30.8 51.1865 30.9433 51.4416 31.1984C51.6966 31.4534 51.8399 31.7994 51.8399 32.16C51.8399 32.5207 51.6966 32.8667 51.4416 33.1217C51.1865 33.3768 50.8406 33.52 50.4799 33.52Z"
                        fill="black"
                      ></path>
                      <path
                        d="M39.5999 11.76H23.2799C22.9192 11.76 22.5733 11.6168 22.3183 11.3617C22.0632 11.1067 21.9199 10.7607 21.9199 10.4C21.9199 10.0393 22.0632 9.69342 22.3183 9.43837C22.5733 9.18332 22.9192 9.04004 23.2799 9.04004H39.5999C39.9606 9.04004 40.3065 9.18332 40.5616 9.43837C40.8166 9.69342 40.9599 10.0393 40.9599 10.4C40.9599 10.7607 40.8166 11.1067 40.5616 11.3617C40.3065 11.6168 39.9606 11.76 39.5999 11.76Z"
                        fill="black"
                      ></path>
                      <path
                        d="M39.5999 17.2H17.8399C17.4792 17.2 17.1332 17.0567 16.8782 16.8016C16.6231 16.5466 16.4799 16.2007 16.4799 15.84C16.4799 15.4793 16.6231 15.1334 16.8782 14.8783C17.1332 14.6233 17.4792 14.48 17.8399 14.48H39.5999C39.9606 14.48 40.3065 14.6233 40.5615 14.8783C40.8166 15.1334 40.9599 15.4793 40.9599 15.84C40.9599 16.2007 40.8166 16.5466 40.5615 16.8016C40.3065 17.0567 39.9606 17.2 39.5999 17.2Z"
                        fill="black"
                      ></path>
                    </svg>
                  </div>
                  <div className="d-flex align-items-center floor flex-column">
                    <h1>56</h1>
                    <h5>Loving Teachers</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="container-xxl">
          <div className="row  u">
            <div className="col-12 d-flex justify-content-center">
              <p className="ex">
                Exeptional Features for <br /> Streamlined Operations
              </p>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 op mt-3  ">
              <div className="x">
                <div className="x-item mb-3">
                  <span class="material-symbols-outlined">wifi</span>
                </div>
                <h4>Dashboard Control</h4>
                <p>
                  Mange enrollment, staff, finances, and reporting with a
                  comprehensive administrator dashboard. Enhance efficiency and
                  control
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 op mt-3  ">
              <div className="x x1">
                <div className="x-item x-item-1 mb-3">
                  <span class="material-symbols-outlined">laptop_mac</span>
                </div>
                <h4>Staff Tools</h4>
                <p>
                  Mange enrollment, staff, finances, and reporting with a
                  comprehensive administrator dashboard. Enhance efficiency and
                  control
                </p>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 col-sm-12 op mt-3  ">
              <div className="x">
                <div className="x-item x-item-2 mb-3">
                  <span class="material-symbols-outlined">hub</span>
                </div>
                <h4>Parents Interface</h4>
                <p>
                  Mange enrollment, staff, finances, and reporting with a
                  comprehensive administrator dashboard. Enhance efficiency and
                  control
                </p>
              </div>
            </div>
          </div>
        </section>
        <div className="d-flex flex-column flex-lg-row container-xxl align-items-center mt-5 ">
          <img
            className="img-fluid faq-img w-100 lazyload"
            data-src="/images/v1.JPG"
            alt=""
          />
          <FAQ />
        </div>
        <div className="d-flex flex-column flex-lg-row  test mt-5">
          <Testimonial />

          <img
            className="img-fluid ii  lazyload"
            data-src="/images/e.PNG"
            alt=""
          />
        </div>
        <section className="down-section mt-5 containerr">
          {/* <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z"
              class="shape-fill"
              fill="var(--color-background)"
              fill-opacity="1"
            ></path>
          </svg> */}
          <div className="svg-img1 d-md-block d-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="78"
              height="204"
              fill="none"
            >
              <circle
                cx="3"
                cy="201"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 3 201)"
              />
              <circle
                cx="3"
                cy="183"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 3 183)"
              />
              <circle
                cx="3"
                cy="165"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 3 165)"
              />
              <circle
                cx="3"
                cy="147"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 3 147)"
              />
              <circle
                cx="3"
                cy="129"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 3 129)"
              />
              <circle
                cx="3"
                cy="111"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 3 111)"
              />
              <circle
                cx="3"
                cy="93"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 3 93)"
              />
              <circle
                cx="3"
                cy="75"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 3 75)"
              />
              <circle
                cx="3"
                cy="57"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 3 57)"
              />
              <circle
                cx="3"
                cy="39"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 3 39)"
              />
              <circle
                cx="3"
                cy="21"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 3 21)"
              />
              <circle
                cx="3"
                cy="3"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 3 3)"
              />
              <circle
                cx="21"
                cy="201"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 21 201)"
              />
              <circle
                cx="21"
                cy="183"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 21 183)"
              />
              <circle
                cx="21"
                cy="165"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 21 165)"
              />
              <circle
                cx="21"
                cy="147"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 21 147)"
              />
              <circle
                cx="21"
                cy="129"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 21 129)"
              />
              <circle
                cx="21"
                cy="111"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 21 111)"
              />
              <circle
                cx="21"
                cy="93"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 21 93)"
              />
              <circle
                cx="21"
                cy="75"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 21 75)"
              />
              <circle
                cx="21"
                cy="57"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 21 57)"
              />
              <circle
                cx="21"
                cy="39"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 21 39)"
              />
              <circle
                cx="21"
                cy="21"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 21 21)"
              />
              <circle
                cx="21"
                cy="3"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 21 3)"
              />
              <circle
                cx="39"
                cy="201"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 39 201)"
              />
              <circle
                cx="39"
                cy="183"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 39 183)"
              />
              <circle
                cx="39"
                cy="165"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 39 165)"
              />
              <circle
                cx="39"
                cy="147"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 39 147)"
              />
              <circle
                cx="39"
                cy="129"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 39 129)"
              />
              <circle
                cx="39"
                cy="111"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 39 111)"
              />
              <circle
                cx="39"
                cy="93"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 39 93)"
              />
              <circle
                cx="39"
                cy="75"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 39 75)"
              />
              <circle
                cx="39"
                cy="57"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 39 57)"
              />
              <circle
                cx="39"
                cy="39"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 39 39)"
              />
              <circle
                cx="39"
                cy="21"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 39 21)"
              />
              <circle
                cx="39"
                cy="3"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 39 3)"
              />
              <circle
                cx="57"
                cy="201"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 57 201)"
              />
              <circle
                cx="57"
                cy="183"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 57 183)"
              />
              <circle
                cx="57"
                cy="165"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 57 165)"
              />
              <circle
                cx="57"
                cy="147"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 57 147)"
              />
              <circle
                cx="57"
                cy="129"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 57 129)"
              />
              <circle
                cx="57"
                cy="111"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 57 111)"
              />
              <circle
                cx="57"
                cy="93"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 57 93)"
              />
              <circle
                cx="57"
                cy="75"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 57 75)"
              />
              <circle
                cx="57"
                cy="57"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 57 57)"
              />
              <circle
                cx="57"
                cy="39"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 57 39)"
              />
              <circle
                cx="57"
                cy="21"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 57 21)"
              />
              <circle
                cx="57"
                cy="3"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 57 3)"
              />
              <circle
                cx="75"
                cy="201"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 75 201)"
              />
              <circle
                cx="75"
                cy="183"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 75 183)"
              />
              <circle
                cx="75"
                cy="165"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 75 165)"
              />
              <circle
                cx="75"
                cy="147"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 75 147)"
              />
              <circle
                cx="75"
                cy="129"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 75 129)"
              />
              <circle
                cx="75"
                cy="111"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 75 111)"
              />
              <circle
                cx="75"
                cy="93"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 75 93)"
              />
              <circle
                cx="75"
                cy="75"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 75 75)"
              />
              <circle
                cx="75"
                cy="57"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 75 57)"
              />
              <circle
                cx="75"
                cy="39"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 75 39)"
              />
              <circle
                cx="75"
                cy="21"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 75 21)"
              />
              <circle
                cx="75"
                cy="3"
                r="3"
                fill="#FFC947"
                transform="rotate(-90 75 3)"
              />
            </svg>
          </div>
          <div className=" d-flex container flex-md-row flex-column p-3">
            <div className="mt-3 d-flex justify-content-between flex-column down-section-left">
              <h2 className="h">
                Genuine <b />
                Endorsements
                <b /> Highlighting Success
              </h2>
              <div className="mb-5 t">
                <p>
                  As a director, I've seen a noticeable uplift in operational
                  efficiency and staff happiness. Parents love the system's
                  transparency and easy communication - Sarah Allen, Daycare
                  Director
                </p>
                <div className="d-flex gap-3 t align-items-center ">
                  <img
                    className="img-fluid  director-img"
                    src="/images/o1.JPG"
                    alt=""
                  />
                  <div>
                    <b>Justice Efetobor</b>
                    <p className="mb-0">Director, NurseryHub</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="down-section-right py-3">
              <h3>Know More Today </h3>
              <p>Inquire About Our System </p>
              <form
                className="p-4"
                target="_blank"
                action="https://formsubmit.co/0f2d4b58bdd39904b292bc11beedd40b"
                method="POST"
              >
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Your Name
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your name"
                    name="name"
                    required={true}
                    style={{ color: "white" }}
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Yoir Email
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Enter your email"
                    name="email"
                    required={true}
                    style={{ color: "white" }}
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Your Enquiry
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="exampleFormControlInput1"
                    placeholder="Your Enquiry"
                    name="message"
                    required={true}
                    style={{ color: "white" }}
                  />
                </div>
                <button>Submit Now</button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
