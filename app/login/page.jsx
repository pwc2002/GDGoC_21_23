"use client"

import React, { useState } from 'react';

import LoginComponent from '../../components/LoginComponent';
import Signup1Component from '../../components/Signup1Component';
import Signup2Component from '../../components/Signup2Component';

export default function LoginPage() {
  const [viewPage, setViewPage] = useState('login');

  const renderView = () => {
    switch (viewPage) {
      case 'login':
        return <LoginComponent setViewPage={setViewPage} />;
      case 'signup1':
        return <Signup1Component setViewPage={setViewPage} />;
      case 'signup2':
        return <Signup2Component setViewPage={setViewPage} />;
      default:
        return <LoginComponent setViewPage={setViewPage} />;
    }
  };

  return <>{renderView()}</>;
}