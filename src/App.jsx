import { useRef, useState } from "react";
import { collectibles, previews } from "./collectibles.js";
import CloseIcon from "./CloseIcon";
import Preview from "./Preview.jsx";
import CategoryBanner from "./CategoryBanner.jsx";
import "./App.css";

function getProfileEffectPreview(product) {
  let preview = previews[product.name];
  return preview ?? "";
}

function formatPrice(price) {
  let pricestr = new String(price);
  if (pricestr.length === 3) {
    return pricestr[0] + "." + pricestr.replace(pricestr[0], "");
  }
  if (pricestr.length === 4) {
    return (
      pricestr[0] +
      pricestr[1] +
      "." +
      pricestr.replace(pricestr[0] + pricestr[1], "")
    );
  }
  return "0.00"; // free prices for specific items.;
}

function App() {
  const modalRef = useRef(null);
  const [previewAvatar, setPreviewAvatarUrl] = useState(null);

  function openSettingsModal() {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }

  function closeModal() {
    if (modalRef.current) modalRef.current.close();
  }

  function setPreviewAvatar(file) {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    if (!file.type.startsWith("image/")) { alert("Disallowed file type."); return; }  
    fileReader.onload = () => {
      const base64 = fileReader.result;
      localStorage.preview_avatar = base64;
      setPreviewAvatarUrl(base64);
    };

    fileReader.onerror = (error) => {
      alert(error);
    };
  }

  return (
    <>
      <button onClick={openSettingsModal}>Open Settings</button>
      <dialog ref={modalRef} className="modal">
        <div>
          <button className="close-button" onClick={closeModal}>
            <CloseIcon></CloseIcon>
          </button>{" "}
          <h1 className="text-white">Settings</h1>
          <div>
            <h4 className="text-white">Set the preview avatar:</h4>
            <input
              type="file"
              accept="image/*"
              onChange={(event) => setPreviewAvatar(event.target.files[0])}
            ></input>
          </div>
          <br />
          <button
            onClick={() => {
              localStorage.removeItem("preview_avatar");
              setPreviewAvatarUrl(Symbol());
            }}
            style={{ width: "200px" }}
          >
            Reset back to default.
          </button>
        </div>
      </dialog>
      <center>
        {collectibles.map((category) => (
          <div key={category.sku_id}>
            <CategoryBanner
              key={category.sku_id}
              category={category}
            ></CategoryBanner>
            <h1>
              Avatar decorations: (
              {
                category.products.filter(
                  (product) => product.items[0].type === 0
                ).length
              }
              )
            </h1>
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
                {category.products
                  .filter((product) => product.items[0].type === 0)
                  .map((product) => (
                    <tr key={product.sku_id}>
                      <th>{product.name}</th>
                      <th>{product.summary}</th>
                      <th>
                        <Preview product={product}></Preview>
                      </th>
                      <td>{product.items[0].sku_id}</td>
                      <td>
                        {formatPrice(
                          product.prices[0].countryPrices.prices[0].amount
                        )}
                      </td>
                      <td>
                        {formatPrice(
                          product.prices[4].countryPrices.prices[0].amount
                        )}
                      </td>
                      <td>{product.items[0].asset}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <h1>
              Profile effects (
              {
                category.products.filter(
                  (product) => product.items[0].type === 1
                ).length
              }
              )
            </h1>
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
                {category.products
                  .filter((product) => product.items[0].type === 1)
                  .map((product) => (
                    <tr key={product.sku_id}>
                      <td>{product.name}</td>
                      <td>{product.summary}</td>
                      <td>
                        <img
                          src={previews[product.name] ?? ""}
                          style={{ width: "fit-content", height: "500px" }}
                        ></img>
                      </td>
                      <td>{product.items[0].sku_id}</td>
                      <td>
                        {formatPrice(
                          product.prices[0].countryPrices.prices[0].amount
                        )}
                      </td>
                      <td>
                        {formatPrice(
                          product.prices[4].countryPrices.prices[0].amount
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ))}
      </center>
    </>
  );
}

export default App;
