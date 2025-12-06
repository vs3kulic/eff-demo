import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Shield, CheckCircle2, SkipForward } from "lucide-react";
import { VersionBadge } from "@/components/FlowAnnotation";
import { EthicsLabel, EthicsLabels } from "@/components/EthicsLabel";

type Answer = string;

// Same questions as V1, but with ethical data handling
const questions = [
  {
    id: "q1",
    question: "How does your body feel right now?",
    options: [
      { value: "A", label: "Very flexible – I move easily in most positions." },
      { value: "B", label: "Decent, but I notice some stiffness here and there." },
      { value: "C", label: "A work in progress – room for improvement." },
      { value: "D", label: "Quite stiff – movement doesn't come naturally to me." },
    ],
    essential: true, // Required for recommendation
  },
  {
    id: "q2",
    question: "Do you have any injuries or physical limitations?",
    options: [
      { value: "A", label: "No current acute or chronic injuries." },
      { value: "B", label: "A minor issue that occasionally bothers me." },
      { value: "C", label: "Dealing with ongoing physical challenges." },
      { value: "D", label: "Recovering from something significant, but eager to move again." },
    ],
    essential: true, // Required for safety
    safetyNote: "This helps us recommend safe practices for your situation.",
  },
  {
    id: "q3",
    question: "What's your commitment level to yoga?",
    options: [
      { value: "A", label: "Casual – I practice when the mood strikes." },
      { value: "B", label: "Dedicated – yoga is an important part of my routine." },
      { value: "C", label: "Self-guided – mostly following along with videos at home." },
      { value: "D", label: "Curious – just exploring what yoga has to offer." },
    ],
    essential: false, // Optional - can skip
  },
  {
    id: "q4",
    question: "What draws you most to yoga?",
    options: [
      { value: "A", label: "Release tension and deeply relax my body." },
      { value: "B", label: "Build strength and increase flexibility." },
      { value: "C", label: "Find a gentle, flowing movement practice." },
      { value: "D", label: "Explore mindfulness and inner balance." },
    ],
    essential: true, // Required for recommendation
  },
  {
    id: "q5",
    question: "How do you prefer to practice yoga?",
    options: [
      { value: "A", label: "In a group setting – I enjoy the collective energy." },
      { value: "B", label: "Focused on my own mat – minimal distractions." },
      { value: "C", label: "Slow and meditative – deeper holds and calm pacing." },
      { value: "D", label: "With clear guidance – step-by-step instructions help me." },
    ],
    essential: false, // Optional - can skip
  },
];

