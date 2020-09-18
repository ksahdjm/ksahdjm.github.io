import React, { useState } from "react"
import css from "./css.module.scss"
import SEO from "../../components/seo"
import {
  Form,
  InputField,
  Fields,
  CheckboxField,
  RadioField,
  TextArea,
} from "../../components/form"
import { Button } from "../../components/buttons"
const Assessment = props => {
  const [message, setMessage] = useState("Please Monitor your symptoms")
  const [isLoading, setLoading] = useState(false)
  const date = props.location.state.date
  const code = props.location.state.code
  return (
    <section>
      <SEO title="Assessment" />
      <Form id="assessment" onSubmit={onSubmit}>
        <section
          className={[css.active, css.section].join(" ")}
          id="demographics"
        >
          <h1>Demographics</h1>
          <InputField name="name" label="Your Full Name" />
          <InputField name="dob" type="date" label="Date of Birth" />
          <InputField name="phone" type="phone" label="Telephone Number" />
          <InputField name="email" type="email" label="Email" />
          <h3>Address</h3>
          <hr />
          <Fields>
            <InputField name="street" label="Street Address" />
            <InputField name="parish" label="Parish" />
          </Fields>
          <h3>Job Info</h3>
          <hr />
          <Fields>
            <InputField name="job[title]" label="Job Title" />
            <InputField name="job[department]" label="Department" />
          </Fields>
          <h3>Emergency Contact</h3>
          <hr />
          <Fields>
            <InputField
              name="kin[name]"
              label="Next of Kin (Relative or Friend)"
            />
            <InputField
              name="kin[phone]"
              type="phone"
              label="Next of Kin Phone Number"
            />
          </Fields>
          <Button onClick={() => next("demographics", "risk-assessment")}>
            Next
          </Button>
        </section>
        <section className={css.section} id="risk-assessment">
          <h1>Risk Assessment</h1>
          <h3>
            Have you had any of the following symptoms in the past two weeks?
          </h3>
          <CheckboxField name="symptoms[tiredness]" value="Extreme Tiredness" />
          <CheckboxField name="symptoms[fever]" value="Fever" />
          <CheckboxField name="symptoms[cough]" value="Cough" />
          <CheckboxField
            name="symptoms[stuffy-nose]"
            value="Stuffy/Runny Nose"
          />
          <CheckboxField name="symptoms[loss-taste]" value="Loss of Taste" />
          <CheckboxField name="symptoms[loss-smell]" value="Loss of Smell" />
          <CheckboxField name="symptoms[sore-throat]" value="Sore Throat" />
          <CheckboxField name="symptoms[muscle-pain]" value="Muscle Pain" />
          <CheckboxField name="symptoms[joint-pain]" value="Joint Pain" />
          <CheckboxField name="symptoms[headace]" value="Headace" />
          <CheckboxField
            name="symptoms[shortness-of-breath]"
            value="Shortness of Breath(Difficulty Breathing)"
          />
          <CheckboxField name="symptoms[chest-pain]" value="Chest Pain" />
          <CheckboxField name="symptoms[vomiting]" value="Vomiting" />
          <CheckboxField name="symptoms[diarrhea]" value="Diarrhea" />
          <br />
          <h3>Are you aware of who the employee is that tested positive?</h3>
          <RadioField name="aware-of-positive-case" value="Yes" />
          <RadioField name="aware-of-positive-case" value="No" />
          <br />
          <Button onClick={() => next("risk-assessment", "demographics")}>
            Back
          </Button>
          <Button
            onClick={() => {
              const awareOfPositiveCase = document.querySelector(
                "input[name='aware-of-positive-case']:checked"
              )
              if (!awareOfPositiveCase) {
                alert("Please answer yes or no to the last question")
                return
              }
              if (awareOfPositiveCase.value === "Yes")
                next("risk-assessment", "positive-case-known")
              else if (awareOfPositiveCase.value === "No")
                next("risk-assessment", "positive-case-unknown")
            }}
          >
            Next
          </Button>
        </section>
        <section className={css.section} id="positive-case-unknown">
          <h1>Risk Assessment</h1>
          <h3>
            While working, are you usually less than 2 arms length from other
            employees?
          </h3>
          <RadioField name="positive-case-unknown-distance" value="Yes" />
          <RadioField name="positive-case-unknown-distance" value="No" />
          <h3>Do you always wear a mask at work?</h3>
          <RadioField name="positive-case-unknown-mask" value="Yes" />
          <RadioField name="positive-case-unknown-mask" value="No" />
          <h3>
            If you have any additional information or questions feel free to
            comment below.
          </h3>
          <TextArea name="additional-information" value="N/A"></TextArea>
          <Button
            onClick={() => next("positive-case-unknown", "risk-assessment")}
          >
            Back
          </Button>
          <Button type="submit" attachForm="assessment" loading={isLoading}>
            Submit
          </Button>
        </section>
        <section className={css.section} id="positive-case-known">
          <h1>Risk Assessment</h1>
          <h3>
            Have you worked or interacted within 2 arms length of this
            individual since {date}?
          </h3>
          <RadioField name="positive-case-known-distance" value="Yes" />
          <RadioField name="positive-case-known-distance" value="No" />
          <h3>Were you both wearing a mask?</h3>
          <RadioField name="positive-case-known-mask" value="Yes" />
          <RadioField name="positive-case-known-mask" value="No" />
          <h3>
            If you have any additional information or questions feel free to
            comment below.
          </h3>
          <TextArea name="additional-information" value="N/A"></TextArea>
          <Button
            onClick={() => next("positive-case-known", "risk-assessment")}
          >
            Back
          </Button>
          <Button type="submit" attachForm="assessment" loading={isLoading}>
            Submit
          </Button>
        </section>
        <section className={css.section} id="complete">
          <h3>
            Thank you for submitting your information.{" "}
            <strong style={{ color: "red" }}>{message}</strong>.
          </h3>
        </section>
      </Form>
    </section>
  )
  async function onSubmit(e) {
    e.preventDefault()
    // setLoading(true)
    const formData = new FormData(e.target)

    const data = {
      name: "",
      dob: "",
      phone: "",
      email: "",
      street: "",
      parish: "",
      "job[title]": "",
      "job[department]": "",
      "kin[name]": "",
      "kin[phone]": "",
      "aware-of-positive-case": "",
      "additional-information": "",
      symptoms: [],
    }
    for (let value of formData.entries()) {
      if (value[0].match(/symptoms/g)) data.symptoms.push(value[1])
      else data[value[0]] = value[1]
    }
    const risk = data.symptoms.length > 0 ? true : false
    const positiveCaseKnowmask = document.querySelector(
      "input[name='positive-case-known-mask']:checked"
    )
    const positiveCaseKnownDistance = document.querySelector(
      "input[name='positive-case-known-distance']:checked"
    )
    const positiveCaseUnknowmask = document.querySelector(
      "input[name='positive-case-unknown-mask']:checked"
    )
    const positiveCaseUnknownDistance = document.querySelector(
      "input[name='positive-case-unknown-distance']:checked"
    )
    if (
      (positiveCaseKnowmask || positiveCaseUnknowmask) &&
      (positiveCaseKnownDistance || positiveCaseUnknownDistance)
    ) {
      if (
        positiveCaseUnknownDistance?.value === "No" ||
        positiveCaseKnownDistance?.value === "No" ||
        positiveCaseKnowmask?.value === "Yes" ||
        positiveCaseUnknowmask?.value === "Yes"
      ) {
        data.disposal = risk
          ? "Schedule Testing and Monitor symptoms"
          : "Monitor symptoms"
        if (risk)
          setMessage("Please Quarantine, we will be in contact with you soon.")
        else setMessage("Please Monitor your symptoms")
      }
      if (
        (positiveCaseKnowmask?.value === "No" ||
          positiveCaseUnknowmask?.value === "No") &&
        (positiveCaseUnknownDistance?.value === "Yes" ||
          positiveCaseKnownDistance?.value === "Yes")
      ) {
        data.disposal = risk
          ? "Schedule Testing and Quarantine order"
          : "Quarantine order"
        setMessage("Please Quarantine, we will be in contact with you soon.")
      }
      
    } else {
      alert("Most provide an answer outer")
      setLoading(false)
      return
    }
    const url =
      "https://script.google.com/macros/s/AKfycbzOjMr0ElWLUfSNW-DomysA1yF2_G7rn3-e0Gh_bUvXKsZUYEY/exec"
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: JSON.stringify({ code: code, data: data }),
    })
    const responseData = await response.json()
    setLoading(false)
    document.querySelector("#assessment").reset()
    console.log(responseData)
    if (positiveCaseKnowmask) next("positive-case-known", "complete")
    else if (positiveCaseUnknowmask) next("positive-case-unknown", "complete")
  }
  function next(current, next) {
    document.querySelector(`#${current}`).classList.remove(css.active)
    document.querySelector(`#${next}`).classList.add(css.active)
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }
}
export default Assessment
