
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from evals.encoding_mappings import (
	IMPACT_COLUMNS,
	AGREEMENT_COLUMNS,
	DEMOGRAPHIC_COLUMNS,
	ROLE_MAPPING,
	ROLE_CLUSTER_MAPPING,
	ROLE_REVERSE,
	ROLE_CLUSTER_REVERSE,
)

###############################
# FILE PATHS AND DATA LOADING #
###############################

eval_file_path = "evals/datasets/eff_eval_responses_fully_encoded.csv"
output_file_path = "evals/datasets/evaluation_output.txt"
data = pd.read_csv(eval_file_path)

pd.set_option('display.max_columns', None)  # show all columns in output
pd.set_option('display.width', 1000)        # set max width for better readability

output_lines = []

def add_output(line):
	print(line)
	output_lines.append(str(line))

add_output("=== Data Overview ===")

# Only describe numeric columns (auto-select impact/agreement columns)
impact_numeric = [col for col in IMPACT_COLUMNS if col in data.columns]
agreement_numeric = [col for col in AGREEMENT_COLUMNS if col in data.columns]
describe_cols = impact_numeric + agreement_numeric
add_output(data[describe_cols].describe())

# Drop timestamp to enable numeric analysis
data = data.drop(columns=["timestamp"])

# === Demographic Summary ===

# === Demographic Summary Section ===
add_output("\n=== Demographic Summary ===")

# Number of responses
num_responses = len(data)
add_output(f"Number of responses: {num_responses}")



# Print tables for all DEMOGRAPHIC_COLUMNS using their mappings and *_REVERSE dicts
for col, mapping in DEMOGRAPHIC_COLUMNS.items():
	if col in data.columns:
		counts = data[col].value_counts().sort_index()
		# Try to get the reverse mapping for human-readable labels
		reverse = None
		if col == 'professional_role':
			reverse = ROLE_REVERSE
			label = 'Role'
		elif col == 'role_cluster_code':
			reverse = ROLE_CLUSTER_REVERSE
			label = 'Cluster'
		else:
			# Try to find a *_REVERSE mapping in encoding_mappings
			reverse_name = col.upper() + '_REVERSE'
			reverse = globals().get(reverse_name, None)
			label = col
		if reverse:
			readable = [(reverse.get(int(code), code), count) for code, count in counts.items()]
			add_output(f"Number of participants per {col} (label, count):")
			add_output(pd.DataFrame(readable, columns=[label, "Count"]))
		else:
			add_output(f"Number of participants per {col}:")
			add_output(counts)

# Experience summary (if available)
if 'agile_experience_years' in data.columns:
	exp_counts = data['agile_experience_years'].value_counts().sort_index()
	add_output("Number of participants per agile_experience_years:")
	add_output(exp_counts)

# Group by professional role and calculate mean, stddev, and count for each group (numeric only)
group_by_role = data.groupby("professional_role")
group_means = group_by_role.mean(numeric_only=True)
group_stddev = group_by_role.std(numeric_only=True)
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


# Auto-select dimensions from IMPACT_COLUMNS (excluding v1/v2 prefix)
dimensions = sorted(set(col.replace('yogi_v1_', '').replace('yogi_v2_', '') for col in IMPACT_COLUMNS if col.startswith('yogi_v1_')))

# Mean and std table per cluster and dimension
mean_table = []
std_table = []
diff_table = []
for dim in dimensions:
	data[f'{dim}_diff'] = data[f'yogi_v2_{dim}'] - data[f'yogi_v1_{dim}']
	means = data.groupby('role_cluster_code')[[f'yogi_v1_{dim}', f'yogi_v2_{dim}']].mean()
	stds = data.groupby('role_cluster_code')[[f'yogi_v1_{dim}', f'yogi_v2_{dim}']].std()
	diffs = data.groupby('role_cluster_code')[f'{dim}_diff'].mean()
	means.columns = [f'{c}_mean' for c in means.columns]
	stds.columns = [f'{c}_std' for c in stds.columns]
	means['diff_mean'] = diffs
	mean_table.append(means)
	std_table.append(stds)
	diff_table.append(diffs)
mean_table_df = pd.concat(mean_table, axis=1)
std_table_df = pd.concat(std_table, axis=1)
add_output("\n=== Mean Table (Yogi v1/v2 and Difference) per Cluster and Dimension ===")
add_output(mean_table_df)
add_output("\n=== Std Table (Yogi v1/v2) per Cluster and Dimension ===")
add_output(std_table_df)

# Write all output to file
with open(output_file_path, mode="w", encoding="utf-8") as f:
    for line in output_lines:
        f.write(str(line) + "\n")


############################
# PLOTS AND VISUALIZATIONS #
############################


# Boxplot for Yogi v1 utility by professional role
plt.figure(figsize=(8, 5))
sns.boxplot(x='professional_role', y='yogi_v1_utility', data=data)
plt.title('Yogi v1 Utility by Professional Role')
plt.xlabel('Professional Role (encoded)')
plt.ylabel('Yogi v1 Utility')
plt.tight_layout()
plt.savefig("evals/datasets/yogi_v1_utility_by_role.png")
plt.show()

# Boxplot for Yogi v1 utility by role cluster
plt.figure(figsize=(6, 5))
sns.boxplot(x='role_cluster_code', y='yogi_v1_utility', data=data)
plt.title('Yogi v1 Utility by Role Cluster')
plt.xlabel('Role Cluster (1=Developer, 2=IT Professional)')
plt.ylabel('Yogi v1 Utility')
plt.tight_layout()
plt.savefig("evals/datasets/yogi_v1_utility_by_cluster.png")
plt.show()

