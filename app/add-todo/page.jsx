"use client";
import React, { useState, useEffect } from "react";
import { Button, DatePicker } from "@nextui-org/react";
import { Input } from "@nextui-org/input";
import { Textarea } from "@nextui-org/input";

export default function App() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [title, setTitle] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [dateError, setDateError] = useState(false);

  // 폼 유효성 검사
  useEffect(() => {
    // 모든 필수 필드가 입력되었는지 확인
    const hasRequiredFields = startDate && endDate && title.trim() !== "";
    
    // 날짜 유효성 검사
    const isDateValid = startDate && endDate ? 
      new Date(startDate) <= new Date(endDate) : true;

    setDateError(!isDateValid && startDate && endDate);
    setIsValid(hasRequiredFields && isDateValid);
  }, [startDate, endDate, title]);

  // 일정 추가 처리
  const handleSubmit = () => {
    if (isValid) {
      // 여기에 일정 추가 로직 구현
      console.log("일정 추가:", { startDate, endDate, title });
    }
  };

  return (
    <>
      <div className="mt-[84px] pl-3.5">
        <div className="flex font-bold text-2xl">일정을 추가해볼까요?</div>
        <div className="pt-5">
          <div className="pb-5">
            <DatePicker 
              label="시작 날짜" 
              className="max-w-xs"
              value={startDate}
              onChange={setStartDate}
              isInvalid={dateError}
            />
          </div>
          <div>
            <DatePicker 
              label="종료 날짜" 
              className="max-w-xs"
              value={endDate}
              onChange={setEndDate}
              isInvalid={dateError}
              errorMessage={dateError ? "종료 날짜는 시작 날짜보다 같거나 늦어야 합니다" : ""}
            />
          </div>
        </div>
        <div className="pt-5 flex flex-wrap md:flex-nowrap max-w-xs">
          <Input 
            type="text"
            label="제목" 
            placeholder="제목을 입력해주세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            isRequired
          />
          <Textarea
            label="내용"
            placeholder="내용을 입력해주세요."
            className="max-w-xs pt-5"
            maxRows="3"
          />
        </div>
      </div>
      <div className="bottom-[73px] fixed pl-3.5 w-full flex">
        <Button 
          className={`w-[320px] text-white ${
            isValid ? "bg-blue-600" : "bg-gray-400"
          }`}
          onClick={handleSubmit}
          isDisabled={!isValid}
        >
          일정 추가
        </Button>
      </div>
    </>
  );
}