import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import Image from 'next/image'
// importações para AUTOPLAY CAROUSEL
import Autoplay from 'embla-carousel-autoplay'
import { useRef } from 'react'

export default function CarouselFunction() {

    //AUTOPLAY CAROUSEL
     const autoplay = useRef(
        Autoplay({ delay: 3000, //tempo entre slides
             stopOnInteraction: false, //stopON -> faz o autoplay continuar mesmo se o usuário interagir
             stopOnMouseEnter: true     // PAUSA quando mouse entra no carousel
            }) 
    )



    const cards = [
        { image: "/carousel1.jpg" },
        { image: "/carousel2.png" },
        { image: "/carousel1.jpg" },
        { image: "/carousel2.png" },
    ]
 
    return (
        <div className='w-full flex justify-center items-center bg-slate-100 dark:bg-gray-900'>
            <Carousel plugins={[autoplay.current]} className="w-[70vw] sm:w-[80vw]">
                <CarouselContent >
                    {cards.map((card, index) => (
                        <CarouselItem key={index} className="h-[200px] sm:h-[450px]">

                            <div className="p-1 h-full">

                                <Card className='w-full h-full shadow-sm shadow-[#f29100] p-2'>
                                    <CardContent className="relative flex items-center justify-center overflow-hidden rounded-xl 
                                         h-[200px] sm:h-[300px] md:h-[400px] lg:h-[500px]"> 
                                         <Image
                                            src={card.image}
                                            alt={`Slide ${index + 1}`}
                                            fill
                                            className='object-cover rounded-xl'
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 600px"

                                        />


                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}
