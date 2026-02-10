import pandas as pd
import os

eval_file_path = "evals/datasets/eff_eval_responses_fully_encoded.csv"
data = pd.read_csv(eval_file_path)
print(data.describe())

# Drop timestamp to enable numeric analysis
data = data.drop(columns=["timestamp"])

# Group by professional role and calculate mean, stddev, and count for each group
group_by_role = data.groupby("professional_role") # .get_group(1) -> # Software Developer / Engineer
group_means = group_by_role.mean()
group_stddev = group_by_role.std()
group_counts = group_by_role.count()

print(
    f"Group mean:     {group_means}"
    # f"Group count:    {group_stddev}"
    # f"Group stddev:   {group_counts}"
)
