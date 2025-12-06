import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Sparkles, FileText } from "lucide-react";
import { VersionBadge, FlowAnnotation } from "@/components/FlowAnnotation";

type Answers = Record<string, string>;

const recommendationsMap: Record<string, { classes: string[]; description: string }> = {
  beginner: {
    classes: ["Beginner Hatha Flow", "Gentle Introduction to Yoga", "Yoga Basics"],
    description: "Perfect for building foundational poses and understanding yoga principles",
  },
  intermediate: {
    classes: ["Vinyasa Flow", "Power Yoga", "Ashtanga Primary Series"],
    description: "Challenge yourself while refining technique and building strength",
  },
  advanced: {
    classes: ["Advanced Vinyasa", "Arm Balance Workshop", "Inversions & Backbends"],
    description: "Push your limits with complex poses and advanced sequences",
  },
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

  if (!answers.experience) {
    navigate("/");
    return null;
  }

  const recommendations = recommendationsMap[answers.experience];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          <VersionBadge version="V1" label="Baseline" />
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
          <FlowAnnotation
            step={2}
            title="Algorithm-Driven Results"
            description="Standard recommendation logic without bias screening or filter-bubble analysis"
          >
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
                      <div>
                        <h4 className="font-medium text-sm">{className}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {answers.intensity === "gentle" && "Gentle pace"}
                          {answers.intensity === "moderate" && "Moderate intensity"}
                          {answers.intensity === "vigorous" && "High energy"}
                        </p>
                      </div>
                      <Badge variant="secondary" className="text-xs">
                        {answers.style}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FlowAnnotation>

          {/* AI Tips */}
          <FlowAnnotation
            step={3}
            title="AI-Generated Content"
            description="Tips generated without explicit AI labeling or content moderation disclosure"
          >
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <CardTitle className="text-lg font-heading">Wellness Tips</CardTitle>
                </div>
                <CardDescription>AI-generated guidance for your practice</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {aiTips.map((tip, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="text-primary mt-0.5">•</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FlowAnnotation>

          {/* User Preferences Summary */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-heading">Your Input Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Experience</span>
                  <p className="font-medium capitalize">{answers.experience}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Goals</span>
                  <p className="font-medium capitalize">{answers.goals}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Intensity</span>
                  <p className="font-medium capitalize">{answers.intensity}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Style</span>
                  <p className="font-medium capitalize">{answers.style}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Annotation note */}
          <div className="p-4 bg-muted/50 rounded border border-border">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">V1 Note:</strong> This baseline implementation 
              provides recommendations and AI tips without explicit data control mechanisms, 
              bias screening, or GDPR compliance features.
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={() => navigate("/questionnaire/v1")} variant="outline" size="sm" className="flex-1">
              Retake Questionnaire
            </Button>
            <Button onClick={() => navigate("/")} size="sm" className="flex-1">
              Back to Overview
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsV1;
