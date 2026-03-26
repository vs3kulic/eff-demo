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
- [ ] Ensure group‑by summaries exist both by `professional_role` and by `role_cluster_code`, using the provided mappings.
- [ ] Add a compact table of v1 vs v2 means and differences for all five impact dimensions, plus one “overall mean difference across dimensions” row.
- [ ] Add a table of DR1–DR5 means, SDs, and verbal labels (disagree/neutral/agree) using `AGREEMENT_MAPPING` to interpret scores.
- [ ] Explicitly compute mean v2–v1 differences per **cluster** for each dimension, using `ROLETOCLUSTER` to double‑check that each professional role is assigned to the intended cluster.
- [ ] In the code, create each `{dim}_diff` only once and reuse it in all later analyses and plots.
- [ ] Add a validation step that checks all encoded values fall inside the defined mapping ranges (e.g., 1–5, 1–4) and logs any out‑of‑range values.
- [ ] For all role/cluster plots, replace numeric x‑tick labels with readable names via `ROLE_REVERSE` and `ROLECLUSTER_REVERSE` where feasible.
- [ ] Restrict correlation analysis to a smaller, conceptually relevant subset of variables to avoid an unreadable full matrix.

## Further analysis — TODOs

- [ ] Compute correlations between DR1–DR5 scores and the average v2–v1 impact difference across the five values (are higher DR ratings linked to perceiving more benefit from EFF?).
- [ ] Compute correlations between `ai_ml_experience`, `ethical_risk_frequency`, and each `{dim}_diff` to see whether more AI/ethics‑exposed participants perceive stronger improvements.
- [ ] Check whether `vbe_familiarity` relates to DR1–DR5 ratings (do people who know VBE rate EFF differently?).
- [ ] Optionally, run simple scatter/box plots for any correlation above a chosen threshold (e.g., |r| ≥ 0.4) to visually inspect patterns.

