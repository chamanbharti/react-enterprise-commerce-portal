import './App.css'
import { ProductCatalog } from './features/products/components/ProductCatalog'
import { products } from './features/products/data/products'

function App() {

  return (
    <main>
      <header>
        <h1>
          Enterprise Commerce & Operations Portal
        </h1>
         <p>
          Internal operations management platform
        </p>
        <p>
          Environment: Local Development
        </p>
      </header>

      <ProductCatalog products={products}></ProductCatalog>

       <footer>
        <p>React + TypeScript</p>
      </footer>
    </main>
  )
}

export default App
