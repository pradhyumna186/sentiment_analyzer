# Multi-Language Sentiment Analyzer

A comprehensive web application for real-time sentiment analysis supporting multiple languages using advanced NLP techniques. Built with Flask backend and React frontend with Material-UI.

## 🌟 Features

### Core Analysis
- **Multi-language sentiment analysis** using TextBlob and NLTK VADER
- **Language detection** for automatic language identification
- **Real-time text processing** with comprehensive NLP pipeline

### Advanced NLP Features
- **Named Entity Recognition (NER)** using spaCy
- **Part-of-Speech (POS) tagging** with detailed token analysis
- **Emotion detection** with 7 emotion categories
- **Keyword extraction** with frequency analysis
- **Readability metrics** using multiple algorithms
- **Emoji analysis** and sentiment correlation

### Interactive Visualizations
- **Sentiment trend charts** with TextBlob and NLTK comparisons
- **Emotion distribution** with color-coded visualizations
- **Interactive word cloud** with hover effects
- **Entity relationship** displays
- **POS tag distribution** charts
- **Readability score** breakdowns

### Modern UI/UX
- **Responsive Material-UI design** for cross-platform compatibility
- **Tabbed interface** for organized analysis sections
- **Real-time progress indicators** during analysis
- **Interactive charts** with tooltips and hover effects
- **Color-coded sentiment indicators** for quick insights

## 🛠️ Technology Stack

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

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Option 1: Quick Start Scripts

**Unix/Mac:**
```bash
git clone https://github.com/pradhyumna186/sentiment_analyzer.git
cd sentiment_analyzer
chmod +x start.sh
./start.sh
```

**Windows:**
```bash
git clone https://github.com/pradhyumna186/sentiment_analyzer.git
cd sentiment_analyzer
start.bat
```

### Option 2: Manual Setup

**Backend Setup:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m spacy download en_core_web_sm
python app.py
```

**Frontend Setup (in new terminal):**
```bash
cd frontend
npm install
npm run dev
```

## 📱 Usage

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

## 🧪 Test Examples

### Positive Sentiment
```
"I love this amazing product! It is fantastic and makes me very happy."
```

### Negative Sentiment
```
"I hate this terrible product. It is awful and makes me very angry and frustrated."
```

### Multi-language Support
```
"Ce produit est incroyable! Je l'adore vraiment."
"Este producto es fantástico! Me encanta mucho."
```

## 📊 API Endpoints

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

## 🔧 Features in Detail

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

## 🏗️ Project Structure

```
sentiment_analyzer/
├── backend/
│   ├── app.py              # Flask API with comprehensive NLP
│   ├── requirements.txt    # Python dependencies
│   └── venv/              # Virtual environment
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   └── App.jsx        # Main app
│   ├── package.json       # Node.js dependencies
│   └── vite.config.js     # Vite configuration
├── start.sh               # Unix startup script
├── start.bat              # Windows startup script
└── README.md              # This file
```

## 🐛 Troubleshooting

### If servers stop running:
1. **Backend**: `cd backend && source venv/bin/activate && python app.py`
2. **Frontend**: `cd frontend && npm run dev`

### If you get CORS errors:
- Make sure both servers are running
- Check that backend is on port 5001 and frontend on port 5173

### If analysis fails:
- Check that all NLTK data is downloaded
- Ensure spaCy model is installed: `python -m spacy download en_core_web_sm`

### Port conflicts:
- If port 5000 is in use (common on macOS), the app uses port 5001
- If port 5173 is in use, Vite will automatically use the next available port

## 📈 Performance

- **Real-time analysis**: Most texts analyze in under 2 seconds
- **Multi-language support**: Automatic language detection
- **Scalable architecture**: Can handle multiple concurrent requests
- **Responsive UI**: Works on desktop, tablet, and mobile devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **NLTK** for natural language processing capabilities
- **TextBlob** for sentiment analysis
- **spaCy** for advanced NLP features
- **Material-UI** for the beautiful React components
- **Recharts** for interactive data visualization

---

**Built with ❤️ using Flask, React, NLTK, TextBlob, spaCy, and Material-UI** 