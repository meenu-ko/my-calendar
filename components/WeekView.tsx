import { eachDayOfInterval, endOfWeek, format, isToday, startOfWeek } from 'date-fns'

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const label = (h: number) => (h === 0 ? '' : `${h % 12 || 12} ${h < 12 ? 'AM' : 'PM'}`)

export default function WeekView({ selected }: { selected: Date }) {
  const days = eachDayOfInterval({ start: startOfWeek(selected), end: endOfWeek(selected) })

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      {/* day headers */}
      <div className="grid grid-cols-[3.5rem_repeat(7,1fr)] border-b border-zinc-200">
        <div />
        {days.map((d) => (
          <div key={d.toISOString()} className="flex items-center gap-1.5 border-l border-zinc-100 px-2 py-2 text-xs">
            <span className="text-zinc-400">{format(d, 'EEE')}</span>
            <span className={isToday(d) ? 'rounded-full bg-red-500 px-1.5 py-0.5 font-medium text-white' : 'text-zinc-800'}>
              {format(d, 'd')}
            </span>
          </div>
        ))}
      </div>

      {/* scrollable time grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-[3.5rem_repeat(7,1fr)]">
          <div>
            {HOURS.map((h) => (
              <div key={h} className="relative h-12 pr-2 text-right text-[10px] text-zinc-400">
                <span className="relative -top-1.5">{label(h)}</span>
              </div>
            ))}
          </div>
          {days.map((d) => (
            <div key={d.toISOString()}>
              {HOURS.map((h) => (
                <div key={h} className="h-12 border-b border-l border-zinc-100" />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}