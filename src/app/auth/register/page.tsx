'use client';

import { Card } from 'antd';
import RegisterForm from './components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold">Create an Account</h1>
          <p className="text-gray-600">Join us to manage your garment business</p>
        </div>
        <RegisterForm />
      </Card>
    </div>
  );
} 