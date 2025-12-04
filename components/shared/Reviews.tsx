"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import { useFetch } from "@/hooks/useFetch";
import { ReviewsType } from "@/lib/types/Reviews.type";
import { useAppSelector } from "@/redux/hooks";
import { selectHeader } from "@/redux/slices/headerSlice";
import { Title } from "../ui/title";
import Image from "next/image";

export const Reviews = () => {
  const { data } = useFetch<ReviewsType>("reviews");

  const {
    activeLang: { localization },
  } = useAppSelector(selectHeader);

  const title = localization === "en" ? "Feedback" : "Обратная связь";

  return (
    <section className="container my-20 pb-20 overflow-hidden">
      <Title text={title} className="!text-center mb-10" />

      <div className="max-w-[1200px] mx-auto px-4 md:px-0">
        <Swiper
          modules={[Autoplay, Pagination]}
          // autoplay={{
          //   delay: 6000,
          //   disableOnInteraction: false,
          // }}
          style={{ overflow: "visible" }}
          freeMode
          speed={1000}
          pagination={{
            clickable: true,
            el: ".custom-pagination",
            bulletClass:
              "dot transition-all duration-300 bg-gray-300 rounded-full w-3 h-3 mx-1",
            bulletActiveClass: "dot-active !bg-PRIMARY scale-125",
          }}
          spaceBetween={24}
          slidesPerView={3}
          slidesPerGroup={3}
          breakpoints={{
            0: { slidesPerView: 1, slidesPerGroup: 1, spaceBetween: 16 },
            768: { slidesPerView: 2, slidesPerGroup: 2, spaceBetween: 20 },
            1024: { slidesPerView: 3, slidesPerGroup: 3, spaceBetween: 24 },
          }}
          className="testimonials-swiper"
        >
          {data?.data?.map((item, i) => (
            <SwiperSlide
              key={item?.id ?? i}
              className="flex-[0_0_auto] min-h-[300px] pb-10 h-full flex items-stretch relative"
            >
              <article className="bg-white p-10 size-full rounded-[38px] flex flex-col gap-5 h-full flex-1">
                <Image
                  src="/assets/icons/quotes.svg"
                  alt=""
                  height={35}
                  width={35}
                />

                <p className="text-sm text-[#171C1B]">{item?.text}</p>

                <div className="flex flex-col gap-5 items-center absolute left-1/2 -translate-x-1/2 -bottom-20">
                  <div className="flex justify-center items-center overflow-hidden rounded-full border-4 border-PRIMARY size-[70px]">
                    <Image
                      src={item?.image?.path ?? ""}
                      alt={item?.name}
                      height={50}
                      width={50}
                      className="obejct-contain"
                    />
                  </div>
                  <div className="text-center flex flex-col gap-1.5">
                    <h3 className="text-base font-bold">{item?.name}</h3>
                    <p className="text-sm">{item?.job_title}</p>
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Кастомная пагинация */}
        <div className="custom-pagination flex justify-center items-center mt-32"></div>
      </div>
    </section>
  );
};
