import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const SentimentChart = ({ analysis }) => {
  const { textblob_sentiment, nltk_sentiment } = analysis;

  // TextBlob data
  const textblobData = [
    { name: 'Polarity', value: textblob_sentiment.polarity, fill: '#1976d2' },
    { name: 'Subjectivity', value: textblob_sentiment.subjectivity, fill: '#dc004e' },
  ];

  // NLTK VADER data
  const nltkData = [
    { name: 'Positive', value: nltk_sentiment.positive, fill: '#4caf50' },
    { name: 'Negative', value: nltk_sentiment.negative, fill: '#f44336' },
    { name: 'Neutral', value: nltk_sentiment.neutral, fill: '#9e9e9e' },
  ];

  const COLORS = ['#4caf50', '#f44336', '#9e9e9e'];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            borderRadius: 1,
            p: 1,
            boxShadow: 2,
          }}
        >
          <Typography variant="body2">{`${label}: ${payload[0].value.toFixed(3)}`}</Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Sentiment Analysis Results
      </Typography>
      
      <Grid container spacing={3}>
        {/* TextBlob Analysis */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                TextBlob Analysis
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Polarity: {textblob_sentiment.polarity.toFixed(3)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={((textblob_sentiment.polarity + 1) / 2) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Subjectivity: {textblob_sentiment.subjectivity.toFixed(3)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={textblob_sentiment.subjectivity * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Overall Sentiment: <strong>{textblob_sentiment.sentiment}</strong>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* NLTK VADER Analysis */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                NLTK VADER Analysis
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Compound Score: {nltk_sentiment.compound.toFixed(3)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={((nltk_sentiment.compound + 1) / 2) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Positive: {nltk_sentiment.positive.toFixed(3)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={nltk_sentiment.positive * 100}
                  sx={{ height: 8, borderRadius: 4, bgcolor: '#e8f5e8' }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Negative: {nltk_sentiment.negative.toFixed(3)}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={nltk_sentiment.negative * 100}
                  sx={{ height: 8, borderRadius: 4, bgcolor: '#ffebee' }}
                />
              </Box>
              <Typography variant="body2" color="text.secondary">
                Overall Sentiment: <strong>{nltk_sentiment.sentiment}</strong>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* TextBlob Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                TextBlob Metrics
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={textblobData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="value" fill="#1976d2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* NLTK Pie Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                NLTK VADER Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={nltkData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {nltkData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SentimentChart; 