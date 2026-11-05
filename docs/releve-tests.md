# Relevé des tests

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
| calculer la moyenne temperatures | 28°c | 28°c si le programme fonctionne                   |  Moi |
| afficher la temperature minimale |26°c(M03et M08)|  26°C si correct                           | Moi|
| afficher la temperature maximale|30°C(M06 et M10)| 30°c si correct                             | Moi|
| calculer le cumul de pluie |45Mm |45Mm si correct                                               | Moi|
| afficher les jours au moins 10Mm de pluie |M03(12Mm)et M08(15MM)|M03 et M08 si correct           |Moi |
| tester le menu et la sauvegarde | ajout conservé après redemarrage |à vérifier dans le programme|  Moi|

**Sur un autre poste** (`git clone`, `node app.js`, `npm test`, en suivant le README) : ✏️
