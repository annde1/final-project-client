import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import { EffectCreative } from "swiper/modules";
const SliderBottom = () => {
  return (
    <div style={{ height: "40vh", marginTop: "4rem", paddingBottom: "2rem" }}>
      <Swiper
        grabCursor={true}
        effect={"creative"}
        creativeEffect={{
          prev: {
            shadow: true,
            translate: ["-120%", 0, -500],
          },
          next: {
            shadow: true,
            translate: ["120%", 0, -500],
          },
        }}
        modules={[EffectCreative]}
        className="mySwiper2"
      >
        <SwiperSlide>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <img
              src="/assets/images/ryan-de-hamer-WIPIAJW2-P8-unsplash.jpg"
              alt="Slide"
              style={{ position: "relative" }}
            />
            <div style={{ position: "absolute", top: "3rem", width: "70%" }}>
              <p
                style={{
                  textAlign: "center",
                  color: "#EAEDF3",
                  fontWeight: "bold",
                }}
              >
                Are you ready to embark on a transformative fitness experience?
                Look no further than Zen Fit – your ultimate companion on the
                path to a healthier, stronger you!
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <img
              src="/assets/images/victor-freitas-CQwNdMxwjfk-unsplash.jpg"
              alt="Slide"
              style={{ position: "relative" }}
            />
            <div style={{ position: "absolute", top: "4rem", width: "70%" }}>
              <p
                style={{
                  textAlign: "center",
                  color: "#EAEDF3",
                  fontWeight: "bold",
                }}
              >
                With Zen Fit, you have the power to sculpt your ideal workout
                routine with ease. Our intuitive interface empowers you to
                create personalized templates tailored to your unique fitness
                goals.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <img
              src="/assets/images/ambitious-studio-rick-barrett-uwk8IS-HfJ8-unsplash.jpg"
              alt="Slide"
              style={{ position: "relative" }}
            />
            <div style={{ position: "absolute", top: "4rem", width: "70%" }}>
              <p
                style={{
                  textAlign: "center",
                  color: "#EAEDF3",
                  fontWeight: "bold",
                }}
              >
                Zen Fit is more than just a workout planner – it's a community
                of like-minded individuals united by a passion for wellness.
                Connect with fellow fitness enthusiasts, share your progress,
                and find inspiration in the achievements of others. With Zen
                Fit, you're never alone on your journey to greatness.
              </p>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <img
              src="/assets/images/victor-freitas-iGZiWuEg824-unsplash.jpg"
              alt="Slide"
              style={{ position: "relative" }}
            />
            <div style={{ position: "absolute", top: "4rem", width: "70%" }}>
              <p
                style={{
                  textAlign: "center",
                  color: "#EAEDF3",
                  fontWeight: "bold",
                }}
              >
                Join the Zen Fit revolution today and unlock the door to a
                healthier, happier you. Let's embark on this journey together –
                the path to your best self starts now!
              </p>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default SliderBottom;
