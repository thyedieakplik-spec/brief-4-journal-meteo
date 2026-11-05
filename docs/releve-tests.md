1# Relevé des tests

> Écrivez le résultat attendu avant d'essayer. Un écart n'est pas une faute : notez-le, corrigez, refaites le test.

**Calculs à la main** : refaites à la main les résultats de référence de `SUJET.md`, puis comparez avec votre programme. 
moyenne de température =(27+28+26+29+27+30+28+26+29+30)/10 =28°C
température minimum = 26°c ; id:"M03", id "M08".
temperature maximale = 30°c ; id "M06" ; id: "M10".
cumul de pluie = (0+5+12+0+3+0+8+15+0+2) = 45mm.
journée avec au moins 10mm = "M03(12mm) ; "M08"(15mm)

**Essais dans le menu** : un ajout valide (encore là après redémarrage), chaque règle refusée, une recherche introuvable, chaque tri, la synthèse, un choix inconnu.

| Action | Attendu | Obtenu | Testeur |
| --- | --- | --- | --- |
| Ajouter un relevé | releve ajoute|Relevé M14 ajouté. Le journal compte 12 relevé(s). |  Moi |
| Ajouter un releve deja existant |releve refuse|Relevé refusé; Identifiant invalide ou déjà utilisé| Moi|
| rechercher un releve inexistant|releve introuvable |Relevé M13 introuvable.| Moi|
|trier par temperature  |afficher par ordre croissant|les temperatures sont affichees par ordre croissant| Moi|
|Trier par pluie  |afficher par ordre croissant| les pluies sont afficher par ordre croissant|Moi |
| afficher la Synthèse de la série| affichage de la synthèse |Rappels :
  - Quelques jours de relevés forment une courte série météo : ils ne décrivent pas le climat de la région.
  - Le seuil de 10 mm est une catégorie d'exercice : il ne prévoit ni inondation ni stress hydrique.
  - L'humidité relative de l'air (en %) n'est pas l'humidité du sol.|  Moi|

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : ✏️
