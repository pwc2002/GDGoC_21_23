"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function CategoryPage() {
    const [showEmployment, setShowEmployment] = useState(false);
    const [showDepartment, setShowDepartment] = useState(false);
    const [showScholarship, setShowScholarship] = useState(false);
    const [showClub, setShowClub] = useState(false);

    const handleEmploymentClick = () => {
        setShowEmployment((prev) => !prev);
        setShowDepartment(false);
        setShowScholarship(false);
        setShowClub(false);
    };

    const handleDepartmentClick = () => {
        setShowEmployment(false);
        setShowDepartment((prev) => !prev);
        setShowScholarship(false);
        setShowClub(false);
    };

    const handleScholarshipClick = () => {
        setShowEmployment(false);
        setShowDepartment(false);
        setShowScholarship((prev) => !prev);
        setShowClub(false);
    };

    const handleClubClick = () => {
        setShowEmployment(false);
        setShowDepartment(false);
        setShowScholarship(false);
        setShowClub((prev) => !prev);
    };

    return (
        <>
            <div className="absolute top-12 left-5">
                <Image src="/menu.png" alt="category" width={25} height={25} />
            </div>
            
            <div className="flex flex-col w-full h-screen justify-start items-start pl-5 pt-32">
                <div className="text-left text-xl font-bold space-y-2 pl-3">
                    <button onClick={handleEmploymentClick} className="mb-2 text-left focus:outline-none">
                        전체 공지사항
                    </button>
                    {showEmployment && (
                        <div className="flex flex-col pl-5 text-xl text-gray-400 space-y-2">
                            <p>취업 공지/후기</p>
                            <p>민원신청/불편 신고</p>
                            <p>학교발전 건의함</p>
                            <p>분실물 센터</p>
                            <p>인하 장터</p>
                        </div>
                    )}
                    <br/>
                    <button onClick={handleDepartmentClick} className="mt-6 pb-2 text-left focus:outline-none">
                        학과 공지사항
                    </button>
                    {showDepartment && (
                        <div className="flex flex-col pl-5 text-xl text-gray-400 space-y-2">
                            <p>학부</p>
                            <p>대학원</p>
                            <p>학과</p>
                            <p>교내</p>
                        </div>
                    )}
                    <br/>
                    <button onClick={handleScholarshipClick} className="mt-6 pb-2 text-left focus:outline-none">
                        장학금 안내
                    </button>
                    {showScholarship && (
                        <div className="flex flex-col pl-5 text-xl text-gray-400 space-y-2">
                            <p>학부-국가장학</p>
                            <p>학부-교내장학</p>
                            <p>학부-교외장학</p>
                        </div>
                    )}
                    <br/>
                    <button onClick={handleClubClick} className="mt-6 mb-2 text-left focus:outline-none">
                        동아리 안내
                    </button>
                    {showClub && (
                        <div className="flex flex-col pl-5 text-xl text-gray-400 space-y-2">
                            <p>중앙동아리</p>
                            <p>학생회</p>
                            <p>소모임(단과대학)</p>
                            <p>소모임(학부,과,일반대학원)</p>
                            <p>기타</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
