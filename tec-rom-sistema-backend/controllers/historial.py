from flask import jsonify,request
from datetime import datetime
from models import db,Reparacion,Vehiculo,Compra

class HistorialController():

    def get_historial(domain):
        try:
            historial = {}
            #getting basic vehicule information
            vehicule_info = Vehiculo.query.get(domain)
            if (vehicule_info != None) : historial = vehicule_info.__repr__()
            else: return jsonify({"error":"Vehiculo no encontrado"}),404
            #getting all repairs registered
            repairs_query = Reparacion.query.filter_by(patente=domain).all()
            repairs = [repair.__repr__() for repair in repairs_query]
            repairs.reverse()
            historial["reparaciones"] = repairs
            #calculatin debt level
            deuda = 0 
            for repair in repairs:
                deuda +=repair["balance"]
            historial["deuda"]=deuda
            #return the constructed dict
            return jsonify(historial), 200
        except Exception as err:
            return jsonify({"error":str(err)})
