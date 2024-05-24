from models import db, Vehiculo
from flask import request,jsonify

class VehiculosController:
    @staticmethod
    def add_vehiculo():
        try:
            data = request.get_json()
            existence = Vehiculo.query.get(data['patente'])
            if (existence == None):
                new_register = Vehiculo(
                    patente=data["patente"],
                    marca=data["marca"],
                    modelo=data["modelo"],
                    dni_titular=data['dni_titular'],
                    email=data['email'],
                    telefono=data["telefono"],
                )
                db.session.add(new_register)
                db.session.commit()
                return jsonify(new_register.__repr__())
            else:
                return jsonify({"error":"el vehiculo ya existe"}),400
        except Exception as e:
            code = getattr(e, 'code', 500)
            print(e)
            return jsonify({'error': str(e)}), code

    @staticmethod
    def get_all():
        try:
            query = Vehiculo.query.all()
            vehiculos = [vehiculo.__repr__() for vehiculo in query]
            if (query) : return jsonify(vehiculos),200
        except Exception as e:
            print(e)
            return jsonify({"error":"Error en el servidor"}),500

    @staticmethod
    def find_by_domain(domain):
        try:
            result = Vehiculo.query.filter_by(patente=domain).first()
            if result:
                return jsonify(result.__repr__())
            else:
                return jsonify({"error": "El vehiculo no existe"}), 404
        except Exception as e:
            code = getattr(e, 'code', 500)
            return jsonify({'error': str(e)}), code