import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ArrowRight, Sparkles, FileText } from "lucide-react";
import { VersionBadge } from "@/components/FlowAnnotation";

type Answers = Record<string, string>;

// Map answer values to readable labels
const answerLabels: Record<string, Record<string, string>> = {
  q1: {
    A: "Very flexible",
    B: "Some stiffness",
    C: "Work in progress",
    D: "Quite stiff",
  },
  q2: {
    A: "No injuries",
    B: "Minor issue",
    C: "Ongoing challenges",
    D: "Recovering",
  },
  q3: {
    A: "Casual",
    B: "Dedicated",
    C: "Self-guided",
    D: "Curious",
  },
  q4: {
    A: "Relaxation",
    B: "Strength & flexibility",
    C: "Gentle flow",
    D: "Mindfulness",
  },
  q5: {
    A: "Group setting",
    B: "Solo focus",
    C: "Slow & meditative",
    D: "Guided instruction",
  },
};

// Generate recommendations based on answers
const getRecommendations = (answers: Answers) => {
  const vibes = answers.q4;
  
  if (vibes === "A") {
    return {
      classes: ["Restorative Yoga", "Yin Yoga", "Gentle Stretch Flow"],
      description: "Focus on deep relaxation and tension release",
    };
  } else if (vibes === "B") {
    return {
      classes: ["Power Yoga", "Vinyasa Flow", "Ashtanga Primary Series"],
      description: "Build strength while increasing flexibility",
    };
  } else if (vibes === "C") {
    return {
      classes: ["Slow Flow Yoga", "Hatha Basics", "Mindful Movement"],
      description: "Gentle, flowing sequences at a calm pace",
    };
  } else {
    return {
      classes: ["Meditation & Yoga", "Breathwork Basics", "Yoga for Beginners"],
      description: "Explore mindfulness and inner balance",
    };
  }
};

const aiTips = [
  "Remember to listen to your body and never push through pain",
  "Consistency is more important than intensity – practice regularly",
  "Focus on your breath as much as your poses",
  "Use props when needed – they are tools for better alignment",
];

const ResultsV1 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const answers = (location.state?.answers as Answers) || {};
  const hasAnswers = Object.keys(answers).length > 0;

  useEffect(() => {
    if (!hasAnswers) {
      navigate("/");
    }
  }, [hasAnswers, navigate]);

  if (!hasAnswers) {
    return null;
  }

  const recommendations = getRecommendations(answers);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          <VersionBadge version="V1" label="Yogi V1" />
        </div>

        <div className="space-y-6">
          {/* Results Header */}
          <Card className="shadow-card bg-primary text-primary-foreground">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <FileText className="h-5 w-5" />
                <CardTitle className="text-2xl font-heading">
                  Your Recommendations
                </CardTitle>
              </div>
              <CardDescription className="text-primary-foreground/80">
                Based on questionnaire responses
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Recommended Classes */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-heading">Recommended Classes</CardTitle>
              <CardDescription>{recommendations.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recommendations.classes.map((className, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded border border-border"
                  >
                    <h4 className="font-medium">{className}</h4>
                    <Badge variant="secondary">
                      Recommended
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Tips */}
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <CardTitle className="text-lg font-heading">Wellness Tips</CardTitle>
              </div>
              <CardDescription>Personalized guidance for your practice</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {aiTips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-muted-foreground">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* User Preferences Summary */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-heading">Your Input Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-muted-foreground">Body Condition</span>
                  <p className="font-medium">{answerLabels.q1[answers.q1] || answers.q1}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Injuries</span>
                  <p className="font-medium">{answerLabels.q2[answers.q2] || answers.q2}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Commitment</span>
                  <p className="font-medium">{answerLabels.q3[answers.q3] || answers.q3}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Yoga Goals</span>
                  <p className="font-medium">{answerLabels.q4[answers.q4] || answers.q4}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Continue to V2 */}
          <Card className="shadow-card border-primary/30 bg-primary/5">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-4">
                Before moving on, please go to the Questionnaire and respond to the questions related to Yogi v1.
              </p>
              <Button onClick={() => navigate("/questionnaire/v2")} size="lg" className="w-full">
                Continue to Yogi v2
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
};

export default ResultsV1;
