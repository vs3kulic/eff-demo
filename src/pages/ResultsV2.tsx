import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield, Sparkles, AlertTriangle, Trash2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
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

// Generate recommendations based on answers with safety considerations
const getRecommendations = (answers: Answers) => {
  const vibes = answers.q4;
  const injuries = answers.q2;
  
  let baseClasses: string[];
  let description: string;

  if (vibes === "A") {
    baseClasses = ["Restorative Yoga", "Yin Yoga", "Gentle Stretch Flow"];
    description = "Focus on deep relaxation and tension release";
  } else if (vibes === "B") {
    baseClasses = ["Power Yoga", "Vinyasa Flow", "Ashtanga Primary Series"];
    description = "Build strength while increasing flexibility";
  } else if (vibes === "C") {
    baseClasses = ["Slow Flow Yoga", "Hatha Basics", "Mindful Movement"];
    description = "Gentle, flowing sequences at a calm pace";
  } else {
    baseClasses = ["Meditation & Yoga", "Breathwork Basics", "Yoga for Beginners"];
    description = "Explore mindfulness and inner balance";
  }

  // Safety: Filter based on injury status (US-02)
  if (injuries === "C" || injuries === "D") {
    // User has ongoing or significant issues - recommend gentler options
    baseClasses = ["Gentle Restorative", "Chair Yoga", "Therapeutic Yoga"];
    description = "Safe, therapeutic practices suited for recovery";
  } else if (injuries === "B") {
    // Minor issues - filter out high-intensity options
    baseClasses = baseClasses.filter(c => 
      !["Power Yoga", "Ashtanga Primary Series"].includes(c)
    );
    if (baseClasses.length < 3) {
      baseClasses.push("Gentle Hatha");
    }
  }

  return { classes: baseClasses, description };
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
  const retentionDays = location.state?.retentionDays || 90;
  const [newsletterOptIn, setNewsletterOptIn] = useState(false);
  
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
  const hasInjury = answers.q2 && answers.q2 !== "A";

  const handleNewsletterSignup = () => {
    if (newsletterOptIn) {
      toast({
        title: "Newsletter Signup Initiated",
        description: "Check your email for double opt-in confirmation. Unconfirmed signups are deleted after 30 days.",
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
          <VersionBadge version="V2" label="Yogi V2" />
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
                Privacy-first, transparent recommendations
              </CardDescription>
            </CardHeader>
          </Card>

          {/* Recommended Classes */}
          <Card className="shadow-card border-accent/30">
            <CardHeader>
              <CardTitle className="text-lg font-heading">Recommended Classes</CardTitle>
              <CardDescription>{recommendations.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Transparent recommendation explanation (Explainability) */}
              <div className="flex items-start gap-2 p-3 bg-accent/10 border border-accent/30 rounded">
                <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <div>
                  <strong className="text-foreground">Why these recommendations:</strong>{" "}
                  <span className="text-muted-foreground">
                    Based on your goals ({answerLabels.q4[answers.q4] || "Not specified"}) 
                    and physical condition ({answerLabels.q2[answers.q2] || "Not specified"}).
                  </span>
                </div>
              </div>

              {/* Safety notice for injuries */}
              {hasInjury && (
                <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 shrink-0" />
                  <div className="text-muted-foreground">
                    <strong className="text-foreground">Safety Applied:</strong> Based on your 
                    reported physical condition, we've recommended gentler options suitable for your situation.
                  </div>
                </div>
              )}

              <div className="space-y-3">
                {recommendations.classes.map((className, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded border border-border"
                  >
                    <h4 className="font-medium">{className}</h4>
                    <Badge variant="secondary">Recommended</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* AI Tips with explicit labeling */}
          <Card className="shadow-card border-accent/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-accent" />
                <CardTitle className="text-lg font-heading">Wellness Tips</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* AI disclosure (Safety requirement) */}
              <div className="flex items-start gap-2 p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-900 rounded">
                <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 mt-0.5 shrink-0" />
                <div className="text-muted-foreground">
                  <strong className="text-foreground">AI-Generated Content:</strong> These tips are 
                  created by AI, moderated for safety, and are for general guidance only—not medical advice.
                </div>
              </div>

              <ul className="space-y-2">
                {aiTipsWithModeration.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span className="flex-1 text-muted-foreground">{item.tip}</span>
                    {item.verified && (
                      <Badge variant="outline" className="shrink-0">
                        Verified
                      </Badge>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* User Input Summary */}
          <Card className="shadow-card">
            <CardHeader>
              <CardTitle className="text-lg font-heading">Your Input Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-muted-foreground">Body Condition</span>
                  <p className="font-medium">{answerLabels.q1[answers.q1] || "Not answered"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Injuries</span>
                  <p className="font-medium">{answerLabels.q2[answers.q2] || "Not answered"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Commitment</span>
                  <p className="font-medium">{answerLabels.q3[answers.q3] || "Skipped"}</p>
                </div>
                <div>
                  <span className="text-muted-foreground">Yoga Goals</span>
                  <p className="font-medium">{answerLabels.q4[answers.q4] || "Not answered"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Controls */}
          <Card className="shadow-card border-accent/30">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-accent" />
                <CardTitle className="text-lg font-heading">Your Data Rights</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Data retention notice */}
              <div className="flex items-start gap-2 p-3 bg-accent/10 border border-accent/30 rounded">
                <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                <div className="text-muted-foreground">
                  Your questionnaire data will be <strong className="text-foreground">automatically deleted 
                  after {retentionDays} days</strong> unless you choose to extend.
                </div>
              </div>

              {/* Newsletter opt-in (unchecked by default - no dark pattern) */}
              <div className="p-4 rounded border border-border bg-muted/30">
                <div className="flex items-start space-x-3">
                  <Checkbox
                    id="newsletter"
                    checked={newsletterOptIn}
                    onCheckedChange={(checked) => setNewsletterOptIn(checked as boolean)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="newsletter" className="font-medium cursor-pointer">
                      Subscribe to wellness tips newsletter
                    </Label>
                    <div className="text-sm text-muted-foreground mt-2 space-y-1">
                      <p className="font-medium text-foreground">What you will receive:</p>
                      <ul className="list-disc list-inside space-y-0.5 ml-1">
                        <li>Weekly yoga tips and practice guidance</li>
                        <li>Monthly studio schedule updates</li>
                      </ul>
                      <p className="mt-2 italic">
                        Requires double opt-in confirmation via email.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Equal prominence buttons (no dark patterns) */}
                <div className="flex gap-3 mt-4">
                  <Button 
                    onClick={handleNewsletterSignup} 
                    size="sm" 
                    disabled={!newsletterOptIn}
                    className="flex-1"
                  >
                    Subscribe
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

              {/* Data deletion */}
              <div className="p-4 rounded border-2 border-destructive/30 bg-destructive/5">
                <div className="flex items-start gap-3">
                  <Trash2 className="h-5 w-5 text-destructive mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-medium">Request Data Deletion</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Exercise your GDPR Article 17 right. All data permanently deleted within 30 days.
                    </p>
                  </div>
                </div>
                <Button onClick={handleDataDeletion} variant="destructive" size="sm" className="mt-3">
                  Delete All My Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* V2 Enhancement note */}
          <div className="p-4 bg-accent/5 rounded border border-accent/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-accent">V2 Enhancement:</strong> Transparent recommendation 
              explanations (Explainability), safety-aware filtering (Safety), AI content labeling, 
              opt-in only consent (Privacy), and GDPR deletion rights.
            </p>
          </div>

          {/* Walkthrough Complete */}
          <Card className="shadow-card border-accent/30 bg-accent/5">
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="h-8 w-8 text-accent mx-auto mb-3" />
              <h3 className="font-heading font-semibold text-lg mb-2">Walkthrough Complete</h3>
              <p className="text-muted-foreground mb-4">
                You have now experienced both versions of the Yogi application. Thank you for 
                participating in this comparison study.
              </p>
              <Button onClick={() => navigate("/")} size="lg" className="w-full md:w-auto">
                Back to Start
              </Button>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex gap-3">
            <Button onClick={() => navigate("/questionnaire/v2")} variant="outline" size="sm" className="flex-1">
              Retake Questionnaire
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsV2;
