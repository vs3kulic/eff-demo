import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield, Sparkles, AlertTriangle, Trash2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { VersionBadge, FlowAnnotation } from "@/components/FlowAnnotation";
import { EthicsLabel, EthicsLabels } from "@/components/EthicsLabel";

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

// Classes contraindicated for specific limitations (US-02 Safety)
const contraindicatedClasses: Record<string, string[]> = {
  back: ["Power Yoga", "Inversions & Backbends", "Ashtanga Primary Series"],
  joints: ["Power Yoga", "Arm Balance Workshop", "Ashtanga Primary Series"],
  pregnancy: ["Power Yoga", "Inversions & Backbends", "Arm Balance Workshop", "Ashtanga Primary Series"],
};

// Safe alternatives for users with limitations
const safeAlternatives: Record<string, string[]> = {
  back: ["Gentle Restorative", "Chair Yoga", "Yin Yoga"],
  joints: ["Gentle Hatha", "Restorative Flow", "Seated Yoga"],
  pregnancy: ["Prenatal Yoga", "Gentle Restorative", "Prenatal Meditation"],
};

const aiTipsWithModeration = [
  { tip: "Remember to listen to your body and never push through pain", verified: true },
  { tip: "Consistency is more important than intensity – practice regularly", verified: true },
  { tip: "Focus on your breath as much as your poses", verified: true },
  { tip: "Use props when needed – they are tools for better alignment", verified: true },
];

