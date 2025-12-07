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
        { image: "/geminiBanner3.png" },
        { image: "/carousel1.jpg" },
        { image: "/geminiBanner3.png" },
        { image: "/carousel1.jpg" },
        
    ]
 
    return (
        <div className='w-full flex justify-center items-center bg-slate-100 dark:bg-gray-900'>
            <Carousel 
                plugins={[autoplay.current]} 
                // O carrossel irá ocupar 90vw (mobile) ou 80vw (desktop)
                className="w-[90vw] sm:w-[80vw]"
            >
                <CarouselContent >
                    {cards.map((card, index) => (
                        <CarouselItem 
                            key={index} 
                            // PASSO 1: Mantemos a altura definida pelo contêiner interno.
                            className="h-full"
                        >

                            <div className="p-1 h-full">

                                <Card className='w-full h-full shadow-sm shadow-[#f29100] p-2'>
                                    <CardContent 
                                        // PASSO 2: Ajustamos o Aspect Ratio para mobile.
                                        // Trocamos 'aspect-video' (16:9) por 'aspect-[3/2]' (3:2).
                                        // A proporção 3:2 é mais alta (menos larga) que 16:9, dando mais espaço vertical
                                        // para banners que parecem cortados no celular.
                                        className="relative flex items-center justify-center overflow-hidden rounded-xl 
                                        aspect-[3/2] sm:h-[450px] sm:aspect-auto"
                                    > 
                                        <Image
                                            src={card.image}
                                            alt={`Slide ${index + 1}`}
                                            fill
                                            quality={100}
                                            priority={index === 0} // primeira imagem carrega em alta primeiro
                                            // PASSO 3: Mantemos object-contain para garantir que nenhuma parte do conteúdo seja cortada.
                                            className='object-contain sm:object-cover rounded-xl' 
                                            sizes="(max-width: 640px) 90vw, 80vw"
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