import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ExternalLink, TrendingUp, Calendar } from 'lucide-react';

interface GitHubContributionGraphProps {
    username: string;
}

export function GitHubContributionGraph({ username }: GitHubContributionGraphProps) {
    return (
        <Card className="p-8 rounded-3xl bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl border border-white/10">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
                <h3 className="text-xl font-bold text-foreground">Contribution Activity</h3>
                <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>285 contributions in the last year</span>
                    </div>
                    <Button
                        asChild
                        variant="outline"
                        size="sm"
                        className="text-xs"
                    >
                        <a
                            href={`https://github.com/${username}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="gap-1"
                        >
                            <ExternalLink className="w-3 h-3" />
                            View on GitHub
                        </a>
                    </Button>
                </div>
            </div>

            {/* Embed real GitHub contribution graph */}
            <div className="w-full overflow-x-auto">
                <img
                    src={`https://ghchart.rshah.org/${username}`}
                    alt={`${username}'s GitHub contribution chart`}
                    className="w-full max-w-full h-auto rounded-lg"
                    style={{ minWidth: '700px' }}
                />
            </div>

            <div className="mt-4 text-center">
                <p className="text-xs text-muted-foreground">
                    Real-time contribution data from GitHub
                </p>
            </div>
        </Card>
    );
}
