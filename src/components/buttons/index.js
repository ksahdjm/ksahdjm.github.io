import React from "react"
import css from "./css.module.scss"

const Button = props => {
  let loading = props.loading ? [css.loading, css.disabled].join(" ") : ""
  let disabled = props.disabled ? css.disabled : ""
  return (
    <button
      type={props.type || "button"}
      disabled={props.disabled || props.loading ? true : false}
      form={props.attachForm}
      className={[disabled, loading, css.button].join(" ")}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  )
}

export { Button }
