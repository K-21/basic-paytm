import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import axios  from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const Signup = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox placeholder="John" label={"First Name"} onPress={e => {
          setFirstName(e.target.value);
        }} />
        <InputBox placeholder="Doe" label={"Last Name"} onPress={(e) => {
          setLastName(e.target.value);
        }} />
        <InputBox placeholder="Kritika" label={"username"}  onPress={e => {
          setUsername(e.target.value);
        }} />
        <InputBox placeholder="123456" label={"Password"} onPress={(e) => {
          setPassword(e.target.value)
        }} />
        <div className="pt-4">
        <Button label={"Sign up"} onClick={ async () => {
          const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
              username,
              password,
              firstName,
              lastName
          });
          localStorage.setItem("token", response.data.token);
          navigate("/dashboard");
            }}/>
        </div>
        <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}