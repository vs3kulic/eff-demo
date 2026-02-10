# Header mapping from raw to normalized column names
HEADER_MAPPINGS = {
    # Timestamp
    "Zeitstempel": "timestamp",
    
    # Yogi V1 Impact Ratings
    "For each value below, how does Yogi v1 affect this value for end users? [Utility]": "yogi_v1_utility",
    "For each value below, how does Yogi v1 affect this value for end users? [Fairness]": "yogi_v1_fairness",
    "For each value below, how does Yogi v1 affect this value for end users? [Privacy]": "yogi_v1_privacy",
    "For each value below, how does Yogi v1 affect this value for end users? [Explainability]": "yogi_v1_explainability",
    "For each value below, how does Yogi v1 affect this value for end users? [Safety]": "yogi_v1_safety",
    
    # Yogi V2 Impact Ratings
    "For each value below, how does Yogi v2 affect this value for end users? [Utility]": "yogi_v2_utility",
    "For each value below, how does Yogi v2 affect this value for end users? [Fairness]": "yogi_v2_fairness",
    "For each value below, how does Yogi v2 affect this value for end users? [Privacy]": "yogi_v2_privacy",
    "For each value below, how does Yogi v2 affect this value for end users? [Explainability]": "yogi_v2_explainability",
    "For each value below, how does Yogi v2 affect this value for end users? [Safety]": "yogi_v2_safety",
    
    # Desirable Requirements (DR)
    "DR1: Stakeholder-Centric Risk Identification\n\nThe EFF-enhanced user stories successfully identify ethical risks affecting stakeholders beyond just direct users. \n\nExample: data subjects with health conditions, regulatory bodies.": "dr1_stakeholder_centric",
    "DR2: Value Interpretation\n\nThe harm clauses in V2 user stories clearly link specific ethical risks to the stakeholder values they threaten. \n\nExample: \"data misuse\" threatens Privacy, \"biased recommendations\" threaten Fairness.": "dr2_value_interpretation",
    "DR3: Specification Translation\n\nThe EFF-enhanced user stories translate abstract ethical values into concrete, readable requirements that developers can understand and implement.": "dr3_specification_translation",
    "DR4: Verifiable Acceptance Criteria\n\nThe acceptance criteria in V2 user stories are testable and measurable, allowing testers to validate compliance as part of the Definition of Done.\n\nExample: \"90-day data retention\" or \"99% block rate for unsafe tips\"": "dr4_verifiable_acceptance",
    "DR5: Process Integration\n\nThe EFF approach, including harm clauses and ethical acceptance criteria, could realistically be integrated into my team's agile workflow (Backlog Refinement, Sprint Planning, Definition of Ready) without significantly hindering velocity.": "dr5_process_integration",
    
    # Demographics & Background
    "What is your primary professional role? (Select one)": "professional_role",
    "How many years of experience do you have working in agile software development?": "agile_experience_years",
    "Are you familiar with Value-Based Engineering (VBE) or the IEEE 24748-7000 standard?": "vbe_familiarity",
    "Have you previously worked on projects involving AI systems or machine learning?": "ai_ml_experience",
    "How often do you explicitly address ethical or societal risks when working with requirements or user stories?": "ethical_risk_frequency",
    
    # Open-ended Feedback
    "Please inspect the user stories at https://eff-demo.lovable.app/user-stories and answer in up to 200 words: \n\nDo you think the EFF helps identify and articulate previously unknown ethical risks? If no, please explain.": "eff_feedback",
    
    # Empty/Unused Columns
    "Spalte 22": "unused_22",
    "Spalte 16": "unused_16",
}

# Inverse mapping (for reverse lookups)
REVERSE_MAPPINGS = {v: k for k, v in HEADER_MAPPINGS.items()}

# Normalized column names in order
NORMALIZED_COLUMNS = [
    "timestamp",
    "yogi_v1_utility",
    "yogi_v1_fairness",
    "yogi_v1_privacy",
    "yogi_v1_explainability",
    "yogi_v1_safety",
    "yogi_v2_utility",
    "yogi_v2_fairness",
    "yogi_v2_privacy",
    "yogi_v2_explainability",
    "yogi_v2_safety",
    "dr1_stakeholder_centric",
    "dr2_value_interpretation",
    "dr3_specification_translation",
    "dr4_verifiable_acceptance",
    "dr5_process_integration",
    "professional_role",
    "agile_experience_years",
    "vbe_familiarity",
    "ai_ml_experience",
    "ethical_risk_frequency",
    "eff_feedback",
    "unused_22",
    "unused_16",
]
