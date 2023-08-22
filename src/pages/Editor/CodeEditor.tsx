import React from 'react'
import Editor, { Monaco, OnMount } from '@monaco-editor/react'
import { css } from '@emotion/react'

const content = css`
  width: 50%;
`

// Utility function for formatting JSON
function formatJSON(jsonString: string): string {
  try {
    const jsonObj = JSON.parse(jsonString)
    return JSON.stringify(jsonObj, null, 2) // 2-space indentation
  } catch (e) {
    return jsonString
  }
}

// CodeEditor의 props 타입 정의
interface CodeEditorProps<T = string> {
  code: T
  onCodeChange: (newCode: string) => void
}

// CodeEditor 컴포넌트
function CodeEditor({ code, onCodeChange }: CodeEditorProps) {
  console.log('CodeEditor', code)
  // Monaco 에디터 로딩 후 추가 설정을 위한 핸들러
  const handleEditorDidMount: OnMount = (editor, monacoInstance) => {
    // Format the initial content of the editor
    const formattedJSON = formatJSON(editor.getValue())
    editor.setValue(formattedJSON)

    // 에디터가 변경될 때 마다 호출되는 콜백 등록
    editor.onDidChangeModelContent(() => {
      const currentCode = editor.getValue()
      try {
        // 유효한 JSON 형식인지 확인
        JSON.parse(currentCode)
        // 유효한 JSON일 경우 onCodeChange 호출
        onCodeChange(currentCode)
      } catch (e) {
        // JSON이 유효하지 않을 경우, 오류 처리나 경고 메시지를 표시할 수 있습니다.
        // 여기에 로직 추가
      }
    })
  }

  return (
    <div css={content}>
      <Editor
        height="100vh"
        defaultLanguage="json" // JSON 형식으로 설정
        value={code}
        onMount={handleEditorDidMount}
        theme="vs-dark"
        options={{ wordWrap: 'on' }} // Enable word wrap
      />
    </div>
  )
}

export default CodeEditor
