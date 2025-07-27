from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
import spacy
from textblob import TextBlob
from langdetect import detect, LangDetectException
import emoji
import textstat
import json
import re
from collections import Counter
import numpy as np
import pandas as pd
from wordcloud import WordCloud
import matplotlib.pyplot as plt
import io
import base64
import plotly.graph_objects as go
import plotly.express as px
from plotly.utils import PlotlyJSONEncoder
import os
from datetime import datetime

# Download required NLTK data
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')
try:
    nltk.data.find('taggers/averaged_perceptron_tagger')
except LookupError:
    nltk.download('averaged_perceptron_tagger')
try:
    nltk.data.find('corpora/vader_lexicon')
except LookupError:
    nltk.download('vader_lexicon')

app = Flask(__name__)
CORS(app)

# Load spaCy model for English
try:
    nlp = spacy.load("en_core_web_sm")
except OSError:
    print("Downloading spaCy model...")
    os.system("python -m spacy download en_core_web_sm")
    nlp = spacy.load("en_core_web_sm")

class SentimentAnalyzer:
    def __init__(self):
        self.emotion_lexicon = {
            'joy': ['happy', 'joy', 'excited', 'wonderful', 'amazing', 'great', 'fantastic'],
            'sadness': ['sad', 'depressed', 'miserable', 'terrible', 'awful', 'horrible'],
            'anger': ['angry', 'furious', 'mad', 'irritated', 'annoyed', 'frustrated'],
            'fear': ['scared', 'afraid', 'terrified', 'worried', 'anxious', 'nervous'],
            'surprise': ['surprised', 'shocked', 'amazed', 'astonished', 'stunned'],
            'disgust': ['disgusted', 'revolted', 'sickened', 'appalled'],
            'trust': ['trust', 'confident', 'sure', 'certain', 'reliable']
        }
    
    def preprocess_text(self, text):
        """Clean and preprocess text"""
        # Remove URLs
        text = re.sub(r'http\S+|www\S+|https\S+', '', text, flags=re.MULTILINE)
        # Remove special characters but keep emojis
        text = re.sub(r'[^\w\s\U0001F600-\U0001F64F\U0001F300-\U0001F5FF\U0001F680-\U0001F6FF\U0001F1E0-\U0001F1FF\U00002702-\U000027B0\U000024C2-\U0001F251]', '', text)
        # Remove extra whitespace
        text = ' '.join(text.split())
        return text
    
    def detect_language(self, text):
        """Detect language of the text"""
        try:
            return detect(text)
        except LangDetectException:
            return 'unknown'
    
    def analyze_sentiment_textblob(self, text):
        """Analyze sentiment using TextBlob"""
        blob = TextBlob(text)
        polarity = blob.sentiment.polarity
        subjectivity = blob.sentiment.subjectivity
        
        # Categorize sentiment
        if polarity > 0.1:
            sentiment = 'positive'
        elif polarity < -0.1:
            sentiment = 'negative'
        else:
            sentiment = 'neutral'
        
        return {
            'polarity': round(polarity, 3),
            'subjectivity': round(subjectivity, 3),
            'sentiment': sentiment
        }
    
    def analyze_sentiment_nltk(self, text):
        """Analyze sentiment using NLTK VADER"""
        from nltk.sentiment.vader import SentimentIntensityAnalyzer
        analyzer = SentimentIntensityAnalyzer()
        scores = analyzer.polarity_scores(text)
        
        # Categorize sentiment
        if scores['compound'] > 0.05:
            sentiment = 'positive'
        elif scores['compound'] < -0.05:
            sentiment = 'negative'
        else:
            sentiment = 'neutral'
        
        return {
            'compound': round(scores['compound'], 3),
            'positive': round(scores['pos'], 3),
            'negative': round(scores['neg'], 3),
            'neutral': round(scores['neu'], 3),
            'sentiment': sentiment
        }
    
    def extract_entities(self, text):
        """Extract named entities using spaCy"""
        doc = nlp(text)
        entities = []
        for ent in doc.ents:
            entities.append({
                'text': ent.text,
                'label': ent.label_,
                'start': ent.start_char,
                'end': ent.end_char
            })
        return entities
    
    def pos_tagging(self, text):
        """Perform POS tagging"""
        doc = nlp(text)
        pos_tags = []
        for token in doc:
            pos_tags.append({
                'token': token.text,
                'pos': token.pos_,
                'tag': token.tag_,
                'dep': token.dep_
            })
        return pos_tags
    
    def detect_emotions(self, text):
        """Detect emotions in text"""
        text_lower = text.lower()
        emotion_scores = {}
        
        for emotion, words in self.emotion_lexicon.items():
            score = sum(1 for word in words if word in text_lower)
            emotion_scores[emotion] = score
        
        # Normalize scores
        total_words = len(text.split())
        if total_words > 0:
            emotion_scores = {k: v/total_words for k, v in emotion_scores.items()}
        
        return emotion_scores
    
    def extract_keywords(self, text, top_n=10):
        """Extract keywords using spaCy"""
        doc = nlp(text)
        keywords = []
        
        for token in doc:
            if not token.is_stop and not token.is_punct and token.is_alpha:
                keywords.append(token.lemma_.lower())
        
        # Count frequencies
        keyword_freq = Counter(keywords)
        return [{'word': word, 'frequency': freq} for word, freq in keyword_freq.most_common(top_n)]
    
    def analyze_readability(self, text):
        """Analyze text readability"""
        return {
            'flesch_reading_ease': textstat.flesch_reading_ease(text),
            'flesch_kincaid_grade': textstat.flesch_kincaid_grade(text),
            'gunning_fog': textstat.gunning_fog(text),
            'smog_index': textstat.smog_index(text),
            'automated_readability_index': textstat.automated_readability_index(text),
            'coleman_liau_index': textstat.coleman_liau_index(text),
            'linsear_write_formula': textstat.linsear_write_formula(text),
            'dale_chall_readability_score': textstat.dale_chall_readability_score(text),
            'difficult_words': textstat.difficult_words(text),
            'syllable_count': textstat.syllable_count(text),
            'lexicon_count': textstat.lexicon_count(text),
            'sentence_count': textstat.sentence_count(text)
        }
    
    def extract_emojis(self, text):
        """Extract and analyze emojis"""
        emoji_list = emoji.emoji_list(text)
        emoji_counts = Counter([e['emoji'] for e in emoji_list])
        return [{'emoji': emoji, 'count': count} for emoji, count in emoji_counts.most_common()]
    
    def generate_wordcloud_data(self, text):
        """Generate wordcloud data"""
        # Clean text for wordcloud
        clean_text = re.sub(r'[^\w\s]', '', text.lower())
        words = clean_text.split()
        
        # Remove stop words
        stop_words = set(nltk.corpus.stopwords.words('english'))
        words = [word for word in words if word not in stop_words and len(word) > 2]
        
        # Count word frequencies
        word_freq = Counter(words)
        
        return [{'word': word, 'frequency': freq} for word, freq in word_freq.most_common(50)]

