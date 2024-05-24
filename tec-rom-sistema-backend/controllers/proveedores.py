from flask import jsonify,request
from datetime import datetime
from models import db,Proveedor

class ProveedoresController():
    @staticmethod
    def add_proveedor():
        try:
            data = request.get_json()
            new_register = Proveedor(nombre=data['nombre'])
            db.session.add(new_register)
            db.session.commit()
            return jsonify({"ok":True}),200
        except Exception as e:
            return jsonify({"error":str(e)}),500
        
    @staticmethod
    def get_all_proveedores():
        try:
            query = Proveedor.query.all()
            proveedores_list = [proveedor.__repr__() for proveedor in query]
            return  jsonify(proveedores_list),200
        except Exception as e:
            return jsonify({"error":str(e)})
