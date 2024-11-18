"use client";
import React, { useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import colleges from '../data/Colleges.json';

export default function App() {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectionChange = (key) => {
    const selected = colleges.find(item => item.key === key);
    setSelectedItem(selected);
  };

  // colleges가 배열인지 확인하고 콘솔에 출력
  console.log('colleges:', colleges);

  return (
    <>
      <div>
        <div>먼저, 학사 정보를 선택해주세요.</div>
        <div>하단 박스를 선택해야 맞춤 서비스를 제공할 수 있어요.</div>
      </div>
      <Dropdown>
        <DropdownTrigger>
          <Button variant="bordered">
            {selectedItem ? selectedItem.label : "단과대학 선택"}
          </Button>
        </DropdownTrigger>
        <DropdownMenu 
          aria-label="Dynamic Actions" 
          items={colleges}
        >
          {colleges.map((item) => (
            <DropdownItem
              key={item.key}
              onPress={() => handleSelectionChange(item.key)}
            >
              {item.label}
            </DropdownItem>
          ))}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}