# Initialize analyzer
analyzer = SentimentAnalyzer()

@app.route('/api/analyze', methods=['POST'])
def analyze_text():
    """Main endpoint for text analysis"""
    try:
        data = request.get_json()
        text = data.get('text', '').strip()
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400
        
        # Preprocess text
        processed_text = analyzer.preprocess_text(text)
        
        # Detect language
        language = analyzer.detect_language(processed_text)
        
        # Perform comprehensive analysis
        results = {
            'original_text': text,
            'processed_text': processed_text,
            'language': language,
            'timestamp': datetime.now().isoformat(),
            'textblob_sentiment': analyzer.analyze_sentiment_textblob(processed_text),
            'nltk_sentiment': analyzer.analyze_sentiment_nltk(processed_text),
            'entities': analyzer.extract_entities(processed_text),
            'pos_tags': analyzer.pos_tagging(processed_text),
            'emotions': analyzer.detect_emotions(processed_text),
            'keywords': analyzer.extract_keywords(processed_text),
            'readability': analyzer.analyze_readability(processed_text),
            'emojis': analyzer.extract_emojis(text),
            'wordcloud_data': analyzer.generate_wordcloud_data(processed_text)
        }
        
        return jsonify(results)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/batch-analyze', methods=['POST'])
def batch_analyze():
    """Analyze multiple texts"""
    try:
        data = request.get_json()
        texts = data.get('texts', [])
        
        if not texts:
            return jsonify({'error': 'No texts provided'}), 400
        
        results = []
        for text in texts:
            if text.strip():
                processed_text = analyzer.preprocess_text(text)
                sentiment = analyzer.analyze_sentiment_textblob(processed_text)
                results.append({
                    'text': text,
                    'sentiment': sentiment['sentiment'],
                    'polarity': sentiment['polarity'],
                    'subjectivity': sentiment['subjectivity']
                })
        
        return jsonify({'results': results})
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'timestamp': datetime.now().isoformat()})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001) 