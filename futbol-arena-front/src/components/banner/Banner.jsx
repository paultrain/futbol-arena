import { data } from "../../../public/bannerPictures/data.js";
import { Carousel } from "flowbite-react";

export const Banner = () => {

    return (
        <>
            <section className="overflow-hidden rounded-md relative h-56 sm:h-64 lg:h-96 2xl:h-[400px]">
                <Carousel slideInterval={3000} indicators={false}>
                    {
                        data.map((item, idx) => (
                            <img key={idx} className="w-full aspect-video h-full" src={item.imgUrl} alt={`banner-${item.id}`} />
                        ))
                    }
                </Carousel>
            </section>
        </>
    );
}