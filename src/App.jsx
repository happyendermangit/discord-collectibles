import { useState } from 'react'
import { collectibles,previews } from "./collectibles.js"
import Preview from "./Preview.jsx"
import CategoryBanner from "./CategoryBanner.jsx"
import './App.css'


function getProfileEffectPreview(product){
  let preview = previews[product.name]
  return preview ?? ""
}

function formatPrice(price){
  let pricestr = new String(price)
  if (pricestr.length === 3){
    return pricestr[0] + "." + pricestr.replace(pricestr[0],"") 
  }
  if (pricestr.length === 4){
    return pricestr[0] + pricestr[1] + "." + pricestr.replace(pricestr[0] + pricestr[1],"") 
  }
}

function App() {

  return (
    <center>
      {
      collectibles.map(category=>(
          <div key={category.sku_id}>
            <CategoryBanner key={category.sku_id} category={category}></CategoryBanner>
            <h1>Avatar decorations: ({category.products.filter(product=>product.items[0].type === 0).length})</h1>
            <table>
              <thead>
              <tr>
                <th>Name</th>
                <th>Summary</th>
                <th>Preview</th>
                <th>SKU id</th>
                <th>Price (non-nitro price)</th>
                <th>Price (nitro price)</th>
                <th>Asset ID</th>
              </tr>
              </thead>
              <tbody>
              { 
                  category.products.filter(product=>product.items[0].type === 0).map(product=>(
                    <tr key={product.sku_id}>
                      <th>{product.name}</th>
                      <th>{product.summary}</th>
                      <th><Preview product={product}></Preview></th>
                      <td>{product.items[0].sku_id}</td>
                      <td>{formatPrice(product.prices[0].countryPrices.prices[0].amount)}</td>
                      <td>{formatPrice(product.prices[4].countryPrices.prices[0].amount)}</td>
                      <td>{product.items[0].asset}</td>
                    </tr>
                  ))
              }
           </tbody>

              </table>
              <h1>Profile effects ({category.products.filter(product=>product.items[0].type === 1).length})</h1>
              <table>
              <thead>
              <tr>
                <th>Name</th>
                <th>Summary</th>
                <th>Preview</th>
                <th>SKU id</th>
                <th>Price (non-nitro price)</th>
                <th>Price (nitro price)</th>
                <th>Asset ID</th>
              </tr>
              </thead>
              <tbody>
              
              { 
                 category.products.filter(product=>product.items[0].type === 1).map(product=>(
                    <tr key={product.sku_id}>
                        <td>{product.name}</td>
                        <td>{product.summary}</td>
                        <td><img src={previews[product.name] ?? ""} style={{width:"fit-content","height":"500px"}}></img></td>
                        <td>{product.items[0].sku_id}</td>
                        <td>{formatPrice(product.prices[0].countryPrices.prices[0].amount)}</td>
                        <td>{formatPrice(product.prices[4].countryPrices.prices[0].amount)}</td>
                     </tr>
                  ))
              }
             </tbody>

              </table>
          </div>
        ))
      }
    </center>
  )
}

export default App
