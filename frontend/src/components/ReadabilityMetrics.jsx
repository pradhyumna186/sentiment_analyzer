import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Speed,
  TrendingUp,
  School,
  Assessment,
} from '@mui/icons-material';

const ReadabilityMetrics = ({ analysis }) => {
  const { readability } = analysis;

  // Readability metrics with descriptions and grade levels
  const metrics = [
    {
      name: 'Flesch Reading Ease',
      value: readability.flesch_reading_ease,
      description: 'Measures how easy a text is to read (0-100, higher is easier)',
      grade: readability.flesch_kincaid_grade,
      color: readability.flesch_reading_ease >= 60 ? 'success' : readability.flesch_reading_ease >= 30 ? 'warning' : 'error',
    },
    {
      name: 'Flesch-Kincaid Grade',
      value: readability.flesch_kincaid_grade,
      description: 'U.S. grade level required to understand the text',
      grade: readability.flesch_kincaid_grade,
      color: readability.flesch_kincaid_grade <= 8 ? 'success' : readability.flesch_kincaid_grade <= 12 ? 'warning' : 'error',
    },
    {
      name: 'Gunning Fog Index',
      value: readability.gunning_fog,
      description: 'Years of formal education needed to understand the text',
      grade: readability.gunning_fog,
      color: readability.gunning_fog <= 8 ? 'success' : readability.gunning_fog <= 12 ? 'warning' : 'error',
    },
    {
      name: 'SMOG Index',
      value: readability.smog_index,
      description: 'Years of education needed to understand the text',
      grade: readability.smog_index,
      color: readability.smog_index <= 6 ? 'success' : readability.smog_index <= 10 ? 'warning' : 'error',
    },
    {
      name: 'Automated Readability Index',
      value: readability.automated_readability_index,
      description: 'U.S. grade level (0-14+)',
      grade: readability.automated_readability_index,
      color: readability.automated_readability_index <= 8 ? 'success' : readability.automated_readability_index <= 12 ? 'warning' : 'error',
    },
    {
      name: 'Coleman-Liau Index',
      value: readability.coleman_liau_index,
      description: 'U.S. grade level',
      grade: readability.coleman_liau_index,
      color: readability.coleman_liau_index <= 8 ? 'success' : readability.coleman_liau_index <= 12 ? 'warning' : 'error',
    },
    {
      name: 'Linsear Write Formula',
      value: readability.linsear_write_formula,
      description: 'U.S. grade level',
      grade: readability.linsear_write_formula,
      color: readability.linsear_write_formula <= 8 ? 'success' : readability.linsear_write_formula <= 12 ? 'warning' : 'error',
    },
    {
      name: 'Dale-Chall Readability Score',
      value: readability.dale_chall_readability_score,
      description: 'Grade level (0-9+)',
      grade: readability.dale_chall_readability_score,
      color: readability.dale_chall_readability_score <= 6 ? 'success' : readability.dale_chall_readability_score <= 8 ? 'warning' : 'error',
    },
  ];

  // Text statistics
  const textStats = [
    { name: 'Syllables', value: readability.syllable_count, icon: '🔤' },
    { name: 'Words', value: readability.lexicon_count, icon: '📝' },
    { name: 'Sentences', value: readability.sentence_count, icon: '📄' },
    { name: 'Difficult Words', value: readability.difficult_words, icon: '📚' },
  ];

  const getReadabilityLevel = (fleschScore) => {
    if (fleschScore >= 90) return { level: 'Very Easy', color: 'success' };
    if (fleschScore >= 80) return { level: 'Easy', color: 'success' };
    if (fleschScore >= 70) return { level: 'Fairly Easy', color: 'success' };
    if (fleschScore >= 60) return { level: 'Standard', color: 'warning' };
    if (fleschScore >= 50) return { level: 'Fairly Difficult', color: 'warning' };
    if (fleschScore >= 30) return { level: 'Difficult', color: 'error' };
    return { level: 'Very Difficult', color: 'error' };
  };

  const readabilityLevel = getReadabilityLevel(readability.flesch_reading_ease);

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Readability Analysis
      </Typography>
      
      <Grid container spacing={3}>
        {/* Overall Readability Score */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Speed sx={{ mr: 1, verticalAlign: 'middle' }} />
                Overall Readability
              </Typography>
              <Grid container spacing={3} alignItems="center">
                <Grid item xs={12} md={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h2" color="primary" fontWeight="bold">
                      {Math.round(readability.flesch_reading_ease)}
                    </Typography>
                    <Typography variant="h6" color="text.secondary">
                      Flesch Reading Ease
                    </Typography>
                    <Chip
                      label={readabilityLevel.level}
                      color={readabilityLevel.color}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" gutterBottom>
                      Reading Ease Score
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={readability.flesch_reading_ease}
                      sx={{ height: 12, borderRadius: 6 }}
                      color={readabilityLevel.color}
                    />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      {readability.flesch_reading_ease.toFixed(1)}/100
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    This text is {readabilityLevel.level.toLowerCase()} to read. 
                    The average reader would need approximately {readability.flesch_kincaid_grade.toFixed(1)} years of education to understand it.
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Text Statistics */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <Assessment sx={{ mr: 1, verticalAlign: 'middle' }} />
                Text Statistics
              </Typography>
              <Grid container spacing={2}>
                {textStats.map((stat) => (
                  <Grid item xs={12} sm={6} md={3} key={stat.name}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h3" sx={{ mb: 1 }}>
                        {stat.icon}
                      </Typography>
                      <Typography variant="h4" color="primary" fontWeight="bold">
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {stat.name}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Readability Metrics Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <School sx={{ mr: 1, verticalAlign: 'middle' }} />
                Detailed Readability Metrics
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Metric</TableCell>
                      <TableCell>Score</TableCell>
                      <TableCell>Grade Level</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Assessment</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {metrics.map((metric) => (
                      <TableRow key={metric.name}>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {metric.name}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {metric.value.toFixed(2)}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={`Grade ${metric.grade.toFixed(1)}`}
                            color={metric.color}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {metric.description}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={metric.color === 'success' ? 'Good' : metric.color === 'warning' ? 'Moderate' : 'Difficult'}
                            color={metric.color}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Readability Insights */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <TrendingUp sx={{ mr: 1, verticalAlign: 'middle' }} />
                Readability Insights
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Text Complexity
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Based on the Flesch Reading Ease score of {readability.flesch_reading_ease.toFixed(1)}, 
                      this text is {readabilityLevel.level.toLowerCase()}. 
                      {readability.flesch_reading_ease >= 60 
                        ? ' It should be easily understood by most readers.' 
                        : readability.flesch_reading_ease >= 30 
                        ? ' It may require some effort to read and understand.' 
                        : ' It is quite challenging and may require specialized knowledge or higher education level.'
                      }
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box sx={{ p: 2, border: 1, borderColor: 'divider', borderRadius: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      Word Analysis
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      The text contains {readability.lexicon_count} words with {readability.syllable_count} syllables. 
                      There are {readability.difficult_words} difficult words, which represents 
                      {((readability.difficult_words / readability.lexicon_count) * 100).toFixed(1)}% of the total vocabulary.
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReadabilityMetrics; 