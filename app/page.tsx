import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <>
      <div className="absolute top-12 left-5 object-cover h-5 w-5">
        <img src="./pngwing.com.png" alt="menu button"/>
      </div>
      <div className="flex flex-col w-full h-screen absolute top-20 left-10">
        <div className="text-left text-2xl font-bold relative top-10">장학금 안내</div>
        <div className="relative top-10 text-xl text-gray-600/75 font-semibold">
          <div className="relative top-5 pt-3 pb-4">
            <input type="checkbox"></input>
            <span className="relative left-5">내용</span>
          </div>
          <div className="relative top-5 pb-4">
            <input type="checkbox"></input>
            <span className="relative left-5">알아서</span>
          </div>
          <div className="relative top-5 pb-4">
            <input type="checkbox"></input>
            <span className="relative left-5">알잘딱깔센으로</span>
          </div>
          <div className="relative top-5 pb-4">
            <input type="checkbox"></input>
            <span className="relative left-5">채워주시리라고</span>
          </div>
          <div className="relative top-5 pb-4">
            <input type="checkbox"></input>
            <span className="relative left-5">생각하셨겠지만 오산입니다. (경기도 오산 아님.)</span>
          </div>
          <div className="relative top-10">
            <span className="relative left-5">머야 이거 주석 어케 담?</span>
            <br></br>
            <span className="relative left-5">
              그치만 이렇게 하면 안되겠죠...
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
