import { Alert } from "react-bootstrap"
import { useState } from "react"
import { postRequest } from "../utils/services"
const Register = () => {

  const [registerLoading, setRegisterLoading] = useState(false)



  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [error, setError] = useState("")

  const RegisterForm = async (e) => {
    setError("")
    setRegisterLoading(true)

    e.preventDefault();
    try {
      console.log(form);
      const res = await postRequest(`users/register`, form)
      if (res.status === 200) {
        localStorage.setItem("userChat", JSON.stringify(res.data.user))
        window.location.pathname = "/"      }
      console.log(res.data);


    } catch (e) {
      if (e?.response?.data) {
        console.log(e?.response.data);
        setError(e.response.data)
      }
      else {

        console.log(e);
        }


      } finally {
        setRegisterLoading(false)


      }
    }


    return (
      <div className=" d-flex justify-content-center align-items-center ">

        <div className="shadow col-9 m-auto py-5 px-3 border" >
          <h1 className="text-center">REGISTER</h1>
          <hr />
          <form className="mt-5 text-center" onSubmit={RegisterForm}>
            <div className="input-group mb-3">
              <input type="text" className="form-control" name="name" placeholder="Name ..." value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="input-group mb-3">
              <input type="email" className="form-control" name="email" placeholder="Email ..." value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="input-group mb-3">
              <input type="password" className="form-control" name="password" placeholder="Password ..." value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>
            <button className="btn btn-success px-4 ">{registerLoading ? "REGISTERING..." : "REGISTER"}</button>
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

  export default Register
