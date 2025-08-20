'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Guest } from '@/lib/reservations/types';
import { getGuests } from '@/lib/reservations/data';
import { searchGuests } from '@/lib/reservations/utils';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface GuestSearchProps {
  onGuestSelect: (guest: Guest) => void;
  placeholder?: string;
  className?: string;
}

export function GuestSearch({ 
  onGuestSelect, 
  placeholder = "Search guests...",
  className = '' 
}: GuestSearchProps) {
  const [query, setQuery] = useState('');
  const [guests, setGuests] = useState<Guest[]>([]);
  const [filteredGuests, setFilteredGuests] = useState<Guest[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load all guests on component mount
  useEffect(() => {
    loadGuests();
  }, []);

  // Filter guests when query changes
  useEffect(() => {
    if (query.trim().length > 0) {
      const filtered = searchGuests(guests, query);
      setFilteredGuests(filtered.slice(0, 10)); // Limit to 10 results
      setIsOpen(filtered.length > 0);
      setSelectedIndex(-1);
    } else {
      setFilteredGuests([]);
      setIsOpen(false);
      setSelectedIndex(-1);
    }
  }, [query, guests]);

  const loadGuests = async () => {
    try {
      setIsLoading(true);
      const guestData = await getGuests();
      setGuests(guestData);
    } catch (error) {
      console.error('Failed to load guests:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleInputFocus = () => {
    if (query.trim().length > 0 && filteredGuests.length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputBlur = () => {
    // Delay closing to allow for clicks on dropdown items
    setTimeout(() => {
      setIsOpen(false);
    }, 200);
  };

  const handleGuestClick = (guest: Guest) => {
    setQuery(`${guest.firstName} ${guest.lastName}`);
    setIsOpen(false);
    onGuestSelect(guest);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || filteredGuests.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredGuests.length - 1 ? prev + 1 : prev
        );
        break;
      
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < filteredGuests.length) {
          handleGuestClick(filteredGuests[selectedIndex]);
        }
        break;
      
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  const getGuestVIPBadge = (guest: Guest) => {
    if (guest.vipStatus === 'regular') return null;
    
    const colors = {
      frequent: 'bg-blue-100 text-blue-800',
      vip: 'bg-purple-100 text-purple-800',
      celebrity: 'bg-red-100 text-red-800'
    };

    return (
      <Badge className={`text-xs ${colors[guest.vipStatus]}`}>
        {guest.vipStatus.toUpperCase()}
      </Badge>
    );
  };

  const formatPhoneNumber = (phone: string) => {
    // Simple phone number formatting
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 10) {
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    }
    return phone;
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;
    
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200">{part}</mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className={`relative ${className}`}>
      <Input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onKeyDown={handleKeyDown}
        className="w-full"
        disabled={isLoading}
      />

      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-gray-300 border-t-blue-600"></div>
        </div>
      )}

      {isOpen && (
        <div 
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto"
        >
          {filteredGuests.length > 0 ? (
            <ul className="py-1">
              {filteredGuests.map((guest, index) => (
                <li
                  key={guest.id}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    index === selectedIndex 
                      ? 'bg-blue-50 border-l-2 border-blue-500' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleGuestClick(guest)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-medium text-gray-900">
                          {highlightMatch(`${guest.firstName} ${guest.lastName}`, query)}
                        </span>
                        {getGuestVIPBadge(guest)}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span>{highlightMatch(formatPhoneNumber(guest.phone), query)}</span>
                        {guest.email && (
                          <span>{highlightMatch(guest.email, query)}</span>
                        )}
                      </div>
                      
                      <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                        <span>{guest.totalVisits} visits</span>
                        <span>Avg: ${guest.averageSpend.toFixed(0)}</span>
                        {guest.lastVisit && (
                          <span>
                            Last: {new Date(guest.lastVisit).toLocaleDateString()}
                          </span>
                        )}
                      </div>

                      {/* Preferences indicators */}
                      {(guest.preferences.dietaryRestrictions?.length || 
                        guest.preferences.allergies?.length ||
                        guest.preferences.seatingPreference) && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {guest.preferences.seatingPreference && (
                            <Badge variant="outline" className="text-xs">
                              {guest.preferences.seatingPreference}
                            </Badge>
                          )}
                          {guest.preferences.dietaryRestrictions?.map(restriction => (
                            <Badge key={restriction} variant="outline" className="text-xs bg-orange-50 text-orange-700">
                              {restriction}
                            </Badge>
                          ))}
                          {guest.preferences.allergies?.map(allergy => (
                            <Badge key={allergy} variant="outline" className="text-xs bg-red-50 text-red-700">
                              ⚠️ {allergy}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : query.length > 2 ? (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              No guests found matching "{query}"
            </div>
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              Type at least 3 characters to search
            </div>
          )}

          {/* Quick add option when no results */}
          {query.length > 2 && filteredGuests.length === 0 && (
            <div className="border-t border-gray-200">
              <button
                type="button"
                className="w-full px-4 py-3 text-sm text-left text-blue-600 hover:bg-blue-50 transition-colors"
                onClick={() => {
                  // This would trigger the new guest form
                  setQuery('');
                  setIsOpen(false);
                }}
              >
                + Add "{query}" as new guest
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}