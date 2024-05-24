from flask_sqlalchemy import SQLAlchemy
from flask import jsonify

# Crear una instancia de SQLAlchemy
db = SQLAlchemy()

# Definición del modelo de la tabla Reparaciones
class Reparacion(db.Model):
    # Definir el nombre de la tabla
    __tablename__ = 'reparaciones'

    # Definir las columnas
    id = db.Column(db.Integer, primary_key=True)
    patente = db.Column(db.String(20),db.ForeignKey('vehiculos.patente'))
    kilometraje = db.Column(db.Integer)
    detalle = db.Column(db.String(100))
    valor = db.Column(db.Integer)
    pagado= db.Column(db.Integer)
    balance= db.Column(db.Integer)
    fecha = db.Column(db.Integer)

    vehiculo = db.relationship('Vehiculo', backref='reparaciones')

    def __repr__(self):
        return {"id":self.id,"patente":self.patente,"kilometraje":self.kilometraje,"detalle":self.detalle,"valor":self.valor,"fecha":self.fecha,"balance":self.balance,"pagado":self.pagado}

# Definición del modelo de la tabla Compras
class Compra(db.Model):
    # Definir el nombre de la tabla
    __tablename__ = 'compras'

    # Definir las columnas
    id = db.Column(db.Integer, primary_key=True)
    proveedor = db.Column(db.Integer,db.ForeignKey('proveedores.id'))
    articulo = db.Column(db.String(100))
    asociado = db.Column(db.String(10))
    valor = db.Column(db.Integer)
    pagado = db.Column(db.Integer)
    balance = db.Column(db.Integer)
    fecha = db.Column(db.Date)
    def __repr__(self):
        return {"id":self.id,"proveedor":self.proveedor,"asociado":self.asociado,"articulo":self.articulo,"valor":self.valor,"pagado":self.pagado,"balance":self.balance,"fecha":self.fecha}
    
# Definicion del modelo de Vehiculo, debe ser unico
class Vehiculo(db.Model):
    __tablename__ = 'vehiculos'

    patente = db.Column(db.String(20),primary_key=True)
    marca = db.Column(db.String(20))
    modelo = db.Column(db.String(20))
    dni_titular = db.Column(db.String(20))
    email = db.Column(db.String(20))
    telefono = db.Column(db.Integer)

    def __repr__(self):
        return {
            "patente":self.patente,
            "marca":self.marca,
            "modelo":self.modelo,
            "email":self.email,
            "dni_titular":self.dni_titular,
            "telefono":self.telefono
        }
    
class Proveedor(db.Model):
    __tablename__='proveedores'

    id=db.Column(db.Integer,primary_key=True)
    nombre=db.Column(db.String(20))

    def __repr__(self):
        return {"id":self.id,"nombre":self.nombre}

