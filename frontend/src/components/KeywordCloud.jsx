import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Cloud,
  TrendingUp,
  TextFields,
} from '@mui/icons-material';

const KeywordCloud = ({ analysis }) => {
  const { keywords, wordcloud_data } = analysis;

  // Generate word cloud visualization using CSS
  const generateWordCloud = () => {
    const maxFreq = Math.max(...wordcloud_data.map(w => w.frequency));
    
    return wordcloud_data.map((word, index) => {
      const fontSize = Math.max(12, (word.frequency / maxFreq) * 48);
      const opacity = 0.3 + (word.frequency / maxFreq) * 0.7;
      const color = `hsl(${(index * 137.5) % 360}, 70%, 50%)`;
      
      return (
        <span
          key={word.word}
          style={{
            fontSize: `${fontSize}px`,
            opacity: opacity,
            color: color,
            fontWeight: 'bold',
            margin: '4px',
            display: 'inline-block',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.2)';
            e.target.style.zIndex = '10';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.zIndex = '1';
          }}
          title={`${word.word}: ${word.frequency} occurrences`}
        >
          {word.word}
        </span>
      );
    });
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Keyword Analysis
      </Typography>
      
      <Grid container spacing={3}>
        {/* Top Keywords */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                Top Keywords
              </Typography>
              <List dense>
                {keywords.slice(0, 10).map((keyword, index) => (
                  <ListItem key={keyword.word} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <Typography variant="body2" color="primary" fontWeight="bold">
                        #{index + 1}
                      </Typography>
                    </ListItemIcon>
                    <ListItemText
                      primary={keyword.word}
                      secondary={`Frequency: ${keyword.frequency}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Word Cloud */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Cloud sx={{ mr: 1, verticalAlign: 'middle' }} />
                Word Cloud Visualization
              </Typography>
              <Box
                sx={{
                  height: 400,
                  border: 1,
                  borderColor: 'divider',
                  borderRadius: 1,
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  overflow: 'hidden',
                  bgcolor: '#fafafa',
                }}
              >
                <Box
                  sx={{
                    textAlign: 'center',
                    lineHeight: 1.2,
                    wordBreak: 'break-word',
                  }}
                >
                  {generateWordCloud()}
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Hover over words to see frequency details. Size indicates word frequency.
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Keyword Statistics */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <TextFields sx={{ mr: 1, verticalAlign: 'middle' }} />
                Keyword Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {keywords.length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Unique Keywords
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {keywords.reduce((sum, k) => sum + k.frequency, 0)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Occurrences
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {Math.max(...keywords.map(k => k.frequency))}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Max Frequency
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Box sx={{ textAlign: 'center', p: 2 }}>
                    <Typography variant="h4" color="primary" fontWeight="bold">
                      {(keywords.reduce((sum, k) => sum + k.frequency, 0) / keywords.length).toFixed(1)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Avg Frequency
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Keyword Tags */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                All Keywords
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {keywords.map((keyword, index) => (
                  <Chip
                    key={keyword.word}
                    label={`${keyword.word} (${keyword.frequency})`}
                    variant="outlined"
                    size="small"
                    color={index < 5 ? 'primary' : 'default'}
                    sx={{
                      fontWeight: index < 5 ? 'bold' : 'normal',
                    }}
                  />
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default KeywordCloud; 