import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const EmotionChart = ({ analysis }) => {
  const { emotions, emojis } = analysis;

  // Convert emotions object to array for chart
  const emotionData = Object.entries(emotions).map(([emotion, score]) => ({
    emotion: emotion.charAt(0).toUpperCase() + emotion.slice(1),
    score: score,
    percentage: (score * 100).toFixed(1),
  }));

  const emotionColors = {
    joy: '#4caf50',
    sadness: '#2196f3',
    anger: '#f44336',
    fear: '#9c27b0',
    surprise: '#ff9800',
    disgust: '#795548',
    trust: '#607d8b',
  };

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

  const getEmotionColor = (emotion) => {
    return emotionColors[emotion.toLowerCase()] || '#9e9e9e';
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Emotion Analysis
      </Typography>
      
      <Grid container spacing={3}>
        {/* Emotion Scores */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Emotion Detection Scores
              </Typography>
              <Box sx={{ mb: 3 }}>
                {emotionData.map((emotion) => (
                  <Box key={emotion.emotion} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">
                        {emotion.emotion}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {emotion.percentage}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={emotion.score * 100}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: '#f5f5f5',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: getEmotionColor(emotion.emotion),
                        },
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Emotion Chart */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Emotion Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={emotionData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 1]} />
                  <YAxis dataKey="emotion" type="category" width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey="score"
                    fill="#1976d2"
                    radius={[0, 4, 4, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Emoji Analysis */}
        {emojis.length > 0 && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Emoji Analysis
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {emojis.map((emoji, index) => (
                    <Chip
                      key={index}
                      label={`${emoji.emoji} (${emoji.count})`}
                      variant="outlined"
                      size="medium"
                      sx={{ fontSize: '1.2rem' }}
                    />
                  ))}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                  Total emojis found: {emojis.reduce((sum, emoji) => sum + emoji.count, 0)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}

        {/* Emotion Summary */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Emotion Summary
              </Typography>
              <Grid container spacing={2}>
                {emotionData
                  .sort((a, b) => b.score - a.score)
                  .slice(0, 3)
                  .map((emotion, index) => (
                    <Grid item xs={12} sm={4} key={emotion.emotion}>
                      <Box
                        sx={{
                          p: 2,
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                          textAlign: 'center',
                          bgcolor: index === 0 ? 'primary.light' : 'background.paper',
                          color: index === 0 ? 'primary.contrastText' : 'text.primary',
                        }}
                      >
                        <Typography variant="h6">
                          {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'} {emotion.emotion}
                        </Typography>
                        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                          {emotion.percentage}%
                        </Typography>
                        <Typography variant="body2">
                          Score: {emotion.score.toFixed(3)}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmotionChart; 