import { css } from '@emotion/react'
import React, { ChangeEvent, FC } from 'react'

const inputStyles = css`
  width: 200px;
  height: 30px;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`

interface InputComponentProps {
  placeholder?: string
  value: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const InputComponent: FC<InputComponentProps> = ({
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      css={inputStyles}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default InputComponent