const ResultsV2 = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const answers = (location.state?.answers as Answers) || {};
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);

  if (!answers.experience) {
    navigate("/");
    return null;
  }

  const baseRecommendations = recommendationsMap[answers.experience];
  const userLimitation = answers.limitations || "none";
  
  // Filter out contraindicated classes and add safe alternatives (US-02 Safety)
  const getFilteredClasses = () => {
    if (userLimitation === "none") {
      return baseRecommendations.classes;
    }
    const contraindicated = contraindicatedClasses[userLimitation] || [];
    const filtered = baseRecommendations.classes.filter(c => !contraindicated.includes(c));
    const alternatives = safeAlternatives[userLimitation] || [];
    return [...filtered, ...alternatives].slice(0, 3);
  };

  const recommendations = {
    classes: getFilteredClasses(),
    description: baseRecommendations.description,
  };

  const handleNewsletterSignup = () => {
    if (newsletterOptIn) {
      toast({
        title: "Newsletter Signup Successful",
        description: "Your email will be deleted after 30 days unless you renew consent.",
      });
    }
  };

  const handleDataDeletion = () => {
    toast({
      title: "Data Deletion Requested",
      description: "All personal data will be permanently deleted within 30 days (GDPR Art. 17)",
    });
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          <VersionBadge version="V2" label="Ethical Enhancement" />
        </div>

        <div className="space-y-6">
          {/* Results Header */}
          <Card className="shadow-card bg-accent text-accent-foreground">
            <CardHeader className="text-center">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-5 w-5" />
                <CardTitle className="text-2xl font-heading">
                  Your Recommendations
                </CardTitle>
              </div>
              <CardDescription className="text-accent-foreground/80">
                Privacy-first, bias-free recommendations
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Recommended Classes with Fairness */}
          <FlowAnnotation
            step={3}
            title="Autonomous Recommendations"
            description="Recommendations include filter-bubble screening and bias detection"
          >
            <Card className="shadow-card border-accent/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-heading">Recommended Classes</CardTitle>
                  <EthicsLabels values={["fairness", "utility"]} />
                </div>
                <CardDescription>{recommendations.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Recommendation explanation (US-02 Transparency) */}
                <div className="flex items-start gap-2 p-3 bg-accent/10 border border-accent/30 rounded text-sm">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-foreground">Recommended based on:</strong>{" "}
                    <span className="text-muted-foreground">
                      your goals ({answers.goals}), experience level ({answers.experience}), 
                      and reported limitations ({userLimitation === "none" ? "none reported" : userLimitation}).
                    </span>
                  </div>
                </div>

                {/* Safety notice for limitations */}
                {userLimitation !== "none" && (
                  <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded text-xs">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 shrink-0" />
                    <div className="text-muted-foreground">
                      <strong className="text-foreground">Safety Applied:</strong> Classes contraindicated 
                      for {userLimitation} conditions have been excluded. Only safe alternatives are shown.
                    </div>
                  </div>
                )}

                {/* Fairness notice */}
                <div className="flex items-start gap-2 p-3 bg-accent/5 border border-accent/20 rounded text-xs">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <div className="text-muted-foreground">
                    <strong className="text-foreground">Fairness Applied:</strong> Filter-bubble screening 
                    and bias detection ensure diverse options without steering toward specific classes.
                  </div>
                </div>

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

                {/* Harm clause */}
                <div className="p-3 bg-muted/50 rounded border border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-accent">Harm Clause:</span> "without being steered 
                    toward inappropriate classes through biased algorithms."
                  </p>
                </div>
              </CardContent>
            </Card>
          </FlowAnnotation>

          {/* AI Tips with Moderation */}
          <FlowAnnotation
            step={4}
            title="Ethical LLM Content"
            description="AI-generated tips with content moderation (≥95% block rate) and explicit labeling"
          >
            <Card className="shadow-card border-accent/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-accent" />
                    <CardTitle className="text-lg font-heading">Wellness Tips</CardTitle>
                  </div>
                  <EthicsLabel value="explainability" />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* AI disclosure */}
                <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded text-xs">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 shrink-0" />
                  <div className="text-muted-foreground">
                    <strong className="text-foreground">AI-Generated Content:</strong> These tips are 
                    created by artificial intelligence, screened for harmful content (≥95% block rate), 
                    and are for general guidance only—not medical advice.
                  </div>
                </div>

                {/* Autonomy disclosure (US-03) */}
                <div className="flex items-start gap-2 p-3 bg-accent/5 border border-accent/20 rounded text-xs">
                  <EthicsLabel value="safety" />
                  <div className="text-muted-foreground ml-2">
                    Tips are strictly limited to yoga technique and mindset. <strong className="text-foreground">No commercial calls-to-action</strong> (subscriptions, merchandise, premium features) are included.
                  </div>
                </div>

                <ul className="space-y-2">
                  {aiTipsWithModeration.map((item, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm">
                      <span className="text-accent mt-0.5">•</span>
                      <span className="flex-1 text-muted-foreground">{item.tip}</span>
                      {item.verified && (
                        <Badge variant="outline" className="text-xs shrink-0">
                          Verified
                        </Badge>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Harm clause */}
                <div className="p-3 bg-muted/50 rounded border border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-accent">Harm Clause:</span> "without manipulation 
                    through psychologically persuasive content."
                  </p>
                </div>
              </CardContent>
            </Card>
          </FlowAnnotation>

          {/* Data Controls */}
          <FlowAnnotation
            step={5}
            title="Data Control & Consent"
            description="Dark-pattern-free consent with opt-in only and GDPR Art. 17 deletion rights"
          >
            <Card className="shadow-card border-accent/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-accent" />
                    <CardTitle className="text-lg font-heading">Your Data Rights</CardTitle>
                  </div>
                  <EthicsLabels values={["privacy", "safety"]} />
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Newsletter opt-in (US-04) */}
                <div className="p-4 rounded border border-border bg-muted/30">
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="newsletter"
                      checked={newsletterOptIn}
                      onCheckedChange={(checked) => setNewsletterOptIn(checked as boolean)}
                    />
                    <div className="flex-1">
                      <Label htmlFor="newsletter" className="text-sm font-medium cursor-pointer">
                        Subscribe to wellness tips newsletter
                      </Label>
                      {/* Explicit content types (US-04 Explainability) */}
                      <div className="text-xs text-muted-foreground mt-2 space-y-1">
                        <p className="font-medium text-foreground">What you will receive:</p>
                        <ul className="list-disc list-inside space-y-0.5 ml-1">
                          <li>Weekly yoga tips and practice guidance</li>
                          <li>Monthly studio schedule updates</li>
                          <li>Occasional workshop announcements (max 2/month)</li>
                        </ul>
                        <p className="mt-2 italic">
                          Opt-in only (unchecked by default). Email deleted after 30 days without double opt-in confirmation.
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* Equal prominence buttons (US-04 Safety - no dark patterns) */}
                  <div className="flex gap-3 mt-4">
                    <Button 
                      onClick={handleNewsletterSignup} 
                      size="sm" 
                      disabled={!newsletterOptIn}
                      className="flex-1"
                    >
                      Confirm Subscription
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setNewsletterOptIn(false)}
                      className="flex-1"
                    >
                      No Thanks
                    </Button>
                  </div>
                </div>

                {/* Harm clause for consent */}
                <div className="p-3 bg-muted/50 rounded border border-border">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-accent">Harm Clause:</span> "without manipulation 
                    via dark patterns or data misuse."
                  </p>
                </div>

                {/* Data deletion */}
                <div className="p-4 rounded border-2 border-destructive/30 bg-destructive/5">
                  <div className="flex items-start gap-3">
                    <Trash2 className="h-5 w-5 text-destructive mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">Request Data Deletion</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Exercise your GDPR Article 17 right. All personal data permanently deleted within 30 days.
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleDataDeletion} variant="destructive" size="sm" className="mt-3">
                    Delete All My Data
                  </Button>
                </div>
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
                  <span className="text-muted-foreground">Limitations</span>
                  <p className="font-medium capitalize">{answers.limitations === "none" ? "None reported" : answers.limitations}</p>
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

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={() => navigate("/questionnaire/v2")} variant="outline" size="sm" className="flex-1">
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

export default ResultsV2;
