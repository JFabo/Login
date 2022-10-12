import { Dispatch, FormEventHandler, SetStateAction } from "react";

export default function ({setRoute}: {setRoute: Dispatch<SetStateAction<string>>}) {
  const enviarDados: FormEventHandler<HTMLFormElement> = async ev => {
    ev.preventDefault()
    const { email, password } = ev.currentTarget

    const request = await fetch(`/api/login/`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const responseData = await request.json()

    if (request.status >= 200 && request.status <= 299) {
      localStorage.setItem("token", responseData.token)
      alert("PARABAEINZ!")
      setRoute("teste")
      return
    }

    if (responseData.error) {
      alert(responseData.error)
      return
    }

    alert("Cara! deu um erro tão foda, que eu nem sei o que foi!")
  }
  
  
  return <>
  <main>
  <div className="modal">
  <form onSubmit={enviarDados}>
      <h1>Login</h1>
      <div>
      <label>Digite seu email:</label>
      <input name="email" placeholder="exemplo@email.com" />
      </div>

      <div>
      <label>Digite a sua senha:</label>
      <input name="password" placeholder="***********" />
      </div>
    
      <div className="buttons">
      <button onClick={() => {}}>entrar</button>
      <button onClick={() => setRoute("cadastro")}>cadastrar-se</button>
      <button onClick={() => setRoute("teste")}>ir para teste</button>
      </div>
      
    </form>
  </div>
  </main>
  </>
}