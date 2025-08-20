/**
 * KDS Timer Component
 * 
 * Displays real-time elapsed time for tickets with:
 * - Color-coded urgency indicators
 * - Smooth time updates every second
 * - Large, kitchen-visible display
 * - Audio alerts for urgent times
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { timeUtils, urgencyUtils, soundUtils, cn } from '../../lib/kds/utils'

interface TimerProps {
  startTime: Date
  cookTime?: number // Expected cook time in minutes
  isCompleted?: boolean
  showSeconds?: boolean
  showTarget?: boolean
  warningThreshold?: number // Minutes before warning
  urgentThreshold?: number // Minutes before urgent
  onWarning?: () => void
  onUrgent?: () => void
  onExpired?: () => void
  className?: string
  size?: 'small' | 'medium' | 'large' | 'extra-large'
  format?: 'digital' | 'analog' | 'minimal'
}

export function Timer({
  startTime,
  cookTime,
  isCompleted = false,
  showSeconds = true,
  showTarget = true,
  warningThreshold = 10,
  urgentThreshold = 15,
  onWarning,
  onUrgent,
  onExpired,
  className,
  size = 'medium',
  format = 'digital'
}: TimerProps) {
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const [hasWarned, setHasWarned] = useState(false)
  const [hasUrgent, setHasUrgent] = useState(false)
  const [hasExpired, setHasExpired] = useState(false)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const warningPlayedRef = useRef(false)
  const urgentPlayedRef = useRef(false)

  // Update elapsed time every second
  useEffect(() => {
    const updateElapsedTime = () => {
      if (isCompleted) return
      
      const elapsed = timeUtils.getElapsedTime(startTime)
      setElapsedSeconds(elapsed)
      
      const elapsedMinutes = Math.floor(elapsed / 60)
      
      // Check for warning threshold
      if (elapsedMinutes >= warningThreshold && !hasWarned) {
        setHasWarned(true)
        onWarning?.()
        if (!warningPlayedRef.current) {
          soundUtils.playSound('urgent', 0.3)
          warningPlayedRef.current = true
        }
      }
      
      // Check for urgent threshold
      if (elapsedMinutes >= urgentThreshold && !hasUrgent) {
        setHasUrgent(true)
        onUrgent?.()
        if (!urgentPlayedRef.current) {
          soundUtils.playSound('urgent', 0.5)
          urgentPlayedRef.current = true
        }
      }
      
      // Check for expired (if cook time is provided)
      if (cookTime && elapsedMinutes >= cookTime && !hasExpired) {
        setHasExpired(true)
        onExpired?.()
      }
    }

    // Initial update
    updateElapsedTime()
    
    // Set up interval
    if (!isCompleted) {
      intervalRef.current = setInterval(updateElapsedTime, 1000)
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [
    startTime, 
    isCompleted, 
    warningThreshold, 
    urgentThreshold, 
    cookTime,
    hasWarned, 
    hasUrgent, 
    hasExpired,
    onWarning, 
    onUrgent, 
    onExpired
  ])

  // Calculate urgency level
  const urgency = urgencyUtils.calculateUrgency(
    elapsedSeconds,
    warningThreshold * 60,
    urgentThreshold * 60
  )
  
  // Format elapsed time
  const formattedTime = timeUtils.formatElapsedTime(elapsedSeconds, showSeconds)
  
  // Calculate progress if cook time is provided
  const progress = cookTime ? Math.min(100, (elapsedSeconds / (cookTime * 60)) * 100) : 0
  
  // Get size classes
  const sizeClasses = {
    'small': 'text-sm',
    'medium': 'text-lg',
    'large': 'text-2xl',
    'extra-large': 'text-4xl'
  }

  if (format === 'analog') {
    return <AnalogTimer {...{ elapsedSeconds, cookTime, urgency, size, className }} />
  }
  
  if (format === 'minimal') {
    return <MinimalTimer {...{ formattedTime, urgency, size, className }} />
  }

  return (
    <div
      className={cn(
        'kds-timer flex flex-col items-center',
        isCompleted && 'opacity-60',
        className
      )}
      data-urgency={urgency}
      role="timer"
      aria-label={`Elapsed time: ${formattedTime}`}
    >
      {/* Main Timer Display */}
      <div
        className={cn(
          'font-mono font-bold kds-text-high-contrast transition-colors duration-300',
          sizeClasses[size],
          urgency === 'urgent' ? 'text-red-400' :
          urgency === 'warning' ? 'text-yellow-400' :
          isCompleted ? 'text-green-400' :
          'text-white',
          urgency === 'urgent' && 'animate-pulse'
        )}
      >
        {formattedTime}
      </div>

      {/* Target Time */}
      {showTarget && cookTime && (
        <div className="text-xs text-gray-400 mt-1">
          Target: {cookTime}min
          {progress > 0 && (
            <span className={cn(
              'ml-2',
              progress > 100 ? 'text-red-400' :
              progress > 90 ? 'text-yellow-400' :
              'text-gray-400'
            )}>
              ({Math.round(progress)}%)
            </span>
          )}
        </div>
      )}

      {/* Progress Bar */}
      {cookTime && progress > 0 && (
        <div className="w-full max-w-24 bg-gray-700 rounded-full h-1.5 mt-2">
          <div
            className={cn(
              'h-full rounded-full transition-all duration-1000',
              progress <= 75 ? 'bg-green-500' :
              progress <= 90 ? 'bg-yellow-500' :
              progress <= 100 ? 'bg-orange-500' :
              'bg-red-500'
            )}
            style={{ width: `${Math.min(100, progress)}%` }}
          />
        </div>
      )}

      {/* Status Indicator */}
      <div
        className={cn(
          'w-2 h-2 rounded-full mt-2 transition-colors duration-300',
          urgency === 'urgent' ? 'bg-red-500 animate-ping' :
          urgency === 'warning' ? 'bg-yellow-500 animate-pulse' :
          isCompleted ? 'bg-green-500' :
          'bg-blue-500'
        )}
        aria-hidden="true"
      />
    </div>
  )
}

