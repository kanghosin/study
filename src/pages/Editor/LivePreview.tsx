import React, { Suspense, ReactNode } from 'react'
import { useResolver } from '@src/template-engine/Resolver/Resolver'

interface LivePreviewProps {
  code: string
}

interface ComponentData {
  kind: string
  version: string
  spec?: {
    children?: ComponentData[]
    [key: string]: any
  }
}

const RecursiveComponent: React.FC<{ data: ComponentData }> = ({ data }) => {
  const { kind, version, spec } = data

  const resolver = useResolver() // use the custom hook to get the resolver

  // Use the resolver to get the desired component
  const ComponentToRender = resolver.get(kind, version)
  if (!ComponentToRender) {
    console.error(`Failed to get component: ${kind} from ${version}`)
    return <div>Error loading component: {kind}</div>
  }

  const childrenComponents = spec?.children?.map((child, index) => (
    <RecursiveComponent key={index} data={child} />
  ))

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ComponentToRender {...spec}>{childrenComponents}</ComponentToRender>
    </Suspense>
  )
}

function LivePreview({ code }: LivePreviewProps) {
  let parsedData: ComponentData
  try {
    parsedData = JSON.parse(code)
  } catch (error) {
    console.error('Failed to parse JSON code:', error)
    return <div>Error parsing JSON</div>
  }

  return (
    <div>
      <RecursiveComponent data={parsedData} />
    </div>
  )
}

export default LivePreview
