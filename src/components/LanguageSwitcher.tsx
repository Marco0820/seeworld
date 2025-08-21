"use client";

import { useState, useRef } from 'react';
import { Globe } from 'lucide-react';

interface Language {
  code: string;
  name: string;
}

interface LanguageSwitcherProps {
  variant?: 'desktop' | 'mobile';
}

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'pt', name: 'Português' },
  { code: 'it', name: 'Italiano' },
  { code: 'ja', name: '日本語' },
  { code: 'th', name: 'ภาษาไทย' },
  { code: 'pl', name: 'Polski' },
  { code: 'ko', name: '한국어' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ru', name: 'Русский' },
  { code: 'da', name: 'Dansk' },
  { code: 'ar', name: 'العربية' },
  { code: 'nb', name: 'Norsk bokmål' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'zh-tw', name: '繁體中文' },
  { code: 'zh-cn', name: '简体中文' },
  { code: 'tr', name: 'Türkçe' },
];

export default function LanguageSwitcher({ variant = 'desktop' }: LanguageSwitcherProps) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    // Here you would typically implement the actual language switching logic
    console.log('Selected language:', language.code);
  };

  return (
    <div className="relative group" ref={dropdownRef}>
      <div className="text-white/60 flex items-center justify-between rounded py-1 pe-[2px] ps-1.5 hover:cursor-pointer hover:text-white/80">
        <div className="flex flex-1 items-center gap-1">
          <Globe className="text-white/60 size-[18px]" />
          <p className="text-sm leading-5">{selectedLanguage.name}</p>
        </div>
      </div>

      <div className="absolute top-full right-0 mt-2 w-48 bg-gray-900/95 backdrop-blur-sm border border-gray-700/50 rounded-lg shadow-xl z-50 max-h-64 overflow-y-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => handleLanguageSelect(language)}
            className={`w-full flex items-center px-3 py-2 text-left transition-colors text-sm ${
              selectedLanguage.code === language.code
                ? 'bg-blue-600/80 text-white'
                : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            {language.name}
          </button>
        ))}
      </div>
    </div>
  );
}