# Boxplot for Yogi v2 utility by professional role
plt.figure(figsize=(8, 5))
sns.boxplot(x='professional_role', y='yogi_v2_utility', data=data)
plt.title('Yogi v2 Utility by Professional Role')
plt.xlabel('Professional Role (encoded)')
plt.ylabel('Yogi v2 Utility')
plt.tight_layout()
plt.savefig("evals/datasets/yogi_v2_utility_by_role.png")
plt.show()

# Boxplot for Yogi v2 utility by role cluster
plt.figure(figsize=(6, 5))
sns.boxplot(x='role_cluster_code', y='yogi_v2_utility', data=data)
plt.title('Yogi v2 Utility by Role Cluster')
plt.xlabel('Role Cluster (1=Developer, 2=IT Professional)')
plt.ylabel('Yogi v2 Utility')
plt.tight_layout()
plt.savefig("evals/datasets/yogi_v2_utility_by_cluster.png")
plt.show()


# Boxplots for all Yogi v1 and v2 values by professional role (auto-detected)
for dim in dimensions:
	# Yogi v1
	plt.figure(figsize=(8, 5))
	sns.boxplot(x='professional_role', y=f'yogi_v1_{dim}', data=data)
	plt.title(f'Yogi v1 {dim.capitalize()} by Professional Role')
	plt.xlabel('Professional Role (encoded)')
	plt.ylabel(f'Yogi v1 {dim.capitalize()}')
	plt.tight_layout()
	plt.savefig(f"evals/datasets/yogi_v1_{dim}_by_role.png")
	plt.show()
	# Yogi v2
	plt.figure(figsize=(8, 5))
	sns.boxplot(x='professional_role', y=f'yogi_v2_{dim}', data=data)
	plt.title(f'Yogi v2 {dim.capitalize()} by Professional Role')
	plt.xlabel('Professional Role (encoded)')
	plt.ylabel(f'Yogi v2 {dim.capitalize()}')
	plt.tight_layout()
	plt.savefig(f"evals/datasets/yogi_v2_{dim}_by_role.png")
	plt.show()


# Boxplots for all Yogi v1 and v2 values by clusters (auto-detected)
for dim in dimensions:
	# Yogi v1 by cluster
	plt.figure(figsize=(6, 5))
	sns.boxplot(x='role_cluster_code', y=f'yogi_v1_{dim}', data=data)
	plt.title(f'Yogi v1 {dim.capitalize()} by Role Cluster')
	plt.xlabel('Role Cluster (1=Developer, 2=IT Professional)')
	plt.ylabel(f'Yogi v1 {dim.capitalize()}')
	plt.tight_layout()
	plt.savefig(f"evals/datasets/yogi_v1_{dim}_by_cluster.png")
	plt.show()
	# Yogi v2 by cluster
	plt.figure(figsize=(6, 5))
	sns.boxplot(x='role_cluster_code', y=f'yogi_v2_{dim}', data=data)
	plt.title(f'Yogi v2 {dim.capitalize()} by Role Cluster')
	plt.xlabel('Role Cluster (1=Developer, 2=IT Professional)')
	plt.ylabel(f'Yogi v2 {dim.capitalize()}')
	plt.tight_layout()
	plt.savefig(f"evals/datasets/yogi_v2_{dim}_by_cluster.png")
	plt.show()

# Paired difference, mean per cluster, and mean difference per cluster for all dimensions (auto-detected)
for dim in dimensions:
	diff_col = f'{dim}_diff'
	data[diff_col] = data[f'yogi_v2_{dim}'] - data[f'yogi_v1_{dim}']
	add_output(f"\nMean {dim} difference (Yogi v2 - v1): {data[diff_col].mean()}")
	cluster_means = data.groupby('role_cluster_code')[[f'yogi_v1_{dim}', f'yogi_v2_{dim}']].mean()
	add_output(f"\nMean Yogi v1 and v2 {dim} per cluster:")
	add_output(cluster_means)
	cluster_diff = data.groupby('role_cluster_code')[diff_col].mean()
	add_output(f"\nMean {dim} difference (Yogi v2 - v1) per cluster:")
	add_output(cluster_diff)

# Correlation matrix heatmap (numeric columns only)
plt.figure(figsize=(12, 8))
numeric_data = data.select_dtypes(include='number')
corr = numeric_data.corr()
sns.heatmap(corr, annot=True, fmt=".2f", cmap="coolwarm")
plt.title('Correlation Matrix')
plt.tight_layout()
plt.savefig("evals/datasets/correlation_matrix.png")
plt.show()


# Paired difference boxplots per cluster and dimension (auto-detected)
for dim in dimensions:
	diff_col = f'{dim}_diff'
	plt.figure(figsize=(6, 5))
	sns.boxplot(x='role_cluster_code', y=diff_col, data=data)
	plt.title(f'Yogi v2 - v1 {dim.capitalize()} Difference by Role Cluster')
	plt.xlabel('Role Cluster (1=Developer, 2=IT Professional)')
	plt.ylabel(f'{dim.capitalize()} Difference (v2 - v1)')
	plt.tight_layout()
	plt.savefig(f"evals/datasets/{dim}_diff_by_cluster.png")
	plt.show()


# Barplot of mean differences per cluster and dimension (auto-detected)
diff_means = {dim: data.groupby('role_cluster_code')[f'{dim}_diff'].mean() for dim in dimensions}
diff_means_df = pd.DataFrame(diff_means)
diff_means_df.plot(kind='bar', figsize=(8, 6))
plt.title('Mean Yogi v2 - v1 Difference per Cluster and Dimension')
plt.xlabel('Role Cluster (1=Developer, 2=IT Professional)')
plt.ylabel('Mean Difference (v2 - v1)')
plt.legend(title='Dimension')
plt.tight_layout()
plt.savefig('evals/datasets/mean_diff_barplot_by_cluster.png')
plt.show()