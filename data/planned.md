# Yogi EFF Evaluation – Analysis #TODOs

## 0. Repo structure and privacy

- [ ] Use the same repo as the EFF Yogi demo.
- [ ] Create a clear structure, for example:
  - [ ] `app/` for the existing Yogi app / EFF code.
  - [ ] `analysis/` for evaluation scripts and docs.
  - [ ] `analysis/data/` for CSV files (synthetic + real).
- [ ] In the repo root, update the README or create `analysis/README.md` explaining:
  - [ ] What the evaluation is about.
  - [ ] That real participant data is not tracked in Git.
- [ ] Add a Git ignore rule so real data is never committed (at least the real responses file).

## 1. Get the data (synthetic first, then real)

- [ ] Ensure `analysis/data/` exists.
- [ ] Create `analysis/data/yogi_eff_synthetic.csv`:
  - [ ] Same headers as the planned Google Forms export (or final renamed version).
  - [ ] 10–20 fake rows that:
    - [ ] Cover all Likert options for each scale.
    - [ ] Use varied roles, agile experience, AI experience, ethics frequency.
    - [ ] Contain a few non-empty open-text answers.
- [ ] Plan the real data export:
  - [ ] From the linked Google Sheet, export responses as CSV.
  - [ ] Save as `analysis/data/yogi_eff_responses.csv`.
  - [ ] Check:
    - [ ] First row has all column names.
    - [ ] No trailing empty columns.
    - [ ] Likert labels are spelled consistently.

## 2. Inspect and understand the columns

- [ ] Open the CSV (synthetic first).
- [ ] List all column names.
- [ ] Mark which columns belong to:
  - [ ] Participant background.
  - [ ] v1 value ratings (Utility, Fairness, Privacy, Explainability, Safety).
  - [ ] v2 value ratings (same five).
  - [ ] DR1–DR5 ratings.
  - [ ] Open-text questions.
- [ ] Decide short internal names for each key column.
- [ ] Decide whether to:
  - [ ] Rename headers directly in the CSV, or
  - [ ] Keep original headers and rename in the analysis later.

## 3. Set up the Python environment

- [ ] From repo root, create or activate a virtual environment.
- [ ] Install `pandas`.
- [ ] Verify `pandas` can be imported from inside `analysis/`.

## 4. Design SimpleEvalLogger and Timer

- [ ] Specify what the `Timer` class should do:
  - [ ] Store a start time.
  - [ ] Compute elapsed time in seconds.
- [ ] Specify what the logger class should do:
  - [ ] Manage a log filename via property getter/setter.
  - [ ] Append messages to that file.
  - [ ] Provide a decorator that:
    - [ ] Logs when a function starts.
    - [ ] Logs when it ends and how long it took.
- [ ] Decide on the log file location/name (e.g., `analysis/eff_eval.log`).

## 5. Plan data loading with pandas

- [ ] Decide where the load function will live (e.g., `analyze_yogi.py`).
- [ ] Decide:
  - [ ] Which path to use for synthetic data.
  - [ ] Which path to use for real data.
- [ ] Note that loading should be tested first with the synthetic CSV.

## 6. Define numeric mappings for Likert answers

- [ ] Write down the exact value scale labels for Utility, Fairness, Privacy, Explainability, Safety.
- [ ] Map each label to an integer 1–5.
- [ ] Do the same for DR1–DR5 agreement scale.
- [ ] Confirm labels match exactly what Google Forms uses.

## 7. Plan the recoding step

- [ ] List all text columns that need value-scale recoding (v1 and v2).
- [ ] List all text columns for DR1–DR5.
- [ ] Decide naming convention for numeric columns (e.g., add `_num` suffix).
- [ ] Ensure synthetic CSV uses the same labels so recoding can be tested.

## 8. Plan the sample description

- [ ] Decide which columns describe the sample:
  - [ ] Role.
  - [ ] Agile experience.
  - [ ] AI/ML experience.
  - [ ] Ethics frequency.
- [ ] Decide what to output for each:
  - [ ] Counts per category.
  - [ ] Percentages per category (rounded to 1 decimal).
- [ ] Verify that synthetic data contains at least 2–3 categories per variable.

## 9. Plan the value ratings summaries (v1 vs v2)

- [ ] Confirm the list of value dimensions: Utility, Fairness, Privacy, Explainability, Safety.
- [ ] Decide which statistics to compute for each, per version:
  - [ ] Mean.
  - [ ] Median.
- [ ] Decide on the output format:
  - [ ] One table with rows = values, columns = v1 mean/median and v2 mean/median.
- [ ] Ensure synthetic data has variation so differences are visible.

## 10. Plan DR1–DR5 summaries

- [ ] Confirm column names for DR1–DR5.
- [ ] For each DR item, decide to compute:
  - [ ] Mean.
  - [ ] Median.
  - [ ] Percentage of responses ≥ 4 (agree/strongly agree).
- [ ] Decide on an output table format:
  - [ ] Rows = DR1…DR5, columns = mean, median, %≥4.
- [ ] Check synthetic data is constructed so at least some values are ≥ 4.

## 11. Plan open-text handling and manual coding

- [ ] Identify all open-text question columns.
- [ ] Decide how to list answers (e.g., ID + text).
- [ ] Decide on initial theme candidates (e.g., privacy, clarity, overhead, trust, usability).
- [ ] Plan manual coding workflow:
  - [ ] Read answers in the console or copy to a notes file.
  - [ ] Assign theme labels by hand.
  - [ ] Count occurrences per theme.
  - [ ] Choose a few short quotes for each main theme.

## 12. Plan the main analysis workflow

- [ ] Decide main steps to call in order:
  - [ ] Load data (synthetic first, then real).
  - [ ] Recode Likert fields.
  - [ ] Print sample description.
  - [ ] Print v1 vs v2 value summaries.
  - [ ] Print DR1–DR5 summaries.
  - [ ] Optionally list open-text answers.
- [ ] Decide where to switch from synthetic to real CSV (ideally a single config line).
- [ ] Ensure the logger wraps the main analysis so all steps are logged.

## 13. Finish criteria

- [ ] With real data, verify:
  - [ ] Sample description is produced for all background variables.
  - [ ] v1 vs v2 summaries exist for Utility, Fairness, Privacy, Explainability, Safety.
  - [ ] DR1–DR5 table with mean, median, %≥4 is produced.
  - [ ] Open-text answers have been manually coded into themes with example quotes selected.
- [ ] Note in this file when all items above are completed and the evaluation section is ready to be written.