/**
 * Analog Timer Component
 * Visual clock-like representation
 */
function AnalogTimer({ 
  elapsedSeconds, 
  cookTime, 
  urgency, 
  size, 
  className 
}: {
  elapsedSeconds: number
  cookTime?: number
  urgency: string
  size: string
  className?: string
}) {
  const minutes = Math.floor(elapsedSeconds / 60)
  const seconds = elapsedSeconds % 60
  
  // Calculate angles for clock hands
  const minuteAngle = (minutes % 60) * 6 // 360 degrees / 60 minutes
  const secondAngle = seconds * 6 // 360 degrees / 60 seconds
  
  const sizeMap = {
    'small': 40,
    'medium': 60,
    'large': 80,
    'extra-large': 100
  }
  
  const clockSize = sizeMap[size as keyof typeof sizeMap]
  const radius = clockSize / 2 - 4

  return (
    <div className={cn('kds-analog-timer flex flex-col items-center', className)}>
      <div className="relative" style={{ width: clockSize, height: clockSize }}>
        {/* Clock Face */}
        <svg
          width={clockSize}
          height={clockSize}
          className={cn(
            'transform -rotate-90 transition-colors duration-300',
            urgency === 'urgent' ? 'text-red-500' :
            urgency === 'warning' ? 'text-yellow-500' :
            'text-white'
          )}
        >
          {/* Outer Circle */}
          <circle
            cx={clockSize / 2}
            cy={clockSize / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          />
          
          {/* Progress Arc (if cook time provided) */}
          {cookTime && (
            <circle
              cx={clockSize / 2}
              cy={clockSize / 2}
              r={radius - 6}
              fill="none"
              stroke={urgency === 'urgent' ? '#ef4444' : '#3b82f6'}
              strokeWidth="3"
              strokeDasharray={`${2 * Math.PI * (radius - 6)}`}
              strokeDashoffset={`${2 * Math.PI * (radius - 6) * (1 - Math.min(1, elapsedSeconds / (cookTime * 60)))}`}
              className="transition-all duration-1000"
            />
          )}
          
          {/* Hour Marks */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 30) * (Math.PI / 180)
            const x1 = clockSize / 2 + (radius - 8) * Math.cos(angle)
            const y1 = clockSize / 2 + (radius - 8) * Math.sin(angle)
            const x2 = clockSize / 2 + (radius - 4) * Math.cos(angle)
            const y2 = clockSize / 2 + (radius - 4) * Math.sin(angle)
            
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="currentColor"
                strokeWidth="1"
              />
            )
          })}
          
          {/* Minute Hand */}
          <line
            x1={clockSize / 2}
            y1={clockSize / 2}
            x2={clockSize / 2 + (radius - 12) * Math.cos(minuteAngle * (Math.PI / 180))}
            y2={clockSize / 2 + (radius - 12) * Math.sin(minuteAngle * (Math.PI / 180))}
            stroke="currentColor"
            strokeWidth="2"
            className="transition-all duration-1000"
          />
          
          {/* Second Hand */}
          <line
            x1={clockSize / 2}
            y1={clockSize / 2}
            x2={clockSize / 2 + (radius - 8) * Math.cos(secondAngle * (Math.PI / 180))}
            y2={clockSize / 2 + (radius - 8) * Math.sin(secondAngle * (Math.PI / 180))}
            stroke="#ef4444"
            strokeWidth="1"
            className="transition-all duration-75"
          />
          
          {/* Center Dot */}
          <circle
            cx={clockSize / 2}
            cy={clockSize / 2}
            r="2"
            fill="currentColor"
          />
        </svg>
        
        {/* Digital Time Overlay */}
        <div className={cn(
          'absolute inset-0 flex items-center justify-center',
          'text-xs font-mono font-bold text-center leading-none',
          urgency === 'urgent' ? 'text-red-400' :
          urgency === 'warning' ? 'text-yellow-400' :
          'text-white'
        )}>
          <div>
            <div>{Math.floor(minutes / 10)}{minutes % 10}</div>
            <div className="text-[0.6em] text-gray-400">MIN</div>
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * Minimal Timer Component
 * Clean, space-efficient display
 */
