"use client";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "@nextui-org/link";
import Image from "next/image";

export default function MoreDetail({toggleChecklist}) {
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
      <div className="pt-12">
        <div className="pl-14 text-xs font-bold text-gray-400">학과 공지사항</div>
        <div className="pl-5">
          <Checkbox defaultSelected className="font-bold text-2xl" size="lg">
            2024학년도 2학기 성장현 후배드림 장학기금 장학생 선발 안내
          </Checkbox>
        </div>
        <div className="pl-5 pt-12 font-bold text-gray-500 text-base">
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
        </div>
        <div className="pl-5">
          <Link href="https://cse.inha.ac.kr/cse/888/subview.do?enc=Zm5jdDF8QEB8JTJGYmJzJTJGY3NlJTJGMjQyJTJGMTM5Mzc1JTJGYXJ0Y2xWaWV3LmRvJTNG">
            바로가기
          </Link>
        </div>
      </div>
    </>
  );
}
