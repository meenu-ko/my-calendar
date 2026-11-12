import { eachDayOfInterval, endOfWeek, format, isToday, startOfWeek } from 'date-fns'

const HOURS = Array.from({ length: 24 }, (_, i) => i)
const HOUR_PX = 48 // matches h-12
const label = (h: number) => (h === 0 ? '' : `${h % 12 || 12} ${h < 12 ? 'AM' : 'PM'}`)

type Color = 'blue' | 'green' | 'orange' | 'pink'
type CalEvent = { title: string; day: number; start: number; end: number; color: Color }

// day: 0 = Sun ... 6 = Sat. start/end are hours (9.5 = 9:30)
const EVENTS: CalEvent[] = [
  { title: 'Lecture', day: 1, start: 9, end: 10.5, color: 'blue' },
  { title: 'Lunch', day: 1, start: 12, end: 13, color: 'green' },
  { title: 'Study group', day: 2, start: 14, end: 16, color: 'orange' },
  { title: 'Volleyball', day: 3, start: 17, end: 18.75, color: 'pink' },
  { title: 'Lecture', day: 3, start: 9, end: 10.5, color: 'blue' },
  { title: 'Bracelet orders', day: 4, start: 11, end: 12.5, color: 'orange' },
  { title: 'Office hours', day: 4, start: 15, end: 16, color: 'green' },
  { title: 'Brunch', day: 6, start: 10, end: 11.5, color: 'pink' },
]

// full class names so Tailwind can see them
const COLORS: Record<Color, string> = {
  blue: 'border-blue-400 bg-blue-100/70 text-blue-900',
  green: 'border-green-500 bg-green-100/70 text-green-900',
  orange: 'border-orange-400 bg-orange-100/70 text-orange-900',
  pink: 'border-pink-400 bg-pink-100/70 text-pink-900',
}

const fmt = (h: number) => {
  const hr = Math.floor(h)
  const min = Math.round((h - hr) * 60)
  const t = `${hr % 12 || 12}${min ? ':' + String(min).padStart(2, '0') : ''}`
  return `${t} ${hr % 24 < 12 ? 'AM' : 'PM'}`
}

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
          {days.map((d, i) => (
            <div key={d.toISOString()} className="relative">
              {HOURS.map((h) => (
                <div key={h} className="h-12 border-b border-l border-zinc-100" />
              ))}

              {EVENTS.filter((e) => e.day === i).map((e) => (
                <div
                  key={e.title + e.start}
                  className={`absolute inset-x-0.5 overflow-hidden rounded-md border-l-[3px] px-1.5 py-1 text-[11px] leading-tight ${COLORS[e.color]}`}
                  style={{ top: e.start * HOUR_PX + 1, height: (e.end - e.start) * HOUR_PX - 2 }}
                >
                  <p className="truncate font-medium">{e.title}</p>
                  <p className="truncate text-[10px] opacity-60">
                    {fmt(e.start)} – {fmt(e.end)}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}