function MinimalTimer({ 
  formattedTime, 
  urgency, 
  size, 
  className 
}: {
  formattedTime: string
  urgency: string
  size: string
  className?: string
}) {
  const sizeClasses = {
    'small': 'text-xs',
    'medium': 'text-sm',
    'large': 'text-base',
    'extra-large': 'text-lg'
  }

  return (
    <div
      className={cn(
        'kds-minimal-timer inline-flex items-center gap-1',
        className
      )}
    >
      <div
        className={cn(
          'w-1.5 h-1.5 rounded-full',
          urgency === 'urgent' ? 'bg-red-500 animate-ping' :
          urgency === 'warning' ? 'bg-yellow-500 animate-pulse' :
          'bg-green-500'
        )}
      />
      <span
        className={cn(
          'font-mono font-medium',
          sizeClasses[size],
          urgency === 'urgent' ? 'text-red-400' :
          urgency === 'warning' ? 'text-yellow-400' :
          'text-white'
        )}
      >
        {formattedTime}
      </span>
    </div>
  )
}

/**
 * Multi-Timer Display
 * Shows multiple timers in a compact grid
 */
interface MultiTimerProps {
  timers: Array<{
    id: string
    label: string
    startTime: Date
    cookTime?: number
    isCompleted?: boolean
  }>
  columns?: number
  showLabels?: boolean
  onTimerClick?: (id: string) => void
  className?: string
}

export function MultiTimer({ 
  timers, 
  columns = 2, 
  showLabels = true,
  onTimerClick,
  className 
}: MultiTimerProps) {
  return (
    <div
      className={cn(
        'kds-multi-timer grid gap-2',
        `grid-cols-${columns}`,
        className
      )}
    >
      {timers.map((timer) => (
        <div
          key={timer.id}
          className={cn(
            'bg-gray-900 border border-gray-700 rounded p-2 text-center',
            onTimerClick && 'cursor-pointer hover:bg-gray-800',
            'transition-colors duration-150'
          )}
          onClick={() => onTimerClick?.(timer.id)}
        >
          {showLabels && (
            <div className="text-xs text-gray-400 mb-1 truncate">
              {timer.label}
            </div>
          )}
          <Timer
            startTime={timer.startTime}
            cookTime={timer.cookTime}
            isCompleted={timer.isCompleted}
            size="small"
            format="minimal"
            showTarget={false}
          />
        </div>
      ))}
    </div>
  )
}

/**
 * Timer with Custom Alerts
 */
interface AlertTimerProps extends TimerProps {
  alerts?: Array<{
    threshold: number // minutes
    message: string
    sound?: boolean
    color?: string
  }>
}

export function AlertTimer({ alerts = [], ...props }: AlertTimerProps) {
  const [triggeredAlerts, setTriggeredAlerts] = useState<Set<number>>(new Set())
  
  const handleTimeUpdate = (elapsedSeconds: number) => {
    const elapsedMinutes = Math.floor(elapsedSeconds / 60)
    
    alerts.forEach((alert) => {
      if (elapsedMinutes >= alert.threshold && !triggeredAlerts.has(alert.threshold)) {
        setTriggeredAlerts(prev => new Set(prev).add(alert.threshold))
        
        if (alert.sound) {
          soundUtils.playSound('urgent', 0.4)
        }
        
        // Could show toast notification or other alert UI
        console.log(`Timer Alert: ${alert.message}`)
      }
    })
  }

  return (
    <Timer 
      {...props}
      onWarning={() => {
        props.onWarning?.()
        handleTimeUpdate(props.warningThreshold ? props.warningThreshold * 60 : 600)
      }}
      onUrgent={() => {
        props.onUrgent?.()
        handleTimeUpdate(props.urgentThreshold ? props.urgentThreshold * 60 : 900)
      }}
    />
  )
}

export default Timer