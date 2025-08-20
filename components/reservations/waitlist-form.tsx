'use client';

import React, { useState } from 'react';
import { CreateWaitlistEntryData, WaitlistEntry } from '@/lib/reservations/types';
import { addToWaitlistAction } from '@/app/reservations/actions';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface WaitlistFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (entry: WaitlistEntry) => void;
}

export function WaitlistForm({ isOpen, onClose, onSuccess }: WaitlistFormProps) {
  const [formData, setFormData] = useState<CreateWaitlistEntryData>({
    partySize: 2,
    estimatedWaitTime: 30,
    quotedWaitTime: 30
  });

  const [newGuest, setNewGuest] = useState({
    firstName: '',
    lastName: '',
    phone: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await addToWaitlistAction({
        ...formData,
        guest: newGuest
      });

      if (result.success && result.data) {
        onSuccess?.(result.data);
      }
    } catch (error) {
      console.error('Failed to add to waitlist:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-md">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Add to Waitlist</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="First Name"
            value={newGuest.firstName}
            onChange={(e) => setNewGuest(prev => ({ ...prev, firstName: e.target.value }))}
            required
          />
          
          <Input
            label="Last Name"
            value={newGuest.lastName}
            onChange={(e) => setNewGuest(prev => ({ ...prev, lastName: e.target.value }))}
            required
          />
          
          <Input
            label="Phone Number"
            value={newGuest.phone}
            onChange={(e) => setNewGuest(prev => ({ ...prev, phone: e.target.value }))}
            required
          />
          
          <Input
            label="Party Size"
            type="number"
            min="1"
            max="20"
            value={formData.partySize}
            onChange={(e) => setFormData(prev => ({ ...prev, partySize: parseInt(e.target.value) }))}
            required
          />
          
          <Input
            label="Quoted Wait Time (minutes)"
            type="number"
            min="5"
            max="180"
            value={formData.quotedWaitTime}
            onChange={(e) => setFormData(prev => ({ ...prev, quotedWaitTime: parseInt(e.target.value) }))}
            required
          />

          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="ghost" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? 'Adding...' : 'Add to Waitlist'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}