from flask import jsonify,request
from datetime import datetime
import time
from models import db,Reparacion,Vehiculo,Compra

class ReparacionesController:
    @staticmethod
    def add_new_repair():
        try:
            data = request.get_json()
            #iterating list in data, should recive a List
            for repair in data:
                new_register = Reparacion(
                    patente=repair["patente"],
                    kilometraje=repair["kilometraje"],
                    detalle=repair["detalle"],
                    valor=repair["valor"],
                    pagado=repair["pagado"],
                    balance=repair["valor"] - repair["pagado"],
                    fecha=int(time.time())
                )
                db.session.add(new_register)
            db.session.commit()
            return jsonify({"ok":True}),200
        except Exception as e:
            code = getattr(e, 'code', 500)
            print(e)
            return jsonify({'error': str(e)}), code
    @staticmethod
    def get_all_repairs():
        try:
            query = Reparacion.query.all()
            if (query != None):
                repairs_list = [repair.__repr__() for repair in query]
                repairs_list.reverse()
            return jsonify(repairs_list),200
        except Exception as e:
            print(e)
            return jsonify({"error":str(e)})
    @staticmethod
    def delete_repair_by_id(repair_id):
        try:
            repair = Reparacion.query.get(repair_id)
            if (repair!=None):
                db.session.delete(repair)
                db.session.commit()
                return jsonify({"ok":True}),200
            else: return jsonify({"error":"Reparacion no encontrada"}),404
        except Exception as e:
            print(e)
            return jsonify({"error":str(e)})

    @staticmethod
    def get_repairs_by_domain(domain):
        try:
            query = Reparacion.query.filter_by(patente=domain).all()
            if query:
                repairs = [repair.__repr__() for repair in query]
                return jsonify(repairs)
            else:
                return jsonify({"error": "No existen reparaciones en el vehiculo"}), 404
        except Exception as e:
            return jsonify({'error': "Error en el servidor", "msg":str(e)}), 500

    @staticmethod
    def update_repair_by_id(repair_id):
        try:
            repair = Reparacion.query.get(repair_id)
            data_updated = request.get_json()
            for key, value in data_updated.items():
                setattr(repair, key, value)
            db.session.commit()
            return jsonify(repair.__repr__()), 200
        except Exception as e:
            return jsonify({"error": "ERROR en el servidor"})