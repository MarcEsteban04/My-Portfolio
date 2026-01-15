import React, { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { ScrollAnimation } from './ScrollAnimation';
import { Github, GitBranch, Star, GitFork, Calendar, Code, TrendingUp, ExternalLink, Eye, Users, BookOpen, Clock, Zap, Activity, GitCommit, PieChart } from 'lucide-react';
import { GitHubContributionGraph } from './GitHubContributionGraph';

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

interface LanguageStats {
  name: string;
  percentage: number;
  bytes: number;
  color: string;
}

interface RecentActivity {
  type: 'commit' | 'push' | 'create' | 'fork';
  repo: string;
  message: string;
  date: string;
}

export function EnhancedGitHubSection() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [contributions, setContributions] = useState<ContributionDay[]>([]);
  const [languageStats, setLanguageStats] = useState<LanguageStats[]>([]);
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'languages'>('overview');

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

      // Fetch real contribution data
      await fetchContributions();

      // Calculate language statistics from real data
      await calculateRealLanguageStats(reposData);

      // Fetch real recent activity
      await fetchRecentActivity();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const calculateRealLanguageStats = async (repositories: Repository[]) => {
    try {
      const languagePromises = repositories.map(async (repo) => {
        try {
          const response = await fetch(`https://api.github.com/repos/${username}/${repo.name}/languages`);
          if (response.ok) {
            return await response.json();
          }
          return null;
        } catch {
          return null;
        }
      });

      const languageResults = await Promise.all(languagePromises);
      const languageCount: { [key: string]: number } = {};
      let totalBytes = 0;

      languageResults.forEach((languages) => {
        if (languages) {
          Object.entries(languages).forEach(([lang, bytes]) => {
            languageCount[lang] = (languageCount[lang] || 0) + (bytes as number);
            totalBytes += bytes as number;
          });
        }
      });

      const stats: LanguageStats[] = Object.entries(languageCount)
        .map(([name, bytes]) => ({
          name,
          bytes,
          percentage: (bytes / totalBytes) * 100,
          color: getLanguageColor(name)
        }))
        .sort((a, b) => b.percentage - a.percentage)
        .slice(0, 6);

      setLanguageStats(stats);
    } catch (error) {
      console.error('Failed to fetch language stats:', error);
      // Fallback to repository-based calculation
      calculateLanguageStats(repositories);
    }
  };

  const calculateLanguageStats = (repositories: Repository[]) => {
    const languageCount: { [key: string]: number } = {};
    let totalBytes = 0;

    repositories.forEach(repo => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + repo.size;
        totalBytes += repo.size;
      }
    });

    const stats: LanguageStats[] = Object.entries(languageCount)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: (bytes / totalBytes) * 100,
        color: getLanguageColor(name)
      }))
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 6);

    setLanguageStats(stats);
  };

  const fetchRecentActivity = async () => {
    try {
      // Fetch real recent events from GitHub API
      const eventsResponse = await fetch(`https://api.github.com/users/${username}/events?per_page=30`);
      if (!eventsResponse.ok) {
        generateRecentActivity(repos);
        return;
      }

      const events = await eventsResponse.json();
      const activities: RecentActivity[] = [];

      events.forEach((event: any) => {
        if (activities.length >= 5) return;

        let activity: RecentActivity | null = null;
        const repoName = event.repo?.name?.split('/')[1] || 'Unknown';

        switch (event.type) {
          case 'PushEvent':
            const commits = event.payload?.commits?.length || 1;
            activity = {
              type: 'push',
              repo: repoName,
              message: `Pushed ${commits} commit${commits > 1 ? 's' : ''} to ${repoName}`,
              date: event.created_at
            };
            break;
          case 'CreateEvent':
            if (event.payload?.ref_type === 'repository') {
              activity = {
                type: 'create',
                repo: repoName,
                message: `Created repository ${repoName}`,
                date: event.created_at
              };
            }
            break;
          case 'ForkEvent':
            activity = {
              type: 'fork',
              repo: repoName,
              message: `Forked ${repoName}`,
              date: event.created_at
            };
            break;
          case 'WatchEvent':
            activity = {
              type: 'commit',
              repo: repoName,
              message: `Starred ${repoName}`,
              date: event.created_at
            };
            break;
        }

        if (activity) {
          activities.push(activity);
        }
      });

      setRecentActivity(activities);
    } catch (error) {
      console.error('Failed to fetch recent activity:', error);
      generateRecentActivity(repos);
    }
  };

  const generateRecentActivity = (repositories: Repository[]) => {
    const activities: RecentActivity[] = [];
    const sortedRepos = repositories.sort((a, b) =>
      new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    ).slice(0, 8);

    sortedRepos.forEach(repo => {
      const daysSinceUpdate = Math.floor(
        (Date.now() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysSinceUpdate <= 30) {
        activities.push({
          type: daysSinceUpdate <= 7 ? 'push' : 'commit',
          repo: repo.name,
          message: `Updated ${repo.name}`,
          date: repo.updated_at
        });
      }
    });

    setRecentActivity(activities.slice(0, 5));
  };

  const fetchContributions = async () => {
    try {
      // Fetch real contribution data from GitHub Events API
      const eventsResponse = await fetch(`https://api.github.com/users/${username}/events?per_page=100`);
      if (!eventsResponse.ok) {
        // Fallback to a more realistic static pattern if API fails
        generateRealisticContributions();
        return;
      }

      const events = await eventsResponse.json();
      const contributionMap: { [key: string]: number } = {};

      // Process events to count contributions per day
      events.forEach((event: any) => {
        if (['PushEvent', 'CreateEvent', 'PullRequestEvent', 'IssuesEvent'].includes(event.type)) {
          const date = event.created_at.split('T')[0];
          contributionMap[date] = (contributionMap[date] || 0) + 1;
        }
      });

      // Generate contribution data for the past year
      const days: ContributionDay[] = [];
      const today = new Date();

      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        const count = contributionMap[dateStr] || 0;
        const level = count === 0 ? 0 : count <= 2 ? 1 : count <= 5 ? 2 : count <= 8 ? 3 : 4;

        days.push({
          date: dateStr,
          count,
          level
        });
      }

      setContributions(days);
    } catch (error) {
      console.error('Failed to fetch contributions:', error);
      generateRealisticContributions();
    }
  };

  const generateRealisticContributions = () => {
    // More realistic contribution pattern based on typical developer activity
    const days: ContributionDay[] = [];
    const today = new Date();

    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const dayOfWeek = date.getDay();
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      const isRecentMonth = i <= 30;

      let count = 0;
      let level = 0;

      // More activity in recent months, less on weekends
      const baseChance = isRecentMonth ? (isWeekend ? 0.4 : 0.8) : (isWeekend ? 0.2 : 0.6);

      if (Math.random() < baseChance) {
        count = isRecentMonth ? Math.floor(Math.random() * 8) + 1 : Math.floor(Math.random() * 5) + 1;
        level = count <= 2 ? 1 : count <= 4 ? 2 : count <= 6 ? 3 : 4;
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

      {/* Enhanced Navigation Tabs */}
      <ScrollAnimation delay={300}>
        <div className="flex flex-wrap gap-2 p-2 bg-muted/30 rounded-2xl backdrop-blur-sm border border-white/10 justify-center">
          {[
            { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
            { id: 'activity', label: 'Recent Activity', icon: <Activity className="w-4 h-4" /> },
            { id: 'languages', label: 'Languages', icon: <PieChart className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                  : 'text-muted-foreground hover:text-foreground hover:bg-white/10'
                }`}
            >
              {tab.icon}
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </ScrollAnimation>

      {/* Recent Activity Tab */}
      {activeTab === 'activity' && (
        <ScrollAnimation delay={400}>
          <Card className="p-8 rounded-3xl bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-6 h-6 text-blue-500" />
              <h3 className="text-xl font-bold text-foreground">Recent Activity</h3>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-background/40 to-muted/20 border border-white/10">
                  <div className="p-2 rounded-lg bg-blue-500/20">
                    {activity.type === 'commit' ? <GitCommit className="w-4 h-4 text-blue-500" /> :
                      activity.type === 'push' ? <Zap className="w-4 h-4 text-green-500" /> :
                        <Github className="w-4 h-4 text-purple-500" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">{activity.message}</p>
                    <p className="text-xs text-muted-foreground">in {activity.repo}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(activity.date)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </ScrollAnimation>
      )}

      {/* Language Statistics Tab */}
      {activeTab === 'languages' && (
        <ScrollAnimation delay={400}>
          <Card className="p-8 rounded-3xl bg-gradient-to-br from-background/60 to-muted/20 backdrop-blur-xl border border-white/10">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="w-6 h-6 text-purple-500" />
              <h3 className="text-xl font-bold text-foreground">Language Distribution</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                {languageStats.map((lang, index) => (
                  <div key={lang.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: lang.color }} />
                        <span className="font-medium text-foreground">{lang.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{lang.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-muted/30 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{
                          backgroundColor: lang.color,
                          width: `${lang.percentage}%`,
                          animationDelay: `${index * 100}ms`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-48 h-48">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {languageStats.map((lang, index) => {
                      const prevPercentage = languageStats.slice(0, index).reduce((sum, l) => sum + l.percentage, 0);
                      const circumference = 2 * Math.PI * 40;
                      const strokeDasharray = `${(lang.percentage / 100) * circumference} ${circumference}`;
                      const strokeDashoffset = -((prevPercentage / 100) * circumference);

                      return (
                        <circle
                          key={lang.name}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={lang.color}
                          strokeWidth="8"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-all duration-1000 ease-out"
                        />
                      );
                    })}
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-foreground">{languageStats.length}</div>
                      <div className="text-sm text-muted-foreground">Languages</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </ScrollAnimation>
      )}

      {/* Contribution Graph - Only show in overview */}
      {activeTab === 'overview' && (
        <ScrollAnimation delay={400}>
          <GitHubContributionGraph username={username} />
        </ScrollAnimation>
      )}

      {/* Repository Filter */}
      <ScrollAnimation delay={600}>
        <div className="flex flex-wrap gap-2 justify-center">
          {getUniqueLanguages().map(language => (
            <button
              key={language}
              onClick={() => setFilter(language)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${filter === language
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
