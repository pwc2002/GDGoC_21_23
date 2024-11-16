"use client";

import { Checkbox } from "@nextui-org/react";
import Image from "next/image";

export default function Checklist({ toggleChecklist }) {

    const MajorNotices = [
          {
            "id": 1,
            "title": "2024학년도 2학기 성장현 후배드림 장학기금 장학생 선발 안내"
          },
          {
            "id": 2,
            "title": "2024학년도 법정의무교육"
          },
          {
            "id": 3,
            "title": "2025학년도 컴퓨터공학과 졸업내규 변경 안내"
          },
          {
            "id": 4,
            "title": "2024학년도 외국어성적우수장학생 선발 안내"
          },
          {
            "id": 5,
            "title": "2024-2학기 우수인재 인증제"
          },
          {
            "id": 6,
            "title": "학과별 재학생 대상 전공능력진단 실시 안내"
          }
        ];

	return (
        <>
          <Image
              src="/menu.png"
              alt="menu"
              width={25}
              height={25}
              className='absolute top-9 left-6 cursor-pointer'
              onClick={()=> {toggleChecklist()}}
          />
          <div className="text-left text-2xl font-bold pl-5 pt-32">
            학부 공지사항
          </div>
          <div className="text-xl text-gray-600/75 font-semibold">
            {MajorNotices.map((notice) => (
              <div key={notice.id} className=" pt-3 pl-5 pb-4 flex items-start gap-5">
                            <Checkbox>
                                <span className="break-keep">
                                    {notice.title}
                                </span>
                            </Checkbox>
              </div>
            ))}
          </div>
        </>
	);
}