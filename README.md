# Multi-Language Sentiment Analyzer

A comprehensive web application for real-time sentiment analysis supporting multiple languages using advanced NLP techniques. Built with Flask backend and React frontend with Material-UI.

## Features

### 🎯 Core Analysis
- **Multi-language sentiment analysis** using TextBlob and NLTK VADER
- **Language detection** for automatic language identification
- **Real-time text processing** with comprehensive NLP pipeline

### 📊 Advanced NLP Features
- **Named Entity Recognition (NER)** using spaCy
- **Part-of-Speech (POS) tagging** with detailed token analysis
- **Emotion detection** with 7 emotion categories
- **Keyword extraction** with frequency analysis
- **Readability metrics** using multiple algorithms
- **Emoji analysis** and sentiment correlation

### 📈 Interactive Visualizations
- **Sentiment trend charts** with TextBlob and NLTK comparisons
- **Emotion distribution** with color-coded visualizations
- **Interactive word cloud** with hover effects
- **Entity relationship** displays
- **POS tag distribution** charts
- **Readability score** breakdowns

### 🎨 Modern UI/UX
- **Responsive Material-UI design** for cross-platform compatibility
- **Tabbed interface** for organized analysis sections
- **Real-time progress indicators** during analysis
- **Interactive charts** with tooltips and hover effects
- **Color-coded sentiment indicators** for quick insights

## Technology Stack

### Backend
- **Flask** - Python web framework
- **NLTK** - Natural Language Processing toolkit
- **TextBlob** - Sentiment analysis and language processing
- **spaCy** - Advanced NLP with named entity recognition
- **langdetect** - Language detection
- **textstat** - Readability metrics
- **emoji** - Emoji analysis

### Frontend
- **React 18** - Modern JavaScript framework
- **Vite** - Fast build tool and development server
- **Material-UI (MUI)** - React component library
- **Recharts** - Interactive charting library
- **Axios** - HTTP client for API communication

## Installation

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd sentiment_analyzer/backend
```

2. Create a virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Download spaCy model:
```bash
python -m spacy download en_core_web_sm
```

5. Start the Flask server:
```bash
python app.py
```

The backend will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd sentiment_analyzer/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Usage

1. **Open the application** in your browser at `http://localhost:5173`

2. **Enter text** in the input field - the system supports multiple languages

3. **Click "Analyze Text"** or press Ctrl/Cmd + Enter to start analysis

4. **Explore results** through the tabbed interface:
   - **Sentiment Analysis**: TextBlob and NLTK sentiment scores
   - **Emotions**: Emotion detection with visual charts
   - **Keywords**: Word cloud and keyword frequency analysis
   - **Entities**: Named entity recognition results
   - **POS Tagging**: Part-of-speech analysis with filtering
   - **Readability**: Multiple readability metrics and insights

## API Endpoints

### POST `/api/analyze`
Analyze a single text input.

**Request:**
```json
{
  "text": "Your text to analyze"
}
```

**Response:**
```json
{
  "original_text": "Your text to analyze",
  "processed_text": "processed version",
  "language": "en",
  "timestamp": "2024-01-01T12:00:00",
  "textblob_sentiment": {
    "polarity": 0.5,
    "subjectivity": 0.3,
    "sentiment": "positive"
  },
  "nltk_sentiment": {
    "compound": 0.6,
    "positive": 0.4,
    "negative": 0.1,
    "neutral": 0.5,
    "sentiment": "positive"
  },
  "entities": [...],
  "pos_tags": [...],
  "emotions": {...},
  "keywords": [...],
  "readability": {...},
  "emojis": [...],
  "wordcloud_data": [...]
}
```

### POST `/api/batch-analyze`
Analyze multiple texts at once.

### GET `/api/health`
Health check endpoint.

## Features in Detail

### Sentiment Analysis
- **TextBlob**: Provides polarity (-1 to 1) and subjectivity (0 to 1) scores
- **NLTK VADER**: Compound score with positive, negative, and neutral components
- **Multi-language support**: Automatic language detection and appropriate analysis

### Emotion Detection
- **7 emotion categories**: Joy, Sadness, Anger, Fear, Surprise, Disgust, Trust
- **Lexicon-based approach**: Uses emotion word dictionaries
- **Normalized scores**: Relative to text length

### Named Entity Recognition
- **Entity types**: Person, Organization, Location, Date, Time, Money, etc.
- **Position tracking**: Character positions in original text
- **Grouped display**: Entities organized by type

### Part-of-Speech Tagging
- **Detailed analysis**: Token, POS tag, detailed tag, and dependency
- **Interactive filtering**: Search and filter by POS type
- **Statistical breakdown**: Distribution of POS tags

### Readability Analysis
- **Multiple algorithms**: Flesch Reading Ease, Gunning Fog, SMOG, etc.
- **Grade level assessment**: U.S. grade level requirements
- **Text statistics**: Word count, syllable count, sentence count

### Keyword Extraction
- **Frequency analysis**: Word frequency counting
- **Interactive word cloud**: Size and color based on frequency
- **Stop word removal**: Automatic filtering of common words

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- **NLTK** for natural language processing capabilities
- **TextBlob** for sentiment analysis
- **spaCy** for advanced NLP features
- **Material-UI** for the beautiful React components
- **Recharts** for interactive data visualization

## Support

For support and questions, please open an issue in the repository or contact the development team. 