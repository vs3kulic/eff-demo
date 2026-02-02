import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowRight, BookOpen, FileText, FlaskConical, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { VersionBadge } from "@/components/FlowAnnotation";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Academic Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3 mb-2">
            <FlaskConical className="h-6 w-6 text-primary" />
            <span className="font-mono text-sm text-muted-foreground">L1 Artifact</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-heading font-semibold text-foreground">
            Yogi: Ethics Filter Framework Demonstration
          </h1>
          <p className="text-muted-foreground mt-2 max-w-3xl">
            A comparative study of conventional agile implementation versus value-based engineering 
            in yoga recommendation systems
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Abstract Section */}
        <section className="mb-12">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="section-number">1.</span>
            <h2 className="text-2xl font-heading font-semibold">Abstract</h2>
          </div>
        <Card className="shadow-card">
            <CardContent className="pt-6 space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                The Yogi Application demonstrates the application of the Ethics Filter Framework (EFF) 
                to integrate Value-Based Engineering into agile requirements. Two versions of a yoga 
                recommendation system are presented: <strong>Version 1 (Baseline)</strong> implements 
                functional requirements without explicit ethical analysis, while <strong>Version 2 
                (Ethical Enhancement)</strong> integrates ethical values through harm clauses and 
                ethical acceptance criteria.
              </p>
              <div className="border-t border-border pt-4">
                <p className="font-medium text-foreground text-sm mb-2">Implemented Features:</p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span><strong>Yoga-Themed Questionnaire</strong> — Collects user preferences for personalized recommendations</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span><strong>Class Recommendations</strong> — Suggests suitable yoga classes based on questionnaire responses</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span><strong>AI-Generated Pro-Tips</strong> — Provides personalized practice advice to enhance the user's routine</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-muted-foreground">•</span>
                    <span><strong>Newsletter Subscription</strong> — Offers optional studio updates and event notifications</span>
                  </li>
                </ul>
              </div>

              <p className="text-muted-foreground text-sm mt-4 italic border-t border-border pt-4">
                You will interact with <strong>both versions</strong> during this study and provide feedback on their design and trustworthiness.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* Feature Comparison Section */}
        <section className="mb-12">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="section-number">2.</span>
            <h2 className="text-2xl font-heading font-semibold">Feature Comparison</h2>
          </div>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <p className="text-muted-foreground mb-6">
                This table shows how each feature works in both versions. Version 2 adds ethical safeguards that change how users interact with the app.
              </p>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="font-semibold">Feature</TableHead>
                      <TableHead className="font-semibold">Version 1 (Baseline)</TableHead>
                      <TableHead className="font-semibold">Version 2 (Ethical Enhancement)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Questionnaire</TableCell>
                      <TableCell>Collects user data for recommendations</TableCell>
                      <TableCell>Includes privacy notice explaining data use, purpose, and retention (90 days max)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Class Recommendations</TableCell>
                      <TableCell>Suggests yoga classes based on profile</TableCell>
                      <TableCell>Filters out contraindicated classes for users with specific injuries/conditions</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">AI-Generated Tips</TableCell>
                      <TableCell>Provides personalized practice advice</TableCell>
                      <TableCell>Includes safety disclaimers and encourages consulting instructors for health concerns</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Newsletter Subscription</TableCell>
                      <TableCell>Optional signup for updates</TableCell>
                      <TableCell>Clearly separated from questionnaire; explicit consent required</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Data Storage</TableCell>
                      <TableCell>Stores responses and email for analytics/marketing</TableCell>
                      <TableCell>Limited retention (90 days), purpose-limited use, users informed upfront</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* User Stories Section */}
        <section className="mb-12">
          <div className="flex items-baseline gap-2 mb-4">
            <span className="section-number">3.</span>
            <h2 className="text-2xl font-heading font-semibold">User Stories</h2>
          </div>
          <Card className="shadow-card">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <BookOpen className="h-8 w-8 text-primary shrink-0 mt-1" />
                <div className="flex-1">
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    View the complete user story repository documenting the functional and ethical 
                    requirements for both versions. Includes harm clauses and acceptance criteria 
                    for the Ethics Filter Framework implementation.
                  </p>
                  <Button 
                    variant="outline"
                    onClick={() => navigate('/user-stories')}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    View User Stories (Appendix A)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* Implementation Comparison */}
        <section className="mb-12">
          <div className="flex items-baseline gap-2 mb-6">
            <span className="section-number">4.</span>
            <h2 className="text-2xl font-heading font-semibold">Implementation Comparison</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Version 1 Card */}
            <Card className="shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <VersionBadge version="V1" label="Baseline" />
                  <FileText className="h-5 w-5 text-muted-foreground" />
                </div>
                <CardTitle className="text-xl font-heading">
                  Conventional Implementation
                </CardTitle>
                <CardDescription>
                  Functional requirements without explicit ethical analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Characteristics:</p>
                  <ul className="space-y-1.5 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>Standard data collection practices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>Algorithm-driven recommendations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>AI-generated content (unlabeled)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-muted-foreground">•</span>
                      <span>Standard newsletter signup</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Version 2 Card */}
            <Card className="shadow-card border-accent/30">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <VersionBadge version="V2" label="Ethical Enhancement" />
                  <Shield className="h-5 w-5 text-accent" />
                </div>
                <CardTitle className="text-xl font-heading">
                  Value-Based Implementation
                </CardTitle>
                <CardDescription>
                  Ethics Filter Framework integration with harm clauses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Characteristics:</p>
                  <ul className="space-y-1.5 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Privacy-first data collection (90-day retention)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Transparent recommendation explanations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>AI-generated content (labeled, moderated)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Dark-pattern-free consent (opt-in)</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Buttons Row */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <Button 
              onClick={() => navigate('/questionnaire/v1')}
              variant="outline"
              className="w-full"
            >
              Start V1 Demonstration
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
            <Button 
              onClick={() => navigate('/questionnaire/v2')}
              className="w-full"
            >
              Start V2 Demonstration
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Research Context */}
        <section>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="section-number">5.</span>
            <h2 className="text-2xl font-heading font-semibold">Research Context</h2>
          </div>
          <Card className="shadow-card bg-muted/30">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                The Yogi Application serves as a Level 1 (L1) instantiation for Design Science Research, 
                demonstrating the practical application of the Ethics Filter Framework. The comparison 
                between V1 and V2 tests whether EFF successfully integrates Value-Based Engineering 
                into agile requirements without impeding agile efficiency.
              </p>
            </CardContent>
          </Card>
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

export default Home;
