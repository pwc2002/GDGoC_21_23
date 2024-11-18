"use client";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

// 데이터를 직접 import
import colleges from "../data/Colleges.json";
import engineering from "../data/Engineering.json";
import liberalarts from "../data/Prontier.json";
import arts_sports from "../data/Arts_Sports.json";
import bio from "../data/Bio.json";
import business from "../data/Business.json";
import future_Convergence from "../data/Future_Convergence.json";
import global_Convergence from "../data/Global_Convergence.json";
import humanities from "../data/Humanities.json";
import medicine from "../data/Medicine.json";
import nature_science from "../data/Nature_Science.json";
import nursing from "../data/Nursing.json";
import social_science from "../data/Social_Science.json";
import software_convergence from "../data/Software_Convergence.json";
import teaching from "../data/Teaching.json";

export default function CollegeSelector() {
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [departments, setDepartments] = useState([]);

  // 단과대학별 학과 데이터 매핑
  const departmentMap = {
    Prontier: liberalarts, // 프런티어 학부 데이터 매핑
    Engineering: engineering,
    Nature_Science: nature_science,
    Business: business,
    Teaching: teaching,
    Social_Science: social_science,
    Humanities: humanities,
    Medicine: medicine,
    Nursing: nursing,
    Future_Convergence: future_Convergence,
    Arts_Sports: arts_sports,
    Global_Convergence: global_Convergence,
    Software_Convergence: software_convergence,
    Bio: bio,
  };

  // 단과대학 선택 처리
  const handleCollegeSelection = (key) => {
    const selected = colleges.find((item) => item.key === key);
    setSelectedCollege(selected);
    setSelectedDepartment(null); // 단과대학이 변경되면 학과 선택 초기화

    // 해당 단과대학의 학과 데이터 설정
    setDepartments(departmentMap[key] || []);
  };

  // 학과 선택 처리
  const handleDepartmentSelection = (key) => {
    const selected = departments.find((item) => item.key === key);
    setSelectedDepartment(selected);
  };

  // 선택 상태 확인
  const isValid = !!selectedCollege && !!selectedDepartment;

  return (
    <>
      <div className="text-lg font-bold w-full flex pt-32">
        먼저, 학사 정보를 선택해주세요.
      </div>
      <div className="pt-1 text-sm text-gray-500">
        하단 박스를 선택해야 맞춤 서비스를 제공할 수 있어요.
      </div>

      {/* 단과대학 선택 드롭다운 */}
      <div className="relative flex pt-14">
        <Dropdown>
          <DropdownTrigger>
            <Button variant="bordered" className="w-full justify-start">
              {selectedCollege ? selectedCollege.label : "단과대학 선택"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="단과대학 선택"
            onAction={(key) => handleCollegeSelection(key)}
          >
            {colleges.map((college) => (
              <DropdownItem key={college.key}>{college.label}</DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* 학과 선택 드롭다운 */}
      <div className="pt-4">
        <Dropdown>
          <DropdownTrigger>
            <Button
              variant="bordered"
              className="w-full justify-start"
              isDisabled={!selectedCollege}
            >
              {selectedDepartment ? selectedDepartment.label : "학과 선택"}
            </Button>
          </DropdownTrigger>
          <DropdownMenu
            aria-label="학과 선택"
            onAction={(key) => handleDepartmentSelection(key)}
          >
            {departments.map((department) => (
              <DropdownItem key={department.key}>
                {department.label}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
      </div>

      {/* 선택된 정보 표시 */}
      <div>
        {selectedCollege && selectedDepartment && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm">선택된 단과대학: {selectedCollege.label}</p>
            <p className="text-sm">선택된 학과: {selectedDepartment.label}</p>
          </div>
        )}
      </div>

      {/* 하단 고정 버튼 */}
      <div className="bottom-[73px] fixed pl-3.5 w-full flex">
        <Button
          variant="solid"
          color="primary"
          isDisabled={!isValid}
          onClick={() => {}}
          className={`w-[320px] text-white ${
            isValid ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          선택 완료
        </Button>
      </div>
    </>
  );
}
