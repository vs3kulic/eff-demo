import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EthicsLabel, type EthicsValue } from "@/components/EthicsLabel";

interface AcceptanceCriterion {
  ethicsValue: EthicsValue;
  text: string;
}

interface UserStory {
  id: string;
  title: string;
  story: string;
  harmClause?: string;
  acceptanceCriteria?: AcceptanceCriterion[];
}

const v1Stories: UserStory[] = [
  {
    id: "US-01",
    title: "Yoga-Themed Questionnaire",
    story: "As a Yoga practitioner, I want to complete a questionnaire about my preferences so that the system understands my needs.",
  },
  {
    id: "US-02",
    title: "Class Recommendations",
    story: "As a Yoga practitioner, I want to receive class recommendations based on my questionnaire responses so that I can easily find suitable classes.",
  },
  {
    id: "US-03",
    title: "AI-Generated Pro-Tips",
    story: "As a Yoga practitioner, I want to receive personalized pro-tips based on my questionnaire responses so that I can enhance my practice.",
  },
  {
    id: "US-04",
    title: "Newsletter Subscription",
    story: "As a Yoga practitioner, I want to receive the latest updates related to the yoga studio so that I can stay informed about studio-related events.",
  },
];

const v2Stories: UserStory[] = [
  {
    id: "US-01 v2",
    title: "Personalized Questionnaire",
    story: "As a Yoga practitioner, I want to complete a questionnaire about my preferences so that the system understands my needs",
    harmClause: "without my sensitive health data being used beyond stated purpose.",
    acceptanceCriteria: [
      { ethicsValue: "privacy", text: "Only data fields classified as essential for generating recommendations are collected. All questionnaire data is automatically deleted or anonymized no later than 90 days after submission." },
      { ethicsValue: "explainability", text: "Before the first question, users see a concise privacy notice explaining what data is collected, for what purpose, and for how long it will be stored." },
      { ethicsValue: "utility", text: "At least 80% of users who start the questionnaire complete it. At least 75% of users report that the questions are relevant to their yoga practice in a post-questionnaire survey." },
    ],
  },
  {
    id: "US-02 v2",
    title: "Course Recommendations",
    story: "As a Yoga practitioner, I want to receive class recommendations based on my questionnaire responses so that I can easily find suitable classes",
    harmClause: "without being steered toward inappropriate classes through biased algorithms.",
    acceptanceCriteria: [
      { ethicsValue: "utility", text: "At least 80% of recommended classes are rated ≥4/5 by users in a post-session feedback survey (satisfaction)." },
      { ethicsValue: "safety", text: "For users reporting injuries or limitations (e.g., back pain, pregnancy, joint issues), classes flagged as contraindicated for a reported condition are never recommended." },
      { ethicsValue: "explainability", text: "The recommendation screen includes a brief explanation such as \"Recommended based on your goals, experience, and limitations\" plus a description justifying the selection." },
    ],
  },
  {
    id: "US-03 v2",
    title: "AI-Generated Pro-Tips",
    story: "As a Yoga practitioner, I want to receive personalized pro-tips based on my questionnaire responses so that I can enhance my practice",
    harmClause: "without manipulation through psychologically persuasive content serving business goals.",
    acceptanceCriteria: [
      { ethicsValue: "utility", text: "The tips achieve a relevance score of ≥0.75 based on distinct user feedback (thumbs up vs. thumbs down)." },
      { ethicsValue: "safety", text: "All generated content passes through a safety filter that blocks advice encouraging pushing through pain or offering medical diagnoses; testing demonstrates a block rate of ≥99% for unsafe tips." },
      { ethicsValue: "explainability", text: "Every tip is explicitly visually tagged (e.g., \"AI-Generated\") to ensure users distinguish automated suggestions from human instructor advice." },
      { ethicsValue: "fairness", text: "Generated tips are strictly limited to yoga technique or mindset advice. No content includes calls to action for purchasing subscriptions, merchandise, or unlocking premium features (upselling)." },
    ],
  },
  {
    id: "US-04 v2",
    title: "Newsletter Signup",
    story: "As a Yoga practitioner, I want to receive the latest updates related to the yoga studio so that I can stay informed about studio-related events",
    harmClause: "without manipulation via dark patterns or data misuse.",
    acceptanceCriteria: [
      { ethicsValue: "fairness", text: "Essential application information (pricing, feature overview, privacy policy) is fully accessible to the user without requiring a newsletter subscription." },
      { ethicsValue: "privacy", text: "The subscription checkbox is unchecked by default (opt-in). If a user initiates signup but does not confirm (double opt-in), their email address is automatically and permanently deleted from the system within 30 days." },
      { ethicsValue: "explainability", text: "The signup form explicitly lists the types of content to be sent (e.g., \"Weekly tips,\" \"Product updates\"). User testing confirms that at least 85% of participants correctly understand the nature and frequency of the emails before signing up." },
      { ethicsValue: "safety", text: "The interface avoids manipulative design (dark patterns); the option to decline or skip is presented with neutral language and equal visual prominence to the signup button (e.g., no \"confirmshaming\")." },
    ],
  },
];

const UserStoryCard = ({ story, version }: { story: UserStory; version: "v1" | "v2" }) => (
  <Card className={version === "v2" ? "border-accent/30" : ""}>
    <CardHeader className="pb-3">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-mono text-sm text-muted-foreground">{story.id}</span>
      </div>
      <CardTitle className="text-lg font-heading">{story.title}</CardTitle>
    </CardHeader>
    <CardContent className="space-y-4">
      <blockquote className="border-l-2 border-primary/30 pl-4 italic text-muted-foreground">
        "{story.story}
        {story.harmClause && (
          <span className="text-accent font-medium not-italic"> {story.harmClause}</span>
        )}
        "
      </blockquote>

      {story.acceptanceCriteria && story.acceptanceCriteria.length > 0 && (
        <div className="space-y-3">
          <p className="font-medium text-sm">Acceptance Criteria:</p>
          <ul className="space-y-2">
            {story.acceptanceCriteria.map((criterion, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                <EthicsLabel value={criterion.ethicsValue} className="mt-0.5 shrink-0" />
                <span>{criterion.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </CardContent>
  </Card>
);

const UserStories = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-mono text-sm text-muted-foreground">Appendix A</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
            User Story Repository
          </h1>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            Complete documentation of functional requirements for both application versions
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* V1 Stories */}
        <section className="mb-12">
          <div className="flex items-baseline gap-2 mb-6">
            <span className="section-number">A.1</span>
            <h2 className="text-2xl font-heading font-semibold">User Stories v1 (Baseline)</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            These stories were implemented as a baseline version (v1) of the Yogi web application.
            They represent standard functional requirements without explicit ethical analysis.
          </p>
          <div className="grid gap-4">
            {v1Stories.map((story) => (
              <UserStoryCard key={story.id} story={story} version="v1" />
            ))}
          </div>
        </section>

        <Separator className="my-8" />

        {/* V2 Stories */}
        <section>
          <div className="flex items-baseline gap-2 mb-6">
            <span className="section-number">A.2</span>
            <h2 className="text-2xl font-heading font-semibold">User Stories v2 (Ethical Enhancement)</h2>
          </div>
          <p className="text-muted-foreground mb-6">
            These stories extend the baseline with explicit harm clauses and ethical acceptance criteria,
            implementing the Ethics Filter Framework for value-based engineering.
          </p>
          <div className="grid gap-4">
            {v2Stories.map((story) => (
              <UserStoryCard key={story.id} story={story} version="v2" />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-sm text-muted-foreground">
            DSR Research • Yogi Application with Ethics Filter Framework
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UserStories;
