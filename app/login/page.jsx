"use client"

import React, { useState } from 'react';

import LoginComponent from '../../components/LoginComponent';
import Signup1Component from '../../components/Signup1Component';
import Signup2Component from '../../components/Signup2Component';

// page url 변경 없이, 메인 로그인 시작 페이지 -> 서비스 동의 -> 학사정보 입력 등
// 자연스럽게 넘어가는게 좋을 것 같아, login url에 각각 import 해서 보여주는 방식
// 으로 코드를 짰어요.. 각 페이지 각 컴포넌트 들어가서 작업하심 될듯 합니다.

export default function login() {

  const [viewPage, setViewpage] = useState('login');

  const renderView = () => {
    switch(viewPage) {
      case 'login' :
        return <LoginComponent />;
      case 'signup1' :
        return <Signup1Component />;
      case 'signup2' :
        return <Signup2Component />;
      default:
        return <LoginComponent />;
    }
  }

  return (<>
  {renderView()}
  </>);
};