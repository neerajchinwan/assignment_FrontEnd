import React from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

const ResizableComponent = ({ width, height, onResize, children }) => (
  <Resizable
    width={width}
    height={height}
    onResize={onResize}
    className="resize-handle"
  >
    <div className="border border-gray-400 p-4">
      {children}
    </div>
  </Resizable>
);

export default ResizableComponent;
