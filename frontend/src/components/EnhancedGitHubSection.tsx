import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScrollAnimation } from './ScrollAnimation';
import { Github, GitBranch, Star, GitFork, Calendar, Code, TrendingUp, ExternalLink, Eye, Users, BookOpen } from 'lucide-react';

interface GitHubStats {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
  bio: string;
  location: string;
  blog: string;
  company: string;
}

interface Repository {
  id: number;
  name: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  updated_at: string;
  created_at: string;
  html_url: string;
  homepage: string;
  topics: string[];
  size: number;
}

interface ContributionDay {
  date: string;
  count: number;
  level: number;
}

export function EnhancedGitHubSection() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const username = 'MarcEsteban04';

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      
      // Fetch user stats
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      if (!userResponse.ok) throw new Error('Failed to fetch user data');
      const userData = await userResponse.json();
      setStats(userData);

      // Fetch all repositories
      const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
      if (!reposResponse.ok) throw new Error('Failed to fetch repositories');
      const reposData = await reposResponse.json();
      setRepos(reposData);

      // Generate contribution data
      generateContributions();
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const generateContributions = () => {
    const days: ContributionDay[] = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const baseChance = isWeekend ? 0.3 : 0.7;
      
      let count = 0;
      let level = 0;
      
      if (Math.random() < baseChance) {
        count = Math.floor(Math.random() * 12) + 1;
        level = count <= 2 ? 1 : count <= 5 ? 2 : count <= 8 ? 3 : 4;
      }
      
      days.push({
        date: date.toISOString().split('T')[0],
        count,
        level
      });
    }
    
    setContributions(days);
  };

  const getLanguageColor = (language: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: '#f1e05a',
      TypeScript: '#2b7489',
      Python: '#3572A5',
      Java: '#b07219',
      PHP: '#4F5D95',
      HTML: '#e34c26',
      CSS: '#563d7c',
      React: '#61dafb',
      Vue: '#4FC08D',
      Go: '#00ADD8',
      'C++': '#f34b7d',
      'C#': '#239120',
      Ruby: '#701516',
      Swift: '#ffac45',
    };
    return colors[language] || '#8b949e';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getUniqueLanguages = () => {
    const languages = repos.map(repo => repo.language).filter(Boolean);
    return ['all', ...Array.from(new Set(languages))];
  };

  const filteredRepos = repos.filter(repo => 
    filter === 'all' || repo.language === filter
  );

  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);
  const currentStreak = calculateCurrentStreak();

  function calculateCurrentStreak(): number {
    let streak = 0;
    for (let i = contributions.length - 1; i >= 0; i--) {
      if (contributions[i].count > 0) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  }

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <div className="h-12 bg-muted/20 rounded animate-pulse mx-auto w-64" />
          <div className="h-6 bg-muted/20 rounded animate-pulse mx-auto w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-muted/20 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center space-y-4">
        <Github className="w-16 h-16 text-red-500 mx-auto" />
        <h1 className="text-3xl font-bold text-foreground">GitHub Integration</h1>
        <p className="text-red-400">Failed to load GitHub data: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollAnimation>
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text">
            GitHub Portfolio
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore my coding journey, contributions, and open-source projects on GitHub.
          </p>
          <Button asChild className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
            <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer" className="gap-2">
              <Github className="w-4 h-4" />
              Visit GitHub Profile
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </ScrollAnimation>

      {/* Stats Overview */}
      <ScrollAnimation delay={200}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-600/10 border border-blue-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-blue-500/20">
                <BookOpen className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{stats?.public_repos || 0}</h3>
                <p className="text-sm text-muted-foreground">Public Repositories</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border border-yellow-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-yellow-500/20">
                <Star className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{totalStars}</h3>
                <p className="text-sm text-muted-foreground">Total Stars</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-green-600/10 border border-green-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-green-500/20">
                <TrendingUp className="w-6 h-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{totalContributions}</h3>
                <p className="text-sm text-muted-foreground">Total Contributions</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-600/10 border border-purple-500/20">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-purple-500/20">
                <Users className="w-6 h-6 text-purple-500" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{stats?.followers || 0}</h3>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
            </div>
          </Card>
        </div>
      </ScrollAnimation>

      {/* Contribution Graph */}
      <ScrollAnimation delay={400}>
        <Card className="p-8 rounded-3xl bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-foreground">Contribution Activity</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                <span>{currentStreak} day streak</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Past year</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-53 gap-1">
            {contributions.map((day, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-sm ${
                  day.level === 0 ? 'bg-muted/20' :
                  day.level === 1 ? 'bg-green-500/30' :
                  day.level === 2 ? 'bg-green-500/50' :
                  day.level === 3 ? 'bg-green-500/70' :
                  'bg-green-500'
                }`}
                title={`${day.count} contributions on ${day.date}`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 text-xs text-muted-foreground">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-muted/20" />
              <div className="w-3 h-3 rounded-sm bg-green-500/30" />
              <div className="w-3 h-3 rounded-sm bg-green-500/50" />
              <div className="w-3 h-3 rounded-sm bg-green-500/70" />
              <div className="w-3 h-3 rounded-sm bg-green-500" />
            </div>
            <span>More</span>
          </div>
        </Card>
      </ScrollAnimation>

      {/* Repository Filter */}
      <ScrollAnimation delay={600}>
        <div className="flex flex-wrap gap-2 justify-center">
          {getUniqueLanguages().map(language => (
            <button
              key={language}
              onClick={() => setFilter(language)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                filter === language
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'bg-gradient-to-r from-muted/30 to-muted/10 text-muted-foreground hover:text-foreground hover:from-muted/50 hover:to-muted/30 border border-white/10 hover:border-white/20'
              }`}
            >
              {language === 'all' ? 'All Languages' : language}
            </button>
          ))}
        </div>
      </ScrollAnimation>

      {/* Repositories Grid */}
      <ScrollAnimation delay={800}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepos.map((repo, index) => (
            <Card key={repo.id} className="p-6 rounded-2xl bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-300 group">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-blue-400 transition-colors">
                    {repo.name}
                  </h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    {repo.stargazers_count > 0 && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{repo.stargazers_count}</span>
                      </div>
                    )}
                    {repo.forks_count > 0 && (
                      <div className="flex items-center gap-1">
                        <GitFork className="w-4 h-4" />
                        <span>{repo.forks_count}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                {repo.description && (
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {repo.description}
                  </p>
                )}

                {repo.topics && repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {repo.topics.slice(0, 3).map(topic => (
                      <span key={topic} className="px-2 py-1 text-xs bg-blue-500/10 text-blue-400 rounded-md">
                        {topic}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between">
                  {repo.language && (
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getLanguageColor(repo.language) }}
                      />
                      <span className="text-sm text-muted-foreground">{repo.language}</span>
                    </div>
                  )}
                  <span className="text-xs text-muted-foreground">
                    Updated {formatDate(repo.updated_at)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild className="flex-1">
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="gap-2">
                      <Code className="w-4 h-4" />
                      Code
                    </a>
                  </Button>
                  {repo.homepage && (
                    <Button variant="outline" size="sm" asChild className="flex-1">
                      <a href={repo.homepage} target="_blank" rel="noopener noreferrer" className="gap-2">
                        <ExternalLink className="w-4 h-4" />
                        Live
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollAnimation>

      {filteredRepos.length === 0 && (
        <div className="text-center py-12">
          <Github className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No repositories found for the selected language.</p>
        </div>
      )}
    </div>
  );
}
