---
title: "Contrôleur générique chinois : particularités"
slug: "generic-chinese-controller"
category: "controllers"
tags: ["controller", "wiring", "generic"]
symptoms: ["motor_cuts_out", "wiring_issue", "motor_not_spinning"]
difficulty: "intermediate"
safety: "medium"
---

# Contrôleur générique chinois : particularités

## Symptoms

- Coupures aléatoires sans code d'erreur clair
- Comportement différent selon la marque du display branché

## Probable causes

- Soudures internes fragiles sur les connecteurs de phase moteur
- Connecteurs JST/Higo non standardisés selon les fabricants
- Paramétrage incorrect (limite de courant, nombre de pôles) via le display
- Dissipateur thermique sous-dimensionné pour l'usage réel

## Tests

1. Inspecter visuellement les soudures des connecteurs de puissance
2. Vérifier la correspondance des broches entre contrôleur et display (rarement universelle)
3. Contrôler les paramètres avancés si un mode réglage est accessible
4. Surveiller la température du boîtier après un usage soutenu

## Fixes

- Ressouder proprement les connexions fragiles
- Utiliser un adaptateur de connecteur compatible plutôt que de forcer un branchement
- Réinitialiser les paramètres aux valeurs constructeur puis réajuster progressivement
- Ajouter une dissipation thermique additionnelle si nécessaire

## Safety warnings

- Ne jamais souder sur un contrôleur encore relié à la batterie
- Les contrôleurs génériques ne garantissent pas toujours une coupure fiable en cas de défaut : rester vigilant
