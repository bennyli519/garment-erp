'use client';

import { useState } from 'react';
import { Form, Input, Button, message, Steps } from 'antd';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface CompanyFormData {
  name: string;
  companyCode: string;
}

interface UserFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const [form] = Form.useForm();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: CompanyFormData & UserFormData) => {
    console.log('values',values)
    try {
      setLoading(true);
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      message.success('Registration successful! Please check your email to verify your account.');
      router.push('/auth/login');
    } catch (error) {
      message.error('Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: 'Company',
      content: (
        <>
          <Form.Item
            name="name"
            label="Company Name"
            rules={[{ required: true, message: 'Please enter company name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="companyCode"
            label="Company Code"
            rules={[{ required: true, message: 'Please enter company code' }]}
          >
            <Input />
          </Form.Item>
        </>
      ),
    },
    {
      title: 'Account',
      content: (
        <>
          <Form.Item
            name="name"
            label="Full Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </>
      ),
    },
  ];

  const next = async () => {
    try {
      await form.validateFields(currentStep === 0 ? ['name', 'companyCode'] : []);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      // Validation failed
    }
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <div>
      <Steps
        current={currentStep}
        items={steps.map((item) => ({ title: item.title }))}
        className="mb-8"
      />
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        {steps[currentStep].content}

        <div className="flex justify-between mt-6">
          {currentStep > 0 && (
            <Button onClick={prev}>Previous</Button>
          )}
          {currentStep < steps.length - 1 && (
            <Button type="primary" onClick={next}>Next</Button>
          )}
          {currentStep === steps.length - 1 && (
            <Button type="primary" htmlType="submit" loading={loading}>
              Register
            </Button>
          )}
        </div>
      </Form>

      <div className="text-center mt-4">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-blue-600 hover:text-blue-800">
          Login here
        </Link>
      </div>
    </div>
  );
} 