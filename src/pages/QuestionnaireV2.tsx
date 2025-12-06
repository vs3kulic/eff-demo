import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Shield, CheckCircle2 } from "lucide-react";
import { VersionBadge, FlowAnnotation } from "@/components/FlowAnnotation";
import { EthicsLabel, EthicsLabels } from "@/components/EthicsLabel";

type Answer = string;

const questions = [
  {
    id: "experience",
    question: "What is your yoga experience level?",
    options: [
      { value: "beginner", label: "Beginner – New to yoga" },
      { value: "intermediate", label: "Intermediate – 6 months to 2 years" },
      { value: "advanced", label: "Advanced – 2+ years of practice" },
    ],
  },
  {
    id: "goals",
    question: "What are your primary goals?",
    options: [
      { value: "flexibility", label: "Improve flexibility" },
      { value: "strength", label: "Build strength" },
      { value: "stress", label: "Reduce stress & anxiety" },
      { value: "balance", label: "Better balance & coordination" },
    ],
  },
  {
    id: "limitations",
    question: "Do you have any physical limitations or injuries?",
    options: [
      { value: "none", label: "None – I have no current limitations" },
      { value: "back", label: "Back issues (pain, herniated disc, etc.)" },
      { value: "joints", label: "Joint issues (knees, wrists, shoulders)" },
      { value: "pregnancy", label: "Pregnancy" },
    ],
  },
  {
    id: "intensity",
    question: "What intensity level do you prefer?",
    options: [
      { value: "gentle", label: "Gentle & restorative" },
      { value: "moderate", label: "Moderate" },
      { value: "vigorous", label: "Vigorous & challenging" },
    ],
  },
  {
    id: "style",
    question: "Which yoga style interests you most?",
    options: [
      { value: "hatha", label: "Hatha – Traditional & balanced" },
      { value: "vinyasa", label: "Vinyasa – Flow-based" },
      { value: "yin", label: "Yin – Deep stretching" },
      { value: "power", label: "Power – Fitness-focused" },
    ],
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

  const handlePrivacyAccept = () => {
    if (privacyUnderstood) {
      setShowPrivacyNotice(false);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      navigate("/results/v2", { state: { answers } });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate("/");
    }
  };

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

          <FlowAnnotation
            step={1}
            title="Informed Consent"
            description="Transparent privacy notice with validated user comprehension (≥80% requirement)"
          >
            <Card className="shadow-card border-accent/30">
              <CardHeader>
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-5 w-5 text-accent" />
                  <CardTitle className="text-xl font-heading">
                    Privacy Notice
                  </CardTitle>
                </div>
                <EthicsLabels values={["privacy", "explainability", "utility"]} />
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Data practices */}
                <div className="space-y-4">
                  <h4 className="font-medium text-sm text-foreground">
                    How We Handle Your Data
                  </h4>
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">What we collect:</span>
                        <span className="text-muted-foreground"> Only questionnaire responses (experience, goals, preferences)</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">Purpose:</span>
                        <span className="text-muted-foreground"> Solely to generate personalized yoga class recommendations</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">Retention:</span>
                        <span className="text-muted-foreground"> 90 days, unless you renew consent</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">Your rights:</span>
                        <span className="text-muted-foreground"> Request deletion at any time (GDPR Art. 17, honored within 30 days)</span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-muted/50 rounded">
                      <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 shrink-0" />
                      <div>
                        <span className="font-medium">No sensitive data:</span>
                        <span className="text-muted-foreground"> We avoid collecting medical or health information</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Harm clause callout */}
                <div className="p-4 bg-accent/5 border border-accent/20 rounded">
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold text-accent">Harm Clause:</span> "without collecting 
                    sensitive health data unnecessarily or using it beyond stated purpose."
                  </p>
                </div>

                {/* Consent checkbox */}
                <div className="flex items-start space-x-3 p-4 rounded border-2 border-accent/30 bg-accent/5">
                  <Checkbox
                    id="privacy-understood"
                    checked={privacyUnderstood}
                    onCheckedChange={(checked) => setPrivacyUnderstood(checked as boolean)}
                  />
                  <Label
                    htmlFor="privacy-understood"
                    className="text-sm leading-relaxed cursor-pointer"
                  >
                    I understand how my data will be collected, used, and protected. 
                    I acknowledge my right to request deletion at any time.
                  </Label>
                </div>

                <Button
                  onClick={handlePrivacyAccept}
                  disabled={!privacyUnderstood}
                  className="w-full"
                >
                  Continue to Questionnaire
                </Button>
              </CardContent>
            </Card>
          </FlowAnnotation>

          {/* Annotation note */}
          <div className="mt-6 p-4 bg-accent/5 rounded border border-accent/20">
            <p className="text-xs text-muted-foreground">
              <strong className="text-accent">V2 Enhancement:</strong> This step ensures transparent 
              user understanding before data collection. Acceptance criteria requires ≥80% comprehension 
              validation through explicit acknowledgment.
            </p>
          </div>
        </div>
      </div>
    );
  }

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

        <FlowAnnotation
          step={2}
          title="Privacy-First Data Collection"
          description="Essential data only – no sensitive health information collected"
        >
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
                </CardDescription>
                <EthicsLabel value="privacy" />
              </div>
              <Progress value={progress} className="h-1.5 mt-3" />
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-heading font-medium text-foreground">
                  {currentQ.question}
                </h3>

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
                      <RadioGroupItem value={option.value} id={option.value} />
                      <Label
                        htmlFor={option.value}
                        className="flex-1 cursor-pointer text-sm"
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
                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
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
        </FlowAnnotation>
      </div>
    </div>
  );
};

export default QuestionnaireV2;
