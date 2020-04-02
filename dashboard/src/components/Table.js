import React, {useState, useEffect} from 'react';


function Table(props){   
    return(
    <div className="card shadow mb-4">
        <div className="card-body">
            <div className="table-responsive">
                <table className="table table-bordered" id="dataTable" width="100%" cellSpacing="0">
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
                        props.products.map(product => (
                            <tr key={product.id}> 
                            <td> {product.prodNombre} </td>
                            <td>{product.detalle}</td>
                            <td>{product.mainPrecio}</td>
                            <td>
                                <ul>
                                    <li> {product.categoria}</li>
                                </ul>
                            </td>
                            <td>
                                <ul>
                                    <li><span className="text-danger">{product.marca}</span></li>
                                </ul>
                            </td>
                            <td>{product.discountPrecio}</td>
                        </tr>  
                        ) )    
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

export default Table;