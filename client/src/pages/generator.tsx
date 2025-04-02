import React from 'react';
import PolicyForm from '@/components/policy-generator/PolicyForm';

const Generator: React.FC = () => {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Privacy Policy Generator</h1>
        <p className="mt-2 text-gray-600">Create a custom privacy policy that complies with GDPR and CCPA regulations for your website.</p>
      </div>

      <PolicyForm />
    </main>
  );
};

export default Generator;
