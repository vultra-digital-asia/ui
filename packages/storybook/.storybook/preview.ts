import '../../tokens/src/base.css';

const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    themes: {
      default: 'neutral',
      list: [
        { name: 'neutral', class: '', color: '#ffffff' },
        { name: 'warm', class: '', color: '#f6f1e8' },
        { name: 'dark', class: 'dark', color: '#1a1a1a' }
      ]
    }
  },
  decorators: []
};

export default preview;
