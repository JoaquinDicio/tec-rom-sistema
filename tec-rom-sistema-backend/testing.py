import requests
import json
from random import randint
from datetime import datetime
import time

# Función para agregar registros de reparaciones a través del endpoint
def add_reparaciones(num_records):
    try:
        url = "http://localhost:8080/reparaciones"
        headers = {'Content-Type': 'application/json'}
        
        data = []
        for _ in range(num_records):
            reparacion = {
                "patente": "ABC123",  # Ejemplo de patente
                "kilometraje": randint(1000, 100000),
                "detalle": "Detalle de la reparación",
                "valor": randint(100, 10000),
                "pagado": randint(0, 1)
            }
            data.append(reparacion)

        response = requests.post(url, data=json.dumps(data), headers=headers)
        if response.status_code == 200:
            print("Registros de reparaciones agregados exitosamente")
        else:
            print("Error al agregar registros de reparaciones:", response.text)
    except Exception as e:
        print("Error:", e)

# Agregar 500 registros de reparaciones
add_reparaciones(500)