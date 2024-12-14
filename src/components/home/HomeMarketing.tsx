import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import { readImages } from "../../api/api.ts";

const HomeMarketing = ({ picNum }: { picNum: number }) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["images"],
    queryFn: readImages,
  });

  return (
    <>
      {!isPending &&
        !isError &&
        data?.collection?.items &&
        Array.isArray(data?.collection?.items) &&
        data?.collection?.items.length > 0 && (
          <Swiper
            effect={"coverflow"}
            modules={[EffectCoverflow, Autoplay]}
            slidesPerView={picNum}
            centeredSlides={true}
            autoplay={{ delay: 0 }}
            allowTouchMove={false}
            speed={2500}
          >
            {data?.collection?.items.map(
              (
                item: {
                  links?: { href: string }[];
                  data?: { title: string }[];
                },
                idx: number,
              ) => (
                <SwiperSlide key={idx}>
                  <img
                    className="aspect-video w-full object-cover"
                    src={item?.links?.[0]?.href}
                    alt={item?.data?.[0]?.title}
                    title={item?.data?.[0]?.title}
                  />
                </SwiperSlide>
              ),
            )}
          </Swiper>
        )}
    </>
  );
};

export default HomeMarketing;
