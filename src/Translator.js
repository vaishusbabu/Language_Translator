import React, { useState } from 'react';
import './App.css';
import languageList from './language.json';
import axios from 'axios';

export default function Translator() {
    const [inputFormat, setInputFormat] = useState('en');
    const [outputFormat, setOutputFormat] = useState('');
    const [translatedText, setTranslatedText] = useState('Translation');
    const [inputText, setInputText] = useState('');

    const handleReverseLanguage = () => {
        const value = inputFormat;
        setInputFormat(outputFormat);
        setOutputFormat(value);
        setInputText('');
        setTranslatedText('Translation');
    }

    const handleRemoveInputText = () => {
        setInputText('');
        setTranslatedText('Translation');
    }

    const handleTranslate = async () => {
        if (!inputText || !inputFormat || !outputFormat) return;

        setTranslatedText('Translating...');

        const options = {
            method: 'POST',
            url: 'https://microsoft-translator-text.p.rapidapi.com/translate',
            params: {
                'api-version': '3.0',
                to: outputFormat,
                from: inputFormat
            },
            headers: {
                'x-rapidapi-key': '12bee6d5f7msh0678d481138dcf0p114d09jsne8bd4a5a74e3',
                'x-rapidapi-host': 'microsoft-translator-text.p.rapidapi.com',
                'Content-Type': 'application/json'
            },
            data: [{
                Text: inputText
            }]
        };

        try {
            const response = await axios.request(options);
            const translation = response.data[0].translations[0].text;
            console.log("translation", translation);
            setTranslatedText(translation);
        } catch (error) {
            console.error(error);
            setTranslatedText('Error in translation');
        }
    };

    return (
        <div className="container">
            <div className="row1">
                <select value={inputFormat}
                    onChange={(e) => setInputFormat(e.target.value)}>
                    {Object.keys(languageList).map((key, index) => {
                        const language = languageList[key];
                        return (
                            <option key={index} value={key}>{language.name}</option>
                        );
                    })}
                </select>
                <svg className='reversesvg'
                    onClick={handleReverseLanguage}
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24">
                    <path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z">
                    </path>
                </svg>
                <select value={outputFormat} onChange={(e) => {
                    setOutputFormat(e.target.value);
                    setTranslatedText('Translation');
                }}>
                    {Object.keys(languageList).map((key, index) => {
                        const language = languageList[key];
                        return (
                            <option key={index + 118} value={key}>{language.name}</option>
                        );
                    })}
                </select>
            </div>
            <div className="row2">
                <div className="inputText">
                    <svg className='removeinput'
                        style={{ display: (inputText.length) ? "block" : "none" }}
                        onClick={handleRemoveInputText}
                        focusable="false"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24">
                        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z">
                        </path>
                    </svg>
                    <textarea type="text"
                        value={inputText}
                        placeholder='Enter Text'
                        onChange={(e) => setInputText(e.target.value)} />
                </div>
                <div className="outputText">{translatedText}</div>
            </div>
            <div className="row3">
                <button className='btn'
                    onClick={handleTranslate}>
                    <i className="fa fa-spinner fa-spin"></i>
                    <span className='translate'>Translate</span>
                </button>
            </div>
        </div>
    )
}
