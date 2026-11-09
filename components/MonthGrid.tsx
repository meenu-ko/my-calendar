'use client'

import { useEffect, useState } from 'react'
import {
  addMonths, subMonths, eachDayOfInterval, endOfMonth, endOfWeek, format,
  isSameDay, isSameMonth, isSameWeek, isToday, startOfMonth, startOfWeek,
} from 'date-fns'

type Props = { selected: Date; onSelect: (d: Date) => void }

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export default function MonthGrid({ selected, onSelect }: Props) {
  const [viewed, setViewed] = useState(startOfMonth(selected))

  // keep the mini month in sync when the selected date changes elsewhere
  useEffect(() => setViewed(startOfMonth(selected)), [selected])

  const days = eachDayOfInterval({
    start: startOfWeek(startOfMonth(viewed)),
    end: endOfWeek(endOfMonth(viewed)),
  })

  return (
    <div className="text-xs text-zinc-900">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium">{format(viewed, 'MMMM yyyy')}</span>
        <div className="flex gap-1 text-zinc-400">
          <button onClick={() => setViewed(subMonths(viewed, 1))} className="rounded px-1.5 hover:bg-zinc-100" aria-label="Previous month">‹</button>
          <button onClick={() => setViewed(addMonths(viewed, 1))} className="rounded px-1.5 hover:bg-zinc-100" aria-label="Next month">›</button>
        </div>
      </div>

      <div className="grid grid-cols-7 text-center text-[10px] text-zinc-400">
        {WEEKDAYS.map((d) => <div key={d} className="py-1">{d}</div>)}
      </div>

      <div className="grid grid-cols-7 text-center">
        {days.map((day) => {
          const today = isToday(day)
          const inMonth = isSameMonth(day, viewed)
          const inSelectedWeek = isSameWeek(day, selected)
          return (
            <div key={day.toISOString()} className={inSelectedWeek ? 'bg-zinc-100' : ''}>
              <button
                onClick={() => onSelect(day)}
                className={[
                  'mx-auto my-0.5 flex h-6 w-6 items-center justify-center rounded-full text-[11px]',
                  today ? 'bg-red-500 font-medium text-white' : inMonth ? 'text-zinc-800 hover:bg-zinc-200' : 'text-zinc-300 hover:bg-zinc-200',
                  isSameDay(day, selected) && !today ? 'ring-1 ring-zinc-400' : '',
                ].join(' ')}
              >
                {format(day, 'd')}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}