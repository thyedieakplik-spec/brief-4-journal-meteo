# Dictionnaire des données

> Un champ par ligne, d'après `SUJET.md` et le fichier de `donnees/`. La première ligne sert de modèle.

| Champ | Signification | Type | Règle de validation | Unité | Exemple |
| --- | --- | --- | --- | --- | --- |
| `id` | Identifiant unique | texte | non vide, absent des données | — | M0804|
| date        |date de relevé|date|AAAA-MM-JJ|      |     _     |2026-11-02
| températureC|temperature d'air| nombre|positive ou negative| °c|  40|
| pluie Mm    |quantitée de pluie|nombre| valeur positive| mm     |   12    |
| humidité    |humidité relative de l'air|nombre |0à 100 |  %| 50     |

**Listes de valeurs autorisées** : similaire aux règle de validation

**Sources** : sujet.md
