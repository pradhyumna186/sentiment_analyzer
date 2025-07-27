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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import {
  Person,
  LocationOn,
  Business,
  Event,
  Language,
  CheckCircle,
} from '@mui/icons-material';

const EntityList = ({ analysis }) => {
  const { entities } = analysis;

  // Group entities by type
  const entityGroups = entities.reduce((groups, entity) => {
    const type = entity.label;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(entity);
    return groups;
  }, {});

  // Entity type icons and colors
  const entityTypeConfig = {
    PERSON: { icon: <Person />, color: 'primary', label: 'Person' },
    ORG: { icon: <Business />, color: 'secondary', label: 'Organization' },
    GPE: { icon: <LocationOn />, color: 'success', label: 'Location' },
    DATE: { icon: <Event />, color: 'warning', label: 'Date' },
    TIME: { icon: <Event />, color: 'warning', label: 'Time' },
    MONEY: { icon: <Language />, color: 'info', label: 'Money' },
    PERCENT: { icon: <Language />, color: 'info', label: 'Percentage' },
    FAC: { icon: <LocationOn />, color: 'success', label: 'Facility' },
    PRODUCT: { icon: <Business />, color: 'secondary', label: 'Product' },
    EVENT: { icon: <Event />, color: 'warning', label: 'Event' },
    WORK_OF_ART: { icon: <Language />, color: 'info', label: 'Work of Art' },
    LAW: { icon: <Language />, color: 'info', label: 'Law' },
    LANGUAGE: { icon: <Language />, color: 'info', label: 'Language' },
  };

  const getEntityConfig = (type) => {
    return entityTypeConfig[type] || { icon: <CheckCircle />, color: 'default', label: type };
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Named Entity Recognition
      </Typography>
      
      {entities.length === 0 ? (
        <Card>
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <CheckCircle sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary">
              No named entities found in the text
            </Typography>
            <Typography variant="body2" color="text.secondary">
              The text doesn't contain any recognizable named entities like people, places, or organizations.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Grid container spacing={3}>
          {/* Entity Summary */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Entity Summary
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h4" color="primary" fontWeight="bold">
                        {entities.length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Total Entities
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h4" color="primary" fontWeight="bold">
                        {Object.keys(entityGroups).length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Entity Types
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h4" color="primary" fontWeight="bold">
                        {Math.max(...Object.values(entityGroups).map(group => group.length))}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Most Common Type
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h4" color="primary" fontWeight="bold">
                        {(entities.reduce((sum, entity) => sum + entity.text.length, 0) / entities.length).toFixed(1)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Avg Entity Length
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {/* Entity Types Distribution */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Entity Types Distribution
                </Typography>
                <List dense>
                  {Object.entries(entityGroups).map(([type, group]) => {
                    const config = getEntityConfig(type);
                    return (
                      <ListItem key={type} sx={{ px: 0 }}>
                        <ListItemIcon sx={{ color: `${config.color}.main` }}>
                          {config.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={config.label}
                          secondary={`${group.length} entities`}
                        />
                        <Chip
                          label={group.length}
                          size="small"
                          color={config.color}
                          variant="outlined"
                        />
                      </ListItem>
                    );
                  })}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* All Entities Table */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  All Entities
                </Typography>
                <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Entity</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Position</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {entities.map((entity, index) => {
                        const config = getEntityConfig(entity.label);
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Box sx={{ color: `${config.color}.main` }}>
                                  {config.icon}
                                </Box>
                                <Typography variant="body2" fontWeight="bold">
                                  {entity.text}
                                </Typography>
                              </Box>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={config.label}
                                size="small"
                                color={config.color}
                                variant="outlined"
                              />
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" color="text.secondary">
                                {entity.start}-{entity.end}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </Grid>

          {/* Entity Type Details */}
          {Object.entries(entityGroups).map(([type, group]) => {
            const config = getEntityConfig(type);
            return (
              <Grid item xs={12} md={6} key={type}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Box sx={{ color: `${config.color}.main` }}>
                        {config.icon}
                      </Box>
                      {config.label} ({group.length})
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {group.map((entity, index) => (
                        <Chip
                          key={index}
                          label={entity.text}
                          variant="outlined"
                          size="small"
                          color={config.color}
                        />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default EntityList; 