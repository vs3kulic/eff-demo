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


## Quantitative Analysis — Summary

- [x] Refactored evaluation.py for modularity: all logic in functions, orchestrated by main().
- [x] Automated extraction and plotting of all impact/agreement columns using mappings.
- [x] Computed means, SDs, and differences for all dimensions by role cluster.
- [x] Generated boxplots for all dimensions and difference scores by role and cluster.
- [x] Created DR1–DR5 agreement tables with means, SDs, and verbal labels.
- [x] Automated output to evaluation_output.txt for reproducibility.

## Further analysis

- [x] Compute correlations between DR1–DR5 scores and the average v2–v1 impact difference across the five values (are higher DR ratings linked to perceiving more benefit from EFF?).
- [-] Compute correlations between `ai_ml_experience`, `ethical_risk_frequency`, and each `{dim}_diff` to see whether more AI/ethics‑exposed participants perceive stronger improvements.
- [-] Check whether `vbe_familiarity` relates to DR1–DR5 ratings (do people who know VBE rate EFF differently?).
- [x] Optionally, run simple scatter/box plots for any correlation above a chosen threshold (e.g., |r| ≥ 0.4) to visually inspect patterns.


## Qualitative Analysis

- [x] Extracted free-text responses (eff_feedback) from raw data and created a clean responses.csv for qualitative coding.
- [x] Created a first-pass codebook (qual_analysis/codebook.md) summarizing recurring ideas and candidate codes from all responses.
- [x] Developed a coding matrix (qual_analysis/coding_matrix.csv) with binary presence/absence for each code per response, plus notes.
- [x] Identified candidate themes by summing code frequencies and grouping related codes.
- [x] Compiled representative verbatim quotes for each theme in qual_analysis/quotes.md, labelled by participant ID.

