'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Table, DiningArea, FloorPlanElement } from '@/lib/reservations/types';
import { getTableStatusColor, isPointInTable, getTableCenter } from '@/lib/reservations/utils';
import { updateTableStatusAction } from '@/app/reservations/actions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FloorPlanProps {
  diningArea: DiningArea;
  tables: Table[];
  isEditable?: boolean;
  selectedTableId?: string | null;
  onTableSelect?: (table: Table) => void;
  onTableStatusChange?: (tableId: string, status: Table['status']) => void;
  className?: string;
}

interface TablePosition {
  id: string;
  x: number;
  y: number;
}

export function FloorPlan({
  diningArea,
  tables,
  isEditable = false,
  selectedTableId,
  onTableSelect,
  onTableStatusChange,
  className = ''
}: FloorPlanProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [draggedTable, setDraggedTable] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [hoveredTable, setHoveredTable] = useState<string | null>(null);

  const handleTableClick = useCallback((table: Table) => {
    if (onTableSelect) {
      onTableSelect(table);
    }
  }, [onTableSelect]);

  const handleTableDragStart = useCallback((e: React.MouseEvent, table: Table) => {
    if (!isEditable) return;
    
    e.preventDefault();
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setDraggedTable(table.id);
    setDragOffset({
      x: x - table.x,
      y: y - table.y
    });
  }, [isEditable]);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggedTable || !svgRef.current) return;

    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    // Update table position (in a real app, this would update state)
    const tableElement = document.getElementById(`table-${draggedTable}`);
    if (tableElement) {
      tableElement.setAttribute('x', x.toString());
      tableElement.setAttribute('y', y.toString());
    }
  }, [draggedTable, dragOffset]);

  const handleMouseUp = useCallback(() => {
    setDraggedTable(null);
    setDragOffset({ x: 0, y: 0 });
  }, []);

  const getTableShape = (table: Table) => {
    const { x, y, width, height, shape } = table;
    
    switch (shape) {
      case 'round':
        const radius = Math.min(width, height) / 2;
        const centerX = x + width / 2;
        const centerY = y + height / 2;
        return (
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill={getTableStatusColor(table.status)}
            stroke={selectedTableId === table.id ? '#3B82F6' : '#374151'}
            strokeWidth={selectedTableId === table.id ? 3 : 1.5}
            opacity={table.status === 'maintenance' ? 0.5 : 1}
          />
        );
      
      case 'square':
      case 'rectangular':
      default:
        return (
          <rect
            x={x}
            y={y}
            width={width}
            height={height}
            fill={getTableStatusColor(table.status)}
            stroke={selectedTableId === table.id ? '#3B82F6' : '#374151'}
            strokeWidth={selectedTableId === table.id ? 3 : 1.5}
            rx={4}
            opacity={table.status === 'maintenance' ? 0.5 : 1}
          />
        );
    }
  };

  const getTableLabel = (table: Table) => {
    const center = getTableCenter(table);
    return (
      <text
        x={center.x}
        y={center.y}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="12"
        fontWeight="600"
        fill="white"
        className="pointer-events-none select-none"
      >
        {table.number}
      </text>
    );
  };

  const getCapacityLabel = (table: Table) => {
    const center = getTableCenter(table);
    return (
      <text
        x={center.x}
        y={center.y + 15}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="10"
        fill="white"
        className="pointer-events-none select-none"
        opacity={0.8}
      >
        {table.capacity} seats
      </text>
    );
  };

  const renderGrid = () => {
    const gridSize = 20;
    const lines = [];
    
    // Vertical lines
    for (let x = 0; x <= diningArea.layout.width; x += gridSize) {
      lines.push(
        <line
          key={`v-${x}`}
          x1={x}
          y1={0}
          x2={x}
          y2={diningArea.layout.height}
          stroke="#E5E7EB"
          strokeWidth={0.5}
          opacity={0.3}
        />
      );
    }
    
    // Horizontal lines
    for (let y = 0; y <= diningArea.layout.height; y += gridSize) {
      lines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={y}
          x2={diningArea.layout.width}
          y2={y}
          stroke="#E5E7EB"
          strokeWidth={0.5}
          opacity={0.3}
        />
      );
    }
    
    return lines;
  };

  return (
    <Card className={`p-4 ${className}`}>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">{diningArea.name}</h3>
          <div className="flex items-center space-x-2">
            <Badge variant="outline" className="text-xs">
              Floor {diningArea.floor}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {tables.length} Tables
            </Badge>
          </div>
        </div>
        
        {/* Status Legend */}
        <div className="flex flex-wrap gap-3 mt-2 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Occupied</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-amber-500"></div>
            <span>Reserved</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-gray-500"></div>
            <span>Cleaning</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span>Maintenance</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>Combined</span>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden bg-white">
        <svg
          ref={svgRef}
          width="100%"
          height="400"
          viewBox={`0 0 ${diningArea.layout.width} ${diningArea.layout.height}`}
          className="bg-gray-50"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Grid */}
          {isEditable && renderGrid()}
          
          {/* Background Image */}
          {diningArea.layout.backgroundImage && (
            <image
              href={diningArea.layout.backgroundImage}
              width={diningArea.layout.width}
              height={diningArea.layout.height}
              opacity={0.3}
            />
          )}
          
          {/* Tables */}
          {tables.map((table) => (
            <g
              key={table.id}
              id={`table-${table.id}`}
              className={`cursor-pointer ${isEditable ? 'hover:opacity-80' : ''}`}
              onMouseDown={(e) => isEditable && handleTableDragStart(e, table)}
              onClick={() => handleTableClick(table)}
              onMouseEnter={() => setHoveredTable(table.id)}
              onMouseLeave={() => setHoveredTable(null)}
            >
              {getTableShape(table)}
              {getTableLabel(table)}
              {hoveredTable === table.id && getCapacityLabel(table)}
            </g>
          ))}
          
          {/* Selected Table Highlight */}
          {selectedTableId && tables.find(t => t.id === selectedTableId) && (
            <g className="pointer-events-none">
              {(() => {
                const table = tables.find(t => t.id === selectedTableId)!;
                const center = getTableCenter(table);
                return (
                  <circle
                    cx={center.x}
                    cy={center.y}
                    r={Math.max(table.width, table.height) / 2 + 10}
                    fill="none"
                    stroke="#3B82F6"
                    strokeWidth={2}
                    strokeDasharray="5,5"
                    opacity={0.7}
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values={`0 ${center.x} ${center.y};360 ${center.x} ${center.y}`}
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                );
              })()}
            </g>
          )}
        </svg>
      </div>

      {/* Table Status Summary */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-6 gap-2 text-sm">
        <div className="text-center">
          <div className="font-semibold text-green-600">
            {tables.filter(t => t.status === 'available').length}
          </div>
          <div className="text-gray-600">Available</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-red-600">
            {tables.filter(t => t.status === 'occupied').length}
          </div>
          <div className="text-gray-600">Occupied</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-amber-600">
            {tables.filter(t => t.status === 'reserved').length}
          </div>
          <div className="text-gray-600">Reserved</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-gray-600">
            {tables.filter(t => t.status === 'cleaning').length}
          </div>
          <div className="text-gray-600">Cleaning</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-purple-600">
            {tables.filter(t => t.status === 'maintenance').length}
          </div>
          <div className="text-gray-600">Maintenance</div>
        </div>
        <div className="text-center">
          <div className="font-semibold text-blue-600">
            {tables.filter(t => t.status === 'combined').length}
          </div>
          <div className="text-gray-600">Combined</div>
        </div>
      </div>

      {/* Quick Actions for Selected Table */}
      {selectedTableId && onTableStatusChange && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              Table {tables.find(t => t.id === selectedTableId)?.number} Actions:
            </span>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onTableStatusChange(selectedTableId, 'available')}
              >
                Set Available
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onTableStatusChange(selectedTableId, 'cleaning')}
              >
                Start Cleaning
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onTableStatusChange(selectedTableId, 'maintenance')}
              >
                Maintenance
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}