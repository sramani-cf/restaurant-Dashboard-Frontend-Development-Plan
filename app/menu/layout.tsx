import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Menu Management | Restaurant Dashboard',
  description: 'Manage your restaurant menus, items, and modifiers',
};

interface MenuLayoutProps {
  children: React.ReactNode;
}

export default function MenuLayout({ children }: MenuLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}