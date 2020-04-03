import React, {useEffect, useState} from 'react';
import Sidebar from './components/Sidebar';
import Nav from './components/Nav';
import Metric from './components/Metric';
import Table from './components/Table';
import UltimoProducto from './components/UltimoProducto';

function App() {

	const [products, setProducts] = useState([]) //array de 2 elementos: el dato (producto) y el metodo q modifica el dato tipo upd
    useEffect(() => {
        fetch("http://localhost:3000/products/api") //llamada asíncrona
        .then(res => res.json())
        .then(resobject => {
                setProducts(resobject);
            } )
        .catch(console.log);
		}, []);

	console.log(products[16], 'aca')
	let totalPrice = 0;
	products.forEach( product => totalPrice = totalPrice + parseInt(product.mainPrecio, 10));
	
    let data=[
      {
        title:'Cantidad de Productos en DB',
        color:'border-left-primary',
        textcolor:'text-primary',
        icon:'fas fa-clipboard-list fa-2x text-gray-300',
        quantity: products.length
      },
      {
        title:'Suma Importe Total Productos',
        color:'border-left-success',
        textcolor:'text-success',
        icon:'fas fa-dollar-sign fa-2x text-gray-300',
        quantity: totalPrice,
      },
      {
        title:'Cantidad de usuarios',
        textcolor:'text-warning',
        color:'border-left-warning',
        icon:'fas fa-user-check fa-2x text-gray-300',
        quantity:'38',
      }
    ]
  
  return (
  <div id="wrapper">
    <Sidebar/>
		<div id="content-wrapper" className="d-flex flex-column">
			<div id="content">
				<Nav/>
				<div className="container-fluid">

					<div className="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 className="h3 mb-0 text-gray-800">Mis métricas</h1>
					</div>

					<div className="row">
          { data.map((info, i)=>{
            return (
							<Metric 
							key={i}
              title={info.title}
              color={info.color}
              textcolor={info.textcolor}
              icon={info.icon}
							quantity={info.quantity} 
							products={products}
            />
            )
          })
          }
          </div>

		  <Table products={products}/>
					<div className="row">
						<UltimoProducto
						/>

						<div className="col-lg-6 mb-4">						
							<div className="card shadow mb-4">
								<div className="card-header py-3">
									<h6 className="m-0 font-weight-bold text-primary">Marcas en la base de datos</h6>
								</div>
								<div className="card-body">
									<div className="row">
										<div className="col-lg-6 mb-4">
											<div className="card bg-info text-white shadow">
												<div className="card-body">
												</div>
											</div>
										</div>
										<div className="col-lg-6 mb-4">
											<div className="card bg-info text-white shadow">
												<div className="card-body">
													Category 02
												</div>
											</div>
										</div>
										<div className="col-lg-6 mb-4">
											<div className="card bg-info text-white shadow">
												<div className="card-body">
													Category 03
												</div>
											</div>
										</div>
										<div className="col-lg-6 mb-4">
											<div className="card bg-info text-white shadow">
												<div className="card-body">
													Category 04
												</div>
											</div>
										</div>
										<div className="col-lg-6 mb-4">
											<div className="card bg-info text-white shadow">
												<div className="card-body">
													Category 05
												</div>
											</div>
										</div>
										<div className="col-lg-6 mb-4">
											<div className="card bg-info text-white shadow">
												<div className="card-body">
													Category 06
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
				
			<footer className="sticky-footer bg-white">
				<div className="container my-auto">
					<div className="copyright text-center my-auto">
						<span>Copyright &copy; Dashboard 2020</span>
					</div>
				</div>
			</footer>

		</div>

	</div>
  );
}



export default App;
