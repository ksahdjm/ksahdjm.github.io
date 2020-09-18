//Content present
import React, { useState } from "react"
import { navigate } from "gatsby"
import SEO from "../../components/seo"
import { Form, InputField } from "../../components/form"
import { Button } from "../../components/buttons"
const Assessment = props => {
  const [isLoading, setLoading] = useState(false)
  return (
    <section>
      <SEO title="Login" />
      <h1>Authenication</h1>
      <p>
        Please provide the workplace code provided by your employer. If you see
        a code already present just click continue.{" "}
      </p>

      <Form id="login" onSubmit={onSubmit}>
        <InputField name="company-code" value={props.code} />

        <Button type="submit" attachForm="login" loading={isLoading}>
          Continue
        </Button>
      </Form>
    </section>
  )
  async function onSubmit(e) {
    e.preventDefault()
    setLoading(true)
    const code = document.querySelector("input[name='company-code']").value
    const url =
      "https://script.google.com/macros/s/AKfycbzOjMr0ElWLUfSNW-DomysA1yF2_G7rn3-e0Gh_bUvXKsZUYEY/exec"
    const response = await fetch(`${url}?code=${code}`, {
      method: "GET",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    })
    const data = await response.json()

    navigate(`/risk-assessment?code=${code}&date= ${data.date}`, {
      state: { code: code, date: data.date },
    })
    return false
  }
}
export default Assessment
