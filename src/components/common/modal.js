import React from 'react';

const Modal=({isOpen,onClose,children})=>{
    if(!isOpen)return null;

    return (
        <div style ={{
          position:'fixed',
          top:0,
          left:0,
          right:0,
          bottom:0,
          backgroundColor:'rgba(0,0,0,0.5)',
          display:'flex',
          alignItems:'center',
          justifyContent:'center',
          zIndex:1000
        }}>

        <div style={{
          backgroundColor:'white',
          padding:'20px',
          borderRadius:'8px',
          boxShadow:'0 4px 6px rgba(0,0,0,0.1)',
          position:'relative',
          width:'90%',
          maxWidth:'600px',
          mxHeight:'90%',
          overflowY:'auto'
        }}>
            <button onClick={onClose} style={{
                position:'absolute',
                top:'10px',
                right:'10px',
                cursor:'pointer',
                background :'none',
                fontSize:'1.2rem'
            }}>&times;</button>

        {children}</div>
        </div>
    );
}

export default Modal;
