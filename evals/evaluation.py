# -*- coding: utf-8 -*-
from pathlib import Path
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from evals.encoding_mappings import (
    IMPACT_COLUMNS,
    AGREEMENT_COLUMNS,
    DEMOGRAPHIC_COLUMNS,
    ROLE_REVERSE,
    ROLE_CLUSTER_REVERSE,
    AGREEMENT_REVERSE
)

#########################
# CONFIG AND FILE PATHS #
#########################

pd.set_option('display.max_columns', None)  # show all columns in output
pd.set_option('display.width', 1000)        # set max width for better readability

EVAL_FILE = Path("evals/datasets/eff_eval_responses_fully_encoded.csv")
OUTPUT_FILE = Path("evals/datasets/evaluation_output.txt")
PLOT_DIR = Path("evals/datasets")
PLOT_DIR.mkdir(parents=True, exist_ok=True)


###################
# OUTPUT HANDLING #
###################

class OutputCollector:
    def __init__(self):
        self.lines = []

    def add(self, msg):
        print(msg)
        self.lines.append(str(msg))

    def write_to_file(self, path):
        with open(path, "w", encoding="utf-8") as f:
            for line in self.lines:
                f.write(line + "\n")

out = OutputCollector()

####################
# DATA PREPARATION #
####################

# Data loading
def load_data(path: Path) -> pd.DataFrame:
    df = pd.read_csv(path)
    df.drop(columns=["timestamp"], errors="ignore", inplace=True)
    return df

# Dimension extraction
def get_dimensions():
    dims = {
        col.replace("yogi_v1_", "")
        for col in IMPACT_COLUMNS
        if col.startswith("yogi_v1_")
	}
    return sorted(dims)

# Demographics
def map_demographics(df: pd.DataFrame):
    mapping_overrides = {
        "professional_role": ROLE_REVERSE,
        "role_cluster_code": ROLE_CLUSTER_REVERSE,
        }
    for col, mapping in DEMOGRAPHIC_COLUMNS.items():
        if col not in df.columns:
            continue
        reverse_map = mapping_overrides.get(col, None)
        counts = df[col].value_counts().sort_index()
        out.add(f"\n--- Demographic: {col} ---")
        if reverse_map:
            readable = [(reverse_map.get(int(k), k), v) for k, v in counts.items()]
            out.add(pd.DataFrame(readable, columns=["Label", "Count"]))
        else:
            out.add(counts)

########################################################
# COMPUTE MEANS, STDS, AND DIFFERENCES BY ROLE CLUSTER #
########################################################

def compute_dimension_stats(df: pd.DataFrame, dims):
    tables_mean = []
    tables_std = []
    for dim in dims:
        df[f"{dim}_diff"] = df[f"yogi_v2_{dim}"] - df[f"yogi_v1_{dim}"]
        mean = df.groupby("role_cluster_code")[[f"yogi_v1_{dim}", f"yogi_v2_{dim}"]].mean()
        std = df.groupby("role_cluster_code")[[f"yogi_v1_{dim}", f"yogi_v2_{dim}"]].std()
        mean.columns = [f"{c}_mean" for c in mean.columns]
        std.columns = [f"{c}_std" for c in std.columns]
        mean["diff_mean"] = df.groupby("role_cluster_code")[f"{dim}_diff"].mean()
        tables_mean.append(mean)
        tables_std.append(std)
    mean_df = pd.concat(tables_mean, axis=1)
    std_df = pd.concat(tables_std, axis=1)
    return mean_df, std_df

####################
# PLOTTING HELPERS #
####################

def plot_box(df, x, y, title, filename):
    plt.figure(figsize=(8, 5))
    sns.boxplot(x=x, y=y, data=df)
    plt.title(title)
    plt.tight_layout()
    plt.savefig(PLOT_DIR / filename)
    plt.close()

def generate_all_plots(df: pd.DataFrame, dims):
	for dim in dims:
		for version in ["yogi_v1", "yogi_v2"]:
			plot_box(
				df,
				x="professional_role",
				y=f"{version}_{dim}",
				title=f"{version.upper()} {dim} by Professional Role",
				filename=f"{version}_{dim}_by_role.png",
			)
			plot_box(
				df,
				x="role_cluster_code",
				y=f"{version}_{dim}",
				title=f"{version.upper()} {dim} by Role Cluster",
				filename=f"{version}_{dim}_by_cluster.png",
			)
		plot_box(
			df,
			x="role_cluster_code",
			y=f"{dim}_diff",
			title=f"Difference Yogi v2 - v1 for {dim}",
			filename=f"{dim}_diff_by_cluster.png",
		)

# DR1–DR5 Means, SDs, and Verbal Labels
def dr_agreement_table(df):
    dr_cols = [c for c in AGREEMENT_COLUMNS if c in df.columns]
    if dr_cols:
        means = df[dr_cols].mean()
        stds = df[dr_cols].std()
        labels = means.round().astype(int).map(AGREEMENT_REVERSE)
        out.add("\n=== DR1–DR5 Means, SDs, and Verbal Labels ===")
        out.add(pd.DataFrame({'Mean': means, 'SD': stds, 'Label': labels}))

# Main
def main():
    df = load_data(EVAL_FILE)
    out.add("=== DATA OVERVIEW ===")
    numeric_cols = [c for c in IMPACT_COLUMNS + AGREEMENT_COLUMNS if c in df.columns]
    out.add(df[numeric_cols].describe())
    out.add("\n=== DEMOGRAPHICS ===")
    out.add(f"Number of responses: {len(df)}")
    map_demographics(df)
    dims = get_dimensions()
    mean_df, std_df = compute_dimension_stats(df, dims)
    out.add("\n=== MEAN TABLE ===")
    out.add(mean_df)
    out.add("\n=== STD TABLE ===")
    out.add(std_df)
    dr_agreement_table(df)
    out.add("\n=== Missing Values ===")
    out.add(df.isnull().sum())
    generate_all_plots(df, dims)
    out.write_to_file(OUTPUT_FILE)

if __name__ == "__main__":

    main()
