import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, FileText } from "lucide-react";
import { VersionBadge, FlowAnnotation } from "@/components/FlowAnnotation";

type Answer = string;

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
  },
];

const QuestionnaireV1 = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  // ETHICAL VIOLATION: Pre-checked consent boxes (dark pattern)
  const [marketingConsent, setMarketingConsent] = useState(true);
  const [dataShareConsent, setDataShareConsent] = useState(true);

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];
  const isAnswered = !!answers[currentQ.id];
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // ETHICAL VIOLATION: Collect all data without clear disclosure
      navigate("/results/v1", { 
        state: { 
          answers,
          marketingConsent,
          dataShareConsent,
          // ETHICAL VIOLATION: Collecting unnecessary data
          timestamp: new Date().toISOString(),
          sessionDuration: Math.floor(Math.random() * 300) + 60,
        } 
      });
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="container mx-auto max-w-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Overview
          </Button>
          <VersionBadge version="V1" label="Baseline" />
        </div>

        <FlowAnnotation
          step={1}
          title="Data Collection"
          description="Standard questionnaire without explicit privacy notice or consent validation"
        >
          <Card className="shadow-card">
            <CardHeader>
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-5 w-5 text-muted-foreground" />
                <CardTitle className="text-xl font-heading">
                  User Questionnaire
                </CardTitle>
              </div>
              <CardDescription>
                Question {currentQuestion + 1} of {questions.length}
              </CardDescription>
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
                      className="flex items-center space-x-3 p-3 rounded border border-border hover:border-primary/50 transition-colors cursor-pointer"
                    >
                      <RadioGroupItem value={option.value} id={`${currentQ.id}-${option.value}`} />
                      <Label
                        htmlFor={`${currentQ.id}-${option.value}`}
                        className="flex-1 cursor-pointer text-sm"
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              {/* ETHICAL VIOLATION: Pre-checked consent boxes on last question (dark pattern) */}
              {isLastQuestion && (
                <div className="space-y-3 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">
                    Please confirm the following options:
                  </p>
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="marketing" 
                      checked={marketingConsent}
                      onCheckedChange={(checked) => setMarketingConsent(checked as boolean)}
                    />
                    <Label htmlFor="marketing" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                      {/* ETHICAL VIOLATION: Vague, confusing consent language */}
                      Yes, I would like to receive personalized offers, news and partner content via email and agree to the processing of my data for marketing purposes.
                    </Label>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Checkbox 
                      id="datashare" 
                      checked={dataShareConsent}
                      onCheckedChange={(checked) => setDataShareConsent(checked as boolean)}
                    />
                    <Label htmlFor="datashare" className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                      {/* ETHICAL VIOLATION: Bundled consent for data sharing */}
                      I agree that my data may be shared with selected partners to improve my experience.
                    </Label>
                  </div>
                </div>
              )}

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
                {/* ETHICAL VIOLATION: No skip option, forced progression */}
                <Button
                  onClick={handleNext}
                  disabled={!isAnswered}
                  size="sm"
                  className="flex-1"
                >
                  {isLastQuestion ? (
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

        {/* Annotation note */}
        <div className="mt-6 p-4 bg-muted/50 rounded border border-border">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">V1 Note:</strong> This baseline implementation 
            collects user data immediately without explicit privacy disclosure, uses 
            pre-checked consent boxes (dark pattern), and provides no option to skip questions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionnaireV1;
