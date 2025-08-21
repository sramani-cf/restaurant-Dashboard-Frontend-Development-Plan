'use client';

import { useState, useEffect } from 'react';
import { AppShell } from '@/components/layout';
import { POSTerminal } from './pos-terminal';
import { POSLogin } from './pos-login';
import { POSSession } from '@/lib/pos/types';

export default function POSPage() {
  const [session, setSession] = useState<POSSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedSession = localStorage.getItem('pos_session');
    if (savedSession) {
      setSession(JSON.parse(savedSession));
    }
    setIsLoading(false);
  }, []);

  const handleLogin = (employeeId: string, employeeName: string) => {
    const newSession: POSSession = {
      id: `session-${Date.now()}`,
      terminalId: 'pos-001',
      employeeId,
      employeeName,
      startTime: new Date(),
      status: 'active',
      openingBalance: 200,
      currentBalance: 200,
      expectedBalance: 200,
      salesCount: 0,
      refundsCount: 0,
      voidCount: 0
    };
    
    setSession(newSession);
    localStorage.setItem('pos_session', JSON.stringify(newSession));
  };

  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem('pos_session');
  };

  if (isLoading) {
    return (
      <AppShell title="POS Terminal" description="Point of Sale system">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-xl">Loading POS Terminal...</div>
        </div>
      </AppShell>
    );
  }

  if (!session) {
    return (
      <AppShell title="POS Terminal" description="Point of Sale system">
        <POSLogin onLogin={handleLogin} />
      </AppShell>
    );
  }

  return (
    <AppShell title="POS Terminal" description="Point of Sale system" breadcrumbs={[{ label: 'POS' }]}>
      <POSTerminal session={session} onLogout={handleLogout} />
    </AppShell>
  );
}