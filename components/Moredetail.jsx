"use client";
import { Checkbox } from "@nextui-org/checkbox";
import { Link } from "@nextui-org/link";
import Image from "next/image";
import { BackIcon } from "@/public/BackIcon";
import { useRouter } from "next/navigation";

export default function MoreDetail({toggleChecklist, notice, setActiveNotice}) {
  const router = useRouter();
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
      <div className="absolute top-3 right-6 cursor-pointer" onClick={()=>{
        setActiveNotice(null);
      }}>
        <BackIcon />
      </div>
      <div className="pt-12">
        <div className="pl-14 text-xs font-bold text-gray-400">학과 공지사항</div>
        <div className="pl-5">
          <Checkbox defaultSelected className="font-bold text-2xl" size="lg">
            {notice.title}
          </Checkbox>
        </div>
        <div className="pl-5 pt-12 font-bold text-gray-500 text-base">
          <h2 className="pb-3">
            {notice.description}
            <br/>
          </h2>
        </div>
        <div className="pl-5">
          <Link href={notice.link} target="_blank">
            바로가기
          </Link>
        </div>
      </div>
    </>
  );
}
