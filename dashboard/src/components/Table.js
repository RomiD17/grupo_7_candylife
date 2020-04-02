import React from 'react';
import db from '../components/data/products';

console.log(db);

function Table(){
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
                        <tr>
                            <td>Tiger Nixon</td>
                            <td>System Architect</td>
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