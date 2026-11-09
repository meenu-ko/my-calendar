'use client'


import { addWeeks, format, subWeeks } from 'date-fns'
import MonthGrid from '../components/MonthGrid'
import WeekView from '../components/WeekView'
import { useEffect, useState } from 'react'

export default function Home() {
  const [selected, setSelected] = useState<Date | null>(null)

useEffect(() => {
  setSelected(new Date())
}, [])

if (!selected) return <div className="h-screen bg-zinc-100" />

  return (
    <div className="flex h-screen gap-3 bg-zinc-100 p-3 text-zinc-900">
      {/* left column */}
      <aside className="flex w-60 shrink-0 flex-col gap-3">
        <section className="rounded-xl border border-zinc-200 bg-white p-3">
          <MonthGrid selected={selected} onSelect={setSelected} />
        </section>
        <section className="flex-1 rounded-xl border border-zinc-200 bg-white p-3 text-xs text-zinc-400">
          calendar options
        </section>
      </aside>

      {/* main panel */}
      <main className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white">
        <header className="flex items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold tracking-tight">{format(selected, 'MMMM yyyy')}</h1>
          <div className="flex items-center gap-1 text-xs text-zinc-500">
            <button onClick={() => setSelected(new Date())} className="rounded-md border border-zinc-200 px-2.5 py-1 hover:bg-zinc-50">Today</button>
            <button onClick={() => setSelected(subWeeks(selected, 1))} className="rounded px-2 py-1 hover:bg-zinc-100" aria-label="Previous week">‹</button>
            <button onClick={() => setSelected(addWeeks(selected, 1))} className="rounded px-2 py-1 hover:bg-zinc-100" aria-label="Next week">›</button>
          </div>
        </header>
        <WeekView selected={selected} />
      </main>
    </div>
  )
}