import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../styles/aboutSlider.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function AboutSlider() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <div style={{ paddingBottom: "3rem" }}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 10000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="slide-container">
            <img
              alt="Slide 1"
              src="/assets/images/victor-freitas-KkYWWpurqbE-unsplash.jpg"
            ></img>
            <div className="slide-content">
              <p
                className="slide-title"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Customizable Templates
              </p>
              <p
                className="slide-description"
                style={{
                  fontFamily: "Montserrat, sans-serif",
                }}
              >
                Create personalized workout routines tailored to your fitness
                goals. Our intuitive Create Template page allows you to design
                routines that suit your unique needs, whether you're aiming for
                strength, endurance, or flexibility.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="slide-container">
            <img
              alt="Slide 2"
              src="/assets/images/victor-freitas-qZ-U9z4TQ6A-unsplash.jpg"
            ></img>
            <div className="slide-content">
              <p className="slide-title">Smart Workouts</p>
              <p className="slide-description">
                Initiate your workouts seamlessly with the My Templates page.
                Choose from your personally crafted templates and kickstart your
                fitness journey. Receive instant feedback after each session,
                including duration, volume, and records.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="slide-container">
            <img
              alt="Slide 3"
              src="/assets/images/scott-webb-5IsdIqwwNP4-unsplash.jpg"
            ></img>
            <div className="slide-content">
              <p className="slide-title">Progress Tracking</p>
              <p className="slide-description">
                Zen Fit goes beyond the basics. Track your progress effortlessly
                and celebrate your achievements. Get detailed insights into your
                workout history, including records such as increased weight
                lifted or additional reps.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="slide-container">
            <img
              alt="Slide 4"
              src="/assets/images/jonathan-borba-zfPOelmDc-M-unsplash.jpg"
            ></img>
            <div className="slide-content">
              <p className="slide-title">Social Fitness</p>
              <p className="slide-description">
                Connect with like-minded individuals in the Zen Fit community.
                Follow other users, share your fitness routines, and find
                inspiration in the Feeds page. See the routines of the people
                you follow and showcase your fitness journey to motivate others.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="slide-container">
            <img
              alt="Slide 5"
              src="/assets/images/brian-vo-cbRZCj59LZw-unsplash.jpg"
            ></img>
            <div className="slide-content">
              <p className="slide-title">Premium Subscription</p>
              <p className="slide-description">
                Upgrade to Zen Fit Premium for an enhanced experience. Enjoy the
                flexibility to create an unlimited number of routines. Premium
                users have the freedom to diversify their workouts and optimize
                their fitness plans.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="slide-container">
            <img
              alt="Slide 6"
              src="/assets/images/victor-freitas-Pnm-9vBEQhk-unsplash.jpg"
            ></img>
            <div className="slide-content">
              <p className="slide-title">Personalized Profile</p>
              <p className="slide-description">
                Curate your fitness identity in the Edit Profile page. Update
                your personal information, set profile images, and customize
                your details. Track your fitness statistics in the My Profile
                page, including BMI, workout count, and your
                followers/following.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <div
          className="autoplay-progress"
          slot="container-end"
          style={{ color: "#EAEDF3" }}
        >
          <svg
            viewBox="0 0 48 48"
            ref={progressCircle}
            style={{ color: "#EAEDF3" }}
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              style={{ color: "#EAEDF3" }}
            ></circle>
          </svg>
          <span ref={progressContent} style={{ color: "#EAEDF3" }}></span>
        </div>
      </Swiper>
    </div>
  );
}
