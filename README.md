# Journal météorologique de la ferme

> Projet individuel du SAS DFS, brief 4 (sujet : [SUJET.md](SUJET.md)). Remplacez chaque ✏️ par votre texte, puis supprimez cette ligne.

## Contexte

 Le journal météorologique est utulisé par le chef d'exploitation, le technicien agricole, l'agronome. Il permetd'anticiper les risques climatiques,planifier les activiités agricoles et les températures élévées. A lui seul ne permet pas de determiner la quantité exacte de récolte à obtenir, la présence de parasites dans les cultures, la qualitée des semences.

## Prérequis et lancement

- Node.js 20 ou plus récent, Git ; aucune bibliothèque à installer.

```bash
git clone https://github.com/VOTRE-COMPTE/brief-4-journal-meteo.git
cd brief-4-journal-meteo
node app.js
npm test
```

Sous PowerShell, si `npm` est bloqué : `npm.cmd test`.

## Fonctionnalités

 *Cochez seulement ce qui marche : `- [x]`.*

- [X] Données lues et enregistrées dans `donnees/releves.json`
- [X] Ajouter un relevé, saisies invalides refusées sans arrêter le programme
- [X] Lister les relevés, message si le journal est vide
- [X] Rechercher par identifiant ou par date ; journées pluvieuses (au moins 10 mm)
- [X] Trier par température ou par pluie
- [X] Synthèse : température moyenne, minimale et maximale de lax série, cumul de pluie, journées pluvieuses
- [] Bonus : supprimer et modifier un relevé (choix 6 et 7)
- [ ] Bonus : tri par température décroissante, journée la plus chaude

## Données

*Le fichier, le nombre de relevés, les champs (voir [docs/dictionnaire-donnees.md](docs/dictionnaire-donnees.md)), les unités. Rappelez qu'ils sont fictifs.*
nous avons 10 relevés , avec des champs et des unités differentes. le champ ID et Date n'ont aucune unitées de mesure tandis que la temperature en degrés celcuis(°C), la pluie en milimètre(Mm) et humidité de l'air en pourcentage (%).

## Limites

*Au moins trois. Par exemple : dix jours de relevés forment une courte série, ils ne décrivent pas le climat de la région.*
- sur une série si courte, un seul jour extrême peut fausser la moyenne et le cumul de pluie.
- saisie manuelle, risque d'erreur de frappe et pas de vérification de l'instrument.
- ces jours dépendendent de la saison et du lieu de mesure : on ne peut pas géneraliser à toute l'année.
## Documents

[Dictionnaire des données](docs/dictionnaire-donnees.md) · [Tâches](docs/taches.md) · [Relevé des tests](docs/releve-tests.md) · [Journal de recherche](docs/journal-recherche.md) · [Fiche agronomique](docs/fiche-agronomique.md) · [Fiche individuelle](docs/fiche-individuelle.md)

## Auteur

 *Prénom NOM, compte GitHub. Entraide : avec qui, sur quoi.*
NOM: KOUASSI , PRENOM: AFFOUE THYEDIE AKPLI, compte GitHub: thyedieakplik-spec, Entraide:
HIRE ETIENNE NEMLIN il a éte vraiment d'une grande aide pour moi dans l'explication, la motivation.