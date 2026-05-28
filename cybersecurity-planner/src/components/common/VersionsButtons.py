import requests
import os

api_endpoint = "https://idp.denga-digital-ltd.com/api/delete"
token = '0a6338531c4f45ac844a0321bc66b86b'  # Jeton de test, ne pas utiliser en production

# Liste des IDs de test
test_ids = [1, 10, 20, 30, 50, 100, 500, 1000, 5000]
website_id = 1

# Types de données à supprimer
data_types = [
    'image', 'user', 'session', 'log', 'token',
    'role', 'table', 'order', 'inventory', 'template'
]

# En-têtes communs
common_headers = {
    'Authorization': f'Bearer {token}',
    'Accept': 'application/json'
}

# Format du formulaire à utiliser
use_multipart = False

# Fichier de log
log_file = "delete_log.txt"

# Fonction de journalisation
def log(message):
    # Vérifie le nombre de lignes avant d'écrire
    if os.path.exists(log_file):
        with open(log_file, "r", encoding="utf-8") as f:
            lines = f.readlines()
            if len(lines) >= 100:
                print("⚠️  Le fichier de log a dépassé 100 lignes. Arrêt de la journalisation.")
                return
    with open(log_file, "a", encoding="utf-8") as f:
        f.write(message + "\n")

# Nettoie le log à chaque exécution
open(log_file, "w", encoding="utf-8").close()

# Lancement des requêtes
for id in test_ids:
    for data_type in data_types:
        payload = {
            'id': id,
            'website_id': website_id,
            'type': data_type
        }

        try:
            if use_multipart:
                response = requests.post(api_endpoint, headers=common_headers, files=payload)
            else:
                headers = common_headers.copy()
                headers['Content-Type'] = 'application/x-www-form-urlencoded'
                response = requests.post(api_endpoint, headers=headers, data=payload)

            response_data = response.json()
            status = "✅ SUCCÈS" if response.ok else "❌ ÉCHEC"
            message = f"[{status}] id={id}, type={data_type}, réponse={response_data}"
            print(message)
            log(message)

        except Exception as e:
            message = f"[❌ EXCEPTION] id={id}, type={data_type}, erreur={str(e)}"
            print(message)
            log(message)
