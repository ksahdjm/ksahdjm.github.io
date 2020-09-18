import React from "react"
import { Router } from "@reach/router"
import Loadable from "@loadable/component"
import Layout from "../components/layout"
const fallback = { fallback: <div>Loading</div> }
const Login = Loadable(() => import("../views/login"), fallback)
const NotFound = Loadable(() => import("../views/404"), fallback)
const Assessment = Loadable(() => import("../views/Assessment"), fallback)
const App = props => {
  
  const code = props.location.search.split("=")[1]
  return (
    <Layout>
      <Router basepath="/">
        <Login path="/" code={code} />
        <Assessment path="/risk-assessment" />
        <NotFound default />
      </Router>
    </Layout>
  )
}

export default App