const QuestionnaireV2 = () => {
  const navigate = useNavigate();
  const [showPrivacyNotice, setShowPrivacyNotice] = useState(true);
  const [privacyUnderstood, setPrivacyUnderstood] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const isAnswered = !!answers[currentQ.id];
  const canSkip = !currentQ.essential;

  const handlePrivacyAccept = () => {
    if (privacyUnderstood) {
      setShowPrivacyNotice(false);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/results/v2", { 
        state: { 
          answers,
          consentTimestamp: new Date().toISOString(),
          retentionDays: 90,
        } 
      });
    }
  };

  const handleSkip = () => {
    // Only non-essential questions can be skipped
    if (canSkip) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      setShowPrivacyNotice(true);
    }
  };

  // Privacy Notice Screen (Explainability requirement)
  if (showPrivacyNotice) {
    return (
      <div className="min-h-screen bg-background py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Overview
            </Button>
            <VersionBadge version="V2" label="Ethical Enhancement" />
          </div>

          <Card className="shadow-card border-accent/30">
            <CardHeader>
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-5 w-5 text-accent" />
                <CardTitle className="text-xl font-heading">
                  Before We Begin
                </CardTitle>
              </div>
              <CardDescription>
                Understanding how your data is handled
              </CardDescription>
              <div className="pt-2">
                <EthicsLabels values={["privacy", "explainability"]} />
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Data practices - clear and concise */}
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium">What we collect:</span>
                    <span className="text-muted-foreground"> Only your questionnaire responses (preferences, goals)</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium">Purpose:</span>
                    <span className="text-muted-foreground"> Solely to generate personalized yoga recommendations</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium">Retention:</span>
                    <span className="text-muted-foreground"> Automatically deleted after 90 days</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted/50 rounded">
                  <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium">Your rights:</span>
                    <span className="text-muted-foreground"> Request deletion anytime (GDPR Art. 17, within 30 days)</span>
                  </div>
                </div>
              </div>

              {/* Consent checkbox - unchecked by default (no dark pattern) */}
              <div className="flex items-start space-x-3 p-4 rounded border-2 border-accent/30 bg-accent/5">
                <Checkbox
                  id="privacy-understood"
                  checked={privacyUnderstood}
                  onCheckedChange={(checked) => setPrivacyUnderstood(checked as boolean)}
                />
                <Label
                  htmlFor="privacy-understood"
                  className="leading-relaxed cursor-pointer"
                >
                  I understand how my data will be collected, used, and stored.
                </Label>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => navigate("/")}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handlePrivacyAccept}
                  disabled={!privacyUnderstood}
                  className="flex-1"
                >
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* V2 Enhancement note */}
          <div className="mt-6 p-4 bg-accent/5 rounded border border-accent/20">
            <p className="text-sm text-muted-foreground">
              <strong className="text-accent">V2 Enhancement:</strong> Transparent privacy notice 
              before data collection ensures user understanding (Explainability). Consent is 
              opt-in only, not pre-checked (Privacy).
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Questionnaire Screen
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          <VersionBadge version="V2" label="Ethical Enhancement" />
        </div>

        <Card className="shadow-card border-accent/30">
          <CardHeader>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="h-5 w-5 text-accent" />
              <CardTitle className="text-xl font-heading">
                User Questionnaire
              </CardTitle>
            </div>
            <div className="flex items-center justify-between">
              <CardDescription>
                Question {currentQuestion + 1} of {questions.length}
                {!currentQ.essential && (
                  <span className="ml-2 text-accent">(Optional)</span>
                )}
              </CardDescription>
              <EthicsLabel value={currentQ.essential ? "utility" : "fairness"} />
            </div>
            <Progress value={progress} className="h-1.5 mt-3" />
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-heading font-medium text-foreground">
                {currentQ.question}
              </h3>

              {/* Safety note for injury question */}
              {currentQ.safetyNote && (
                <div className="flex items-center gap-2 p-2 bg-accent/5 rounded text-sm text-muted-foreground">
                  <EthicsLabel value="safety" />
                  <span>{currentQ.safetyNote}</span>
                </div>
              )}

              <RadioGroup
                value={answers[currentQ.id] || ""}
                onValueChange={(value) =>
                  setAnswers({ ...answers, [currentQ.id]: value })
                }
              >
                {currentQ.options.map((option) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-3 p-3 rounded border border-border hover:border-accent/50 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem value={option.value} id={`${currentQ.id}-${option.value}`} />
                    <Label
                      htmlFor={`${currentQ.id}-${option.value}`}
                      className="flex-1 cursor-pointer text-base"
                    >
                      {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <Button
                variant="outline"
                onClick={handleBack}
                size="sm"
                className="flex-1"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>

              {/* Skip option for non-essential questions (Fairness) */}
              {canSkip && !isAnswered && currentQuestion < questions.length - 1 && (
                <Button
                  variant="ghost"
                  onClick={handleSkip}
                  size="sm"
                  className="flex-1"
                >
                  <SkipForward className="h-4 w-4 mr-2" />
                  Skip
                </Button>
              )}

              <Button
                onClick={handleNext}
                disabled={currentQ.essential && !isAnswered}
                size="sm"
                className="flex-1"
              >
                {currentQuestion === questions.length - 1 ? (
                  "View Results"
                ) : (
                  <>
                    Next
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Data collection transparency note */}
        <div className="mt-6 p-4 bg-accent/5 rounded border border-accent/20">
          <p className="text-sm text-muted-foreground">
            <strong className="text-accent">V2 Enhancement:</strong> Only essential data is 
            required. Optional questions can be skipped (Fairness). Your data will be 
            automatically deleted after 90 days (Privacy).
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireV2;
