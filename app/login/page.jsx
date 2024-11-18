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
        return <LoginComponent />;
      case 'signup1':
        return <Signup1Component />;
      case 'signup2':
        return <Signup2Component />;
      default:
        return <LoginComponent />;
    }
  };

  return <>{renderView()}</>;
}