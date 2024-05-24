from flask import Flask
from models import db
from controllers.reparaciones import ReparacionesController
from controllers.vehiculos import VehiculosController
from controllers.compras import ComprasController
from controllers.historial import HistorialController
from controllers.proveedores import ProveedoresController
from flask_cors import CORS

# Crear la instancia de la aplicación Flask
app = Flask(__name__)
CORS(app)
# Configuración de la base de datos
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Asociar la instancia de SQLAlchemy con la aplicación Flask
db.init_app(app)

#Veihculos routes

@app.post('/vehiculos')
def post_vehiculos():
    return VehiculosController.add_vehiculo()

@app.get('/vehiculos')
def get_all_vehiculos():
    return VehiculosController.get_all()

@app.get('/vehiculos/<domain>')
def get_vehiculo_by_domain(domain):
    return VehiculosController.find_by_domain(domain)

#Reparaciones routes
@app.post('/reparaciones')
def post_reparaciones():
    return ReparacionesController.add_new_repair()

@app.get('/reparaciones')
def get_all_repairs():
    return ReparacionesController.get_all_repairs()

@app.get('/reparaciones/<domain>')
def reparaciones_by_domain(domain):
    return ReparacionesController.get_repairs_by_domain(domain)

@app.put('/reparaciones/<repair_id>')
def update_repair(repair_id):
    return ReparacionesController.update_repair_by_id(repair_id)

@app.delete('/reparaciones/<repair_id>')
def delete_repair(repair_id):
    return ReparacionesController.delete_repair_by_id(repair_id)

#Compras routes
@app.get('/compras')
def get_compras():
    return ComprasController.get_all_compras()

@app.post('/compras')
def post_compras():
    return ComprasController.add_buy()

@app.delete('/compras/<buy_id>')
def delete_compras(buy_id):
    return ComprasController.delete_buy(buy_id)

@app.get('/compras/<proveedor_id>')
def get_compras_by_proveedor(proveedor_id):
    return ComprasController.compras_by_proveedor(proveedor_id)

@app.get('/compras/vehiculo/<vehiculo_id>')
def get_compras_by_vehiculo(vehiculo_id):
    return ComprasController.compras_by_vehiculo(vehiculo_id)

#Historial routes
@app.get('/historial/<domain>')
def get_historial_by_domain(domain):
    return HistorialController.get_historial(domain)

#Proveedores routes
@app.post('/proveedores')
def post_proveedor():
    return ProveedoresController.add_proveedor()

@app.get('/proveedores')
def get_proveedores():
    return ProveedoresController.get_all_proveedores()


if __name__ == '__main__':
    # Crear la base de datos si no existe
    with app.app_context():
        db.create_all()
    # Iniciar la aplicación Flask
    app.run(host='localhost',port=8080,debug=True)
