import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../../../styles/styles.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const Slider = () => {
  return (
    <div style={{ height: "300px", marginBottom: "4rem", marginTop: "3rem" }}>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img
            alt="Slide 1"
            src="/assets/images/victor-freitas-KkYWWpurqbE-unsplash.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            alt="Slide 2"
            src="/assets/images/victor-freitas-qZ-U9z4TQ6A-unsplash.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            alt="Slide 3"
            src="/assets/images/victor-freitas-Op6ZGEwnwrI-unsplash.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            alt="Slide 4"
            src="/assets/images/danielle-cerullo-CQfNt66ttZM-unsplash.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            alt="Slide 5"
            src="/assets/images/sven-mieke-optBC2FxCfc-unsplash.jpg"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            alt="Slide 6"
            src="/assets/images/john-arano-h4i9G-de7Po-unsplash.jpg"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default Slider;
