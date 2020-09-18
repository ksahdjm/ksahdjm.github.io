import React from "react"
import css from "./css.module.scss"

const Form = props => {
  return (
    <form id={props.id} autoComplete="off" onSubmit={props.onSubmit}>
      {props.children}
    </form>
  )
}
const Fields = props => {
  return <div className={css.fields}>{props.children}</div>
}
const InputField = props => {
  const isNumericInput = event => {
    const key = event.keyCode
    return (
      (key >= 48 && key <= 57) || // Allow number line
      (key >= 96 && key <= 105) // Allow number pad
    )
  }
  const isModifierKey = event => {
    const key = event.keyCode
    return (
      event.shiftKey === true ||
      key === 35 ||
      key === 36 || // Allow Shift, Home, End
      key === 8 ||
      key === 9 ||
      key === 13 ||
      key === 46 || // Allow Backspace, Tab, Enter, Delete
      (key > 36 && key < 41) || // Allow left, up, right, down
      // Allow Ctrl/Command + A,C,V,X,Z
      ((event.ctrlKey === true || event.metaKey === true) &&
        (key === 65 || key === 67 || key === 86 || key === 88 || key === 90))
    )
  }
  const enforceFormat = event => {
    // Input must be of a valid number format or a modifier key, and not longer than ten digits
    if (!isNumericInput(event) && !isModifierKey(event)) {
      event.preventDefault()
    }
  }
  const formatToPhone = event => {
    if (isModifierKey(event)) {
      return
    }

    // I am lazy and don't like to type things more than once
    const target = event.target
    const input = event.target.value.replace(/\D/g, "").substring(0, 10) // First ten digits of input only
    const zip = input.substring(0, 3)
    const middle = input.substring(3, 6)
    const last = input.substring(6, 10)

    if (input.length > 6) {
      target.value = `(${zip}) ${middle} - ${last}`
    } else if (input.length > 3) {
      target.value = `(${zip}) ${middle}`
    } else if (input.length > 0) {
      target.value = `(${zip}`
    }
  }
  return (
    <div className={[css.field, css.input].join(" ")}>
      <label>{props.label}</label>
      <input
        type={props.type || "text"}
        name={props.name}
        autoComplete="off"
        placeholder={props.placeholder}
        defaultValue={props.value}
        onChange={e => {
          if (props.onChange) props.onChange(e.target.value)
        }}
        onKeyDown={props.type === "phone" ? e => formatToPhone(e) : null}
        onKeyUp={props.type === "phone" ? e => enforceFormat(e) : null}
      />
    </div>
  )
}
const CheckboxField = props => {
  return (
    <div className={css.checkbox}>
      <label>
        <input name={props.name} type="checkbox" value={props.value} />
        {props.value}
      </label>
    </div>
  )
}
const RadioField = props => {
  return (
    <div className={css.radio}>
      <label>
        <input name={props.name} type="radio" value={props.value} />
        {props.value}
      </label>
    </div>
  )
}
const TextArea = props => {
  return (
    <div className={css.textarea}>
      <label htmlFor={props.name}>
        {props.label}
        <textarea
          id={props.name}
          name={props.name}
          placeholder="N/A"
          onChange={e =>
            props.onChange ? props.onChange(e.target.value) : null
          }
        />
      </label>
    </div>
  )
}

export { Form, InputField, Fields, CheckboxField, RadioField, TextArea }
