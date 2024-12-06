import { Alert } from "react-bootstrap"
import { useState } from "react"
import { postRequest } from "../utils/services"
const Login = () => {

  const [registerLoading, setRegisterLoading] = useState(false)
  const [error, setError] = useState("")
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

  const LoginForm = async (e) => {
    setError("")
    setRegisterLoading(true)

    e.preventDefault();
    try {
      console.log(form);
      const res = await postRequest(`users/login`, form)
      localStorage.setItem("userChat", JSON.stringify(res.data.user))
      window.location.pathname = "/"
      console.log(res.data.user);


    } catch (e) {
      if (e.response.data) {
        console.log(e.response.data);
        setError(e.response.data)
      }

    } finally {
      setRegisterLoading(false)


    }
  }


  return (
    <div className=" d-flex justify-content-center align-items-center ">

      <div className="shadow col-9 m-auto py-5 px-3 border" >
        <h1 className="text-center">LOGIN</h1>
        <hr />
        <form className="mt-5 text-center" onSubmit={LoginForm}>

          <div className="input-group mb-3">
            <input type="email" className="form-control" name="email" placeholder="Email ..." value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="input-group mb-3">
            <input type="password" className="form-control" name="password" placeholder="Password ..." value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          </div>
          <button className="btn btn-success px-4 ">{registerLoading ? "LOGINING..." : "LOGIN"}</button>
        </form>
        {error &&
          <Alert variant="danger" className="m-0 mt-3 py-1 col-6">
            <p className="m-0 ">{error}</p>
          </Alert>
        }
      </div>
    </div >
  )
}

export default Login
