import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

eval_file_path = "evals/datasets/eff_eval_responses_fully_encoded.csv"
output_file_path = "evals/datasets/evaluation_output.txt"
data = pd.read_csv(eval_file_path)

pd.set_option('display.max_columns', None)
pd.set_option('display.width', 1000)

output_lines = []

def add_output(line):
	print(line)
	output_lines.append(str(line))

add_output("=== Data Overview ===")
add_output(data.describe())

# Drop timestamp to enable numeric analysis
data = data.drop(columns=["timestamp"])

# Group by professional role and calculate mean, stddev, and count for each group
group_by_role = data.groupby("professional_role")
group_means = group_by_role.mean()
group_stddev = group_by_role.std()
group_counts = group_by_role.count()

add_output("\n=== Group Means by Professional Role ===")
add_output(group_means)
add_output("\n=== Group Stddev by Professional Role ===")
add_output(group_stddev)
add_output("\n=== Group Counts by Professional Role ===")
add_output(group_counts)

# Check for missing values
add_output("\n=== Missing Values Per Column ===")
add_output(data.isnull().sum())

# Boxplot for Yogi v1 utility by professional role
plt.figure(figsize=(8, 5))
sns.boxplot(x='professional_role', y='yogi_v1_utility', data=data)
plt.title('Yogi v1 Utility by Professional Role')
plt.xlabel('Professional Role (encoded)')
plt.ylabel('Yogi v1 Utility')
plt.tight_layout()
plt.savefig("evals/datasets/yogi_v1_utility_by_role.png")
plt.show()

# Paired difference: Yogi v2 - Yogi v1 (utility)
data['utility_diff'] = data['yogi_v2_utility'] - data['yogi_v1_utility']
add_output(f"\nMean utility difference (Yogi v2 - v1): {data['utility_diff'].mean()}")

# Correlation matrix heatmap
plt.figure(figsize=(12, 8))
corr = data.corr()
sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm")
plt.title('Correlation Matrix')
plt.tight_layout()
plt.savefig("evals/datasets/correlation_matrix.png")
plt.show()

# Write all output to file
with open(output_file_path, "w") as f:
	for line in output_lines:
		f.write(str(line) + "\n")
