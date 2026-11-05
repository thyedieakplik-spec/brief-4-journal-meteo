// Journal météorologique de la ferme — point d'entrée : le menu.
import { demander, fermerSaisie, ouvrirSaisie } from './src/saisie.js';
import { chargerJson, enregistrerJson } from './src/stockage.js';
import { ajouterReleve, formaterReleve, listerReleves, trouverParId } from './src/registre.js';
import { SEUIL_JOUR_PLUVIEUX, joursPluvieux, trierParPluie, trierParTemperature, trouverParDate } from './src/recherche.js';
import { cumulPluie, moyenneTemperature, temperatureMinMax } from './src/synthese.js';

const FICHIER_DONNEES = 'donnees/releves.json';

async function main() {
  ouvrirSaisie();

  // --- Accueil ---
  console.log('==================================================');
  console.log('   JOURNAL MÉTÉOROLOGIQUE DE LA FERME');
  console.log('   Suivi agroclimatique de la ferme pédagogique');
  console.log('==================================================');

  let releves = [];
  try {
    releves = await chargerJson(FICHIER_DONNEES);
    console.log(`${releves.length} relevé(s) chargé(s) depuis ${FICHIER_DONNEES}.`);
  } catch (err) {
    console.log(`Impossible de lire ${FICHIER_DONNEES} : ${err.message}. Le journal démarre vide.`);
    releves = [];
  }

  // --- Boucle du menu ---
  let quitter = false;
  while (!quitter) {
    console.log('');
    console.log('--------------------- MENU ---------------------');
    console.log('1. Ajouter un relevé');
    console.log('2. Lister les relevés');
    console.log('3. Rechercher (identifiant, date, journées pluvieuses)');
    console.log('4. Trier (température, pluie)');
    console.log('5. Synthèse de la série');
    console.log('0. Quitter');

    const choix = await demander('Votre choix : ');

    if (choix === null) {
      // Ctrl+C
      quitter = true;
      break;
    }

    try {
      switch (choix) {
        case '1':
          await actionAjouter(releves);
          break;
        case '2':
          actionLister(releves);
          break;
        case '3':
          await actionRechercher(releves);
          break;
        case '4':
          await actionTrier(releves);
          break;
        case '5':
          actionSynthese(releves);
          break;
        case '0':
          console.log('Au revoir !');
          quitter = true;
          break;
        default:
          console.log(`Choix inconnu : « ${choix} ». Tapez un chiffre du menu.`);
      }
    } catch (err) {
      if (err.message.startsWith('TODO')) {
        console.log(`À compléter : ${err.message}`);
      } else {
        console.log(`Erreur inattendue : ${err.message}`);
      }
    }
  }

  fermerSaisie();
}

// ========== Actions ==========

async function actionAjouter(releves) {
  console.log('--- Ajouter un relevé ---');

  const idBrut = await demander('Identifiant (ex. M11) : ');
  if (idBrut === null) return;

  const date = await demander('Date du relevé (AAAA-MM-JJ) : ');
  if (date === null) return;

  const temperatureC = await demander('Température en °C : ');
  if (temperatureC === null) return;

  const pluieMm = await demander('Pluie en mm : ');
  if (pluieMm === null) return;

  const humiditeAirPct = await demander("Humidité relative de l'air en % : ");
  if (humiditeAirPct === null) return;

  const saisie = {
    id: idBrut.toUpperCase(),
    date,
    temperatureC,
    pluieMm,
    humiditeAirPct,
  };

  const erreurs = ajouterReleve(releves, saisie);

  if (erreurs.length === 0) {
    await enregistrerJson(FICHIER_DONNEES, releves);
    console.log(`Relevé ${saisie.id} ajouté. Le journal compte ${releves.length} relevé(s).`);
  } else {
    console.log('Relevé refusé :');
    for (const msg of erreurs) {
      console.log(`  - ${msg}`);
    }
    console.log(`Le journal compte toujours ${releves.length} relevé(s).`);
  }
}

function actionLister(releves) {
  console.log(`--- Liste des relevés (${releves.length}) ---`);
  console.log(listerReleves(releves));
}

async function actionRechercher(releves) {
  console.log('--- Rechercher ---');
  console.log('1. Par identifiant');
  console.log('2. Par date');
  console.log(`3. Les journées pluvieuses (au moins ${SEUIL_JOUR_PLUVIEUX} mm)`);

  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) return;

  if (sousChoix === '1') {
    const idBrut = await demander('Identifiant : ');
    if (idBrut === null) return;
    const id = idBrut.toUpperCase();
    const releve = trouverParId(releves, id);
    if (releve) {
      console.log(formaterReleve(releve));
    } else {
      console.log(`Relevé ${id} introuvable.`);
    }
  } else if (sousChoix === '2') {
    const date = await demander('Date (AAAA-MM-JJ) : ');
    if (date === null) return;
    const releve = trouverParDate(releves, date);
    if (releve) {
      console.log(formaterReleve(releve));
    } else {
      console.log(`Relevé du ${date} introuvable.`);
    }
  } else if (sousChoix === '3') {
    const pluvieux = joursPluvieux(releves, SEUIL_JOUR_PLUVIEUX);
    console.log(`${pluvieux.length} journée(s) avec au moins ${SEUIL_JOUR_PLUVIEUX} mm de pluie :`);
    console.log(listerReleves(pluvieux));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

async function actionTrier(releves) {
  console.log('--- Trier ---');
  console.log('1. Par température croissante');
  console.log('2. Par pluie croissante');

  const sousChoix = await demander('Votre choix : ');
  if (sousChoix === null) return;

  if (sousChoix === '1') {
    const tries = trierParTemperature(releves);
    console.log(listerReleves(tries));
  } else if (sousChoix === '2') {
    const tries = trierParPluie(releves);
    console.log(listerReleves(tries));
  } else {
    console.log('Choix inconnu : retour au menu.');
  }
}

function actionSynthese(releves) {
  console.log('--- Synthèse de la série ---');
  console.log(`Nombre de relevés : ${releves.length}`);

  const moyenne = moyenneTemperature(releves);
  if (moyenne === null) {
    console.log('Température moyenne : aucune donnée');
  } else {
    console.log(`Température moyenne : ${moyenne} °C`);
  }

  const minMax = temperatureMinMax(releves);
  if (minMax === null) {
    console.log('Températures minimale et maximale : aucune donnée');
  } else {
    console.log(`Température minimale : ${minMax.min} °C · maximale : ${minMax.max} °C`);
  }

  console.log(`Cumul de pluie : ${cumulPluie(releves)} mm`);

  const pluvieux = joursPluvieux(releves, SEUIL_JOUR_PLUVIEUX);
  console.log(`Journées avec au moins ${SEUIL_JOUR_PLUVIEUX} mm de pluie : ${pluvieux.length}`);

  console.log('Rappels :');
  console.log('  - Quelques jours de relevés forment une courte série météo : ils ne décrivent pas le climat de la région.');
  console.log('  - Le seuil de 10 mm est une catégorie d\'exercice : il ne prévoit ni inondation ni stress hydrique.');
  console.log('  - L\'humidité relative de l\'air (en %) n\'est pas l\'humidité du sol.');
}

main();