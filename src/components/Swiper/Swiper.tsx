import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface SliderProps {
    data: any;
}

export const Slider = ({ data }: SliderProps) => {
    console.log(data);
    return (
        <div className='w-[1024px] h-[500px] bg-slate-500'>
            <Swiper
                className='w-full h-full'
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 3000 }}
                onAutoplay={() => console.log('autoplay')}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper) => console.log(swiper)}
                modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
                navigation
            >
                {data.map((item: any, index: number) => (
                    <SwiperSlide key={index}>
                        <div className='relative w-full h-full'>
                            <img className='block w-full h-full' src={item.urlToImage} alt={item.title} />
                            <p className='absolute top-0 bg-gradient-to-b from-slate-500 to-slate-500 text-white p-2 text-lg w-full'>{item.title}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};