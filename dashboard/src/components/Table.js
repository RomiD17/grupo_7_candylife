import React, {useState, useEffect} from 'react';


function Table(){
    const [products, setProducts] = useState([]) //array de 2 elementos: el dato (producto) y el metodo q modifica el dato tipo upd
    useEffect(() => {
        fetch("http://localhost:3000/products/api") //llamada asíncrona
        .then(res => res.json())
        .then(resobject => {
                setProducts(resobject);
            } )
        .catch(console.log);
      }, []);
      useEffect(() => {
        console.table(products);
        }, [products]);
   
    return(
    <div className="card shadow mb-4">
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellspacing="0">
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Descripcion</th>
                            <th>Precio</th>
                            <th>Categorias</th>
                            <th>Marca</th>
                            <th>Precio Desc</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        products.map(product => (
                            <tr>
                            <td> {product.prodNombre} </td>
                            <td>Fullstack developer</td>
                            <td>$320,800</td>
                            <td>
                                <ul>
                                    <li>Category 01</li>
                                    <li>Category 02</li>
                                    <li>Category 03</li>
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    <li><span className="text-danger">Red</span></li>
                                    <li><span className="text-primary">Blue</span></li>
                                    <li><span className="text-success">Green</span></li>
                                </ul>
                            </td>
                            <td>245</td>
                        </tr>  
                        ) )    
                        }
                        <tr>
                            <td>Jane Doe</td>
                            <td>Fullstack developer</td>
                            <td>$320,800</td>
                            <td>
                                <ul>
                                    <li>Category 01</li>
                                    <li>Category 02</li>
                                    <li>Category 03</li>
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    <li><span className="text-danger">Red</span></li>
                                    <li><span className="text-primary">Blue</span></li>
                                    <li><span className="text-success">Green</span></li>
                                </ul>
                            </td>
                            <td>245</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

export default Table;