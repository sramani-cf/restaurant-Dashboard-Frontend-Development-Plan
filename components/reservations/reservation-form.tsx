'use client';

import React, { useState, useEffect } from 'react';
import { CreateReservationData, Guest } from '@/lib/reservations/types';
import { validateReservationData, getTimeSlots } from '@/lib/reservations/utils';
import { createReservationAction } from '@/app/reservations/actions';
import { getGuests, getAvailability } from '@/lib/reservations/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GuestSearch } from './guest-search';

interface ReservationFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (reservation: any) => void;
  initialDate?: string;
  initialTime?: string;
  className?: string;
}

export function ReservationForm({
  isOpen,
  onClose,
  onSuccess,
  initialDate,
  initialTime,
  className = ''
}: ReservationFormProps) {
  const [formData, setFormData] = useState<CreateReservationData>({
    partySize: 2,
    dateTime: '',
    duration: 120,
    source: 'phone',
    specialRequests: '',
    occasion: '',
    notes: ''
  });

  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [showGuestForm, setShowGuestForm] = useState(false);
  const [newGuest, setNewGuest] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [selectedDate, setSelectedDate] = useState(initialDate || '');
  const [selectedTime, setSelectedTime] = useState(initialTime || '');

  // Initialize form with initial values
  useEffect(() => {
    if (initialDate && initialTime) {
      const dateTime = `${initialDate}T${selectedTime}:00`;
      setFormData(prev => ({ ...prev, dateTime }));
    }
  }, [initialDate, initialTime, selectedTime]);

  // Fetch available time slots when date or party size changes
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableSlots();
    }
  }, [selectedDate, formData.partySize]);

  const fetchAvailableSlots = async () => {
    try {
      const availability = await getAvailability(selectedDate);
      const slots = availability.slots
        .filter(slot => slot.available >= formData.partySize)
        .map(slot => slot.time);
      setAvailableSlots(slots);
    } catch (error) {
      console.error('Failed to fetch availability:', error);
      setAvailableSlots(getTimeSlots()); // Fallback to default slots
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors([]); // Clear errors when user makes changes
  };

  const handleDateTimeChange = () => {
    if (selectedDate && selectedTime) {
      const dateTime = `${selectedDate}T${selectedTime}:00`;
      handleInputChange('dateTime', dateTime);
    }
  };

  useEffect(() => {
    handleDateTimeChange();
  }, [selectedDate, selectedTime]);

  const handleGuestSelect = (guest: Guest) => {
    setSelectedGuest(guest);
    setShowGuestForm(false);
    setFormData(prev => ({ ...prev, guestId: guest.id }));
  };

  const handleNewGuestChange = (field: string, value: string) => {
    setNewGuest(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const validationErrors = validateReservationData({
      ...formData,
      guest: showGuestForm ? newGuest : undefined
    });

    if (!selectedGuest && !showGuestForm) {
      validationErrors.push('Please select a guest or add a new one');
    }

    if (showGuestForm) {
      if (!newGuest.firstName.trim()) validationErrors.push('First name is required');
      if (!newGuest.lastName.trim()) validationErrors.push('Last name is required');
      if (!newGuest.phone.trim()) validationErrors.push('Phone number is required');
    }

    setErrors(validationErrors);
    return validationErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const reservationData: CreateReservationData = {
        ...formData,
        guestId: selectedGuest?.id,
        guest: showGuestForm ? newGuest : undefined
      };

      const result = await createReservationAction(reservationData);

      if (result.success) {
        if (onSuccess && result.data) {
          onSuccess(result.data);
        }
        onClose();
        resetForm();
      } else {
        setErrors([result.error || 'Failed to create reservation']);
      }
    } catch (error) {
      setErrors(['An unexpected error occurred. Please try again.']);
      console.error('Reservation creation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      partySize: 2,
      dateTime: '',
      duration: 120,
      source: 'phone',
      specialRequests: '',
      occasion: '',
      notes: ''
    });
    setSelectedGuest(null);
    setShowGuestForm(false);
    setNewGuest({ firstName: '', lastName: '', phone: '', email: '' });
    setSelectedDate('');
    setSelectedTime('');
    setErrors([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={`max-w-2xl ${className}`}>
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">New Reservation</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Guest Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Guest Information
            </label>
            
            {!selectedGuest && !showGuestForm && (
              <div className="space-y-3">
                <GuestSearch 
                  onGuestSelect={handleGuestSelect}
                  placeholder="Search for existing guest..."
                />
                <div className="text-center">
                  <span className="text-gray-500 text-sm">or </span>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowGuestForm(true)}
                  >
                    Add New Guest
                  </Button>
                </div>
              </div>
            )}

            {selectedGuest && (
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">
                      {selectedGuest.firstName} {selectedGuest.lastName}
                    </div>
                    <div className="text-sm text-gray-600">
                      {selectedGuest.phone} • {selectedGuest.email}
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <Badge variant="outline">{selectedGuest.vipStatus}</Badge>
                      <Badge variant="outline">{selectedGuest.totalVisits} visits</Badge>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setSelectedGuest(null)}
                  >
                    Change
                  </Button>
                </div>
              </Card>
            )}

            {showGuestForm && (
              <Card className="p-4 border-blue-200 bg-blue-50">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <Input
                    label="First Name"
                    value={newGuest.firstName}
                    onChange={(e) => handleNewGuestChange('firstName', e.target.value)}
                    required
                  />
                  <Input
                    label="Last Name"
                    value={newGuest.lastName}
                    onChange={(e) => handleNewGuestChange('lastName', e.target.value)}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Phone Number"
                    type="tel"
                    value={newGuest.phone}
                    onChange={(e) => handleNewGuestChange('phone', e.target.value)}
                    required
                  />
                  <Input
                    label="Email (Optional)"
                    type="email"
                    value={newGuest.email}
                    onChange={(e) => handleNewGuestChange('email', e.target.value)}
                  />
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setShowGuestForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </Card>
            )}
          </div>

          {/* Reservation Details */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date"
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Time
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select time</option>
                {availableSlots.map(slot => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Party Size"
              type="number"
              min="1"
              max="20"
              value={formData.partySize}
              onChange={(e) => handleInputChange('partySize', parseInt(e.target.value))}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (minutes)
              </label>
              <select
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e.target.value))}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value={90}>90 minutes</option>
                <option value={120}>2 hours</option>
                <option value={150}>2.5 hours</option>
                <option value={180}>3 hours</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Source
              </label>
              <select
                value={formData.source}
                onChange={(e) => handleInputChange('source', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="phone">Phone</option>
                <option value="online">Online</option>
                <option value="walk-in">Walk-in</option>
                <option value="app">Mobile App</option>
              </select>
            </div>

            <Input
              label="Special Occasion (Optional)"
              value={formData.occasion || ''}
              onChange={(e) => handleInputChange('occasion', e.target.value)}
              placeholder="Birthday, Anniversary, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Special Requests
            </label>
            <textarea
              value={formData.specialRequests || ''}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              rows={3}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Window seat, high chair, allergies, etc."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Internal Notes
            </label>
            <textarea
              value={formData.notes || ''}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={2}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Staff notes (not visible to guest)"
            />
          </div>

          {/* Error Display */}
          {errors.length > 0 && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="text-sm text-red-600">
                <div className="font-medium mb-1">Please fix the following errors:</div>
                <ul className="list-disc list-inside space-y-1">
                  {errors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="flex justify-end space-x-3 pt-6 border-t">
            <Button
              type="button"
              variant="ghost"
              onClick={handleClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-[120px]"
            >
              {isLoading ? 'Creating...' : 'Create Reservation'}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}