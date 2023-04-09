import { createElement } from 'react'

export default function DatePicker({ value, onChange, onBlur }) {
  return createElement('input', {
    type: 'date',
    value: value,
    onChange: onChange,
    onBlur: onBlur,
    style: {
      height: 56,
      marginBottom: 16,
      fontSize: 17,
      border: '1px solid rgb(199, 203, 217)',
      paddingLeft: 16,
      paddingRight: 16,
      borderRadius: 4,
      color: 'rgba(51, 55, 75, 1)',
      marginTop: -8,
      flexGrow: 1,
      fontFamily: 'sans-serif',
    },
  })
}
