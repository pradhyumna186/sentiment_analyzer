import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Chip,
  LinearProgress,
  Alert,
  Tabs,
  Tab,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Send,
  Psychology,
  Language,
  TrendingUp,
  EmojiEmotions,
  Analytics,
  TextFields,
  Cloud,
  Speed,
  CheckCircle,
  Error,
  Info,
} from '@mui/icons-material';
import SentimentChart from './SentimentChart';
import EmotionChart from './EmotionChart';
import KeywordCloud from './KeywordCloud';
import EntityList from './EntityList';
import ReadabilityMetrics from './ReadabilityMetrics';
import PosTagging from './PosTagging';

const SentimentDashboard = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState(0);

  const analyzeText = async () => {
    if (!text.trim()) {
      setError('Please enter some text to analyze');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5001/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: text.trim() }),
      });

      const data = await response.json();

      if (response.ok) {
        setAnalysis(data);
      } else {
        setError(data.error || 'Analysis failed');
      }
    } catch (err) {
      setError('Failed to connect to the analysis service');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
      analyzeText();
    }
  };

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return 'success';
      case 'negative':
        return 'error';
      case 'neutral':
        return 'default';
      default:
        return 'default';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive':
        return <EmojiEmotions color="success" />;
      case 'negative':
        return <EmojiEmotions color="error" />;
      case 'neutral':
        return <EmojiEmotions color="action" />;
      default:
        return <EmojiEmotions />;
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
          Multi-Language Sentiment Analyzer
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Advanced NLP-powered text analysis with real-time insights
        </Typography>
      </Box>

      {/* Input Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            <TextFields sx={{ mr: 1, verticalAlign: 'middle' }} />
            Text Input
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            placeholder="Enter your text here for comprehensive sentiment analysis..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={loading}
            sx={{ mb: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={analyzeText}
              disabled={loading || !text.trim()}
              startIcon={<Send />}
            >
              {loading ? 'Analyzing...' : 'Analyze Text'}
            </Button>
            {loading && <LinearProgress sx={{ flexGrow: 1 }} />}
          </Box>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Results Section */}
      {analysis && (
        <Box>
          {/* Quick Overview */}
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Language color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" gutterBottom>
                    Language
                  </Typography>
                  <Chip
                    label={analysis.language.toUpperCase()}
                    color="primary"
                    variant="outlined"
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Psychology color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" gutterBottom>
                    TextBlob Sentiment
                  </Typography>
                  <Chip
                    label={analysis.textblob_sentiment.sentiment}
                    color={getSentimentColor(analysis.textblob_sentiment.sentiment)}
                    icon={getSentimentIcon(analysis.textblob_sentiment.sentiment)}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Analytics color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" gutterBottom>
                    NLTK Sentiment
                  </Typography>
                  <Chip
                    label={analysis.nltk_sentiment.sentiment}
                    color={getSentimentColor(analysis.nltk_sentiment.sentiment)}
                    icon={getSentimentIcon(analysis.nltk_sentiment.sentiment)}
                  />
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={3}>
              <Card>
                <CardContent sx={{ textAlign: 'center' }}>
                  <Speed color="primary" sx={{ fontSize: 40, mb: 1 }} />
                  <Typography variant="h6" gutterBottom>
                    Readability
                  </Typography>
                  <Typography variant="h4" color="primary">
                    {Math.round(analysis.readability.flesch_reading_ease)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Flesch Score
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {/* Detailed Analysis Tabs */}
          <Card>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={activeTab}
                onChange={(e, newValue) => setActiveTab(newValue)}
                variant="scrollable"
                scrollButtons="auto"
              >
                <Tab label="Sentiment Analysis" icon={<TrendingUp />} />
                <Tab label="Emotions" icon={<EmojiEmotions />} />
                <Tab label="Keywords" icon={<Cloud />} />
                <Tab label="Entities" icon={<CheckCircle />} />
                <Tab label="POS Tagging" icon={<TextFields />} />
                <Tab label="Readability" icon={<Speed />} />
              </Tabs>
            </Box>

            <Box sx={{ p: 3 }}>
              {activeTab === 0 && <SentimentChart analysis={analysis} />}
              {activeTab === 1 && <EmotionChart analysis={analysis} />}
              {activeTab === 2 && <KeywordCloud analysis={analysis} />}
              {activeTab === 3 && <EntityList analysis={analysis} />}
              {activeTab === 4 && <PosTagging analysis={analysis} />}
              {activeTab === 5 && <ReadabilityMetrics analysis={analysis} />}
            </Box>
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default SentimentDashboard; 