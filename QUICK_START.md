# Quick Start Guide - Multi-Language Sentiment Analyzer

## 🚀 Application Status: READY TO USE!

Both backend and frontend servers are now running successfully.

### 📍 Server URLs
- **Backend API**: http://localhost:5001
- **Frontend UI**: http://localhost:5173

## 🎯 How to Use

### 1. Open the Application
Open your web browser and navigate to: **http://localhost:5173**

### 2. Analyze Text
1. **Enter text** in the large text input field
2. **Click "Analyze Text"** or press **Ctrl/Cmd + Enter**
3. **View results** in the interactive dashboard

### 3. Explore Analysis Results
The dashboard provides comprehensive analysis across multiple tabs:

#### 📊 Sentiment Analysis Tab
- **TextBlob Analysis**: Polarity (-1 to 1) and Subjectivity (0 to 1)
- **NLTK VADER Analysis**: Compound score with positive/negative/neutral breakdown
- **Visual charts** comparing both sentiment analysis methods

#### 😊 Emotions Tab
- **7 emotion categories**: Joy, Sadness, Anger, Fear, Surprise, Disgust, Trust
- **Emotion scores** with visual progress bars
- **Emoji analysis** (if present in text)
- **Top emotions ranking**

#### 🔑 Keywords Tab
- **Interactive word cloud** with hover effects
- **Keyword frequency analysis**
- **Top keywords list**
- **Statistical breakdown**

#### 🏷️ Entities Tab
- **Named Entity Recognition** (People, Places, Organizations, etc.)
- **Entity type distribution**
- **Detailed entity table**
- **Entity grouping by type**

#### 📝 POS Tagging Tab
- **Part-of-Speech analysis** for each token
- **Interactive filtering** by POS type
- **Search functionality**
- **POS distribution statistics**

#### 📖 Readability Tab
- **Multiple readability metrics**: Flesch Reading Ease, Gunning Fog, SMOG, etc.
- **Grade level assessment**
- **Text complexity analysis**
- **Word and sentence statistics**

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

## 🔧 Technical Features

### Backend (Flask + Python)
- ✅ **Multi-language sentiment analysis** (TextBlob + NLTK VADER)
- ✅ **Language detection** (automatic)
- ✅ **Named Entity Recognition** (spaCy)
- ✅ **Part-of-Speech tagging** (spaCy)
- ✅ **Emotion detection** (lexicon-based)
- ✅ **Keyword extraction** (frequency analysis)
- ✅ **Readability metrics** (8 different algorithms)
- ✅ **Emoji analysis**
- ✅ **Text preprocessing** pipeline

### Frontend (React + Material-UI)
- ✅ **Responsive design** (mobile-friendly)
- ✅ **Interactive visualizations** (Recharts)
- ✅ **Real-time analysis** with progress indicators
- ✅ **Tabbed interface** for organized results
- ✅ **Modern Material-UI components**
- ✅ **Color-coded sentiment indicators**
- ✅ **Hover effects** and tooltips

## 🛠️ Troubleshooting

### If servers stop running:
1. **Backend**: `cd sentiment_analyzer/backend && source venv/bin/activate && python app.py`
2. **Frontend**: `cd sentiment_analyzer/frontend && npm run dev`

### If you get CORS errors:
- Make sure both servers are running
- Check that backend is on port 5001 and frontend on port 5173

### If analysis fails:
- Check that all NLTK data is downloaded
- Ensure spaCy model is installed: `python -m spacy download en_core_web_sm`

## 🎉 Ready to Analyze!

Your Multi-Language Sentiment Analyzer is now fully operational! 

**Start analyzing text at: http://localhost:5173**

---

*Built with ❤️ using Flask, React, NLTK, TextBlob, spaCy, and Material-UI* 