#!/usr/bin/env python3
"""
Complete pipeline for processing EFF evaluation responses.

This script takes the raw CSV and produces a fully encoded, sanitized dataset
ready for statistical analysis.

Pipeline:
1. Normalize headers (verbose → clean snake_case)
2. Encode impact scales (Yogi v1/v2) and agreement scales (DR1-DR5)
3. Remove free-text and unused columns
4. Encode demographic/background categorical columns
5. Output fully encoded numeric dataset

Usage:
    python process_responses.py
"""

import csv
import os

from header_mappings import HEADER_MAPPINGS
from encoding_mappings import (
    IMPACT_MAPPING,
    AGREEMENT_MAPPING,
    IMPACT_COLUMNS,
    AGREEMENT_COLUMNS,
    DEMOGRAPHIC_COLUMNS,
)

# File paths
dataset_dir = os.path.join(os.path.dirname(__file__), "datasets")
input_file = os.path.join(dataset_dir, "eff_eval_responses_raw.csv")
normalized_file = os.path.join(dataset_dir, "eff_eval_responses_normalized.csv")
output_file = os.path.join(dataset_dir, "eff_eval_responses_fully_encoded.csv")

print("=" * 70)
print("EFF EVALUATION RESPONSE PROCESSING PIPELINE")
print("=" * 70)

# Step 1: Normalize headers
print("\n[1/5] Normalizing headers...")
with open(input_file, 'r', encoding='utf-8') as f:
    reader = csv.reader(f)
    raw_headers = next(reader)
    rows = list(reader)

# Handle DR columns with newlines
dr_headers = [h for h in raw_headers if h.startswith('DR')]
for h in dr_headers:
    if 'Stakeholder-Centric' in h:
        HEADER_MAPPINGS[h] = 'dr1_stakeholder_centric'
    elif 'Value Interpretation' in h:
        HEADER_MAPPINGS[h] = 'dr2_value_interpretation'
    elif 'Specification Translation' in h:
        HEADER_MAPPINGS[h] = 'dr3_specification_translation'
    elif 'Verifiable Acceptance' in h:
        HEADER_MAPPINGS[h] = 'dr4_verifiable_acceptance'
    elif 'Process Integration' in h:
        HEADER_MAPPINGS[h] = 'dr5_process_integration'

normalized_headers = [HEADER_MAPPINGS.get(h, h) for h in raw_headers]

# Write normalized CSV
with open(normalized_file, 'w', encoding='utf-8', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(normalized_headers)
    writer.writerows(rows)

print(f"✓ Normalized {len(raw_headers)} headers")
print(f"✓ Created: {os.path.basename(normalized_file)}")

# Step 2: Load normalized responses
print("\n[2/5] Loading normalized responses...")
with open(normalized_file, 'r', encoding="utf-8") as f:
    reader = csv.DictReader(f)
    headers = reader.fieldnames
    rows = list(reader)
print(f"✓ Loaded {len(rows)} responses with {len(headers)} columns")

# Step 2: Load normalized responses
print("\n[2/5] Loading normalized responses...")
with open(normalized_file, 'r', encoding="utf-8") as f:
    reader = csv.DictReader(f)
    headers = reader.fieldnames
    rows = list(reader)
print(f"✓ Loaded {len(rows)} responses with {len(headers)} columns")

# Step 3: Encode impact and agreement scales
print("\n[3/5] Encoding impact and agreement scales...")
for row in rows:
    # Encode impact scales (Yogi v1/v2)
    for col in IMPACT_COLUMNS:
        if col in row and row[col]:
            row[col] = str(IMPACT_MAPPING.get(row[col], row[col]))
    
    # Encode agreement scales (DR1-DR5)
    for col in AGREEMENT_COLUMNS:
        if col in row and row[col]:
            row[col] = str(AGREEMENT_MAPPING.get(row[col], row[col]))

print(f"✓ Encoded {len(IMPACT_COLUMNS)} impact columns")
print(f"✓ Encoded {len(AGREEMENT_COLUMNS)} agreement columns")

# Step 4: Remove free-text and unused columns
print("\n[4/5] Removing free-text and unused columns...")
remove_columns = ["eff_feedback", "unused_22", "unused_16"]
sanitized_headers = [h for h in headers if h not in remove_columns]

sanitized_rows = []
for row in rows:
    sanitized_row = {k: v for k, v in row.items() if k not in remove_columns}
    sanitized_rows.append(sanitized_row)

print(f"✓ Removed {len(remove_columns)} columns: {remove_columns}")
print(f"✓ Remaining: {len(sanitized_headers)} columns")

# Step 5: Encode demographic/background columns
print("\n[5/5] Encoding demographic and background columns...")
for row in sanitized_rows:
    for col, mapping in DEMOGRAPHIC_COLUMNS.items():
        if col in row and row[col]:
            row[col] = str(mapping.get(row[col], row[col]))

print(f"✓ Encoded {len(DEMOGRAPHIC_COLUMNS)} demographic columns:")
for col in DEMOGRAPHIC_COLUMNS.keys():
    print(f"  - {col}")

# Write fully encoded CSV
print("\n[Final] Writing fully encoded dataset...")
with open(output_file, 'w', encoding="utf-8", newline='') as f:
    writer = csv.DictWriter(f, fieldnames=sanitized_headers)
    writer.writeheader()
    writer.writerows(sanitized_rows)

print(f"✓ Created: {os.path.basename(output_file)}")
print(f"✓ Final dataset: {len(sanitized_rows)} rows × {len(sanitized_headers)} columns")

print("\n" + "=" * 70)
print("PROCESSING COMPLETE")
print("=" * 70)
print(f"\nOutput: {output_file}")
print("\nAll categorical values encoded to numeric scales (1-5).")
print("Dataset ready for statistical analysis.")
