import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  Search,
  TextFields,
  FilterList,
} from '@mui/icons-material';

const PosTagging = ({ analysis }) => {
  const { pos_tags } = analysis;
  const [searchTerm, setSearchTerm] = useState('');
  const [posFilter, setPosFilter] = useState('all');

  // POS tag descriptions
  const posDescriptions = {
    NOUN: 'Noun',
    VERB: 'Verb',
    ADJ: 'Adjective',
    ADV: 'Adverb',
    PRON: 'Pronoun',
    DET: 'Determiner',
    ADP: 'Adposition',
    NUM: 'Number',
    CONJ: 'Conjunction',
    INTJ: 'Interjection',
    PUNCT: 'Punctuation',
    PART: 'Particle',
    X: 'Other',
    SPACE: 'Space',
  };

  // POS tag colors
  const posColors = {
    NOUN: 'primary',
    VERB: 'secondary',
    ADJ: 'success',
    ADV: 'warning',
    PRON: 'info',
    DET: 'error',
    ADP: 'default',
    NUM: 'primary',
    CONJ: 'secondary',
    INTJ: 'success',
    PUNCT: 'warning',
    PART: 'info',
    X: 'error',
    SPACE: 'default',
  };

  // Filter and search tokens
  const filteredTokens = pos_tags.filter(token => {
    const matchesSearch = token.token.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         token.pos.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPos = posFilter === 'all' || token.pos === posFilter;
    return matchesSearch && matchesPos;
  });

  // Get unique POS tags for filter
  const uniquePosTags = [...new Set(pos_tags.map(token => token.pos))];

  // Count POS tags
  const posCounts = pos_tags.reduce((counts, token) => {
    counts[token.pos] = (counts[token.pos] || 0) + 1;
    return counts;
  }, {});

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Part-of-Speech Tagging
      </Typography>
      
      <Grid container spacing={3}>
        {/* POS Distribution */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                POS Distribution
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                {Object.entries(posCounts).map(([pos, count]) => (
                  <Chip
                    key={pos}
                    label={`${posDescriptions[pos] || pos}: ${count}`}
                    color={posColors[pos] || 'default'}
                    variant="outlined"
                    size="small"
                  />
                ))}
              </Box>
              <Typography variant="body2" color="text.secondary">
                Total tokens: {pos_tags.length} | Unique POS tags: {uniquePosTags.length}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Filters */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    placeholder="Search tokens or POS tags..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <ToggleButtonGroup
                    value={posFilter}
                    exclusive
                    onChange={(e, newValue) => newValue && setPosFilter(newValue)}
                    size="small"
                    sx={{ flexWrap: 'wrap' }}
                  >
                    <ToggleButton value="all">
                      All
                    </ToggleButton>
                    {uniquePosTags.map(pos => (
                      <ToggleButton key={pos} value={pos}>
                        {posDescriptions[pos] || pos}
                      </ToggleButton>
                    ))}
                  </ToggleButtonGroup>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* POS Tags Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <TextFields sx={{ mr: 1, verticalAlign: 'middle' }} />
                Token Analysis ({filteredTokens.length} tokens)
              </Typography>
              <TableContainer component={Paper} sx={{ maxHeight: 500 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Token</TableCell>
                      <TableCell>POS Tag</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Detailed Tag</TableCell>
                      <TableCell>Dependency</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTokens.map((token, index) => (
                      <TableRow key={index} hover>
                        <TableCell>
                          <Typography variant="body2" fontWeight="bold">
                            {token.token}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={token.pos}
                            color={posColors[token.pos] || 'default'}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {posDescriptions[token.pos] || 'Unknown'}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {token.tag}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            {token.dep}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* POS Statistics */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <FilterList sx={{ mr: 1, verticalAlign: 'middle' }} />
                POS Statistics
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(posCounts).map(([pos, count]) => {
                  const percentage = ((count / pos_tags.length) * 100).toFixed(1);
                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={pos}>
                      <Box
                        sx={{
                          p: 2,
                          border: 1,
                          borderColor: 'divider',
                          borderRadius: 1,
                          textAlign: 'center',
                        }}
                      >
                        <Chip
                          label={posDescriptions[pos] || pos}
                          color={posColors[pos] || 'default'}
                          size="small"
                          sx={{ mb: 1 }}
                        />
                        <Typography variant="h4" color="primary" fontWeight="bold">
                          {count}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {percentage}% of tokens
                        </Typography>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PosTagging; 