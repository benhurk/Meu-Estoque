import List from "./components/List"

function App() {
  return (
    <>
      <header className="container py-4 bg-primary">
        <h1 className="text-center text-light">Eztoque</h1>
      </header>
      <main className="container py-4">
        <button type="button" className="btn btn-success mx-auto d-block mb-4">
          <i className="bi bi-plus-lg" /> Adicionar item
        </button>
        <List />
      </main>
    </>
  )
}

export default App
