import React from "react";
import OverallNotices from '../data/OverallNotices.json';

export default function MenuAll() {
  const { overallnotices } = OverallNotices;

  return (
    <div className="relative min-h-screen w-full">
      <div className="fixed top-12 left-5 object-cover h-5 w-5">
        <img src="./pngwing.com.png" alt="menu button" />
      </div>
      
      <div className="mx-5 mt-20">
        <div className="text-2xl font-bold mb-8">
          전체 공지사항
        </div>
        
        <div className="text-xl text-gray-600/75 font-semibold">
          {overallnotices.map((notice) => (
            <div 
              key={notice.id} 
              className="py-4 flex items-start gap-5"
            >
              <input 
                type="checkbox" 
                className="flex-shrink-0 mt-1.5"
                id={`notice-${notice.id}`}
              />
              <span className="break-keep">
                {notice.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
