import { useState } from 'react'

export interface Resolver {
  get: (kind: string, version: string) => React.ComponentType<any> | null
  register: (
    kind: string,
    version: string,
  ) => (
    componentLoader: () => Promise<any>,
    readOnlyComponentLoader?: () => Promise<any>,
  ) => void
  isLoading: boolean
}

export const useResolver = (): Resolver => {
  const [components, setComponents] = useState<
    Map<string, React.ComponentType<any>>
  >(new Map())
  const [loading, setLoading] = useState<boolean>(false)

  const get = (
    kind: string,
    version: string,
  ): React.ComponentType<any> | null => {
    const key = `${version}/${kind}`
    return components.get(key) || null
  }

  const register =
    (kind: string, version: string) =>
    (
      componentLoader: () => Promise<any>,
      readOnlyComponentLoader?: () => Promise<any>,
    ) => {
      setLoading(true)
      const key = `${version}/${kind}`
      componentLoader().then((component) => {
        setComponents((prev) => new Map(prev).set(key, component))
        setLoading(false)
      })
      // TODO: Handle readOnlyComponentLoader if needed
    }

  return { get, register, isLoading: loading }
}
