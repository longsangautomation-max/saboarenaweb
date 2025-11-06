import { useState, useEffect } from 'react';

export interface AISettings {
  model: 'gpt-4o-mini' | 'gpt-4-turbo' | 'gpt-3.5-turbo';
  temperature: number;
  maxTokens: number;
  autoGeneration: boolean;
  defaultPersona: 'chi-huong' | 'anh-tuan' | 'mc-minh-anh' | 'em-linh' | 'random';
  dailyLimit: number;
}

const DEFAULT_SETTINGS: AISettings = {
  model: 'gpt-4o-mini',
  temperature: 0.9,
  maxTokens: 1800,
  autoGeneration: true,
  defaultPersona: 'random',
  dailyLimit: 3
};

const STORAGE_KEY = 'ai-news-settings';

export function useAISettings() {
  const [settings, setSettings] = useState<AISettings>(DEFAULT_SETTINGS);

  // Load settings from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setSettings({ ...DEFAULT_SETTINGS, ...parsed });
      }
    } catch (err) {
      console.error('Error loading AI settings:', err);
    }
  }, []);

  // Save settings to localStorage
  const saveSettings = (newSettings: Partial<AISettings>) => {
    try {
      const updated = { ...settings, ...newSettings };
      setSettings(updated);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return { success: true };
    } catch (err) {
      console.error('Error saving AI settings:', err);
      return { success: false, error: 'Failed to save settings' };
    }
  };

  // Reset to defaults
  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_SETTINGS));
  };

  // Get cost estimate per article
  const getCostPerArticle = () => {
    const avgInputTokens = 400;
    const avgOutputTokens = settings.maxTokens;
    
    let inputCostPer1M = 0;
    let outputCostPer1M = 0;
    
    switch (settings.model) {
      case 'gpt-4o-mini':
        inputCostPer1M = 0.15;
        outputCostPer1M = 0.6;
        break;
      case 'gpt-4-turbo':
        inputCostPer1M = 10;
        outputCostPer1M = 30;
        break;
      case 'gpt-3.5-turbo':
        inputCostPer1M = 0.5;
        outputCostPer1M = 1.5;
        break;
    }
    
    const inputCost = (avgInputTokens / 1000000) * inputCostPer1M;
    const outputCost = (avgOutputTokens / 1000000) * outputCostPer1M;
    
    return Number((inputCost + outputCost).toFixed(6));
  };

  return {
    settings,
    saveSettings,
    resetSettings,
    getCostPerArticle
  };
}
