"use client"

import FullCalendar from '@/components/FullCalendar';
import Link from 'next/link';
import Checklist from '@/components/checklist';
import Category from '@/components/Category';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { Avatar } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);
  const [isCategoryVisible, setIsCategoryVisible] = useState(true);
  const touchStartX = useRef(0);
  const router = useRouter();

  const toggleChecklist = () => {
    setIsChecklistOpen(!isChecklistOpen);
  }

  const closeChecklist = () => {
    if (isChecklistOpen) {
      setIsChecklistOpen(false);
      setIsCategoryVisible(true);
    }
  }

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const touchEndX = e.touches[0].clientX;
    if (touchStartX.current - touchEndX > 50) { // 왼쪽으로 50px 이상 밀면
      closeChecklist();
    }
  };

  return (
    <div className='w-full h-full mb-[10px]' onClick={closeChecklist}>
      <Image
        src="/menu.png"
        alt="menu"
        width={25}
        height={25}
        onClick={(e) => {
          e.stopPropagation();
          toggleChecklist();
        }}
        className='absolute top-3 left-6 cursor-pointer'
      />
      <Avatar className='absolute top-1 right-6 cursor-pointer w-[33px] h-[33px]'
        onClick={()=>{
          router.push('/login');
        }}
      />
      <div 
        className={`absolute top-0 left-0 h-full bg-white transition-transform transform ${isChecklistOpen ? 'translate-x-0' : '-translate-x-full'} z-50`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div className="p-5">
          {isCategoryVisible ? (
            <Category toggleChecklist={toggleChecklist} setIsCategoryVisible={setIsCategoryVisible} />
          ) : (
            <Checklist toggleChecklist={toggleChecklist} />
          )}
        </div>
      </div>
      <FullCalendar />
    </div>
  );
}
