import React, { useState } from 'react';

function TaskOne() {
  const [sectionWidth1, setSectionWidth1] = useState('60%');
  const [sectionWidth2, setSectionWidth2] = useState('40%');
  const [sectionheight, setSectionHeight] = useState('200px')

  const handleMouseMove = (event, section) => {
    if (section === 1) {
      setSectionWidth1(`${event.clientX}px`);
      setSectionWidth2(`${window.innerWidth - event.clientX}px`);
    } else if (section === 2) {
      setSectionWidth1(`${event.clientX}px`);
      setSectionWidth2(`${window.innerWidth - event.clientX}px`);
    }else{
      setSectionHeight(`${event.clientY}px`)
    }
  };

  return (
    <div className="container mt-9">
      <div className="horizontal-sections">
        <div
          className="section section1 bg-red-300 text-2xl font-semibold"
          style={{ width: sectionWidth1 }}
          onMouseMove={(e) => handleMouseMove(e, 1)}
        >
          Section 1
        </div>
        <div
          className="section section2 bg-blue-400 text-2xl font-semibold"
          style={{ width: sectionWidth2 }}
          onMouseMove={(e) => handleMouseMove(e, 2)}
        >
          Section 2
        </div>
      </div>
      <div 
      className="section section3 bg-green-400 text-2xl font-semibold"
      style={{ height: sectionheight }}
      onMouseMove={(e) => handleMouseMove(e, 3)}>Section 3</div>
    </div>
  );
}

export default TaskOne;
