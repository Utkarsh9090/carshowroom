import React, { useState, useEffect } from 'react';

const models = [
  {name: "Scorpio N", url: "https://auto.mahindra.com/360-view?cid=ScorpioN"},
  {name: "XUV700", url: "https://auto.mahindra.com/360-view?cid=XUV700"},
  {name: "XUV 3XO", url: "https://auto.mahindra.com/360-view?cid=XUV3XO"},
  {name: "Thar", url: "https://auto.mahindra.com/360-view?cid=Thar"},
  {name: "Thar Roxx", url: "https://auto.mahindra.com/360-view?cid=THAR-ROXX"},
  {name: "BE 6 Electric", url: "https://www.mahindraelectricsuv.com/360-view?model=BE-6"},
  {name: "XEV 9e", url: "https://www.cardekho.com/mahindra-xev-9e-360-view.htm"}
];

const Interactive360Viewer = ({ initialModel }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (initialModel) {
      const index = models.findIndex(m => m.name.toLowerCase() === initialModel.toLowerCase());
      if (index !== -1) {
        setActiveIndex(index);
      }
    }
  }, [initialModel]);

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {models.map((model, index) => (
          <button
            key={model.name}
            onClick={() => setActiveIndex(index)}
            style={{
              padding: '10px 16px',
              background: activeIndex === index ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.1)',
              color: activeIndex === index ? '#fff' : 'var(--text-primary)',
              border: 'none',
              cursor: 'pointer',
              borderRadius: '8px',
              fontWeight: 'bold',
              transition: 'all 0.2s ease',
              border: activeIndex === index ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)'
            }}
          >
            {model.name}
          </button>
        ))}
      </div>
      
      <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', height: '400px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <iframe 
          src={models[activeIndex].url} 
          style={{ width: '100%', height: '100%', border: 'none' }}
          allowFullScreen
          title={`${models[activeIndex].name} 360 View`}
        />
        <div style={{
          position: 'absolute',
          top: '15px',
          left: '15px',
          background: 'rgba(10, 10, 10, 0.5)',
          padding: '5px 12px',
          borderRadius: '20px',
          fontSize: '0.8rem',
          backdropFilter: 'blur(5px)'
        }}>
          <span style={{ color: 'var(--text-secondary)' }}>Interactive 360° Viewer</span>
        </div>
      </div>
    </div>
  );
};

export default Interactive360Viewer;
