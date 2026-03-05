import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { Clock } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { StatCard } from '../components/StatCard';
import { TariffChart } from '../components/TariffChart';
import { ShiftHistoryTable, type ShiftEntry } from '../components/ShiftHistoryTable';

function seededNumber(seed: string, min: number, max: number) {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 1000003;
  }
  const fraction = (Math.sin(hash) + 1) / 2;
  return min + (max - min) * fraction;
}

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function Tariff() {
  const { serviceNo = 'UNKNOWN' } = useParams();
  const [searchParams] = useSearchParams();
  const consumerName = searchParams.get('consumerName') ?? `Consumer ${serviceNo}`;
  const category = searchParams.get('category') ?? 'NA';
  const [startDate, setStartDate] = useState(() => new Date());
  const [endDate, setEndDate] = useState(() => new Date());
  const [selectedDateKey, setSelectedDateKey] = useState(() => formatDateKey(new Date()));
  const [isLoading, setIsLoading] = useState(false);
  const [pendingDateKey, setPendingDateKey] = useState<string | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const loaderTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (loaderTimeoutRef.current) {
        window.clearTimeout(loaderTimeoutRef.current);
      }
    };
  }, []);

  const applyDateSelection = (nextStartDate: Date, nextEndDate: Date, nextDateKey: string) => {
    if (isLoading) return;

    headerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsLoading(true);
    setPendingDateKey(nextDateKey);

    if (loaderTimeoutRef.current) {
      window.clearTimeout(loaderTimeoutRef.current);
    }

    loaderTimeoutRef.current = window.setTimeout(() => {
      setStartDate(nextStartDate);
      setEndDate(nextEndDate);
      setSelectedDateKey(nextDateKey);
      setPendingDateKey(null);
      setIsLoading(false);
    }, 320);
  };

  const handleShiftDateSelect = (dateKey: string) => {
    if (dateKey === selectedDateKey) return;
    const selected = new Date(`${dateKey}T00:00:00`);
    applyDateSelection(selected, selected, dateKey);
  };

  const selectedDate = useMemo(() => {
    const startLabel = startDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    const endLabel = endDate.toLocaleDateString('en-IN', { day: '2-digit', month: 'short' });
    return {
      startLabel,
      endLabel,
      dayLabel: endDate.toLocaleDateString('en-IN', { weekday: 'short' }),
      rangeLabel: startLabel === endLabel ? startLabel : `${startLabel} - ${endLabel}`,
    };
  }, [startDate, endDate]);

  const stats = useMemo(() => {
    const seedBase = `${serviceNo}-${formatDateKey(startDate)}-${formatDateKey(endDate)}`;
    const totalUnitsSaved = Math.round(seededNumber(`${seedBase}-total-units`, 420, 980));
    const totalCostSaved = Math.round(seededNumber(`${seedBase}-total-cost`, 14000, 55000));
    const morningUnits = Math.round(totalUnitsSaved * seededNumber(`${seedBase}-morning`, 0.24, 0.38));
    const eveningUnits = Math.round(totalUnitsSaved * seededNumber(`${seedBase}-evening`, 0.12, 0.24));
    const morningCost = Math.round((totalCostSaved * morningUnits) / totalUnitsSaved);
    const eveningCost = Math.round((totalCostSaved * eveningUnits) / totalUnitsSaved);

    return {
      totalUnitsSaved,
      totalCostSaved,
      morningUnits,
      eveningUnits,
      morningCost,
      eveningCost,
    };
  }, [startDate, endDate, serviceNo]);

  const consumptionData = useMemo(() => {
    const seedBase = `${serviceNo}-${formatDateKey(startDate)}-${formatDateKey(endDate)}`;
    const peakBoost = seededNumber(`${seedBase}-peak`, 8, 18);
    const dayBias = seededNumber(`${seedBase}-bias`, -4, 4);

    return Array.from({ length: 24 }, (_, hour) => {
      const morningPeak = hour >= 6 && hour <= 9 ? peakBoost : 0;
      const eveningPeak = hour >= 18 && hour <= 21 ? peakBoost + 4 : 0;
      const baseline = Math.max(
        8,
        Math.round(
          16 +
            Math.sin(hour / 3) * 7 +
            seededNumber(`${seedBase}-base-${hour}`, -3, 3) +
            dayBias
        )
      );
      const actual = Math.max(
        5,
        Math.round(
          baseline -
            seededNumber(`${seedBase}-actual-${hour}`, 1, 5) +
            morningPeak / 5 +
            eveningPeak / 5
        )
      );

      return { hour, baseline, actual };
    });
  }, [startDate, endDate, serviceNo]);

  const shiftHistory = useMemo<ShiftEntry[]>(() => {
    const anchor = new Date(endDate);

    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(anchor);
      date.setDate(anchor.getDate() - index);
      const dateKey = formatDateKey(date);
      const seedBase = `${serviceNo}-${dateKey}-shift`;
      const hour = Math.round(seededNumber(`${seedBase}-hour`, 6, 20));
      const minute = seededNumber(`${seedBase}-minute`, 0, 1) > 0.5 ? '30' : '00';
      const period = hour >= 12 ? 'PM' : 'AM';
      const shiftedValue = Math.round(seededNumber(`${seedBase}-value`, 95, 190));
      const shiftedPercent = `${Math.round(seededNumber(`${seedBase}-percent`, 12, 28))}%`;
      const points = Math.round(seededNumber(`${seedBase}-points`, 140, 420));

      return {
        dateKey,
        date: date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: '2-digit' }),
        time: `${String(((hour - 1) % 12) + 1).padStart(2, '0')}:${minute} ${period}`,
        shiftedPercent,
        value: shiftedValue,
        points,
      };
    });
  }, [endDate, serviceNo]);

  return (
    <div className="dashboard-page">
      <Navbar />

      <div className="w-full px-2 sm:px-3 lg:px-4 py-2 sm:py-3 relative z-10">
        <div ref={headerRef} className="glass-hero rounded-2xl p-3 sm:p-4 mb-3 text-white">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
            <div>
              <p className="text-xs sm:text-sm text-sky-100">Welcome</p>
              <h1 className="text-lg sm:text-2xl font-bold mt-0.5 leading-tight">{consumerName}</h1>
              <p className="text-xs sm:text-sm text-sky-100 mt-0.5">
                Service No: {serviceNo} | Category: {category}
              </p>
              <p className="text-xs sm:text-sm text-sky-100 mt-1">
                Showing usage stats for {selectedDate.dayLabel}, {selectedDate.rangeLabel}
              </p>
            </div>
            <div className="glass-card rounded-xl p-2.5 sm:p-3">
              <div className="flex items-center gap-2 mb-1 text-slate-900">
                <Clock className="w-4 h-4" />
                <h2 className="text-sm sm:text-base font-bold">Normal Tariff Active</h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-700">(15:00-18:00 & 22:00-24:00)</p>
              <p className="text-lg sm:text-xl font-extrabold text-slate-900 mt-0.5">Rs 6.3 per unit</p>
            </div>
          </div>

          {isLoading && (
            <div className="mt-2 inline-flex items-center gap-2 text-xs sm:text-sm text-sky-100">
              <span className="w-3.5 h-3.5 rounded-full border-2 border-sky-100 border-t-transparent animate-spin" />
              Loading updated stats...
            </div>
          )}
        </div>

        <div className="relative">
          {isLoading && (
            <div className="absolute inset-0 z-10 bg-white/45 rounded-2xl flex items-center justify-center">
              <div className="inline-flex items-center gap-2 glass-card rounded-lg px-3 py-2 text-sm text-slate-700 shadow-sm">
                <span className="w-4 h-4 rounded-full border-2 border-slate-400 border-t-transparent animate-spin" />
                Updating usage data...
              </div>
            </div>
          )}

          <div className={isLoading ? 'pointer-events-none opacity-40 transition-opacity' : 'transition-opacity'}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-2 sm:gap-3 mb-3">
              <StatCard compact title="Total Cost Saved" value={`Rs ${stats.totalCostSaved.toLocaleString('en-IN')}`} />
              <StatCard compact title="Total Units Saved" value={`${stats.totalUnitsSaved} kWh`} />
              <StatCard
                compact
                title="Morning Peak Hour"
                value={`Rs ${stats.morningCost.toLocaleString('en-IN')}`}
                subtitle={`${stats.morningUnits} kWh`}
              />
              <StatCard
                compact
                title="Evening Peak Hour"
                value={`Rs ${stats.eveningCost.toLocaleString('en-IN')}`}
                subtitle={`${stats.eveningUnits} kWh`}
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-[1.65fr_0.85fr] gap-3 items-start">
              <TariffChart data={consumptionData} height={285} />
              <ShiftHistoryTable
                data={shiftHistory}
                selectedDateKey={pendingDateKey ?? selectedDateKey}
                onSelectDate={handleShiftDateSelect}
                compact
                maxBodyHeightClassName="max-h-[360px]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
