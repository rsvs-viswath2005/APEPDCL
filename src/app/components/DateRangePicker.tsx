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
      <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-4 py-2">
        <button
          onClick={() => adjustDays(-1)}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
          title="Previous day"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1 hover:bg-gray-200 rounded transition-colors"
        >
          <span className="text-gray-700 font-medium whitespace-nowrap">
            {formatDateRange(startDate, endDate)}
          </span>
          <Calendar className="w-5 h-5 text-gray-600" />
        </button>
        
        <button
          onClick={() => adjustDays(1)}
          className="p-1 hover:bg-gray-200 rounded transition-colors"
          title="Next day"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 p-4 z-50">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Select Date Range</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          <DayPicker
            mode="range"
            selected={range}
            onSelect={handleRangeSelect}
            numberOfMonths={2}
            className="date-picker-custom"
          />
          
          <div className="flex gap-2 mt-3 pt-3 border-t border-gray-200">
            <button
              onClick={() => {
                const today = new Date();
                onDateChange(today, today);
                setIsOpen(false);
              }}
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
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
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
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
              className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Last 30 Days
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
