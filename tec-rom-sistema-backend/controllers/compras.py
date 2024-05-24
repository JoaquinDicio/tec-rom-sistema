from flask import request,jsonify
from models import db, Compra, Proveedor
from datetime import datetime

class ComprasController:
    @staticmethod
    def add_buy():
        try:
            data = request.get_json()
            #iterates the list of compras
            for compra in data:
                new_register = Compra(
                proveedor=compra["proveedor"],
                articulo=compra["articulo"],
                asociado=compra['asociado'],
                pagado=compra['pagado'],
                balance=compra['valor'] - compra['pagado'],
                valor=compra["valor"],
                fecha=datetime.now()
                )
                db.session.add(new_register)
            #submit changes
            db.session.commit()
            return jsonify(new_register.__repr__()),200
        except Exception as e:
            print(e)
            return jsonify({"error":str(e)}),500
    
    @staticmethod
    def delete_buy(buy_id):
        try:
            compra = Compra.query.get(buy_id)
            if (compra != None):
                db.session.delete(compra)
                db.session.commit()
                return jsonify({"ok":True}),200
            else: return jsonify({"error":"Compra no encontrada"}),404
        except Exception as e:
            print(e)
            return jsonify({"error":str(e)}),500
        
    @staticmethod
    def compras_by_proveedor(proveedor_id):
        try:
            compras = Compra.query.filter_by(proveedor=proveedor_id).join(Proveedor).add_columns(Proveedor.nombre).all()
            if not compras:
                return jsonify({"mensaje": "No se encontraron compras para el proveedor con el ID proporcionado"}), 404
            compras_json = []
            for compra in compras:
                #enters to compra[0] because compras comes with two objects
                #first is Compra object, the other is Proveedor object
                #asociated to that particular Compra
                compra_dict = compra[0].__repr__()
                compra_dict["nombre_proveedor"] = compra.nombre
                compras_json.append(compra_dict)
            compras_json.reverse()
            return jsonify(compras_json), 200
        except Exception as e:
            return jsonify({"error":str(e)}),500
        
    @staticmethod
    def compras_by_vehiculo(vehiculo_id):
        try:
            compras = Compra.query.filter_by(asociado=vehiculo_id).join(Proveedor).add_columns(Proveedor.nombre).all()
            if not compras:
                return jsonify({"mensaje": "No se encontraron compras para el vehiculo"}), 404
            compras_json = []
            for compra in compras:
                #enters to compra[0] because compras comes with two objects
                #first is Compra object, the other is Proveedor object
                #asociated to that particular Compra
                compra_dict = compra[0].__repr__()
                compra_dict["nombre_proveedor"] = compra.nombre
                compras_json.append(compra_dict)
            compras_json.reverse()
            return jsonify(compras_json), 200
        except Exception as e:
            return jsonify({"error":str(e)}),500
    
    @staticmethod
    def get_all_compras():
        try:
            query = Compra.query.join(Proveedor).add_columns(Proveedor.nombre).all()
            compras_list = []
            for compra in query:
                compra_dict = compra[0].__repr__()
                compra_dict['nombre_proveedor'] = compra.nombre
                compras_list.append(compra_dict)
            return jsonify(compras_list),200
        except Exception as e:
            return jsonify({"error":str(e)}),500



