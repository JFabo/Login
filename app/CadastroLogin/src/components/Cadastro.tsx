import { Dispatch, FormEventHandler, SetStateAction } from "react";

export default function ({ setRoute }: { setRoute: Dispatch<SetStateAction<string>> }) {
  const enviarDados: FormEventHandler<HTMLFormElement> = async ev => {
    ev.preventDefault()
    const { _name, email, password } = ev.currentTarget

    const request = await fetch(`/api/user/`, {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: _name.value,
        email: email.value,
        password: password.value
      })
    })

    if (request.status >= 200 && request.status <= 299) {
      alert("PARABAEINZ!")
      setRoute("login")
      return
    }

    const responseData = await request.json()
    
    if (responseData.error) {
      alert(responseData.error)
      return
    }

    alert("Cara! deu um erro tão foda, que eu nem sei o que foi!")
  }

  return <>
  <body>
  <main>
  <div className="modal">
  <form onSubmit={enviarDados}>
      <h1>Cadastro</h1>
      <div>
        <label>Coloque um nome ou apelido: </label>
        <input name="_name" placeholder="name" />
      </div>
      
      <div>
      <label>Coloque um email: </label>
      <input name="email" placeholder="email" />
      </div>
      
      
      <div>
      <label>Escolha uma senha: </label>
      <input name="password" type="password" placeholder="******" />
      </div>
      
      
      <div className="buttons">
      <button onClick={() => setRoute("login")}>Voltar</button>
      <button>Cadastrar-se</button>
      </div>
      
    </form>
  </div>
  </main>
  </body>
  </>
}