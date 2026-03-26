# -*- coding: utf-8 -*-

##################
# SCALE MAPPINGS #
##################

# Impact scale - Used for Yogi v1/v2 effect ratings
IMPACT_MAPPING = {
    "Strongly supports": 5,
    "Somewhat supports": 4,
    "No impact": 3,
    "Somewhat harms": 2,
    "Strongly harms": 1,
}

# Reverse mapping for decoding
IMPACT_REVERSE = {v: k for k, v in IMPACT_MAPPING.items()}

# Agreement scale - Used for Desirable Requirements (DR) ratings
AGREEMENT_MAPPING = {
    "Strongly agree": 5,
    "Agree": 4,
    "Neutral": 3,
    "Disagree": 2,
    "Strongly disagree": 1,
}

# Reverse mapping for decoding
AGREEMENT_REVERSE = {v: k for k, v in AGREEMENT_MAPPING.items()}

# Columns that use impact scale (Yogi v1 and v2 impact ratings)
IMPACT_COLUMNS = [
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
]

# Columns that use agreement scale (Desirable Requirements)
AGREEMENT_COLUMNS = [
    "dr1_stakeholder_centric",
    "dr2_value_interpretation",
    "dr3_specification_translation",
    "dr4_verifiable_acceptance",
    "dr5_process_integration",
]


########################
# DEMOGRAPHIC MAPPINGS #
########################

# Professional role (nominal - no ordering)
ROLE_MAPPING = {
    "Software Developer / Engineer": 1,
    "Requirements Engineer": 2,
    "Product Owner / Product Manager": 3,
    "Scrum Master / Agile Coach": 4,
    "Quality Assurance / Tester": 5,
    "IT / AI Ethicist": 6,
    "IT / AI Legal Expert": 7,
    "Graduate Student (Computer Science / Software Engineering)": 8,
}
ROLE_REVERSE = {v: k for k, v in ROLE_MAPPING.items()}

# Agile experience (ordinal - ordered by experience level)
EXPERIENCE_MAPPING = {
    "Less than 1 year": 1,
    "1-2 years": 2,
    "2-5 years": 3,
    "5-10 years": 4,
    "10+ years": 5,
}
EXPERIENCE_REVERSE = {v: k for k, v in EXPERIENCE_MAPPING.items()}

# VBE familiarity (ordinal - ordered by knowledge level)
VBE_FAMILIARITY_MAPPING = {
    "No, I am not familiar with it": 1,
    "I have heard of it but have limited knowledge": 2,
    "Yes, I have read about VBE or applied it in projects": 3,
    "Yes, I have formal training or certification in VBE": 4,
}
VBE_FAMILIARITY_REVERSE = {v: k for k, v in VBE_FAMILIARITY_MAPPING.items()}

# AI/ML experience (ordinal - ordered by experience level)
AI_ML_EXPERIENCE_MAPPING = {
    "No, I have no experience with AI systems": 1,
    "No, but I am familiar with AI development practices": 2,
    "Yes, occasionally (as part of broader projects)": 3,
    "Yes, extensively (primary focus of my work)": 4,
}
AI_ML_EXPERIENCE_REVERSE = {v: k for k, v in AI_ML_EXPERIENCE_MAPPING.items()}

# Ethical risk frequency (ordinal - ordered by frequency)
ETHICAL_RISK_FREQUENCY_MAPPING = {
    "Not applicable to my work": 1,
    "Never": 2,
    "Rarely, when mandated by regulation or clients": 3,
    "In some projects when risks are obvious": 4,
    "In almost every project": 5,
}
ETHICAL_RISK_FREQUENCY_REVERSE = {v: k for k, v in ETHICAL_RISK_FREQUENCY_MAPPING.items()}

# Columns that use demographic encodings
DEMOGRAPHIC_COLUMNS = {
    "professional_role": ROLE_MAPPING,
    "agile_experience_years": EXPERIENCE_MAPPING,
    "vbe_familiarity": VBE_FAMILIARITY_MAPPING,
    "ai_ml_experience": AI_ML_EXPERIENCE_MAPPING,
    "ethical_risk_frequency": ETHICAL_RISK_FREQUENCY_MAPPING,
}


###########################################
# ROLE CLUSTER MAPPING (Developer/IT Pro) #
###########################################
ROLE_CLUSTER_MAPPING = {
    "Developer": 1,
    "IT Professional": 2,
}
ROLE_CLUSTER_REVERSE = {v: k for k, v in ROLE_CLUSTER_MAPPING.items()}

# Map each role (by code) to its cluster
ROLE_TO_CLUSTER = {
    1: "Developer",  # Software Developer / Engineer
    2: "IT Professional",
    3: "IT Professional",
    4: "IT Professional",
    5: "IT Professional",
    6: "IT Professional",
    7: "IT Professional",
    8: "IT Professional",
}


########################################
# DOCUMENTATION AND METADATA REFERENCE #
########################################

# Scale descriptions for documentation
SCALES = {
    "impact": {
        "description": "Likert scale measuring impact of Yogi versions on ethical values",
        "values": IMPACT_MAPPING,
    },
    "agreement": {
        "description": "Likert scale measuring agreement with Desirable Requirements",
        "values": AGREEMENT_MAPPING,
    },
    "role": {
        "description": "Nominal encoding of professional role (no ordering)",
        "values": ROLE_MAPPING,
    },
    "role_cluster": {
        "description": "Nominal encoding of professional role clusters: Developer (1), IT Professional (2)",
        "values": ROLE_CLUSTER_MAPPING,
    },
    "role_to_cluster": {
        "description": "Mapping from professional role code to cluster name (Developer/IT Professional)",
        "values": ROLE_TO_CLUSTER,
    },
    "experience": {
        "description": "Ordinal encoding of agile experience years",
        "values": EXPERIENCE_MAPPING,
    },
    "vbe_familiarity": {
        "description": "Ordinal encoding of VBE familiarity level",
        "values": VBE_FAMILIARITY_MAPPING,
    },
    "ai_ml_experience": {
        "description": "Ordinal encoding of AI/ML experience level",
        "values": AI_ML_EXPERIENCE_MAPPING,
    },
    "ethical_risk_frequency": {
        "description": "Ordinal encoding of how often ethical risks are addressed",
        "values": ETHICAL_RISK_FREQUENCY_MAPPING,
    },
}
