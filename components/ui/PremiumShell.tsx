import type { CSSProperties, ReactNode } from 'react'

export function PremiumSection({
  children,
  className = '',
  id,
}: {
  children: ReactNode
  className?: string
  id?: string
}) {
  return (
    <section id={id} className={`relative px-4 py-16 sm:py-20 ${className}`}>
      <div className="mx-auto w-full max-w-7xl">{children}</div>
    </section>
  )
}

export function PremiumCard({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
}) {
  return (
    <div className={`trz-card rounded-[18px] ${className}`} style={style}>
      {children}
    </div>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string
  title: string
  copy?: string
}) {
  return (
    <div className="mb-10 max-w-2xl">
      <span className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-extrabold trz-blush-pill">
        {eyebrow}
      </span>
      <h2 className="text-3xl font-black leading-tight trz-ink sm:text-4xl">{title}</h2>
      {copy ? <p className="mt-4 text-sm leading-7 trz-muted sm:text-base">{copy}</p> : null}
    </div>
  )
}
