import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, FileText, FlaskConical, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { EthicsLabels, type EthicsValue } from "@/components/EthicsLabel";
import { VersionBadge } from "@/components/FlowAnnotation";

const v2EthicsValues: EthicsValue[] = ["privacy", "autonomy", "fairness", "transparency", "dignity"];

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
            <CardContent className="pt-6">
              <p className="text-muted-foreground leading-relaxed">
                This artifact demonstrates the application of the Ethics Filter Framework (EFF) 
                to integrate Value-Based Engineering into agile requirements. Two versions of a yoga 
                recommendation system are presented: <strong>Version 1 (Baseline)</strong> implements 
                functional requirements without explicit ethical analysis, while <strong>Version 2 
                (Ethical Enhancement)</strong> integrates ethical values through harm clauses and 
                ethical acceptance criteria.
              </p>
            </CardContent>
          </Card>
        </section>

        <Separator className="my-8" />

        {/* Version Comparison */}
        <section className="mb-12">
          <div className="flex items-baseline gap-2 mb-6">
            <span className="section-number">2.</span>
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
                <Button 
                  onClick={() => navigate('/questionnaire/v1')}
                  variant="outline"
                  className="w-full"
                >
                  Start V1 Demonstration
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
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
                <div className="space-y-3">
                  <p className="font-medium text-sm text-foreground">Ethical Values Applied:</p>
                  <EthicsLabels values={v2EthicsValues} />
                </div>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p className="font-medium text-foreground">Key Enhancements:</p>
                  <ul className="space-y-1.5 ml-4">
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Privacy-first data collection (90-day retention)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Transparent user understanding (≥80% validated)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>Bias-free recommendations with filter-bubble screening</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>AI content moderation (≥95% block rate)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-accent">•</span>
                      <span>GDPR Art. 17 data deletion rights</span>
                    </li>
                  </ul>
                </div>
                <Button 
                  onClick={() => navigate('/questionnaire/v2')}
                  className="w-full"
                >
                  Start V2 Demonstration
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        {/* Research Context */}
        <section>
          <div className="flex items-baseline gap-2 mb-4">
            <span className="section-number">3.</span>
            <h2 className="text-2xl font-heading font-semibold">Research Context</h2>
          </div>
          <Card className="shadow-card bg-muted/30">
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground leading-relaxed">
                This artifact serves as a Level 1 (L1) instantiation for Design Science Research, 
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
            DSR Artifact • Ethics Filter Framework Demonstration
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
