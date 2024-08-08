from pathlib import Path
from secrets import OPENAI_API_KEY

from openai import OpenAI

LANGUAGE_POSSIBLES: dict[str, str] = {
    "fr": "Français",
    "en": "Anglais",
    "de": "Allemand",
}


def translate(locale: str, sentence: str) -> str:
    if locale == "fr":
        return sentence

    client = OpenAI(api_key=OPENAI_API_KEY)

    chat_completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": f"Ton rôle est de traduire les phrases qu'on te donne en {LANGUAGE_POSSIBLES[locale]}. Tu réponderas uniquement le texte traduit. Sans contexte, sans commentaire et sans explication.",
            },
            {
                "role": "user",
                "content": f"Traduit en {LANGUAGE_POSSIBLES[locale]} la phrase suivante : \n{sentence}",
            },
        ],
        model="gpt-3.5-turbo",
    )

    return chat_completion.choices[0].message.content.strip()


def add_language_entry(new_key: str, new_value: str):
    for locale in LANGUAGE_POSSIBLES:
        file_path = Path(__file__).parent / f"{locale}.ts"
        if not file_path.exists():
            print(f"Le fichier {locale}.ts n'existe pas.")
            continue

        with open(file_path, "r", encoding="utf-8") as file:
            content = file.read()

        # Vérifier si l'entrée existe déjà
        if f'"{new_key}":' in content:
            print(f"L'entrée '{new_key}' existe déjà dans le fichier {locale}.ts")
            continue

        # Trouver l'endroit où insérer la nouvelle entrée
        insert_index = content.rfind("}")

        # Traduire la nouvelle valeur
        new_value = translate(locale, new_value)

        # Ajouter la nouvelle entrée
        new_entry = f'  "{new_key}": "{new_value}",'
        updated_content = (
            content[:insert_index] + new_entry + "\n" + content[insert_index:]
        )

        with open(file_path, "w", encoding="utf-8") as file:
            file.write(updated_content)

        print(f"Nouvelle entrée ajoutée dans {locale}.ts : {new_key} = {new_value}")


if __name__ == "__main__":
    key = input("Entrez la clé de la nouvelle entrée : ")
    value = input("Entrez la valeur de la nouvelle entrée : ")

    add_language_entry(key, value)
