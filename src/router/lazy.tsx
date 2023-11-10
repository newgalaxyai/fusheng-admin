import React from 'react'
import { lazy, Suspense } from 'react'
import type { ComponentType, ReactNode } from 'react'

function Lazy(importer: () => Promise<{ default: ComponentType }>): ReactNode {
  const Lazy = lazy(importer)
  return (
    <Suspense fallback={null}>
      <Lazy />
    </Suspense>
  )
}
export default Lazy
