import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { DayPicker, DateRange } from 'react-day-picker';
import { format } from 'date-fns';
import 'react-day-picker/dist/style.css';

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  onDateChange: (startDate: Date, endDate: Date) => void;
}

export function DateRangePicker({ startDate, endDate, onDateChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState<DateRange>({ from: startDate, to: endDate });
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const formatDateRange = (start: Date, end: Date) => {
    if (start.getTime() === end.getTime()) {
      return format(start, 'MMM dd, yyyy');
    }
    return `${format(start, 'MMM dd, yyyy')} - ${format(end, 'MMM dd, yyyy')}`;
  };

  const adjustDays = (days: number) => {
    const newStart = new Date(startDate);
    const newEnd = new Date(endDate);
    newStart.setDate(newStart.getDate() + days);
    newEnd.setDate(newEnd.getDate() + days);
    onDateChange(newStart, newEnd);
  };

  const handleRangeSelect = (selectedRange: DateRange | undefined) => {
    if (selectedRange) {
      setRange(selectedRange);
      if (selectedRange.from && selectedRange.to) {
        onDateChange(selectedRange.from, selectedRange.to);
        setIsOpen(false);
      } else if (selectedRange.from && !selectedRange.to) {
        // Single date selected
        onDateChange(selectedRange.from, selectedRange.from);
      }
    }
  };

  return (
    <div className="relative" ref={popoverRef}>
      <div className="glass-card flex items-center gap-2 rounded-xl px-2 sm:px-4 py-2">
        <button
          onClick={() => adjustDays(-1)}
          className="glass-pill p-1.5 hover:bg-white/90 transition-colors"
          title="Previous day"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="glass-pill flex items-center gap-2 px-3 py-1.5 hover:bg-white/90 transition-colors"
        >
          <span className="text-slate-700 font-semibold whitespace-nowrap text-sm sm:text-base">
            {formatDateRange(startDate, endDate)}
          </span>
          <Calendar className="w-5 h-5 text-slate-600" />
        </button>
        
        <button
          onClick={() => adjustDays(1)}
          className="glass-pill p-1.5 hover:bg-white/90 transition-colors"
          title="Next day"
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 glass-card rounded-2xl p-4 z-50 max-w-[92vw]">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-900">Select Date Range</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="glass-pill p-1.5 transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>
          
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleRangeSelect}
            numberOfMonths={2}
            className="date-picker-custom"
          />
          
          <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-slate-200/70">
            <button
              onClick={() => {
                const today = new Date();
                onDateChange(today, today);
                setIsOpen(false);
              }}
              className="glass-pill px-4 py-2 text-sm"
            >
              Today
            </button>
            <button
              onClick={() => {
                const today = new Date();
                const lastWeek = new Date(today);
                lastWeek.setDate(today.getDate() - 7);
                onDateChange(lastWeek, today);
                setIsOpen(false);
              }}
              className="glass-pill px-4 py-2 text-sm"
            >
              Last 7 Days
            </button>
            <button
              onClick={() => {
                const today = new Date();
                const lastMonth = new Date(today);
                lastMonth.setDate(today.getDate() - 30);
                onDateChange(lastMonth, today);
                setIsOpen(false);
              }}
              className="glass-pill px-4 py-2 text-sm"
            >
              Last 30 Days
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
