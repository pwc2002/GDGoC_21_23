"use client";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "@nextui-org/link";

export default function App() {
  return (
    <>
      <div className="pt-32">
        <div className="pl-14 text-xs font-bold text-gray-400">학과 공지사항</div>
        <div className="pl-5">
          <Checkbox defaultSelected className="font-bold" size="lg">
            2024학년도 2학기 성장현 후배드림 장학기금 장학생 선발 안내
          </Checkbox>
        </div>
        <div className="pl-5 pt-12 font-bold text-gray-500">
          <h2 className="pb-3">가.</h2>
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
