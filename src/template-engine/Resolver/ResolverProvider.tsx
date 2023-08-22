import React, { createContext, ReactNode, useContext } from 'react'
import { useResolver, Resolver } from './Resolver'

interface ResolverProviderProps {
  children: ReactNode
}

const ResolverContext = createContext<Resolver | null>(null)

export const ResolverProvider: React.FC<ResolverProviderProps> = ({
  children,
}) => {
  const resolver = useResolver()

  return (
    <ResolverContext.Provider value={resolver}>
      {children}
    </ResolverContext.Provider>
  )
}

export const useResolverContext = (): Resolver => {
  const context = useContext(ResolverContext)
  if (!context) {
    throw new Error('useResolverContext must be used within a ResolverProvider')
  }
  return context
}
