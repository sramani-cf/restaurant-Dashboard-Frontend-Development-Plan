'use client';

import { useState } from 'react';
import { Lock, User, Hash } from 'lucide-react';

interface POSLoginProps {
  onLogin: (employeeId: string, employeeName: string) => void;
}

export function POSLogin({ onLogin }: POSLoginProps) {
  const [employeeId, setEmployeeId] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handlePinPad = (digit: string) => {
    if (pin.length < 4) {
      setPin(pin + digit);
    }
  };

  const handleClear = () => {
    setPin('');
    setError('');
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const handleLogin = () => {
    if (!employeeId) {
      setError('Please enter Employee ID');
      return;
    }
    if (pin.length !== 4) {
      setError('PIN must be 4 digits');
      return;
    }

    // Mock authentication
    if (pin === '1234') {
      const employeeName = employeeId === '001' ? 'John Manager' : 
                          employeeId === '002' ? 'Jane Server' : 
                          'Employee';
      onLogin(employeeId, employeeName);
    } else {
      setError('Invalid PIN');
      setPin('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-full mb-4">
              <Lock className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-white">POS Terminal</h1>
            <p className="text-gray-400 mt-2">Sign in to continue</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-gray-400 text-sm mb-2">Employee ID</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="text"
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter your ID"
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-2">PIN Code</label>
              <div className="relative mb-4">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  type="password"
                  value={pin}
                  readOnly
                  className="w-full bg-gray-700 text-white pl-10 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest"
                  placeholder="••••"
                />
              </div>

              {/* PIN Pad */}
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                  <button
                    key={num}
                    onClick={() => handlePinPad(num.toString())}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold py-4 rounded-lg transition-colors"
                  >
                    {num}
                  </button>
                ))}
                <button
                  onClick={handleClear}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-400 py-4 rounded-lg transition-colors text-sm"
                >
                  Clear
                </button>
                <button
                  onClick={() => handlePinPad('0')}
                  className="bg-gray-700 hover:bg-gray-600 text-white text-xl font-semibold py-4 rounded-lg transition-colors"
                >
                  0
                </button>
                <button
                  onClick={handleBackspace}
                  className="bg-gray-700 hover:bg-gray-600 text-gray-400 py-4 rounded-lg transition-colors"
                >
                  ←
                </button>
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={!employeeId || pin.length !== 4}
              className="w-full bg-primary hover:bg-primary/90 disabled:bg-gray-700 disabled:text-gray-500 text-white font-semibold py-4 rounded-lg transition-colors"
            >
              Sign In
            </button>
          </div>

          <div className="mt-6 text-center text-gray-500 text-sm">
            <p>Demo PIN: 1234</p>
            <p>Employee IDs: 001 (Manager), 002 (Server)</p>
          </div>
        </div>
      </div>
    </div>
  );
}