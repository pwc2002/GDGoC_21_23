"use client";

import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "@nextui-org/link";
import Image from "next/image";
import { useState } from "react";
import Moredetail from "./Moredetail";

export default function Checklist({ toggleChecklist }) {
  const [activeNotice, setActiveNotice] = useState(null);

  const MajorNotices = [
    {
      id: 1,
      title: "2024학년도 2학기 성장현 후배드림 장학기금 장학생 선발 안내",
      details: (
        <>
          <h2 className="pb-3">
            가. 선발 대상 : 가정형편이 어려운 환경 속에 본인의 꿈을 잃지 않으며 평소 생활태도가 성실하고 꿈과 비전에 대한 실현의지가 확고한 재학생
            <br/>나. 제출 서류 : 진로계획서(자유양식), 성적증명서, 가계곤란 증빙서류(학자금지원구간 통지서)
            <br/>다. 선발 인원 : 학기당 1명
            <br/>(각 대학별 1명씩, 매학기 신규 선발)
            <br/>라. 장학 금액 : 학기당 100만원/명
            <br/>마. 제출 기한 : 11. 25. (월)
            <br/>바. 제출 방법 : 스캔본 이메일 제출 : yujin@inha.ac.kr 
            <br/>
          </h2>
          <Link href="https://cse.inha.ac.kr/cse/888/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGY3NlJTJGMjQyJTJGMTM5Mzc1JTJGYXJ0Y2xWaWV3LmRvJTNG">
            바로가기
          </Link>
        </>
      ),
    },
    {
      id: 2,
      title: "2024학년도 법정의무교육",
      details: <p>2024학년도 법정의무교육에 대한 자세한 정보</p>,
    },
    {
      id: 3,
      title: "2025학년도 컴퓨터공학과 졸업내규 변경 안내",
      details: <p>2025학년도 컴퓨터공학과 졸업내규 변경 안내에 대한 자세한 정보</p>,
    },
    {
      id: 4,
      title: "2024학년도 외국어성적우수장학생 선발 안내",
      details: <p>2024학년도 외국어성적우수장학생 선발 안내에 대한 자세한 정보</p>,
    },
    {
      id: 5,
      title: "2024-2학기 우수인재 인증제",
      details: <p>2024-2학기 우수인재 인증제에 대한 자세한 정보</p>,
    },
    {
      id: 6,
      title: "학과별 재학생 대상 전공능력진단 실시 안내",
      details: <p>학과별 재학생 대상 전공능력진단 실시 안내에 대한 자세한 정보</p>,
    },
  ];

  const handleTitleClick = (id) => {
    setActiveNotice(id === activeNotice ? null : id);
  };

  return (
    <>
      <Image
        src="/menu.png"
        alt="menu"
        width={25}
        height={25}
        className="absolute top-3 left-6 cursor-pointer"
        onClick={() => {
          toggleChecklist();
        }}
      />
      <div className="text-left text-2xl font-bold pl-5 pt-12">
        학부 공지사항
      </div>
      <div className="text-xl text-gray-600/75 font-semibold">
        {MajorNotices.map((notice) => (
          <div
            key={notice.id}
            className="pt-3 pl-5 pb-4 flex items-start gap-5"
          >
            <Checkbox>
              <span
                className="break-keep cursor-pointer"
                onClick={() => handleTitleClick(notice.id)}
              >
                {notice.title}
              </span>
            </Checkbox>
            {activeNotice === notice.id && (
              <div className="absolute z-10 top-0 left-0 w-full h-full bg-white shadow-lg p-4 transition-transform transform translate-x-0">
                <Moredetail toggleChecklist={toggleChecklist}/>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
}