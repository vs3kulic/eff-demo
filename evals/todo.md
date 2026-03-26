# EVALUATION

## Fix Encodings

- [x] fix missing value in EXPERIENCE_MAPPING
- [x] fix missing value AI_ML_EXPERIENCE_MAPPING
- [x] run pipeline to re-create output file

## Perform EDA

- [x] Visualize Yogi v1 utility by professional role (boxplot)
- [x] Compute paired difference (Yogi v2 - v1 utility)
- [x] Generate and visualize correlation matrix (heatmap)


## Evaluation clean‑up

- [x] Use `IMPACT_COLUMNS` and `AGREEMENT_COLUMNS` from `encoding_mappings.py` to auto‑select which items to describe and plot, instead of hard‑coding column names.
- [x] Use `DEMOGRAPHIC_COLUMNS` plus `ROLE_MAPPING`, `ROLECLUSTER_MAPPING`, and their REVERSE dicts to print tables with human‑readable labels for roles and clusters.
- [x] Add a table of DR1–DR5 means, SDs, and verbal labels (disagree/neutral/agree) using `AGREEMENT_MAPPING` to interpret scores.

## Further analysis — TODOs

- [ ] Compute correlations between DR1–DR5 scores and the average v2–v1 impact difference across the five values (are higher DR ratings linked to perceiving more benefit from EFF?).
- [ ] Compute correlations between `ai_ml_experience`, `ethical_risk_frequency`, and each `{dim}_diff` to see whether more AI/ethics‑exposed participants perceive stronger improvements.
- [ ] Check whether `vbe_familiarity` relates to DR1–DR5 ratings (do people who know VBE rate EFF differently?).
- [ ] Optionally, run simple scatter/box plots for any correlation above a chosen threshold (e.g., |r| ≥ 0.4) to visually inspect patterns.

