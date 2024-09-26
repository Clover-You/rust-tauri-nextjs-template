'use client'

import React, { createRef, useState } from 'react'
import Link from 'next/link'

import { WinDisplayController } from '@/components/win-display-controller'
import { Header } from '@/components/header'
import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'
import { Allotment, AllotmentHandle } from 'allotment'

import 'allotment/dist/style.css'

let firstLoad = true

export default function Home() {
  const [isCollapsed, setCollapsed] = useState(false)
  const paneRef = createRef<AllotmentHandle>()

  return <>
    <main className="flex h-screen">
      <Allotment
        snap
        defaultSizes={[180]}
        ref={paneRef}
        onChange={([first]) => {
          if (firstLoad) {
            firstLoad = false
            return
          }

          if (isCollapsed && first)
            setCollapsed(false)
          else if (!isCollapsed && !first)
            setCollapsed(true)
        }}
      >
        <Allotment.Pane minSize={180} preferredSize={180} snap visible={!isCollapsed}>
          <div className="w-full min-w-[160px]">
            <div className="h-head w-full" data-tauri-drag-region></div>
            <div className="w-full grid gap-1 px-2 ">
              <Link href="#" className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'justify-start',
              )}>
                Java
              </Link>
              <Link href="#" className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'dark:bg-muted dark:text-white dark:hover:bg-muted dark:hover:text-white',
                'justify-start',
              )}>
                Rust
              </Link>
              <Link href="#" className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'justify-start',
              )}>
                Golang
              </Link>
              <Link href="#" className={cn(
                buttonVariants({ variant: 'ghost', size: 'sm' }),
                'justify-start',
              )}>
                C++
              </Link>
            </div>
          </div>
        </Allotment.Pane>
        <Allotment.Pane minSize={300} className={cn('flex-grow flex flex-col')}>
          <Header
            className="w-full flex-shrink"
            collapsed={isCollapsed}
            onChangeSide={() => {
              setCollapsed(!isCollapsed)
            }}
          />
          <div className="flex flex-grow w-full justify-center items-center">
            <p className="text-xs text-secondary-foreground whitespace-pre-wrap">Select an item</p>
          </div>
        </Allotment.Pane>
      </Allotment>
    </main >
    <WinDisplayController />
  </>
}
