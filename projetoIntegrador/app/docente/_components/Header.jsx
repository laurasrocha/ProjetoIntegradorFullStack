'use client'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { BsList } from "react-icons/bs";
import Botao from './Botao';
import Image from 'next/image';
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";

export function Header() {
  return (
    <div className='flex flex-col w-full bg-pink-400'>
      <div className='bg-[#004A8D] w-full h-20 flex'>
        <div className="flex justify-between items-center w-full px-4">
          <Image
            src="/senac.png"
            alt="Logo Senac"
            width={100}
            height={40}
            className="object-contain"
          />

//           <div className="flex items-center gap-4">
//             <Botao className="hidden sm:block w-40 h-10 bg-white text-[#004A8D] hover:bg-[#f29100] hover:text-white">
//               Ver Projetos
//             </Botao>

//             <Sheet>
//               <SheetTrigger>
//                 <BsList className="text-[#f29100] sm:hidden" size={35} />
//               </SheetTrigger>
//               <SheetContent side="right" className="bg-white">
//                 <SheetHeader>
//                   <SheetTitle className="text-left">Menu</SheetTitle>

//                   <Botao className="w-full h-12 mt-8">VER PROJETOS</Botao>
//                 </SheetHeader>
//               </SheetContent>
//             </Sheet>

//             <AlertDialog>
//               <AlertDialogTrigger asChild>
//                 <Botao className="hidden sm:block w-auto px-4 py-2 bg-white text-[#004A8D] hover:bg-[#f29100] hover:text-white">
//                   Sair
//                 </Botao>
//               </AlertDialogTrigger>
//               <AlertDialogContent>
//                 <AlertDialogHeader>
//                   <AlertDialogTitle>Deseja realmente sair?</AlertDialogTitle>
//                   <AlertDialogDescription>
//                     Sua sessão será encerrada.
//                   </AlertDialogDescription>
//                 </AlertDialogHeader>
//                 <AlertDialogFooter>
//                   <AlertDialogCancel>Cancelar</AlertDialogCancel>
//                   <AlertDialogAction className="bg-[#004A8D] hover:bg-[#003366]">
//                     Confirmar
//                   </AlertDialogAction>
//                 </AlertDialogFooter>
//               </AlertDialogContent>
//             </AlertDialog>
//           </div>
//         </div>
//       </div>
//       <div className='bg-[#f29100] h-1 w-full'></div>
//     </div>
  );
 }
