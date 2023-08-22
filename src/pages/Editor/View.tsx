/** @jsxImportSource @emotion/react */
import React, { useState } from 'react'
import CodeEditor from './CodeEditor'
import LivePreview from './LivePreview'
import { css } from '@emotion/react'
import SampleData from './sampleData.json'

const container = css`
  display: flex;
  flex-wrap: wrap;
  > * {
    width: 50%;
  }
`

// View 컴포넌트
function View() {
  const [code, setCode] = useState<any>(JSON.stringify(SampleData) || '')

  const handleCodeChange = (newCode: string) => {
    setCode(newCode)
  }

  return (
    <div css={container}>
      <CodeEditor code={code} onCodeChange={handleCodeChange} />
      <LivePreview code={code} />
    </div>
  )
}

export default View
