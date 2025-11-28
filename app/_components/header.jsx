'use client';
import React from 'react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BsList } from "react-icons/bs";
import Image from 'next/image';
import Link from 'next/link';
import ThemeSwitch from './themeSwitch';


export default function Header({ btnDesktop, btnMobile, btnPjMobile, btnPjDesktop }) {

    return (
        <div className='flex flex-col w-full border-b-4 border-[#f29100]'>
            <div className='bg-[#004A8D] w-full h-20 flex'>
                <div className="flex justify-between w-full p-3">
                    <Link href="/">
                        <Image
                            src="/logosenacbranco.png"
                            alt="Logo senac"
                            width={85}
                            height={80}
                            className="sm:w-[100px]"
                        />
                    </Link>

                    <Sheet>
                        <SheetTrigger><BsList className="text-[#f29100] sm:hidden" size={35} /></SheetTrigger>
                        <SheetContent>
                            <SheetHeader className="flex items-center">
                                <SheetTitle><ThemeSwitch /></SheetTitle>
                                <SheetDescription>
                                  
                                    <button>{btnPjMobile}</button>
                                    <button>{btnMobile}</button>
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex items-center sm:space-x-4">
                    <button>{btnPjDesktop}</button>
                    <button>{btnDesktop}</button>
                </div>
                <div className="w-[40px]"></div>
            </div>
        </div>
    );
}
