import React from 'react';

export const EnvDebugger = () => {
  const envVars = {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    VITE_API_BASE_URL: import.meta.env.VITE_API_BASE_URL,
    VITE_RAZORPAY_KEY_ID: import.meta.env.VITE_RAZORPAY_KEY_ID,
  };

  return (
    <div className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg text-xs max-w-md">
      <h3 className="font-bold mb-2">Environment Variables Debug:</h3>
      {Object.entries(envVars).map(([key, value]) => (
        <div key={key} className="mb-1">
          <strong>{key}:</strong> {value ? '✅ Set' : '❌ Missing'}
          {key.includes('KEY') ? null : <div className="text-gray-300 truncate">{value}</div>}
        </div>
      ))}
    </div>
  );
};