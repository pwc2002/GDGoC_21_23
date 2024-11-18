import { Link } from "@nextui-org/link";

export default function SettingPage() {
  return (
    <>
      <div className="flex flex-col w-full justify-center items-center text-5xl font-bold h-3/4">
        캘린더 박스
      </div>
      <div className="flex flex-col w-full justify-center items-center text-5xl font-bold">
        일정 설명 박스
      </div>
      <Link href="/login">
        <button className="">
          로그인
        </button>
      </Link>
    </>
  );
}
