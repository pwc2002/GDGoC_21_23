import { Link, LinkIcon } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
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
