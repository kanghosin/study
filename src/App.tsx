import React, { useEffect } from 'react'
import View from './pages/Editor/View'
import { Resolver, useResolver } from '@src/template-engine/Resolver/Resolver'

const registerComponents = (resolver: Resolver) => {
  resolver.register(
    'FormItem',
    'components/v1',
  )(
    () =>
      import('@components/v1/FormItem').then(
        ({ default: FormItem }) => FormItem,
      ),
    // ... 기타 필요한 컴포넌트들 ...
  )
}

function App() {
  console.log('3333')
  const resolver = useResolver()

  useEffect(() => {
    // 컴포넌트 등록
    registerComponents(resolver)
  }, []) // 빈 dependency 배열을 사용하여 이 useEffect 내부 로직을 최초 1회만 실행

  return <View />
}

export default App
