from pathlib import Path

LANGUAGE_POSSIBLES = ["en", "fr", "de"]


def add_language_entry(new_key: str, new_value: str):
    for language in LANGUAGE_POSSIBLES:
        file_path = Path(__file__).parent / f"{language}.ts"
        if not file_path.exists():
            print(f"Le fichier {language}.ts n'existe pas.")
            continue

        with open(file_path, "r") as file:
            content = file.read()

        # Vérifier si l'entrée existe déjà
        if f'"{new_key}":' in content:
            print(f"L'entrée '{new_key}' existe déjà dans le fichier {language}.ts")
            continue

        # Trouver l'endroit où insérer la nouvelle entrée
        insert_index = content.rfind("}")

        # Ajouter la nouvelle entrée
        new_entry = f'  "{new_key}": "{new_value}",'
        updated_content = (
            content[:insert_index] + new_entry + "\n" + content[insert_index:]
        )

        with open(file_path, "w") as file:
            file.write(updated_content)

        print(f"Nouvelle entrée ajoutée dans {language}.ts : {new_key} = {new_value}")


if __name__ == "__main__":
    key = input("Entrez la clé de la nouvelle entrée : ")
    value = input("Entrez la valeur de la nouvelle entrée : ")

    add_language_entry(key, value)
